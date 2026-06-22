"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const SCENES = [
  {
    caption: "Entwurf.",
    sub: "Der erste Strich auf Papier.",
    src: "/images/process.png",
  },
  {
    caption: "Schnitt.",
    sub: "Das Leder spricht, wenn man zuhört.",
    src: "/images/detail.png",
  },
  {
    caption: "Vollendung.",
    sub: "Eine Tasche, die bleibt.",
    src: "/images/hero.png",
  },
];

export function ProzessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Crossfade opacities for each scene
  const opacity0 = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const opacity1 = useTransform(scrollYProgress, [0.28, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 1]);

  // Caption slide-in for each scene
  const captionY0 = useTransform(scrollYProgress, [0, 0.12], [20, 0]);
  const captionY1 = useTransform(scrollYProgress, [0.3, 0.42], [20, 0]);
  const captionY2 = useTransform(scrollYProgress, [0.64, 0.76], [20, 0]);

  const opacities = [opacity0, opacity1, opacity2];
  const captionYs = [captionY0, captionY1, captionY2];

  // Scene progress indicator
  const dot0 = useTransform(scrollYProgress, [0, 0.33], [1, 0.3]);
  const dot1 = useTransform(scrollYProgress, [0.28, 0.5, 0.72], [0.3, 1, 0.3]);
  const dot2 = useTransform(scrollYProgress, [0.62, 1], [0.3, 1]);
  const dotOpacities = [dot0, dot1, dot2];

  return (
    <section id="prozess" className="relative">
      {/* Scrollable height for pinning */}
      <div
        ref={containerRef}
        style={{ height: prefersReducedMotion ? "100vh" : "300vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-tobacco">
          {/* Scene layers */}
          {SCENES.map((scene, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ opacity: prefersReducedMotion ? (i === 0 ? 1 : 0) : opacities[i] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={scene.src}
                alt={scene.caption}
                className="h-full w-full object-cover"
                style={{ opacity: 0.65 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tobacco/80 via-tobacco/20 to-transparent" />

              {/* Caption */}
              <motion.div
                className="absolute bottom-16 left-10 md:left-20"
                style={{ y: prefersReducedMotion ? 0 : captionYs[i] }}
              >
                <p className="font-cormorant-sc text-sand text-xs tracking-[0.4em] uppercase mb-3">
                  Prozess 0{i + 1} / 03
                </p>
                <p
                  className="font-cormorant font-light text-cream italic leading-none"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
                >
                  {scene.caption}
                </p>
                <p className="font-cormorant text-cream/60 text-xl mt-4 italic">
                  {scene.sub}
                </p>
              </motion.div>
            </motion.div>
          ))}

          {/* Section label top */}
          <div className="absolute top-8 left-10 md:left-20">
            <p className="font-cormorant-sc text-sand/60 text-xs tracking-[0.4em] uppercase">
              Hinter dem Objekt
            </p>
          </div>

          {/* Progress dots */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-3">
            {SCENES.map((_, i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-sand block"
                style={{ opacity: dotOpacities[i] }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
