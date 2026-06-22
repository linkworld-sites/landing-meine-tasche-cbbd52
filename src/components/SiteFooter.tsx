"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <footer className="bg-tobacco text-linen py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Brand mark */}
          <div>
            <p className="font-cormorant text-3xl font-light text-cream tracking-wide">
              Meine Tasche
            </p>
            <p className="font-cormorant-sc text-sand text-xs tracking-[0.3em] uppercase mt-1">
              Atelier
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-linen/70">
            {[
              { label: "Kollektion", href: "/#kollektion" },
              { label: "Atelier", href: "/#prozess" },
              { label: "Journal", href: "/blog" },
              { label: "Shop", href: "/shop" },
            ].map((l) => (
              <motion.div key={l.label} whileHover={{ color: "#C9A96E" }} transition={{ duration: 0.15 }}>
                <Link href={l.href} className="hover:text-sand transition-colors">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Legal */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-linen/50">
            <Link href="/legal/impressum" className="hover:text-linen/80 transition-colors">Impressum</Link>
            <Link href="/legal/datenschutz" className="hover:text-linen/80 transition-colors">Datenschutz</Link>
            <Link href="/legal/cookies" className="hover:text-linen/80 transition-colors">Cookies</Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-linen/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-linen/40">
          <p>@meine.tasche — Berlin</p>
          <p>© {new Date().getFullYear()} Meine Tasche. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
