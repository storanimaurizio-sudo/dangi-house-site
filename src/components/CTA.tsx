import Link from "next/link";

export function CTA({
  title,
  body,
  href,
  label
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="bg-sea-600">
      <div className="mx-auto max-w-content px-5 py-16 text-center md:py-20">
        <h2 className="font-serif text-3xl text-white md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sand-100/90">{body}</p>
        <Link
          href={href}
          className="mt-8 inline-block rounded-full bg-sand-100 px-8 py-3 text-sm font-medium text-sea-700 transition-colors hover:bg-white"
        >
          {label}
        </Link>
      </div>
    </section>
  );
}
