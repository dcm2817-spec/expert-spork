// God's Platform — Phase 0 sanity check component
// Proves: (1) Web Component pattern works, (2) store.js pub-sub works
// across multiple instances, (3) api.js can reach Supabase.
// Delete this file once Phase 1 components exist — it's scaffolding, not product UI.

import { getState, setState, subscribe } from '../store.js';
import { getTags } from '../api.js';

class StatusCheck extends HTMLElement {
  connectedCallback() {
    this.unsubscribe = subscribe((state) => this.render(state));
    this.render(getState());
    this.checkConnection();
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  async checkConnection() {
    try {
      const tags = await getTags();
      this.connectionStatus = `Connected — ${tags.length} tag(s) found in database.`;
    } catch (err) {
      this.connectionStatus = `Not connected yet: ${err.message}. Replace the anon key in config.js and run the schema migration.`;
    }
    this.render(getState());
  }

  handlePing() {
    setState({ user: getState().user ? null : { id: 'test-user', email: 'test@example.com' } });
  }

  render(state) {
    this.innerHTML = `
      <div class="card" style="max-width: 480px; font-family: var(--font-body);">
        <h3>Phase 0 — Foundation Check</h3>
        <p><strong>Store state (user):</strong> ${state.user ? state.user.email : 'null'}</p>
        <p><strong>Supabase:</strong> ${this.connectionStatus || 'checking…'}</p>
        <button class="btn btn-accent" id="ping">Toggle test user in store</button>
      </div>
    `;
    this.querySelector('#ping').addEventListener('click', () => this.handlePing());
  }
}

customElements.define('status-check', StatusCheck);
