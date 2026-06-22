"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const MATERIALS = [
  {
    src: "/images/material.png",
    label: "Vegetabiles Leder",
    text: "Wir arbeiten ausschließlich mit vegetabil gegerbtem Leder aus kleinen europäischen Gerbereien. Das Material reift mit der Zeit — jede Gebrauchsspur wird Teil der Geschichte.",
  },
  {
    src: "/images/detail.png",
    label: "Handstich",
    text: "Jede Naht wird von Hand gesetzt. Der Sattlerstich, den wir verwenden, ist seit Jahrhunderten unverändert — er hält länger als jede Maschine.",
  },
  {
    src: "/images/process.png",
    label: "Beschläge",
    text: "Unsere Messingbeschläge werden in kleinen Chargen gefertigt und patinieren mit der Zeit zu einem warmen, lebendigen Gold.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function MaterialCard({ item, index }: { item: (typeof MATERIALS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: EASE }}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <motion.div
          className="w-full h-full"
          initial={{ scale: prefersReducedMotion ? 1 : 1.04 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.2, delay: index * 0.12, ease: EASE }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.label}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent" />
      </div>

      <div className="mt-5">
        <p className="font-cormorant-sc text-terre text-xs tracking-[0.35em] uppercase mb-2">
          {item.label}
        </p>
        <p className="font-sans text-espresso/80 text-sm leading-relaxed">
          {item.text}
        </p>
      </div>
    </motion.article>
  );
}

export function MaterialSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="material" className="py-28 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="mb-16">
          <motion.p
            className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Material &amp; Fertigung
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-espresso max-w-2xl leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Material first.{" "}
            <span className="italic text-terre">Trend never.</span>
          </motion.h2>
          <motion.p
            className="font-sans text-terre text-sm mt-6 max-w-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Kein Lagerbestand. Kein Kompromiss. Wir wählen jedes Material persönlich aus — für Stücke, die über Generationen begleiten.
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {MATERIALS.map((item, i) => (
            <MaterialCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
