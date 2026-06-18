export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// true solo quando il progetto Sanity è configurato via env.
export const hasSanityConfig = projectId.length > 0;
