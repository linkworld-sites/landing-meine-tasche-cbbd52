"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";

const SENTENCES = [
  "Jede Tasche, die ich fertige, ist eine Entscheidung — über Material, Form und die Zeit, die darin steckt.",
  "Ich entwerfe Stücke, die nicht vergessen werden wollen.",
];

function WordByWord({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <p ref={ref} className="font-cormorant text-2xl md:text-3xl lg:text-4xl text-espresso leading-relaxed mb-6 font-light italic">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function FounderSection() {
  const ref = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(labelRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section ref={ref} id="gruenderin" className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
      {/* Left: hands / detail image with parallax */}
      <div className="relative overflow-hidden bg-espresso h-[55vw] md:h-auto min-h-[320px]">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/detail.png"
            alt="Handwerk — Lederverarbeitung im Atelier"
            className="h-[120%] w-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-espresso/20" />
      </div>

      {/* Right: founder text */}
      <div className="flex flex-col justify-center p-10 md:p-16 lg:p-24 bg-cream">
        <div ref={labelRef}>
          <motion.p
            className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={labelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Die Gründerin
          </motion.p>
        </div>

        {SENTENCES.map((sentence, i) => (
          <WordByWord key={i} text={sentence} delay={0.2 + i * 0.6} />
        ))}

        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <span className="w-8 h-px bg-sand" />
          <p className="font-cormorant-sc text-terre text-xs tracking-[0.25em]">
            Marie — Gründerin &amp; Atelierchefin
          </p>
        </motion.div>
      </div>
    </section>
  );
}
