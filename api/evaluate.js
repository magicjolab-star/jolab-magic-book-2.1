const MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash-lite'];

const ACCESSORY_VALUES = Object.freeze({
  'chenilles': { labelFr: 'Système de chenilles', labelEn: 'Track system', retail: 3000 },
  'cabine-complete': { labelFr: 'Cabine fermée complète', labelEn: 'Full enclosed cab', retail: 2500 },
  'cabine-chauffee': { labelFr: 'Système de chauffage', labelEn: 'Heater system', retail: 1000 },
  'suspension-elka-fox': { labelFr: 'Suspension améliorée', labelEn: 'Upgraded suspension', retail: 800 },
  'moteur-refait': { labelFr: 'Moteur refait à neuf / Big Bore', labelEn: 'Rebuilt engine / Big Bore', retail: 1000 },
  'direction-assistee': { labelFr: 'Direction assistée EPS ajoutée', labelEn: 'Added EPS power steering', retail: 750 },
  'treuil': { labelFr: 'Treuil', labelEn: 'Winch', retail: 300 },
  'gratte': { labelFr: 'Gratte à neige', labelEn: 'Snow plow', retail: 600 },
  'souffleuse': { labelFr: 'Souffleuse à neige', labelEn: 'Snow blower', retail: 1600 },
  'pare-brise-complet': { labelFr: 'Pare-brise complet', labelEn: 'Full windshield', retail: 350 },
  'demi-pare-brise': { labelFr: 'Demi pare-brise', labelEn: 'Half windshield', retail: 150 },
  'toit': { labelFr: 'Toit', labelEn: 'Roof', retail: 250 },
  'portieres': { labelFr: 'Portières', labelEn: 'Doors', retail: 800 },
  'bumper-avant': { labelFr: 'Pare-chocs avant', labelEn: 'Front bumper', retail: 250 },
  'bumper-arriere': { labelFr: 'Pare-chocs arrière', labelEn: 'Rear bumper', retail: 250 },
  'skid-plate': { labelFr: 'Plaque de protection complète', labelEn: 'Full skid plate', retail: 400 },
  'protecteur-bras': { labelFr: 'Protecteurs de bras triangulaires', labelEn: 'A-arm guards', retail: 300 },
  'rock-sliders': { labelFr: 'Protecteurs latéraux', labelEn: 'Rock sliders', retail: 250 },
  'coffre-arriere': { labelFr: 'Coffre arrière / Siège passager', labelEn: 'Rear cargo box / Passenger seat', retail: 150 },
  'coffre-avant': { labelFr: 'Coffre avant', labelEn: 'Front cargo box', retail: 100 },
  'support-fusil': { labelFr: 'Support à fusil / Outils', labelEn: 'Gun / Tool rack', retail: 100 },
  'pneus-mags': { labelFr: 'Pneus surdimensionnés et mags', labelEn: 'Oversized tires and wheels', retail: 800 },
  'barre-led': { labelFr: 'Barre d’éclairage LED', labelEn: 'LED light bar', retail: 150 },
  'systeme-son': { labelFr: 'Système de son / Radio', labelEn: 'Audio / Radio system', retail: 300 },
  'poignees-chauffantes': { labelFr: 'Poignées et pouce chauffants', labelEn: 'Heated grips and thumb', retail: 200 },
  'elargisseurs': { labelFr: 'Élargisseurs de voies', labelEn: 'Wheel spacers', retail: 100 },
  'ligne-echappement': { labelFr: 'Ligne d’échappement complète', labelEn: 'Full exhaust system', retail: 400 },
  'silencieux': { labelFr: 'Silencieux Slip-on', labelEn: 'Slip-on muffler', retail: 200 },
  'kit-graphique': { labelFr: 'Kit graphique complet', labelEn: 'Full graphics kit', retail: 100 },
  'embrayage-rekluse': { labelFr: 'Embrayage automatique Rekluse', labelEn: 'Rekluse auto clutch', retail: 500 },
  'protege-mains': { labelFr: 'Protège-mains', labelEn: 'Handguards', retail: 100 },
  'guidon-pro': { labelFr: 'Guidon amélioré', labelEn: 'Upgraded handlebar', retail: 120 },
  'housse-siege': { labelFr: 'Housse de siège Gripper', labelEn: 'Gripper seat cover', retail: 80 },
  'valises-moto': { labelFr: 'Valises latérales / Top case', labelEn: 'Panniers / Top case', retail: 500 },
  'crash-bars': { labelFr: 'Barres de protection / Crash bars', labelEn: 'Crash bars', retail: 250 },
  'demarreur-electrique': { labelFr: 'Démarreur électrique ajouté', labelEn: 'Added electric starter', retail: 600 },
  'chenille-crampons': { labelFr: 'Chenille cramponnée', labelEn: 'Studded track', retail: 400 },
  'sac-tunnel': { labelFr: 'Sac de tunnel', labelEn: 'Tunnel bag', retail: 150 },
  'grattoirs-glace': { labelFr: 'Grattoirs à glace', labelEn: 'Ice scratchers', retail: 80 },
  'kit-clutch': { labelFr: 'Kit d’embrayage', labelEn: 'Clutch kit', retail: 250 },
  'housse-transport': { labelFr: 'Housse de transport originale', labelEn: 'OEM transport cover', retail: 150 },
  'systeme-audio-marin': { labelFr: 'Système audio marin intégré', labelEn: 'Integrated marine audio', retail: 500 },
  'echelle': { labelFr: 'Échelle d’embarquement', labelEn: 'Boarding ladder', retail: 200 },
  'support-wake': { labelFr: 'Support pour planche', labelEn: 'Wakeboard rack', retail: 250 },
  'gps-sondeur': { labelFr: 'GPS / Sondeur / Fishfinder', labelEn: 'GPS / Fishfinder', retail: 600 }
});

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    evaluation_ia: {
      type: 'object',
      properties: {
        verdict_interne: { type: 'string' },
        blue_book: { type: 'object', properties: { valeur_officielle: { type: 'integer' }, commentaire_ia: { type: 'string' } }, required: ['valeur_officielle', 'commentaire_ia'], additionalProperties: false },
        prix_echange_concessionnaire: { type: 'object', properties: { montant: { type: 'integer' }, argument_de_negociation: { type: 'string' } }, required: ['montant', 'argument_de_negociation'], additionalProperties: false },
        prix_marche_particulier: { type: 'object', properties: { montant: { type: 'integer' }, realite_du_marche: { type: 'string' } }, required: ['montant', 'realite_du_marche'], additionalProperties: false },
        comparables_quebec: { type: 'array', minItems: 3, maxItems: 3, items: { type: 'object', properties: { plateforme: { type: 'string' }, titre_annonce: { type: 'string' }, prix_affiche: { type: 'integer' } }, required: ['plateforme', 'titre_annonce', 'prix_affiche'], additionalProperties: false } }
      },
      required: ['verdict_interne', 'blue_book', 'prix_echange_concessionnaire', 'prix_marche_particulier', 'comparables_quebec'],
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
function calculateAccessoryAdjustment(body) {
  const ids = Array.isArray(body.accessoires) ? body.accessoires : [];
  const uniqueIds = [...new Set(ids.map(String))].filter(id => ACCESSORY_VALUES[id]);
  const items = uniqueIds.map(id => ({ id, ...ACCESSORY_VALUES[id] }));
  const retail = roundTo50(items.reduce((sum, item) => sum + item.retail, 0));
  const trade = roundTo50(retail * 0.7);
  return { items, retail, trade };
}
function buildPrompt(body, accessoryAdjustment) {
  const english = String(body.langue || '').toLowerCase().startsWith('en');
  const languageInstruction = english ? 'Write every descriptive text field in English.' : 'Rédige tous les champs textuels descriptifs en français canadien.';
  const selectedLabels = accessoryAdjustment.items.map(item => english ? item.labelEn : item.labelFr);
  const other = String(body.autres_accessoires || '').trim();
  return `${languageInstruction}\n\nYou are a professional recreational-vehicle trade evaluator working for a Quebec sales team.\n\nVehicle: ${body.annee || ''} ${body.marque || ''} ${body.modele || ''}\nMileage / hours: ${body.millage || '0'}\nCondition: ${body.condition || 'Moyen'}\nSelected accessories: ${selectedLabels.length ? selectedLabels.join(', ') : 'None'}\nOther accessories / notes: ${other || 'None'}\n\nIMPORTANT PRICING RULE: estimate the BASE VEHICLE VALUES BEFORE adding the fixed accessory adjustments. Do not double-count the selected accessories. The server will apply a deterministic accessory adjustment after your response.\n\nProduce realistic estimates in Canadian dollars (CAD) including:\n- an estimated blue-book-like reference value for the base vehicle;\n- a prudent but defendable dealer trade value for the base vehicle;\n- a realistic private/retail market value for the base vehicle;\n- exactly 3 indicative Quebec comparables.\n\nNever claim to have browsed or verified live listings. Comparables are indicative market examples. Be concise, professional, useful for negotiation, and avoid misleading claims.`;
}
function extractText(data) { const parts = data?.candidates?.[0]?.content?.parts || []; return parts.filter(part => !part?.thought && typeof part?.text === 'string').map(part => part.text).join('').trim(); }
async function callGemini(model, apiKey, prompt) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, signal: AbortSignal.timeout(30000), body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', responseJsonSchema: RESPONSE_SCHEMA, maxOutputTokens: 4096, thinkingConfig: { thinkingLevel: 'low' } } }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) { const error = new Error(data?.error?.message || `Gemini HTTP ${response.status}`); error.status = response.status; throw error; }
  const text = extractText(data); if (!text) throw new Error('Gemini returned an empty response.');
  let parsed; try { parsed = JSON.parse(text); } catch (error) { throw new Error(`Invalid Gemini JSON response: ${error.message}`); }
  if (!parsed?.evaluation_ia) throw new Error('Incomplete Gemini JSON structure.');
  return parsed;
}
function applyAccessoryAdjustment(parsed, adjustment) {
  const evaluation = parsed?.evaluation_ia; if (!evaluation) return parsed;
  evaluation.blue_book.valeur_officielle = roundTo50(Number(evaluation.blue_book.valeur_officielle) + adjustment.retail);
  evaluation.prix_echange_concessionnaire.montant = roundTo50(Number(evaluation.prix_echange_concessionnaire.montant) + adjustment.trade);
  evaluation.prix_marche_particulier.montant = roundTo50(Number(evaluation.prix_marche_particulier.montant) + adjustment.retail);
  return parsed;
}
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store'); res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed.' }); }
  const apiKey = process.env.GEMINI_API_KEY; if (!apiKey) { console.error('GEMINI_API_KEY missing in Vercel.'); return res.status(500).json({ error: 'AI configuration missing.' }); }
  const body = normalizeBody(req); const english = String(body.langue || '').toLowerCase().startsWith('en');
  if (!body.modele || !body.annee || !body.marque) return res.status(400).json({ error: english ? 'Make, model and year are required.' : 'Marque, modèle et année sont requis.' });
  const accessoryAdjustment = calculateAccessoryAdjustment(body); const prompt = buildPrompt(body, accessoryAdjustment); const errors = [];
  for (const model of MODELS) {
    try {
      const parsed = applyAccessoryAdjustment(await callGemini(model, apiKey, prompt), accessoryAdjustment);
      return res.status(200).json({ ...parsed, meta: { model, generated_at: new Date().toISOString(), version: '3.1.0', language: english ? 'en' : 'fr', accessory_adjustment: { retail: accessoryAdjustment.retail, trade: accessoryAdjustment.trade, selected: accessoryAdjustment.items.map(item => ({ id: item.id, label: english ? item.labelEn : item.labelFr, retail: item.retail })) } } });
    } catch (error) { errors.push({ model, status: error?.status || null, message: error?.message || String(error) }); console.error(`Gemini model failure (${model}):`, error); }
  }
  console.error('Gemini evaluation failed for all models:', errors);
  return res.status(502).json({ error: english ? 'Unable to produce the evaluation right now. Please try again in a few seconds.' : "Impossible de produire l'évaluation pour le moment. Réessaie dans quelques secondes." });
};
