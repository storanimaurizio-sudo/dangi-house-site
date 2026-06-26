import Image from "next/image";

export function Logo({
  variant = "horizontal",
  className,
  priority = false
}: {
  variant?: "horizontal" | "stacked" | "dark" | "mark";
  className?: string;
  priority?: boolean;
}) {
  const src =
    variant === "stacked"
      ? "/logo/dangihouse-logo.svg"
      : variant === "dark"
      ? "/logo/dangihouse-logo-dark.svg"
      : variant === "mark"
      ? "/logo/dangihouse-mark.svg"
      : "/logo/dangihouse-logo-horizontal.svg";
  const isStack = variant === "stacked" || variant === "dark";
  const w = variant === "mark" ? 48 : isStack ? 240 : 220;
  const h = variant === "mark" ? 48 : isStack ? 150 : 62;
  return (
    <Image
      src={src}
      alt="DangiHouse — San Salvo Marina"
      width={w}
      height={h}
      priority={priority}
      className={className}
    />
  );
}
