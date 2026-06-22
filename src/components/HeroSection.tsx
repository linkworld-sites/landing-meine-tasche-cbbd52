"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0.6]);

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden bg-espresso">
      {/* Breathing hero image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReducedMotion ? 1 : 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ y }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.png"
          alt="Meine Tasche — handgefertigte Ledertasche auf Stein"
          className="h-full w-full object-cover"
          style={{ transformOrigin: "center" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-espresso/10 via-transparent to-espresso/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Brand name — bottom-left, architectural */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-cormorant font-light text-cream leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }}
          >
            Meine<br />Tasche
          </h1>
          <p className="font-cormorant-sc text-sand text-sm tracking-[0.4em] uppercase mt-4">
            Atelier — Berlin
          </p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 right-10 text-cream/50 text-xs tracking-widest uppercase font-sans rotate-90 origin-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Scroll
      </motion.div>
    </section>
  );
}
