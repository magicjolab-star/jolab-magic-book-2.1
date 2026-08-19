const visual512 =
  require('../visual-data/visual512-1') +
  require('../visual-data/visual512-2') +
  require('../visual-data/visual512-3') +
  require('../visual-data/visual512-4') +
  require('../visual-data/visual512-5');

const visual192 =
  require('../visual-data/visual192-1') +
  require('../visual-data/visual192-2');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    return res.end('GET only');
  }

  const size = String((req.query && req.query.size) || '512') === '192' ? '192' : '512';
  const base64 = size === '192' ? visual192 : visual512;
  const body = Buffer.from(base64, 'base64');

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/webp');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Content-Length', String(body.length));
  return res.end(body);
};
