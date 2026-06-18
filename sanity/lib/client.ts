import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, hasSanityConfig } from "../env";

// Client pubblico (sola lettura). Se il progetto non è configurato resta null
// e i loader usano i contenuti statici di fallback.
export const client = hasSanityConfig
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
