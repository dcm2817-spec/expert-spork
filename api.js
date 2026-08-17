// God's Platform — Data layer
// All Supabase queries live here. Components call these functions and
// never touch `supabase.from()` directly — keeps query logic in one
// place and makes the backend swappable later without touching UI code.

import { supabase } from './config.js';
import { setState } from './store.js';

/* ---------- Auth ---------- */

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  setState({ user: data.user, session: data.session });
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  setState({ user: null, profile: null, session: null });
}

/** Call once on app load to restore session + populate store. */
export async function restoreSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  setState({ user: session.user, session });
  const profile = await getProfile(session.user.id);
  setState({ profile });
  return session;
}

/* ---------- Profiles ---------- */

export async function getProfile(profileId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, profile_tags(tags(*))')
    .eq('id', profileId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(profileId, patch) {
  const { data, error } = await supabase
    .from('profiles')
    .update(patch)
    .eq('id', profileId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ---------- Tags ---------- */

export async function getTags() {
  const { data, error } = await supabase.from('tags').select('*').order('category');
  if (error) throw error;
  return data;
}
