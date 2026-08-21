const evaluate = require('./evaluate');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'GET only' });

  let payload = null;
  const mockReq = {
    method: 'POST',
    body: {
      marque: 'Yamaha',
      modele: 'Grizzly',
      annee: '2017',
      millage: '1800',
      condition: 'Excellent',
      accessoires: ['cabine-chauffee', 'coffre-arriere'],
      autres_accessoires: '',
      langue: 'fr'
    }
  };
  const mockRes = {
    statusCode: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { payload = value; return value; }
  };

  await evaluate(mockReq, mockRes);
  const adjustment = payload?.meta?.accessory_adjustment;
  const passed = mockRes.statusCode === 200 && payload?.evaluation_ia && adjustment?.retail === 1150 && adjustment?.trade === 800 && adjustment?.selected?.length === 2;

  return res.status(passed ? 200 : 500).json({
    ok: passed,
    evaluate_status: mockRes.statusCode,
    version: payload?.meta?.version || null,
    model: payload?.meta?.model || null,
    language: payload?.meta?.language || null,
    accessory_adjustment: adjustment || null,
    values: payload?.evaluation_ia ? {
      reference: payload.evaluation_ia.blue_book?.valeur_officielle,
      trade: payload.evaluation_ia.prix_echange_concessionnaire?.montant,
      retail: payload.evaluation_ia.prix_marche_particulier?.montant,
      comparables: payload.evaluation_ia.comparables_quebec?.length || 0
    } : null,
    error: payload?.error || null
  });
};
