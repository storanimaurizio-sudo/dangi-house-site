import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { projectId, dataset, hasSanityConfig } from "../env";

const builder = hasSanityConfig
  ? imageUrlBuilder({ projectId, dataset } as never)
  : null;

export function urlForImage(source: SanityImageSource): string | null {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").width(900).url();
}
