"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const sdgs = [
  {
    number: "SDG 6",

    title: "Clean Water & Sanitation",

    description:
      "BioMANS eliminates plastic contaminating groundwater. Our water tech enables recycling and reuse for 700 million people facing scarcity by 2030.",

    progress: "62%",

    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
  },

  {
    number: "SDG 9",

    title:
      "Industry, Innovation & Infrastructure",

    description:
      "Patented process converts agro-waste into industrial-grade biopolymer — proving sustainable production is economically viable at scale.",

    progress: "78%",

    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  },

  {
    number: "SDG 12",

    title:
      "Responsible Consumption & Production",

    description:
      "BioMANS directly replaces single-use plastics. Every kilogram prevents 2.3kg CO₂ and 0.9kg of plastic from entering the environment permanently.",

    progress: "89%",

    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80",
  },
];

export default function SdgSection() {
  return (
    <section
      id="sdg"
      className="
        relative
        overflow-hidden
        py-28
      "
    >
      {/* BACKGROUND */}

      <div className="sdg-bg-gradient" />

      <div className="sdg-grid-lines" />

      <div className="sdg-glow-1" />
      <div className="sdg-glow-2" />

      {/* ORBITS */}

      <div className="sdg-orbit orbit-1" />
      <div className="sdg-orbit orbit-2" />

      {/* FLOATING BOXES */}

      <div className="sdg-box box-1" />
      <div className="sdg-box box-2" />
      <div className="sdg-box box-3" />

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
        {/* TOP */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-[760px]"
        >
          {/* LABEL */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/5
              px-5
              py-2
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-[#c0a8e8]
              backdrop-blur-xl
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#95d5b2]
                animate-pulse
              "
            />

            NITI Aayog Alignment
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-8
              text-[52px]
              leading-[0.95]
              tracking-[-0.05em]
              text-white
              lg:text-[92px]
              font-black
            "
          >
            Building for{" "}

            <span className="italic text-[#95d5b2]">
              global goals
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              text-lg
              leading-[1.95]
              text-white/68
              max-w-[620px]
            "
          >
            Every product we create directly
            advances India&apos;s commitment to
            the United Nations Sustainable
            Development Goals.
          </p>
        </motion.div>

        {/* GRID */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-3
            mt-20
          "
        >
          {sdgs.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="
                sdg-card
                group
              "
            >
              {/* IMAGE */}

              <div className="sdg-image-wrap">
                <Image
                  fill
                  src={item.image}
                  alt={item.title}
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}

                <div className="sdg-image-overlay" />

                {/* BADGE */}

                <div className="sdg-badge">
                  {item.number}
                </div>
              </div>

              {/* BODY */}

              <div className="sdg-body">
                <h3 className="sdg-title">
                  {item.title}
                </h3>

                <p className="sdg-description">
                  {item.description}
                </p>

                {/* PROGRESS */}

                <div className="sdg-progress-wrap">
                  <div className="sdg-progress-top">
                    <span>
                      SDG Alignment
                    </span>

                    <span>
                      {item.progress}
                    </span>
                  </div>

                  <div className="sdg-track">
                    <div
                      className="sdg-fill"
                      style={{
                        width: item.progress,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* HOVER */}

              <div className="sdg-hover-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
