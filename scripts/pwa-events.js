export const PWA_EVENT_USER_SIGNED_IN = 'user-logged-in';
export const PWA_EVENT_USER_SIGNED_OUT = 'user-logged-out';

const PWA_EVENT_LISTENERS = {};

/**
 *
 * @param {string} id The event ID/Type (exported as const with prefix PWA_EVENT_)
 * @param {Function} callbackFn the callback to be executed upon message reception.
 * Message is passed to the callback as the only argument
 */
export function registerPWAEvent(id, callbackFn) {
  // TODO: support multiple eventListeners
  PWA_EVENT_LISTENERS[id] = function (ev) {
    callbackFn(ev.detail);
  };
  window.addEventListener(`pwa-${id}`, PWA_EVENT_LISTENERS[id]);
}

/**
 *
 * @param {string} id The event ID/Type (exported as const with prefix PWA_EVENT_)
 * @param {Object} payload the custom payload to be displatched
 */
export function dispatchPWAEvent(id, payload) {
  const event = new CustomEvent(`pwa-${id}`, { bubbles: true, detail: { ...payload } });
  window.dispatchEvent(event);
}

/**
 *
 * @param {string} id The event ID/Type (exported as const with prefix PWA_EVENT_)
 */
export function deregisterPWAEvent(id) {
  window.removeEventListener(`pwa-${id}`, PWA_EVENT_LISTENERS[id]);
}
