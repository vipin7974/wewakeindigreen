"use client";

import { motion } from "framer-motion";

type HeroProps = {
  data: {
    title: string;

    subtitle: string;
  };
};

export default function Hero({
  data,
}: HeroProps) {
const titleParts =
  data?.title?.split("|") || [];
  return (
    <section
      id="home"
      className="
        hero-section
        relative
        min-h-screen
        overflow-hidden
        bg-white
        flex
        items-center
      "
    >

      {/* BACKGROUND IMAGE */}

<div className="hero-bg-image" />

{/* IMAGE OVERLAY */}

<div className="hero-bg-overlay" />
      {/* GRID */}

      <div className="hero-grid-lines" />

      {/* CIRCLES */}

      <div className="hero-bg-circles">
        <div className="c1" />
        <div className="c2" />
        <div className="c3" />
        <div className="c4" />
      </div>

      {/* FLOATING BOXES */}

      <div className="hero-box b1" />
      <div className="hero-box b2" />
      <div className="hero-box b3" />
      <div className="hero-box b4" />

      {/* CONTENT */}

      <div
        className="
          relative
          z-20
          max-w-[1240px]
          mx-auto
          px-6
          lg:px-20
          w-full
        "
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-[760px]"
        >
          {/* BADGE */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#dfd4f5]
              bg-[#f3effe]
              px-5
              py-2
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-[#4E2F8E]
            "
          >
            <div
              className="
                w-2
                h-2
                rounded-full
                bg-[#6040a8]
                animate-pulse
              "
            />

            Make in India · Clean Tech · Deep Tech
          </div>

          {/* TITLE */}

          <h1
  className="
    mt-10
    text-[58px]
    leading-[0.92]
    tracking-[-0.05em]
    text-[#1a0f30]
    lg:text-[110px]
    font-black
  "
>
  {titleParts[0]}

  <span
    className="
      block
      italic
      text-[#6040a8]
    "
  >
    {titleParts[1]}
  </span>

  {titleParts[2]}
</h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8
              max-w-[620px]
              text-lg
              leading-[1.9]
              text-[#1a0f30]/60
            "
          >
            We convert crop residue into BioMANS —
            a 100% biodegradable material replacing
            single-use plastic through sustainable
            deep-tech innovation.
          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5 mt-12">
            <button
              className="
                rounded-full
                bg-[#4E2F8E]
                hover:bg-[#6040a8]
                px-8
                py-4
                text-sm
                font-bold
                uppercase
                tracking-[0.12em]
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                shadow-[0_10px_30px_rgba(78,47,142,0.18)]
              "
            >
              Explore BioMANS
            </button>

            <button
              className="
                rounded-full
                border
                border-[#dfd4f5]
                bg-white/80
                px-8
                py-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#4E2F8E]
                transition-all
                duration-300
                hover:border-[#c0a8e8]
                hover:bg-[#f3effe]
              "
            >
              See The Crisis
            </button>
          </div>
          {/* HERO STATS */}

<div className="hero-stats-row">
  <div className="hero-stat-item">
    <div className="hstat-val">21</div>
    <div className="hstat-lbl">
      Days to biodegrade
    </div>
  </div>

  <div className="hero-stat-item">
    <div className="hstat-val">100%</div>
    <div className="hstat-lbl">
      Agro-waste based
    </div>
  </div>

  <div className="hero-stat-item">
    <div className="hstat-val">−78%</div>
    <div className="hstat-lbl">
      Carbon vs plastic
    </div>
  </div>

  <div className="hero-stat-item">
    <div className="hstat-val">3</div>
    <div className="hstat-lbl">
      UN SDGs addressed
    </div>
  </div>
</div>
        </motion.div>
      </div>
    </section>
  );
}
