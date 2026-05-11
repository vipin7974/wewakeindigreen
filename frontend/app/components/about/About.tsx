"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const chips = [
  "Agro-Waste Upcycling",
  "Biopolymer R&D",
  "Water Tech",
  "Make in India",
  "Clean Tech",
  "Cold Composting",
];

const stats = [
  {
    label: "Biodegradation in soil",
    value: "21 days",
    width: "95%",
  },
  {
    label: "Carbon footprint vs plastic",
    value: "−78%",
    width: "78%",
  },
  {
    label: "Bio-based material content",
    value: "100%",
    width: "100%",
  },
  {
    label: "Soil nitrogen improvement",
    value: "+45%",
    width: "45%",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="
        relative
        overflow-hidden
        py-28
        bg-[#faf8fd]
      "
    >
      {/* GRID */}

      <div className="about-grid-lines" />

      {/* GLOW */}

      <div className="about-glow" />

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
        <div
          className="
            grid
            lg:grid-cols-2
            gap-20
            items-center
          "
        >
          {/* LEFT */}

          <div>
            {/* EYEBROW */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
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
                "
              />

              Who We Are
            </motion.div>

            {/* TITLE */}

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="
                mt-8
                text-[44px]
                leading-[0.98]
                tracking-[-0.05em]
                text-[#1a0f30]
                lg:text-[72px]
                font-black
              "
            >
              We build{" "}

              <span className="italic text-[#6040a8]">
                tomorrow&apos;s
              </span>

              <br />

              materials from
              <br />

              today&apos;s waste
            </motion.h2>

            {/* BODY */}

            <div className="mt-8 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="
                  text-lg
                  leading-[1.9]
                  text-[#1a0f30]/65
                "
              >
                WeWake IndiGreen (WIGPL) is a{" "}
                <strong className="text-[#1a0f30]">
                  clean-tech & deep-tech company
                </strong>{" "}
                from Pune, India. We invented BioMANS —
                a biobased, biodegradable material made
                entirely from agricultural waste that
                would otherwise be burned.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                viewport={{ once: true }}
                className="
                  text-lg
                  leading-[1.9]
                  text-[#1a0f30]/65
                "
              >
                Grounded in{" "}
                <strong className="text-[#1a0f30]">
                  Make in India & Made in India
                </strong>
                , every solution we build comes from
                local resources and serves local
                communities. We align with NITI Aayog&apos;s
                SDG goals —{" "}
                <strong className="text-[#1a0f30]">
                  SDG 6, SDG 9, and SDG 12
                </strong>
                .
              </motion.p>
            </div>

            {/* CHIPS */}

            <div className="flex flex-wrap gap-4 mt-10">
              {chips.map((chip, index) => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="
                    px-5
                    py-3
                    rounded-full
                    border
                    border-[#dfd4f5]
                    bg-white
                    text-[#4E2F8E]
                    text-sm
                    font-semibold
                    shadow-[0_8px_30px_rgba(96,64,168,0.05)]
                  "
                >
                  {chip}
                </motion.div>
              ))}
            </div>

            {/* STAT BARS */}

            <div className="mt-14 space-y-8">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                >
                  {/* TOP */}

                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="
                        text-sm
                        font-semibold
                        text-[#1a0f30]/70
                      "
                    >
                      {item.label}
                    </span>

                    <span
                      className="
                        text-sm
                        font-black
                        text-[#6040a8]
                      "
                    >
                      {item.value}
                    </span>
                  </div>

                  {/* TRACK */}

                  <div
                    className="
                      h-[12px]
                      rounded-full
                      bg-[#ede7fb]
                      overflow-hidden
                    "
                  >
                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-[#6040a8]
                        to-[#40916c]
                      "
                      style={{
                        width: item.width,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT COLLAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              relative
              h-[760px]
            "
          >
            {/* IMAGE 1 */}

            <div
              className="
                absolute
                left-0
                top-0
                w-[68%]
                h-[520px]
                rounded-[36px]
                overflow-hidden
                shadow-[0_30px_80px_rgba(96,64,168,0.14)]
              "
            >
              <Image
                fill
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80"
                alt="Indian farmer"
                className="object-cover"
              />
            </div>

            {/* IMAGE 2 */}

            <div
              className="
                absolute
                right-0
                bottom-0
                w-[48%]
                h-[360px]
                rounded-[32px]
                overflow-hidden
                border-[10px]
                border-[#faf8fd]
                shadow-[0_20px_60px_rgba(96,64,168,0.12)]
              "
            >
              <Image
                fill
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80"
                alt="Green plant"
                className="object-cover"
              />
            </div>

            {/* SDG CARD */}

            <div
              className="
                absolute
                left-[8%]
                bottom-[10%]
                w-[220px]
                rounded-[28px]
                bg-white/85
                backdrop-blur-xl
                border
                border-[#dfd4f5]
                p-8
                shadow-[0_20px_60px_rgba(96,64,168,0.10)]
              "
            >
              <div
                className="
                  text-[72px]
                  leading-none
                  font-black
                  tracking-[-0.06em]
                  text-[#6040a8]
                "
              >
                3
              </div>

              <div
                className="
                  mt-3
                  text-sm
                  uppercase
                  tracking-[0.22em]
                  text-[#1a0f30]/55
                  leading-[1.8]
                "
              >
                UN SDGs
                <br />
                Addressed
              </div>
            </div>

            {/* FLOATING BOXES */}

            <div className="about-mini-box mini-1" />
            <div className="about-mini-box mini-2" />
            <div className="about-mini-box mini-3" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
