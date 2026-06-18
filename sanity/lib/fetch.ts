import { client } from "./client";

// Fetch sicuro: ritorna null se Sanity non è configurato o in caso di errore,
// così le pagine ricadono sui contenuti statici senza rompere la build.
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  // ISR: rivalida i contenuti CMS ogni 60s
  revalidate: number | false = 60
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate }
    } as never);
  } catch (err) {
    console.error("[sanityFetch] error:", err);
    return null;
  }
}
