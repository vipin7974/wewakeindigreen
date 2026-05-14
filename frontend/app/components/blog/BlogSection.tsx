"use client";

import Image from "next/image";

import Link from "next/link";

import { motion } from "framer-motion";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { format } from "date-fns";

import { urlFor } from "@/app/lib/sanity/image";

type Blog = {
  _id: string;

  title: string;

  excerpt: string;

  coverImage?: any;

  externalCoverImage?: string;

  tag: string;

  featured: boolean;

  readTime: string;

  publishedAt: string;

  slug: {
    current: string;
  };
};

type BlogSectionProps = {
  blogs: Blog[];
};

export default function BlogSection({
  blogs,
}: BlogSectionProps) {
  const validBlogs =
    blogs.filter(
      (blog) =>
        blog?.slug?.current
    );

  if (!validBlogs.length) {
    return null;
  }

  const featured =
    validBlogs.find(
      (blog) => blog.featured
    ) || validBlogs[0];

  const articles =
    validBlogs.filter(
      (blog) =>
        blog._id !== featured._id
    );

  const getImageSrc = (
    blog: Blog
  ) => {
    if (blog?.coverImage) {
      return urlFor(
        blog.coverImage
      ).url();
    }

    if (
      blog?.externalCoverImage
    ) {
      return blog.externalCoverImage;
    }

    return "/images/blog-fallback.jpg";
  };

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
            }}
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

          <Link
            href="/blog"
            className="blog-see-all"
          >
            All articles

            <ArrowOutwardIcon
              sx={{ fontSize: 16 }}
            />
          </Link>
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

          <Link
            href={`/blog/${featured.slug.current}`}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
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
                  alt={featured.title}
                  src={getImageSrc(
                    featured
                  )}
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
                  {format(
                    new Date(
                      featured.publishedAt
                    ),
                    "MMMM dd, yyyy"
                  )}{" "}
                  ·{" "}
                  {featured.readTime}
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
                    sx={{
                      fontSize: 16,
                    }}
                  />
                </button>
              </div>

              <div className="blog-hover-glow" />
            </motion.div>
          </Link>

          {/* SIDE */}

          <div className="grid gap-8">
            {articles
              .slice(0, 2)
              .map(
                (
                  item,
                  index
                ) => (
                  <Link
                    key={item._id}
                    href={`/blog/${item.slug.current}`}
                  >
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
                        duration: 0.6,
                        delay:
                          index *
                          0.1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="
                        blog-card
                        group
                      "
                    >
                      {/* IMAGE */}

                      <div className="blog-card-image">
                        <Image
                          fill
                          alt={
                            item.title
                          }
                          src={getImageSrc(
                            item
                          )}
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
                          {format(
                            new Date(
                              item.publishedAt
                            ),
                            "MMMM dd, yyyy"
                          )}{" "}
                          ·{" "}
                          {
                            item.readTime
                          }
                        </div>

                        <h3 className="blog-title">
                          {
                            item.title
                          }
                        </h3>

                        <p className="blog-excerpt-small">
                          {
                            item.excerpt
                          }
                        </p>

                        <button className="blog-read-btn">
                          Read
                        </button>
                      </div>

                      <div className="blog-hover-glow" />
                    </motion.div>
                  </Link>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
