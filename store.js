// God's Platform — Global state
// A minimal pub-sub singleton. No framework, no build step.
// Components subscribe in connectedCallback(), unsubscribe in disconnectedCallback().

const state = {
  user: null,      // Supabase auth user object, or null
  profile: null,   // full profile row for the logged-in user
  session: null,   // Supabase session
};

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach((fn) => fn(state));
}

/**
 * Subscribe to state changes.
 * @param {(state: object) => void} fn
 * @returns {() => void} unsubscribe function
 */
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Convenience: is someone currently logged in? */
export function isAuthenticated() {
  return !!state.user;
}
