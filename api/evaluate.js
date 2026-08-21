const MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash-lite'];

const ACCESSORY_VALUES = Object.freeze({
  'chenilles': { labelFr: 'Système de chenilles', labelEn: 'Track system', reference: 3000 },
  'cabine-complete': { labelFr: 'Cabine fermée complète', labelEn: 'Full enclosed cab', reference: 2500 },
  'cabine-chauffee': { labelFr: 'Système de chauffage', labelEn: 'Heater system', reference: 1000 },
  'suspension-elka-fox': { labelFr: 'Suspension améliorée', labelEn: 'Upgraded suspension', reference: 800 },
  'moteur-refait': { labelFr: 'Moteur refait à neuf / Big Bore', labelEn: 'Rebuilt engine / Big Bore', reference: 1000 },
  'direction-assistee': { labelFr: 'Direction assistée EPS ajoutée', labelEn: 'Added EPS power steering', reference: 750 },
  'treuil': { labelFr: 'Treuil', labelEn: 'Winch', reference: 300 },
  'gratte': { labelFr: 'Gratte à neige', labelEn: 'Snow plow', reference: 600 },
  'souffleuse': { labelFr: 'Souffleuse à neige', labelEn: 'Snow blower', reference: 1600 },
  'pare-brise-complet': { labelFr: 'Pare-brise complet', labelEn: 'Full windshield', reference: 350 },
  'demi-pare-brise': { labelFr: 'Demi pare-brise', labelEn: 'Half windshield', reference: 150 },
  'toit': { labelFr: 'Toit', labelEn: 'Roof', reference: 250 },
  'portieres': { labelFr: 'Portières', labelEn: 'Doors', reference: 800 },
  'bumper-avant': { labelFr: 'Pare-chocs avant', labelEn: 'Front bumper', reference: 250 },
  'bumper-arriere': { labelFr: 'Pare-chocs arrière', labelEn: 'Rear bumper', reference: 250 },
  'skid-plate': { labelFr: 'Plaque de protection complète', labelEn: 'Full skid plate', reference: 400 },
  'protecteur-bras': { labelFr: 'Protecteurs de bras triangulaires', labelEn: 'A-arm guards', reference: 300 },
  'rock-sliders': { labelFr: 'Protecteurs latéraux', labelEn: 'Rock sliders', reference: 250 },
  'coffre-arriere': { labelFr: 'Coffre arrière / Siège passager', labelEn: 'Rear cargo box / Passenger seat', reference: 150 },
  'coffre-avant': { labelFr: 'Coffre avant', labelEn: 'Front cargo box', reference: 100 },
  'support-fusil': { labelFr: 'Support à fusil / Outils', labelEn: 'Gun / Tool rack', reference: 100 },
  'pneus-mags': { labelFr: 'Pneus surdimensionnés et mags', labelEn: 'Oversized tires and wheels', reference: 800 },
  'barre-led': { labelFr: 'Barre d’éclairage LED', labelEn: 'LED light bar', reference: 150 },
  'systeme-son': { labelFr: 'Système de son / Radio', labelEn: 'Audio / Radio system', reference: 300 },
  'poignees-chauffantes': { labelFr: 'Poignées et pouce chauffants', labelEn: 'Heated grips and thumb', reference: 200 },
  'elargisseurs': { labelFr: 'Élargisseurs de voies', labelEn: 'Wheel spacers', reference: 100 },
  'ligne-echappement': { labelFr: 'Ligne d’échappement complète', labelEn: 'Full exhaust system', reference: 400 },
  'silencieux': { labelFr: 'Silencieux Slip-on', labelEn: 'Slip-on muffler', reference: 200 },
  'kit-graphique': { labelFr: 'Kit graphique complet', labelEn: 'Full graphics kit', reference: 100 },
  'embrayage-rekluse': { labelFr: 'Embrayage automatique Rekluse', labelEn: 'Rekluse auto clutch', reference: 500 },
  'protege-mains': { labelFr: 'Protège-mains', labelEn: 'Handguards', reference: 100 },
  'guidon-pro': { labelFr: 'Guidon amélioré', labelEn: 'Upgraded handlebar', reference: 120 },
  'housse-siege': { labelFr: 'Housse de siège Gripper', labelEn: 'Gripper seat cover', reference: 80 },
  'valises-moto': { labelFr: 'Valises latérales / Top case', labelEn: 'Panniers / Top case', reference: 500 },
  'crash-bars': { labelFr: 'Barres de protection / Crash bars', labelEn: 'Crash bars', reference: 250 },
  'demarreur-electrique': { labelFr: 'Démarreur électrique ajouté', labelEn: 'Added electric starter', reference: 600 },
  'chenille-crampons': { labelFr: 'Chenille cramponnée', labelEn: 'Studded track', reference: 400 },
  'sac-tunnel': { labelFr: 'Sac de tunnel', labelEn: 'Tunnel bag', reference: 150 },
  'grattoirs-glace': { labelFr: 'Grattoirs à glace', labelEn: 'Ice scratchers', reference: 80 },
  'kit-clutch': { labelFr: 'Kit d’embrayage', labelEn: 'Clutch kit', reference: 250 },
  'housse-transport': { labelFr: 'Housse de transport originale', labelEn: 'OEM transport cover', reference: 150 },
  'systeme-audio-marin': { labelFr: 'Système audio marin intégré', labelEn: 'Integrated marine audio', reference: 500 },
  'echelle': { labelFr: 'Échelle d’embarquement', labelEn: 'Boarding ladder', reference: 200 },
  'support-wake': { labelFr: 'Support pour planche', labelEn: 'Wakeboard rack', reference: 250 },
  'gps-sondeur': { labelFr: 'GPS / Sondeur / Fishfinder', labelEn: 'GPS / Fishfinder', reference: 600 }
});

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    evaluation_ia: {
      type: 'object',
      properties: {
        verdict_interne: { type: 'string' },
        points_forts: { type: 'array', minItems: 3, maxItems: 5, items: { type: 'string' } },
        points_faibles: { type: 'array', minItems: 3, maxItems: 5, items: { type: 'string' } },
        blue_book: {
          type: 'object',
          properties: { valeur_officielle: { type: 'integer' }, commentaire_ia: { type: 'string' } },
          required: ['valeur_officielle', 'commentaire_ia'],
          additionalProperties: false
        },
        prix_echange_concessionnaire: {
          type: 'object',
          properties: { montant: { type: 'integer' }, argument_de_negociation: { type: 'string' } },
          required: ['montant', 'argument_de_negociation'],
          additionalProperties: false
        },
        prix_marche_particulier: {
          type: 'object',
          properties: { montant: { type: 'integer' }, realite_du_marche: { type: 'string' } },
          required: ['montant', 'realite_du_marche'],
          additionalProperties: false
        },
        comparables_quebec: {
          type: 'array', minItems: 3, maxItems: 3,
          items: {
            type: 'object',
            properties: {
              plateforme: { type: 'string', enum: ['Kijiji', 'LesPAC', 'Facebook Marketplace'] },
              titre_annonce: { type: 'string' },
              prix_affiche: { type: 'integer' }
            },
            required: ['plateforme', 'titre_annonce', 'prix_affiche'],
            additionalProperties: false
          }
        }
      },
      required: ['verdict_interne', 'points_forts', 'points_faibles', 'blue_book', 'prix_echange_concessionnaire', 'prix_marche_particulier', 'comparables_quebec'],
      additionalProperties: false
    }
  },
  required: ['evaluation_ia'],
  additionalProperties: false
};

function normalizeBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (_) { return {}; } }
  return req.body;
}
function roundTo50(value) { return Math.round(Number(value || 0) / 50) * 50; }
function conditionCode(value) {
  const v = String(value || '').toLowerCase();
  if (v.includes('excellent')) return 'excellent';
  if (v.includes('passable') || v.includes('fair')) return 'passable';
  return 'moyen';
}
function conditionLabel(value, english) {
  const code = conditionCode(value);
  if (english) return code === 'excellent' ? 'Excellent' : code === 'passable' ? 'Fair' : 'Average';
  return code === 'excellent' ? 'Excellent' : code === 'passable' ? 'Passable' : 'Moyen';
}
function accessoryRetention(age) {
  if (age <= 1) return 0.55;
  if (age === 2) return 0.50;
  if (age <= 4) return 0.42;
  if (age <= 6) return 0.32;
  if (age <= 9) return 0.22;
  return 0.15;
}
function conditionMultiplier(value) {
  const code = conditionCode(value);
  return code === 'excellent' ? 1 : code === 'passable' ? 0.65 : 0.85;
}
function selectedAccessoryData(body) {
  const ids = Array.isArray(body.accessoires) ? body.accessoires : [];
  const uniqueIds = [...new Set(ids.map(String))].filter(id => ACCESSORY_VALUES[id]);
  const items = uniqueIds.map(id => ({ id, ...ACCESSORY_VALUES[id] }));
  return { items, referenceTotal: roundTo50(items.reduce((sum, item) => sum + item.reference, 0)) };
}
function calculateAccessoryContribution(body, baseRetail) {
  const selected = selectedAccessoryData(body);
  const year = Math.max(1980, Number(body.annee) || new Date().getFullYear());
  const age = Math.max(0, new Date().getFullYear() - year);
  const retention = accessoryRetention(age);
  const condition = conditionMultiplier(body.condition);
  const beforeCap = roundTo50(selected.referenceTotal * retention * condition);
  const capByVehicle = Number.isFinite(Number(baseRetail)) && Number(baseRetail) > 0 ? roundTo50(Number(baseRetail) * 0.35) : beforeCap;
  const retailContribution = Math.max(0, Math.min(beforeCap, capByVehicle));
  const tradeContribution = roundTo50(retailContribution * 0.60);
  const referenceContribution = roundTo50(retailContribution * 0.50);
  return {
    ...selected,
    age,
    retention,
    conditionMultiplier: condition,
    beforeCap,
    capByVehicle,
    retailContribution,
    tradeContribution,
    referenceContribution,
    capApplied: beforeCap > capByVehicle
  };
}
function saleStrategy(retailValue, condition) {
  const average = roundTo50(retailValue);
  const code = conditionCode(condition);
  const maxFactor = code === 'excellent' ? 1.12 : code === 'passable' ? 1.05 : 1.08;
  const quickFactor = code === 'excellent' ? 0.92 : code === 'passable' ? 0.88 : 0.90;
  return {
    maximum_ask: roundTo50(average * maxFactor),
    average_sale: average,
    quick_sale: roundTo50(average * quickFactor),
    max_factor: maxFactor,
    quick_factor: quickFactor
  };
}
function buildPrompt(body) {
  const english = String(body.langue || '').toLowerCase().startsWith('en');
  const languageInstruction = english ? 'Write every descriptive text field in English.' : 'Rédige tous les champs textuels descriptifs en français canadien.';
  const selected = selectedAccessoryData(body).items.map(item => english ? item.labelEn : item.labelFr);
  const other = String(body.autres_accessoires || '').trim();
  return `${languageInstruction}\n\nYou are a professional recreational-vehicle trade evaluator working for a Quebec sales team.\n\nVehicle: ${body.annee || ''} ${body.marque || ''} ${body.modele || ''}\nMileage / hours: ${body.millage || '0'}\nCondition: ${conditionLabel(body.condition, english)}\nSelected accessories: ${selected.length ? selected.join(', ') : 'None'}\nOther accessories / notes: ${other || 'None'}\n\nIMPORTANT PRICING RULE: estimate the BASE VEHICLE VALUES BEFORE adding selected accessory value. Do not double-count accessories. The server applies a depreciated and capped accessory contribution after your response.\n\nProduce realistic base-vehicle estimates in Canadian dollars (CAD) including:\n- an estimated blue-book-like reference value;\n- a prudent but defendable dealer trade value;\n- a realistic private/retail market value;\n- exactly 3 indicative Quebec comparables, one each from Kijiji, LesPAC and Facebook Marketplace;\n- 3 to 5 strengths and 3 to 5 weaknesses / inspection points for this model and age.\n\nFor weaknesses, never invent a mechanical failure. Use known limitations, age-related inspection points, marketability concerns or ownership considerations. If uncertain, phrase the point as something to verify. Never claim to have browsed or verified live listings. Comparables are indicative market examples only. Be concise, professional and useful for negotiation.`;
}
function extractText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.filter(part => !part?.thought && typeof part?.text === 'string').map(part => part.text).join('').trim();
}
async function callGemini(model, apiKey, prompt) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json', responseJsonSchema: RESPONSE_SCHEMA, maxOutputTokens: 4096, thinkingConfig: { thinkingLevel: 'low' } }
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(data?.error?.message || `Gemini HTTP ${response.status}`); error.status = response.status; throw error; }
  const text = extractText(data);
  if (!text) throw new Error('Gemini returned an empty response.');
  let parsed; try { parsed = JSON.parse(text); } catch (error) { throw new Error(`Invalid Gemini JSON response: ${error.message}`); }
  if (!parsed?.evaluation_ia) throw new Error('Incomplete Gemini JSON structure.');
  return parsed;
}
function applyAccessoryContribution(parsed, body) {
  const evaluation = parsed?.evaluation_ia;
  if (!evaluation) return { parsed, accessory: null, strategy: null };
  const baseRetail = Number(evaluation.prix_marche_particulier?.montant) || 0;
  const accessory = calculateAccessoryContribution(body, baseRetail);
  evaluation.blue_book.valeur_officielle = roundTo50(Number(evaluation.blue_book.valeur_officielle) + accessory.referenceContribution);
  evaluation.prix_echange_concessionnaire.montant = roundTo50(Number(evaluation.prix_echange_concessionnaire.montant) + accessory.tradeContribution);
  evaluation.prix_marche_particulier.montant = roundTo50(baseRetail + accessory.retailContribution);
  const strategy = saleStrategy(evaluation.prix_marche_particulier.montant, body.condition);
  return { parsed, accessory, strategy };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed.' }); }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { console.error('GEMINI_API_KEY missing in Vercel.'); return res.status(500).json({ error: 'AI configuration missing.' }); }

  const body = normalizeBody(req);
  const english = String(body.langue || '').toLowerCase().startsWith('en');
  if (!body.modele || !body.annee || !body.marque) return res.status(400).json({ error: english ? 'Make, model and year are required.' : 'Marque, modèle et année sont requis.' });

  const prompt = buildPrompt(body);
  const errors = [];
  for (const model of MODELS) {
    try {
      const raw = await callGemini(model, apiKey, prompt);
      const { parsed, accessory, strategy } = applyAccessoryContribution(raw, body);
      return res.status(200).json({
        ...parsed,
        meta: {
          model,
          generated_at: new Date().toISOString(),
          version: '3.2.0',
          language: english ? 'en' : 'fr',
          market_search_query: `${body.annee} ${body.marque} ${body.modele}`.trim(),
          accessory_adjustment: {
            reference_total: accessory.referenceTotal,
            vehicle_age: accessory.age,
            retention_rate: accessory.retention,
            condition_multiplier: accessory.conditionMultiplier,
            contribution_before_cap: accessory.beforeCap,
            cap_by_vehicle: accessory.capByVehicle,
            cap_applied: accessory.capApplied,
            retail: accessory.retailContribution,
            trade: accessory.tradeContribution,
            reference: accessory.referenceContribution,
            selected: accessory.items.map(item => ({ id: item.id, label: english ? item.labelEn : item.labelFr, reference: item.reference }))
          },
          sale_strategy: strategy
        }
      });
    } catch (error) {
      errors.push({ model, status: error?.status || null, message: error?.message || String(error) });
      console.error(`Gemini model failure (${model}):`, error);
    }
  }

  console.error('Gemini evaluation failed for all models:', errors);
  return res.status(502).json({ error: english ? 'Unable to produce the evaluation right now. Please try again in a few seconds.' : "Impossible de produire l'évaluation pour le moment. Réessaie dans quelques secondes." });
};
