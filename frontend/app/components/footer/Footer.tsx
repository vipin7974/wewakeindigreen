"use client";

import Link from "next/link";

import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Company",

    links: [
      {
        label: "About Us",
        href: "#about",
      },

      {
        label: "Vision & Mission",
        href: "#vision",
      },

      {
        label: "Our Team",
        href: "#team",
      },

      {
        label: "Contact",
        href: "#contact",
      },
    ],
  },

  {
    title: "Technology",

    links: [
      {
        label: "BioMANS",
        href: "#products",
      },

      {
        label: "SDG Goals",
        href: "#sdg",
      },

      {
        label: "Plastic Crisis",
        href: "#plastic",
      },
    ],
  },

  {
    title: "Insights",

    links: [
      {
        label: "Blog",
        href: "#blog",
      },

      {
        label: "Research",
        href: "#blog",
      },

      {
        label: "Case Studies",
        href: "#blog",
      },

      {
        label: "Press",
        href: "#blog",
      },
    ],
  },
];

export default function Footer() {
  return (
    <>
      <footer className="footer-section">
        {/* GRID */}

        <div className="footer-grid-lines" />

        {/* GLOW */}

        <div className="footer-glow-1" />
        <div className="footer-glow-2" />

        {/* FLOATING BOXES */}

        <div className="footer-box box-1" />
        <div className="footer-box box-2" />

        <div
          className="
            relative
            z-10
            max-w-[1320px]
            mx-auto
            px-6
            lg:px-20
          "
        >
          <div
            className="
              grid
              gap-16
              lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]
            "
          >
            {/* LEFT */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* LOGO */}

              <Link
                href="/"
                className="footer-logo"
              >
                <div className="footer-logo-gem">
                  <div className="footer-logo-inner" />
                </div>

                <span>
                  WeWake IndiGreen
                </span>
              </Link>

              {/* TAGLINE */}

              <p className="footer-tagline">
                With innovative technologies,
                let&apos;s change the world
                together for blissful
                mother-Earth.
              </p>

              {/* COPY */}

              <div className="footer-copy">
                © 2026 WIGPL · All rights
                reserved
              </div>
            </motion.div>

            {/* LINKS */}

            {footerLinks.map(
              (column, index) => (
                <motion.div
                  key={column.title}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="footer-column-title">
                    {column.title}
                  </div>

                  <ul className="footer-links">
                    {column.links.map((item) => (
                      <li key={item.label}>
                        <a href={item.href}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR */}

      <div className="footer-bottom-bar">
        <div
          className="
            max-w-[1320px]
            mx-auto
            px-6
            lg:px-20
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-6
          "
        >
          {/* TEXT */}

          <div className="footer-bottom-text">
            WIGPL · Pune, Maharashtra,
            India · Clean Tech & Deep Tech
            · Brand colour #4E2F8E
          </div>

          {/* BADGE */}

          <div className="footer-india-badge">
            🇮🇳 Proudly Make in India
          </div>
        </div>
      </div>
    </>
  );
}
