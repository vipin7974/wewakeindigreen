import { groq } from "next-sanity";

export const heroQuery = groq`
  *[_type == "hero"][0]{
    title,
    badge1,
    badge2,
    subtitle
  }
`;

export const blogsQuery = groq`
  *[_type == "blog"]
  | order(publishedAt desc) {
    _id,

    title,

    slug,

    excerpt,

    coverImage,

    featured,

    tag,

    readTime,

    publishedAt
  }
`;

export const singleBlogQuery = groq`
  *[
    _type == "blog" &&
    slug.current == $slug
  ][0]{
    _id,

    title,

    slug,

    excerpt,

    coverImage,

    featured,

    tag,

    readTime,

    publishedAt,

    content
  }
`;
