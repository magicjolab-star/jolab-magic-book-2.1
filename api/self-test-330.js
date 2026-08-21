const evaluate = require('./evaluate');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'GET only' });

  let payload = null;
  const mockReq = {
    method: 'POST',
    body: {
      marque: 'Yamaha',
      modele: 'Grizzly 700',
      annee: '2021',
      millage: '450 heures',
      millage_valeur: '450',
      millage_unite: 'h',
      usage_unit: 'h',
      condition: 'moyen',
      accessoires: ['treuil', 'cabine-chauffee', 'pneus-mags'],
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
  const e = payload?.evaluation_ia;
  const s = payload?.meta?.sale_strategy;
  const a = payload?.meta?.accessory_adjustment;
  const passed = mockRes.statusCode === 200 && !!e &&
    Number(e.prix_marche_particulier?.montant) > 0 &&
    Number(e.prix_echange_concessionnaire?.montant) > 0 &&
    Array.isArray(e.points_forts) && e.points_forts.length >= 3 &&
    Array.isArray(e.points_faibles) && e.points_faibles.length >= 3 &&
    s?.maximum_ask > s?.average_sale && s?.average_sale > s?.quick_sale &&
    a?.reference_total > 0;

  return res.status(passed ? 200 : 500).json({
    ok: passed,
    evaluate_status: mockRes.statusCode,
    model: payload?.meta?.model || null,
    usage_tested: '450 heures',
    values: e ? {
      trade: e.prix_echange_concessionnaire?.montant,
      retail: e.prix_marche_particulier?.montant
    } : null,
    strategy: s || null,
    accessory_adjustment: a || null,
    error: payload?.error || null
  });
};
