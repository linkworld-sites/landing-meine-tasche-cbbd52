"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Kollektion", href: "/#kollektion" },
  { label: "Atelier", href: "/#prozess" },
  { label: "Journal", href: "/blog" },
  { label: "Shop", href: "/shop" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "bg-cream/95 backdrop-blur-sm border-b border-linen"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 h-16">
        <Link
          href="/"
          className={`font-cormorant text-2xl font-light tracking-wide transition-colors ${
            transparent ? "text-cream" : "text-espresso"
          }`}
        >
          Meine Tasche
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} light={transparent} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-2 ${transparent ? "text-cream" : "text-espresso"}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          <span className="w-6 h-px bg-current block transition-transform" />
          <span className="w-6 h-px bg-current block" />
          <span className="w-6 h-px bg-current block transition-transform" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-cream border-t border-linen overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-6 py-4 font-sans text-sm text-espresso border-b border-linen/50 hover:text-sand transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ href, label, light }: { href: string; label: string; light: boolean }) {
  return (
    <Link
      href={href}
      className={`relative font-sans text-sm tracking-wide transition-colors ${
        light ? "text-cream/90 hover:text-cream" : "text-espresso hover:text-sand"
      }`}
    >
      {label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-sand origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ width: "100%" }}
      />
    </Link>
  );
}
