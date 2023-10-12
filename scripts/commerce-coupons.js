function getCookies() {
  return document.cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((p, v) => {
      p[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
      return p;
    }, {});
}

const COUPON_CODE_QUERY_PARAM = 'y1';
const MARKETING_CHANNEL_QUERY_PARAM = 'd1';
const MARKETING_COOKIE_MAX_EXPIRY = 2147483647;
const MARKETING_COOKIE_MIN_VALUE_LENGTH = 3;
export const COUPON_CODE_COOKIE_NAME = 'url-coupon-code';
export const MARKETING_CHANNEL_COOKIE_NAME = 'marketing-channel';

function getQueryParam(paramName) {
  const params = (new URL(document.location)).searchParams;
  return params.get(paramName);
}

export function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; Expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function getCookie(cookieName) {
  const cookie = getCookies()[cookieName];
  if (!cookie || cookie.length < MARKETING_COOKIE_MIN_VALUE_LENGTH) return null;
  return cookie;
}

export function applyCookie(cookieName, value) {
  const expiryString = new Date(MARKETING_COOKIE_MAX_EXPIRY * 1000).toUTCString();
  document.cookie = `${cookieName}=${value}; expires=${expiryString}; path=/`;
}

export function processCommerceCookies() {
  const d1 = getQueryParam(MARKETING_CHANNEL_QUERY_PARAM);
  const y1 = getQueryParam(COUPON_CODE_QUERY_PARAM);

  if (d1 !== null || y1 !== null) {
    const marketingChannel = {};
    if (d1 !== null) {
      marketingChannel.d1 = d1;
    }
    if (y1 !== null) {
      marketingChannel.y1 = y1;
    }

    const marketingChannelString = JSON.stringify(marketingChannel);
    const marketingChannelCookie = getCookie(MARKETING_CHANNEL_COOKIE_NAME);
    const couponCodeCookie = getCookie(COUPON_CODE_COOKIE_NAME);

    if (couponCodeCookie !== marketingChannel.y1) {
      applyCookie(COUPON_CODE_COOKIE_NAME, marketingChannel.y1);
    }

    if (marketingChannelCookie !== marketingChannelString) {
      applyCookie(MARKETING_CHANNEL_COOKIE_NAME, marketingChannelString);
    }
  }
}
