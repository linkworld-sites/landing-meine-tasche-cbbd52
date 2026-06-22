"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ITEMS = [
  {
    src: "/images/hero.png",
    name: "Die Klassikerin",
    material: "Vegetabiles Leder",
    edition: "Kollektion I",
    colClass: "row-span-2",
    aspectClass: "h-full",
    minH: "min-h-[420px]",
  },
  {
    src: "/images/material.png",
    name: "Die Wanderin",
    material: "Naturleder",
    edition: "Kollektion I",
    colClass: "",
    aspectClass: "aspect-[4/3]",
    minH: "",
  },
  {
    src: "/images/detail.png",
    name: "Die Abendliche",
    material: "Vollnarbenleder",
    edition: "Unikat",
    colClass: "row-span-2",
    aspectClass: "h-full",
    minH: "min-h-[420px]",
  },
  {
    src: "/images/process.png",
    name: "Die Bohème",
    material: "Ziegenleder",
    edition: "Kollektion I",
    colClass: "",
    aspectClass: "aspect-[4/3]",
    minH: "",
  },
];

function GridItem({
  item,
  index,
}: {
  item: (typeof ITEMS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`relative group overflow-hidden bg-linen ${item.colClass} ${item.minH}`}
      initial={{ clipPath: prefersReducedMotion ? "inset(0%)" : "inset(100% 0% 0% 0%)" }}
      animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{
        duration: 0.9,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Image */}
      <motion.div
        className={`w-full overflow-hidden ${item.aspectClass}`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.name}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 border border-sand pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Caption */}
      <div className="p-4 bg-cream">
        <p className="font-cormorant-sc text-espresso text-xs tracking-[0.3em] uppercase">
          {item.material} — {item.edition}
        </p>
        <p className="font-cormorant text-espresso text-xl font-light mt-0.5">
          {item.name}
        </p>
      </div>
    </motion.div>
  );
}

export function KollektionSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section id="kollektion" className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={headRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <motion.p
              className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Kollektion
            </motion.p>
            <motion.h2
              className="font-cormorant font-light text-espresso leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Ausgewählte Stücke
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/shop"
              className="relative group inline-flex items-center gap-3 font-sans text-sm text-espresso tracking-wide overflow-hidden"
            >
              <span className="relative z-10 py-2 px-5 border border-espresso group-hover:text-cream transition-colors duration-300">
                Zur Kollektion
              </span>
              <motion.span
                className="absolute inset-0 bg-espresso origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {ITEMS.map((item, i) => (
            <GridItem key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Tagline beneath */}
        <motion.p
          className="mt-12 font-cormorant text-terre text-xl md:text-2xl italic text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          „Entworfen von Hand. Gedacht für ein Leben."
        </motion.p>
      </div>
    </section>
  );
}
