"use client";
import { useState } from "react";
import Image from "next/image";

type Cat = { label: string; key: string };
type Img = { url: string; alt: string; caption?: string; category: string };

// Galleria con filtri per categoria.
// Se arrivano immagini dal CMS (Sanity) le mostra; altrimenti placeholder.
export function Gallery({ categories, images = [] }: { categories: Cat[]; images?: Img[] }) {
  const [active, setActive] = useState<string>("all");
  const hasImages = images.length > 0;

  const placeholders = Array.from({ length: 8 }).map((_, i) => ({
    category: categories[i % categories.length]?.key ?? "interni"
  }));

  const sourceCats = hasImages ? images.map((i) => i.category) : placeholders.map((p) => p.category);
  const visibleImages = active === "all" ? images : images.filter((i) => i.category === active);
  const visiblePlaceholders = active === "all" ? placeholders : placeholders.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-1.5 text-sm ${active === "all" ? "bg-sea-600 text-white" : "bg-sand-100 text-sea-600"}`}
        >
          Tutte / All
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={`rounded-full px-4 py-1.5 text-sm ${active === c.key ? "bg-sea-600 text-white" : "bg-sand-100 text-sea-600"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {hasImages
          ? visibleImages.map((img, i) => (
              <figure key={i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-sand-200">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {img.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sea-700/70 to-transparent p-3 text-xs text-white">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))
          : visiblePlaceholders.map((p, i) => (
              <div key={i} className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-sand-200 to-sea-400/30">
                <div className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-sea-600/50">
                  {p.category}
                </div>
              </div>
            ))}
      </div>
      {!hasImages && (
        <p className="mt-6 text-center text-sm text-sea-600/60">
          {sourceCats.length ? "" : ""}Carica le foto nello Studio CMS (/studio) per popolare la galleria.
        </p>
      )}
    </div>
  );
}
