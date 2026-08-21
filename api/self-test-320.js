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
      millage: '3200',
      condition: 'excellent',
      accessoires: ['chenilles','cabine-complete','cabine-chauffee','souffleuse','pneus-mags','suspension-elka-fox','treuil'],
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
  const a = payload?.meta?.accessory_adjustment;
  const s = payload?.meta?.sale_strategy;
  const e = payload?.evaluation_ia;
  const platforms = new Set((e?.comparables_quebec || []).map(x => x.plateforme));
  const passed = mockRes.statusCode === 200 &&
    payload?.meta?.version === '3.2.0' &&
    a?.reference_total === 10000 &&
    a?.retention_rate === 0.32 &&
    a?.retail < a?.reference_total &&
    s?.maximum_ask > s?.average_sale && s?.average_sale > s?.quick_sale &&
    Array.isArray(e?.points_forts) && e.points_forts.length >= 3 &&
    Array.isArray(e?.points_faibles) && e.points_faibles.length >= 3 &&
    platforms.has('Kijiji') && platforms.has('LesPAC') && platforms.has('Facebook Marketplace');

  return res.status(passed ? 200 : 500).json({
    ok: passed,
    evaluate_status: mockRes.statusCode,
    version: payload?.meta?.version || null,
    model: payload?.meta?.model || null,
    accessory_adjustment: a || null,
    sale_strategy: s || null,
    strengths: e?.points_forts?.length || 0,
    weaknesses: e?.points_faibles?.length || 0,
    platforms: [...platforms],
    values: e ? {
      reference: e.blue_book?.valeur_officielle,
      trade: e.prix_echange_concessionnaire?.montant,
      retail: e.prix_marche_particulier?.montant
    } : null,
    error: payload?.error || null
  });
};
