"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import ConversionForm from "@/components/ConversionForm";
import { track } from "@/lib/funnel";

const FIELDS = [
  { name: "name", label: "Dein Name", required: true },
  { name: "email", label: "E-Mail", type: "email", required: true },
  { name: "vision", label: "Deine Vision für die Tasche", type: "textarea" },
  { name: "material", label: "Bevorzugtes Material (optional)" },
];

export function KontaktSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const handleCtaClick = () => {
    track("intent");
  };

  return (
    <section ref={ref} id="kontakt" className="py-28 px-6 md:px-12 bg-linen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: intro */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-6">
              Bestellung &amp; Kontakt
            </p>
            <h2
              className="font-cormorant font-light text-espresso leading-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 4vw, 4.5rem)" }}
            >
              „Schreib mir —<br />
              <em>wir entwerfen<br />gemeinsam."</em>
            </h2>
            <p className="font-sans text-terre text-sm leading-relaxed max-w-sm">
              Jede Tasche beginnt mit einem Gespräch. Teile mir deine Vorstellung mit — ich melde mich innerhalb von 48 Stunden.
            </p>

            <div className="mt-12 space-y-4">
              {[
                { k: "Standort", v: "Berlin, Deutschland" },
                { k: "Lieferzeit", v: "8 – 12 Wochen" },
                { k: "Versand", v: "Weltweit" },
              ].map(({ k, v }) => (
                <div key={k} className="flex gap-6 text-sm">
                  <span className="font-cormorant-sc text-terre text-xs tracking-widest uppercase w-24 shrink-0 mt-0.5">
                    {k}
                  </span>
                  <span className="font-sans text-espresso/70">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleCtaClick}
          >
            <ConversionForm
              startStep="intent"
              submitStep="convert"
              cta="Schreib mir."
              fields={FIELDS}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
