"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart } from "@/components/CartContext";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full text-center"
        >
          {/* Decorative rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-16 h-px bg-sand mx-auto mb-8 origin-left"
          />

          <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-5">
            Meine Tasche
          </p>

          <h1
            className="font-cormorant font-light text-espresso leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Vielen Dank für deine Bestellung
          </h1>

          <p className="font-sans text-terre text-sm leading-relaxed mb-3 max-w-sm mx-auto">
            Deine Tasche wird mit der Sorgfalt verpackt, die jedes Stück
            verdient — handgefertigt, für dich.
          </p>
          <p className="font-sans text-terre/60 text-xs leading-relaxed mb-12 max-w-sm mx-auto">
            Du erhältst in Kürze eine Bestätigung per E-Mail.
          </p>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/shop"
              className="inline-block font-sans text-xs uppercase tracking-[0.25em] border border-espresso px-8 py-3 text-espresso hover:bg-espresso hover:text-cream transition-colors"
            >
              Weitere Stücke entdecken
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <SiteFooter />
    </>
  );
}
