const ACCESS_TOKEN_COOKIE_NAME = 'sira_access_token';

function readJwtExpUnix(token: string): number | null {
  try {
    const parts = token.split('.');
    const payloadSegment = parts[1];
    if (!payloadSegment) {
      return null;
    }
    const base64 = payloadSegment.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
    const json = atob(base64 + padding);
    const payload = JSON.parse(json) as { exp?: number };
    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
}

export function getAccessTokenCookie(): string | null {
  const prefix = `${ACCESS_TOKEN_COOKIE_NAME}=`;
  const row = document.cookie.split('; ').find(entry => entry.startsWith(prefix));
  if (!row) {
    return null;
  }
  const raw = row.slice(prefix.length);
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
}

export function setAccessTokenCookie(token: string): void {
  const expUnix = readJwtExpUnix(token);
  const nowSec = Math.floor(Date.now() / 1000);
  const maxAge =
    expUnix != null ? Math.max(60, expUnix - nowSec) : 8 * 60 * 60;
  const secure = import.meta.env.PROD ? '; Secure' : '';
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function clearAccessTokenCookie(): void {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}
