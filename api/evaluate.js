const MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash-lite'];

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    evaluation_ia: {
      type: 'object',
      properties: {
        verdict_interne: { type: 'string' },
        blue_book: {
          type: 'object',
          properties: {
            valeur_officielle: { type: 'integer' },
            commentaire_ia: { type: 'string' }
          },
          required: ['valeur_officielle', 'commentaire_ia'],
          additionalProperties: false
        },
        prix_echange_concessionnaire: {
          type: 'object',
          properties: {
            montant: { type: 'integer' },
            argument_de_negociation: { type: 'string' }
          },
          required: ['montant', 'argument_de_negociation'],
          additionalProperties: false
        },
        prix_marche_particulier: {
          type: 'object',
          properties: {
            montant: { type: 'integer' },
            realite_du_marche: { type: 'string' }
          },
          required: ['montant', 'realite_du_marche'],
          additionalProperties: false
        },
        comparables_quebec: {
          type: 'array',
          minItems: 3,
          maxItems: 3,
          items: {
            type: 'object',
            properties: {
              plateforme: { type: 'string' },
              titre_annonce: { type: 'string' },
              prix_affiche: { type: 'integer' }
            },
            required: ['plateforme', 'titre_annonce', 'prix_affiche'],
            additionalProperties: false
          }
        }
      },
      required: [
        'verdict_interne',
        'blue_book',
        'prix_echange_concessionnaire',
        'prix_marche_particulier',
        'comparables_quebec'
      ],
      additionalProperties: false
    }
  },
  required: ['evaluation_ia'],
  additionalProperties: false
};

function normalizeBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) { return {}; }
  }
  return req.body;
}

function buildPrompt(body) {
  return `Tu es un évaluateur professionnel de véhicules de loisirs au Québec pour une équipe de vente.\n\nVéhicule : ${body.annee || ''} ${body.marque || ''} ${body.modele || ''}\nMillage / heures : ${body.millage || '0'}\nCondition : ${body.condition || 'Moyen'}\nAccessoires : ${body.accessoires || 'Aucun'}\n\nProduis une estimation réaliste en dollars canadiens (CAD) comprenant :\n- une valeur de référence de type livre bleu estimée;\n- un prix d'échange concessionnaire prudent mais défendable;\n- une valeur de détail réaliste;\n- exactement 3 comparables québécois indicatifs.\n\nNe prétends jamais avoir consulté ou vérifié des annonces en temps réel. Les comparables sont des exemples indicatifs fondés sur le marché. Sois concis, professionnel, utile à la négociation et évite les affirmations trompeuses.`;
}

function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts
    .filter(part => !part?.thought && typeof part?.text === 'string')
    .map(part => part.text)
    .join('')
    .trim();
}

async function callGemini(model, apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      signal: AbortSignal.timeout(30000),
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseJsonSchema: RESPONSE_SCHEMA,
          maxOutputTokens: 4096,
          thinkingConfig: { thinkingLevel: 'low' }
        }
      })
    }
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.error?.message || `Gemini HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const text = extractText(data);
  if (!text) throw new Error('Gemini a retourné une réponse vide.');

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`Réponse JSON Gemini invalide: ${error.message}`);
  }

  if (!parsed?.evaluation_ia) throw new Error('Structure JSON Gemini incomplète.');
  return parsed;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non permise.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY manquante dans Vercel.');
    return res.status(500).json({ error: 'Configuration IA manquante.' });
  }

  const body = normalizeBody(req);
  if (!body.modele || !body.annee || !body.marque) {
    return res.status(400).json({ error: 'Marque, modèle et année sont requis.' });
  }

  const prompt = buildPrompt(body);
  const errors = [];

  for (const model of MODELS) {
    try {
      const parsed = await callGemini(model, apiKey, prompt);
      return res.status(200).json({
        ...parsed,
        meta: {
          model,
          generated_at: new Date().toISOString(),
          version: '3.0.1'
        }
      });
    } catch (error) {
      errors.push({ model, status: error?.status || null, message: error?.message || String(error) });
      console.error(`Gemini model failure (${model}):`, error);
    }
  }

  console.error('Gemini evaluation failed for all models:', errors);
  return res.status(502).json({
    error: "Impossible de produire l'évaluation pour le moment. Réessaie dans quelques secondes."
  });
};
