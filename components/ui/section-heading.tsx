import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--color-orange)", fontFamily: "var(--font-sans)" }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-ink)",
        }}
      >
        {title}
      </h2>
      {lede && (
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed"
          style={{
            color: "var(--color-ink-soft)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
