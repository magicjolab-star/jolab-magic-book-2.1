const evaluate = require('./evaluate');

module.exports = async function selftest(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const mockReq = {
    method: 'POST',
    body: {
      marque: 'Yamaha',
      modele: 'Grizzly',
      annee: '2017',
      millage: '1800',
      accessoires: 'Treuil',
      condition: 'Excellent'
    }
  };

  const mockRes = {
    code: 200,
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.code = code; return this; },
    json(payload) {
      return res.status(this.code || 200).json({ selftest: true, ...payload });
    }
  };

  return evaluate(mockReq, mockRes);
};
