"use client";

import Image from "next/image";

import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: "📍",

    label: "Address",

    value:
      "Flat No-7, 16/B, Pachimanagari, Kothrud Pune 411052, Maharashtra, India",
  },

  {
    icon: "🕐",

    label: "Hours",

    value:
      "Mon–Fri 9 AM–6 PM · Sat 9 AM–2 PM",
  },

  {
    icon: "🌐",

    label: "Website",

    value: "wewakeindigreen.com",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        py-28
        bg-[#faf8fd]
      "
    >
      {/* GRID */}

      <div className="contact-grid-lines" />

      {/* GLOW */}

      <div className="contact-glow" />

      {/* FLOATING BOXES */}

      <div className="contact-box box-1" />
      <div className="contact-box box-2" />
      <div className="contact-box box-3" />

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
            lg:grid-cols-[0.95fr_1.05fr]
            gap-10
            items-start
          "
        >
          {/* LEFT */}

          <div>
            {/* EYEBROW */}

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

              Work With Us
            </motion.div>

            {/* TITLE */}

            <motion.h2
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
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className="
                mt-8
                text-[52px]
                leading-[0.95]
                tracking-[-0.05em]
                text-[#1a0f30]
                lg:text-[88px]
                font-black
              "
            >
              Let&apos;s build a
              <br />

              <span className="italic text-[#6040a8]">
                cleaner world
              </span>

              <br />
              together
            </motion.h2>

            {/* DESC */}

            <motion.p
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
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="
                mt-8
                max-w-[420px]
                text-lg
                leading-[1.9]
                text-[#1a0f30]/65
              "
            >
              Whether you&apos;re a manufacturer,
              investor, NGO, or someone who
              cares — we want to hear from you.
            </motion.p>

            {/* INFO */}

            <div className="mt-12 space-y-6">
              {contactInfo.map(
                (item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    viewport={{ once: true }}
                    className="contact-info-card"
                  >
                    {/* ICON */}

                    <div className="contact-info-icon">
                      {item.icon}
                    </div>

                    {/* TEXT */}

                    <div>
                      <div className="contact-info-label">
                        {item.label}
                      </div>

                      <div className="contact-info-value">
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="contact-image-wrap"
            >
              <Image
                fill
                src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80"
                alt="Team working"
                className="object-cover"
              />

              <div className="contact-image-overlay" />
            </motion.div>
          </div>

          {/* FORM */}

          <motion.div
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
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="contact-form-card"
          >
            {/* TITLE */}

            <h3 className="contact-form-title">
              Send a message
            </h3>

            {/* FORM */}

            <form className="mt-10 space-y-6">
              {/* ROW */}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="contact-field">
                  <label>
                    First name
                  </label>

                  <input
                    type="text"
                    placeholder="Rahul"
                  />
                </div>

                <div className="contact-field">
                  <label>
                    Last name
                  </label>

                  <input
                    type="text"
                    placeholder="Sharma"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="contact-field">
                <label>Email</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                />
              </div>

              {/* SELECT */}

              <div className="contact-field">
                <label>
                  I&apos;m interested in
                </label>

                <select>
                  <option>
                    Select a topic
                  </option>

                  <option>
                    Manufacturing Partnership
                  </option>

                  <option>
                    Investment Opportunity
                  </option>

                  <option>
                    Research Collaboration
                  </option>

                  <option>
                    Product Sourcing
                  </option>

                  <option>
                    General Enquiry
                  </option>
                </select>
              </div>

              {/* MESSAGE */}

              <div className="contact-field">
                <label>Message</label>

                <textarea
                  placeholder="Tell us about your project or question..."
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                className="contact-submit-btn"
              >
                Send Message 🌱
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
