import { ReactNode } from "react";

export function Section({
  title,
  intro,
  children,
  muted = false
}: {
  title?: string;
  intro?: string;
  children?: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-sand-50" : ""}>
      <div className="mx-auto max-w-content px-5 py-16 md:py-20">
        {title && <h2 className="font-serif text-3xl text-sea-700 md:text-4xl">{title}</h2>}
        {intro && <p className="mt-4 max-w-2xl text-lg text-sea-600/80">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
