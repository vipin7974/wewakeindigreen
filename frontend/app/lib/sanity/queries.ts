import { groq } from "next-sanity";

export const heroQuery = groq`
  *[_type == "hero"][0]{
    title,
    badge1,
    badge2,
    subtitle
  }
`;
