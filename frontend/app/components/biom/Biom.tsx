"use client";

import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";

const features = [
  "100% Bio-based Agro-Waste Material",
  "100% Cold Compostable",
  "Biodegrades in just 21–30 Days",
  "100% Recyclable",
  "Reduces Carbon Footprint",
  "Enriches Soil Quality",
  "Novel Material via New Process Development — Converts to simple biomass, water & CO₂",
];

const rawMaterials = [
  {
    icon: "🔵",
    title: "BioMANS Beads",
    desc:
      "Pellet-form biobased material ready for injection moulding and extrusion.",
  },
  {
    icon: "📄",
    title: "BioMANS Sheets",
    desc:
      "Flexible compostable sheets suitable for packaging and flat-form products.",
  },
];

export default function Biom() {
  return (
    <section
      id="biom"
      className="
        relative
        overflow-hidden
        py-28
        bg-white
      "
    >
      {/* GRID */}

      <div className="biom-grid-lines" />

      {/* GLOW */}

      <div className="biom-glow" />

      {/* FLOATING BOXES */}

      <div className="biom-box box-1" />
      <div className="biom-box box-2" />
      <div className="biom-box box-3" />

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

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-start
          "
        >
          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* LABEL */}

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
                "
              />

              Our Flagship Innovation
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-8
                text-[48px]
                leading-[0.95]
                tracking-[-0.05em]
                text-[#1a0f30]
                lg:text-[82px]
                font-black
              "
            >
              <span className="italic text-[#6040a8]">
                BioMANS
              </span>{" "}
              — The Future
              <br />
              of Materials
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                text-lg
                leading-[1.95]
                text-[#1a0f30]/65
                max-w-[620px]
              "
            >
              BioMANS —{" "}
              <em>
                Biobased Biodegradable Advance Material
              </em>{" "}
              — is made entirely from agricultural waste
              after crop harvesting. It replaces
              single-use plastics like disposable
              cutlery, carry bags, earbuds, bibs,
              and lanyards.
            </p>

            <p
              className="
                mt-6
                text-lg
                leading-[1.95]
                text-[#1a0f30]/65
                max-w-[620px]
              "
            >
              Available in beads and sheets,
              BioMANS is production-ready for
              manufacturers and industrial integration.
            </p>
          </motion.div>

          {/* FEATURES */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="
              grid
              sm:grid-cols-2
              gap-5
            "
          >
            {features.map((item, index) => (
              <div
                key={item}
                className={`
                  biom-feature-card
                  ${index === 6 ? "sm:col-span-2" : ""}
                `}
              >
                <div className="biom-check">
                  <CheckIcon sx={{ fontSize: 16 }} />
                </div>

                <span className="biom-feature-text">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RAW MATERIALS */}

        <div className="mt-28">
          <h3 className="biom-subtitle">
            Raw Material Forms
          </h3>

          <div
            className="
              grid
              md:grid-cols-2
              gap-8
              mt-10
            "
          >
            {rawMaterials.map((item) => (
              <div
                key={item.title}
                className="biom-raw-card"
              >
                <div className="biom-raw-icon">
                  {item.icon}
                </div>

                <h4 className="biom-raw-title">
                  {item.title}
                </h4>

                <p className="biom-raw-desc">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
