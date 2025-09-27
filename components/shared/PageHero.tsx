import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
}

export function PageHero({ title, description, eyebrow, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-sage-100/60">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-sage-100" />
      <div className="absolute top-16 right-12 h-72 w-72 rounded-full bg-sage-200/30 blur-3xl" />
      <div className="absolute bottom-16 left-12 h-80 w-80 rounded-full bg-sage-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="max-w-3xl">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-sage-200 bg-white/60 px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sage-700 backdrop-blur-md">
              {eyebrow}
            </span>
          ) : null}

          <h1 className="mt-6 text-4xl font-light tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg font-light leading-relaxed text-slate-600 sm:text-xl">
            {description}
          </p>

          {children ? <div className="mt-10 flex flex-wrap gap-4">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
