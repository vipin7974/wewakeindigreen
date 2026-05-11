"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const sections = [
  {
    key: "vision",

    letter: "V",

    eyebrow: "Our Vision",

    quote:
      "It is not possible for earth to replenish at a pace that it may be relieved of all the pollution we impose upon it.",

    action:
      "IT IS OUR RESPONSIBILITY TO TAKE CARE.",

    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80",

    gradient:
      "from-[#4E2F8E]/85 to-[#1a0f30]/95",
  },

  {
    key: "mission",

    letter: "M",

    eyebrow: "Our Mission",

    quote:
      "We offer real green technological solutions for a change — built by people, for people, from the soil of India.",

    action:
      "INNOVATION · SUSTAINABILITY · IMPACT",

    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",

    gradient:
      "from-[#40916c]/85 to-[#10251c]/95",
  },
];

export default function VisionMissionSection() {
  return (
    <section
      id="vision"
      className="
        relative
        overflow-hidden
        bg-[#12091f]
      "
    >
      {/* GRID */}

      <div className="vm-grid-lines" />

      {/* GLOW */}

      <div className="vm-glow-1" />
      <div className="vm-glow-2" />

      <div
        className="
          relative
          z-10
          grid
          lg:grid-cols-2
        "
      >
        {sections.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
            }}
            viewport={{ once: true }}
            className="
              vm-panel
              group
            "
          >
            {/* BG IMAGE */}

            <div className="vm-image-wrap">
              <Image
                fill
                src={item.image}
                alt={item.eyebrow}
                className="
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  group-hover:scale-105
                "
              />

              {/* OVERLAY */}

              <div
                className={`
                  vm-overlay
                  bg-gradient-to-br
                  ${item.gradient}
                `}
              />

              {/* DARK */}

              <div className="vm-dark-overlay" />
            </div>

            {/* FLOATING BOXES */}

            <div className="vm-box box-1" />
            <div className="vm-box box-2" />

            {/* CONTENT */}

            <div className="vm-content">
              {/* BIG LETTER */}

              <div className="vm-letter">
                {item.letter}
              </div>

              {/* EYEBROW */}

              <div className="vm-eyebrow">
                <span className="vm-line" />

                {item.eyebrow}
              </div>

              {/* QUOTE */}

              <p className="vm-quote">
                “{item.quote}”
              </p>

              {/* ACTION */}

              <div className="vm-action">
                {item.action}
              </div>
            </div>

            {/* HOVER */}

            <div className="vm-hover-glow" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
