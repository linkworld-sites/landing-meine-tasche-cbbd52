"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function UnikateBanner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} id="einzelstuecke" className="bg-tobacco py-28 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          {/* Main text */}
          <div className="max-w-2xl">
            <motion.p
              className="font-cormorant-sc text-sand text-xs tracking-[0.4em] uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              Einzelstücke / Unikate
            </motion.p>

            <motion.blockquote
              className="font-cormorant font-light text-cream italic leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              „Jede Tasche existiert einmal."
            </motion.blockquote>

            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              <p className="font-sans text-linen/70 text-sm">
                Kein Lagerbestand. Kein Kompromiss. Jedes Stück wird einmalig gefertigt — für dich.
              </p>
            </motion.div>
          </div>

          {/* Side info */}
          <motion.div
            className="flex flex-col gap-6 text-sm"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { label: "Lieferzeit", value: "8 – 12 Wochen" },
              { label: "Fertigung", value: "Berlin, von Hand" },
              { label: "Verfügbarkeit", value: "Auf Anfrage" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-sand/40 pl-4">
                <p className="font-cormorant-sc text-sand text-xs tracking-[0.3em] uppercase">
                  {item.label}
                </p>
                <p className="font-cormorant text-cream text-2xl font-light mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="#kontakt"
                className="inline-flex items-center gap-3 font-sans text-sm text-sand hover:text-cream transition-colors mt-2"
              >
                Anfrage stellen
                <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decoration line */}
        <motion.div
          className="mt-20 h-px bg-gradient-to-r from-sand/40 via-sand/10 to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </section>
  );
}
