"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const featured = {
  image:
    "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=1200&q=80",

  tag: "Featured",

  date: "March 18, 2026 · 8 min read",

  title:
    "How 10,376 Tonnes of Daily Plastic Waste Became Our Founding Story",

  excerpt:
    "When Dr. Aniruddha Deshpande first saw India's plastic waste data, he didn't see garbage — he saw a design problem waiting for an engineering solution.",

  featured: true,
};

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80",

    tag: "Agro Tech",

    date: "February 5, 2026 · 5 min",

    title:
      "Why Farmers Are Our Most Valuable Partners",

    excerpt:
      "India generates 500M tonnes of crop residue yearly. Most is burned.",

    size: "medium",
  },

  {
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&q=80",

    tag: "Science",

    date: "January 12, 2026 · 6 min",

    title:
      "What Happens When BioMANS Decomposes — The Lab Data",

    excerpt:
      "Complete breakdown, zero toxic residue, measurably higher nitrogen post-compost.",

    size: "medium",
  },

  {
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80",

    tag: "Water Tech",

    date: "December 2, 2025 · 4 min",

    title:
      "The Water Crisis No One Is Talking About in India",

    size: "small",
  },

  {
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",

    tag: "Awards",

    date: "November 14, 2025 · 3 min",

    title:
      "WIGPL at TEDxDBATU — Cleaning Our Ways",

    size: "small",
  },

  {
    image:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=900&q=80",

    tag: "Market",

    date: "October 28, 2025 · 5 min",

    title:
      "India's Biodegradable Packaging Market Will Hit ₹12,000 Cr by 2028",

    size: "small",
  },
];

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="
        relative
        overflow-hidden
        py-28
        bg-[#faf8fd]
      "
    >
      {/* GRID */}

      <div className="blog-grid-lines" />

      {/* GLOW */}

      <div className="blog-glow" />

      {/* FLOATING BOXES */}

      <div className="blog-box box-1" />
      <div className="blog-box box-2" />
      <div className="blog-box box-3" />

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

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-10
          "
        >
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* EYEBROW */}

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

              Knowledge & Stories
            </div>

            {/* TITLE */}

            <h2
              className="
                mt-8
                text-[48px]
                leading-[0.95]
                tracking-[-0.05em]
                text-[#1a0f30]
                lg:text-[84px]
                font-black
              "
            >
              From the{" "}

              <span className="italic text-[#6040a8]">
                field
              </span>
            </h2>
          </motion.div>

          {/* CTA */}

          <motion.button
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
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="blog-see-all"
          >
            All articles

            <ArrowOutwardIcon
              sx={{ fontSize: 16 }}
            />
          </motion.button>
        </div>

        {/* GRID */}

        <div
          className="
            grid
            xl:grid-cols-[1.3fr_0.7fr]
            gap-8
            mt-20
          "
        >
          {/* FEATURED */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="
              blog-featured-card
              group
            "
          >
            {/* IMAGE */}

            <div className="blog-featured-image">
              <Image
                fill
                src={featured.image}
                alt={featured.title}
                className="
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

              <div className="blog-image-overlay" />

              <div className="blog-tag">
                {featured.tag}
              </div>
            </div>

            {/* BODY */}

            <div className="blog-body">
              <div className="blog-date">
                {featured.date}
              </div>

              <h3 className="blog-featured-title">
                {featured.title}
              </h3>

              <p className="blog-excerpt">
                {featured.excerpt}
              </p>

              <button className="blog-read-btn">
                Read full story

                <ArrowOutwardIcon
                  sx={{ fontSize: 16 }}
                />
              </button>
            </div>

            <div className="blog-hover-glow" />
          </motion.div>

          {/* SIDE ARTICLES */}

          <div className="grid gap-8">
            {articles.slice(0, 2).map(
              (item, index) => (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 40,
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
                    blog-card
                    group
                  "
                >
                  {/* IMAGE */}

                  <div className="blog-card-image">
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

                    <div className="blog-image-overlay" />

                    <div className="blog-tag">
                      {item.tag}
                    </div>
                  </div>

                  {/* BODY */}

                  <div className="blog-body">
                    <div className="blog-date">
                      {item.date}
                    </div>

                    <h3 className="blog-title">
                      {item.title}
                    </h3>

                    <p className="blog-excerpt-small">
                      {item.excerpt}
                    </p>

                    <button className="blog-read-btn">
                      Read

                      <ArrowOutwardIcon
                        sx={{ fontSize: 16 }}
                      />
                    </button>
                  </div>

                  <div className="blog-hover-glow" />
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* BOTTOM ROW */}

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
            mt-8
          "
        >
          {articles.slice(2).map(
            (item, index) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 40,
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
                className="
                  blog-card
                  group
                "
              >
                {/* IMAGE */}

                <div className="blog-card-image small">
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

                  <div className="blog-image-overlay" />

                  <div className="blog-tag">
                    {item.tag}
                  </div>
                </div>

                {/* BODY */}

                <div className="blog-body">
                  <div className="blog-date">
                    {item.date}
                  </div>

                  <h3 className="blog-title">
                    {item.title}
                  </h3>

                  <button className="blog-read-btn">
                    Read

                    <ArrowOutwardIcon
                      sx={{ fontSize: 16 }}
                    />
                  </button>
                </div>

                <div className="blog-hover-glow" />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
