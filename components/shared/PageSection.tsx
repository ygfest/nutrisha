import { ReactNode } from "react";

interface PageSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function PageSection({ title, description, children }: PageSectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-sage-100/80 bg-white/70 p-8 shadow-xl shadow-sage-500/5 backdrop-blur-lg sm:p-12">
        <div className="mb-8">
          <h2 className="text-2xl font-light tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-base font-light leading-relaxed text-slate-600 sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="space-y-6 text-sm leading-relaxed text-slate-600 sm:text-base">
          {children}
        </div>
      </div>
    </section>
  );
}
