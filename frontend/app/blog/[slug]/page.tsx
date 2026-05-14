import Image from "next/image";

import {
  PortableText,
} from "@portabletext/react";

import { notFound } from "next/navigation";

import { client } from "../../lib/sanity/client";

import { urlFor } from "../../lib/sanity/image";

import {
  singleBlogQuery,
} from "../../lib/sanity/queries";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const components = {
  types: {
    externalImage: ({
  value,
}: any) => (
  <div className="my-12">
    <img
      src={value.url}
      alt={value.alt || ""}
      className="
        w-full
        rounded-[30px]
      "
    />
  </div>
),

    youtube: ({
      value,
    }: any) => {
      const videoId =
        value?.url
          ?.split("v=")[1]
          ?.split("&")[0];

      return (
        <div className="my-12">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            className="
              w-full
              rounded-[30px]
            "
          />
        </div>
      );
    },
  },

  block: {
    h1: ({
      children,
    }: any) => (
      <h1
        className="
          mt-16
          text-[48px]
          font-black
          leading-[1.1]
          tracking-[-0.04em]
          text-[#1a0f30]
        "
      >
        {children}
      </h1>
    ),

    h2: ({
      children,
    }: any) => (
      <h2
        className="
          mt-14
          text-[38px]
          font-black
          leading-[1.1]
          tracking-[-0.04em]
          text-[#1a0f30]
        "
      >
        {children}
      </h2>
    ),

    normal: ({
      children,
    }: any) => (
      <p
        className="
          mt-8
          text-[18px]
          leading-[2]
          text-[#1a0f30]/75
        "
      >
        {children}
      </p>
    ),
  },
};

export default async function BlogPage({
  params,
}: Props) {
  const { slug } =
    await params;

  const blog =
    await client.fetch(
      singleBlogQuery,
      {
        slug,
      }
    );

  if (!blog) {
    notFound();
  }

  return (
    <main
      className="
        min-h-screen
        bg-[#faf8fd]
      "
    >
      {/* GRID */}

      <div className="blog-grid-lines" />

      {/* GLOW */}

      <div className="blog-glow" />

      <section
        className="
          relative
          z-10
          max-w-[1000px]
          mx-auto
          px-6
          py-28
        "
      >
        {/* COVER */}

        {blog.coverImage && (
          <div
            className="
              relative
              h-[520px]
              overflow-hidden
              rounded-[40px]
            "
          >
            <Image
              fill
              priority
              alt={blog.title}
              src={urlFor(
                blog.coverImage
              ).url()}
              className="
                object-cover
              "
            />
          </div>
        )}

        {/* TAG */}

        <div
          className="
            inline-flex
            mt-10
            rounded-full
            border
            border-[#dfd4f5]
            bg-[#f3effe]
            px-4
            py-2
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-[#6040a8]
          "
        >
          {blog.tag}
        </div>

        {/* TITLE */}

        <h1
          className="
            mt-8
            text-[56px]
            leading-[0.95]
            tracking-[-0.05em]
            text-[#1a0f30]
            font-black
          "
        >
          {blog.title}
        </h1>

        {/* META */}

        <div
          className="
            mt-6
            text-sm
            text-[#1a0f30]/50
          "
        >
          {blog.readTime} ·{" "}
          {new Date(
            blog.publishedAt
          ).toDateString()}
        </div>

        {/* EXCERPT */}

        <p
          className="
            mt-8
            text-[22px]
            leading-[1.9]
            text-[#1a0f30]/70
          "
        >
          {blog.excerpt}
        </p>

        {/* CONTENT */}

        <div className="mt-16">
          <PortableText
            value={blog.content}
            components={
              components
            }
          />
        </div>
      </section>
    </main>
  );
}
