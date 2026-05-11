"use client";

import { motion } from "framer-motion";

const challenges = [
  {
    icon: "🗻",
    title: "Plastic Waste Crisis",
    body:
      "India generates over 10,376 tonnes of plastic waste every single day. Single-use plastics choke our land, waterways, and ecosystems — demanding an immediate, scalable alternative.",
    stat: "⬆ 10,376 T/D — Daily Plastic Waste (India)",
  },
  {
    icon: "💧",
    title: "Water Scarcity",
    body:
      "Water scarcity already affects every continent. By 2030, 700 million people could be displaced by intense water scarcity. Can we save water for the next generation through smart recycling and reuse?",
    stat: "700 Million — People at Risk by 2030",
  },
  {
    icon: "🌱",
    title: "Agricultural Waste",
    body:
      "Millions of tonnes of crop residue go unutilised or burned after harvesting, releasing greenhouse gases. We transform this agricultural waste into high-value biobased materials.",
    stat: "♻ Agro-Waste → BioMANS Material",
  },
];

export default function Story() {
  return (
    <section
      id="story"
      className="
        relative
        overflow-hidden
        py-28
        bg-[#12091f]
      "
    >
      {/* GRID */}

      <div className="story-grid-lines" />

      {/* GLOW */}

      <div className="story-glow-1" />
      <div className="story-glow-2" />

      {/* ORBITS */}

      <div className="story-orbit orbit-1" />
      <div className="story-orbit orbit-2" />

      {/* FLOATING BOXES */}

      <div className="story-box box-1" />
      <div className="story-box box-2" />
      <div className="story-box box-3" />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          max-w-[1240px]
          mx-auto
          px-6
          lg:px-20
        "
      >
        {/* TOP */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-[860px]"
        >
          {/* LABEL */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#6040a8]/20
              bg-[#6040a8]/10
              px-5
              py-2
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-[#c0a8e8]
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

            The Problem We Solve
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-8
              text-[48px]
              leading-[0.95]
              tracking-[-0.05em]
              text-white
              lg:text-[84px]
              font-black
            "
          >
            The{" "}

            <span className="italic text-[#95d5b2]">
              Challenges
            </span>{" "}

            That Drove Us
          </h2>

          {/* LEAD */}

          <p
            className="
              mt-8
              text-[22px]
              leading-[1.8]
              text-white/65
              max-w-[760px]
            "
          >
            “Am I going to sit on the daily
            incremental 10,376 T/D Plastic Waste
            Mountain?”
          </p>
        </motion.div>

        {/* GRID */}

        <div
          className="
            mt-20
            grid
            gap-8
            lg:grid-cols-3
          "
        >
          {challenges.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="
                story-card
                group
              "
            >
              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="story-icon">
                  {item.icon}
                </div>

                <div className="story-card-line" />
              </div>

              {/* TITLE */}

              <h3 className="story-card-title">
                {item.title}
              </h3>

              {/* BODY */}

              <p className="story-card-body">
                {item.body}
              </p>

              {/* STAT */}

              <div className="story-card-stat">
                {item.stat}
              </div>

              {/* HOVER GLOW */}

              <div className="story-card-hover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
