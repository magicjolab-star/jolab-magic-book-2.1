module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Methode non permise.' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY manquante.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const models = (process.env.GEMINI_MODELS || 'gemini-3.6-flash,gemini-2.5-flash')
    .split(',').map(v => v.trim()).filter(Boolean);

  const prompt = `Tu es un evaluateur de vehicules recreatifs au Quebec. Evalue ${body.annee || ''} ${body.marque || ''} ${body.modele || ''}. Millage/heures: ${body.millage || '0'}. Condition: ${body.condition || 'Moyen'}. Accessoires: ${body.accessoires || 'Aucun'}. Retourne uniquement un JSON valide sous la forme {"evaluation_ia":{"verdict_interne":"","blue_book":{"valeur_officielle":0,"commentaire_ia":""},"prix_echange_concessionnaire":{"montant":0,"argument_de_negociation":""},"prix_marche_particulier":{"montant":0,"realite_du_marche":""},"comparables_quebec":[{"plateforme":"","titre_annonce":"","prix_affiche":0},{"plateforme":"","titre_annonce":"","prix_affiche":0},{"plateforme":"","titre_annonce":"","prix_affiche":0}]}}. Tous les montants sont en dollars canadiens. Les comparables sont indicatifs, ne pretends pas les avoir verifies.`;

  let lastError;
  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1800 }
        })
      });
      const data = await response.json();
      if (!response.ok) {
        const err = new Error(data?.error?.message || response.statusText);
        err.status = response.status;
        throw err;
      }
      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
      const first = text.indexOf('{');
      const last = text.lastIndexOf('}');
      if (first >= 0 && last > first) text = text.slice(first, last + 1);
      const parsed = JSON.parse(text);
      if (!parsed?.evaluation_ia) throw new Error('Structure JSON incomplete.');
      return res.status(200).json({ ...parsed, meta: { model, generated_at: new Date().toISOString() } });
    } catch (error) {
      lastError = error;
    }
  }

  console.error('Gemini evaluation error:', lastError);
  return res.status(502).json({ error: 'Impossible de produire l evaluation pour le moment.' });
};
