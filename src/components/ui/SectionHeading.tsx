import { Badge } from "@/components/ui/badge";

/** Shared static section header: eyebrow chip + title + underline + subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <div>
        <Badge className="border-neon-violet/30 text-neon-cyan">{eyebrow}</Badge>
      </div>

      <h2 className="mt-5 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>

      <div className="mx-auto mt-4 h-[2px] w-24 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink origin-center" />

      {subtitle && (
        <p className="mt-4 text-pretty text-base text-white/75">
          {subtitle}
        </p>
      )}
    </div>
  );
}
