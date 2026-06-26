"use client";
import { useState } from "react";
import Image from "next/image";

type Group = { slug: string; label: string; images: string[] };

// Galleria divisa per appartamento. Le immagini sono servite da /public.
export function Gallery({ groups, allLabel = "Tutte" }: { groups: Group[]; allLabel?: string }) {
  const [active, setActive] = useState<string>("all");
  const visible = active === "all" ? groups : groups.filter((g) => g.slug === active);
  const total = groups.reduce((n, g) => n + g.images.length, 0);

  if (total === 0) {
    return (
      <p className="text-sm text-sea-600/60">
        Le foto verranno pubblicate a breve.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-1.5 text-sm ${active === "all" ? "bg-sea-600 text-white" : "bg-sand-100 text-sea-600"}`}
        >
          {allLabel}
        </button>
        {groups.map((g) => (
          <button
            key={g.slug}
            onClick={() => setActive(g.slug)}
            className={`rounded-full px-4 py-1.5 text-sm ${active === g.slug ? "bg-sea-600 text-white" : "bg-sand-100 text-sea-600"}`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {visible.map((g) => (
          <section key={g.slug}>
            <h3 className="mb-5 font-serif text-2xl text-sea-700">{g.label}</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {g.images.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-200">
                  <Image
                    src={src}
                    alt={`${g.label} — foto ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
