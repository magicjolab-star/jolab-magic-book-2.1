const APP_URL = 'https://jolab-magic-book-20.vercel.app/';

function config() {
  const url = String(process.env.SUPABASE_URL || '').replace(/\/+$/, '');
  const key = String(process.env.SUPABASE_ANON_KEY || '');
  return { url, key, enabled: Boolean(url && key) };
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function cleanEmail(value) {
  const email = String(value || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return '';
  return email;
}

async function supabaseFetch(path, options = {}, accessToken = '') {
  const c = config();
  if (!c.enabled) throw Object.assign(new Error('Supabase authentication is not configured.'), { status: 503 });
  const headers = {
    apikey: c.key,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  headers.Authorization = `Bearer ${accessToken || c.key}`;
  const response = await fetch(`${c.url}${path}`, { ...options, headers });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text || 'Invalid response' }; }
  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.error || `HTTP ${response.status}`;
    throw Object.assign(new Error(message), { status: response.status, data });
  }
  return data;
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return res.end();
  }

  const action = String(req.query?.action || 'status');
  try {
    if (req.method === 'GET' && action === 'status') {
      return json(res, 200, { enabled: config().enabled, mode: 'email_magic_link' });
    }

    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });

    if (action === 'send-link') {
      const email = cleanEmail(req.body?.email);
      if (!email) return json(res, 400, { error: 'Adresse courriel invalide.' });
      const userType = req.body?.user_type === 'professionnel' ? 'professionnel' : 'particulier';
      const marketingConsent = userType === 'particulier' && req.body?.marketing_consent === true;
      const locale = req.body?.locale === 'en' ? 'en' : 'fr';
      const redirect = `${APP_URL}?auth=callback`;
      await supabaseFetch(`/auth/v1/otp?redirect_to=${encodeURIComponent(redirect)}`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          create_user: true,
          data: {
            user_type: userType,
            marketing_consent: marketingConsent,
            marketing_consent_at: marketingConsent ? new Date().toISOString() : null,
            locale,
            source: 'magic-book'
          }
        })
      });
      return json(res, 200, { ok: true });
    }

    if (action === 'me') {
      const token = String(req.body?.access_token || '');
      if (!token) return json(res, 401, { error: 'Session absente.' });
      const user = await supabaseFetch('/auth/v1/user', { method: 'GET' }, token);
      return json(res, 200, {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          user_metadata: user.user_metadata || {}
        }
      });
    }

    if (action === 'refresh') {
      const refreshToken = String(req.body?.refresh_token || '');
      if (!refreshToken) return json(res, 401, { error: 'Refresh token absent.' });
      const session = await supabaseFetch('/auth/v1/token?grant_type=refresh_token', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken })
      });
      return json(res, 200, { session });
    }

    if (action === 'logout') {
      const token = String(req.body?.access_token || '');
      if (token) {
        try { await supabaseFetch('/auth/v1/logout', { method: 'POST', body: '{}' }, token); } catch {}
      }
      return json(res, 200, { ok: true });
    }

    return json(res, 404, { error: 'Unknown action.' });
  } catch (error) {
    console.error('Magic Book auth error:', error?.message || error);
    return json(res, Number(error?.status) || 500, { error: error?.message || 'Authentication error.' });
  }
};
