"use client";

import { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import ProductModal from "./ProductsModal";

import { productsData } from "./data";

const products = [
  {
    id: "bag",
    title: "Carry Bag",
    subtitle:
      "Drop-in replacement for HDPE plastic bags",
    impact: "Saves 2.3kg CO₂/kg vs plastic",
    image:
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=900&q=80",
  },

  {
    id: "cutlery",
    title: "Disposable Cutlery",
    subtitle:
      "Fork, knife, spoon — fully compostable",
    impact: "Zero toxins in landfill",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80",
  },

  {
    id: "bowl",
    title: "BioMANS Bowl",
    subtitle:
      "Sturdy, heat-resistant, fully bio",
    impact: "Replaces 12g plastic per bowl",
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80",
  },

  {
    id: "earbuds",
    title: "Cotton Earbuds",
    subtitle:
      "BioMANS stem replaces polypropylene",
    impact: "1.5B plastic stems avoided/year",
    image:
      "https://images.unsplash.com/photo-1606906568585-f3a0e7b96e9e?w=900&q=80",
  },

  {
    id: "bib",
    title: "Bib & Medical Sheet",
    subtitle:
      "Medical & industrial grade bioplastic",
    impact: "Safe for skin contact",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },

  {
    id: "lanyard",
    title: "Event Lanyard",
    subtitle:
      "Leaves zero trace after the event",
    impact: "Biodegrades after event lifecycle",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80",
  },
];

export default function ProductsSection() {
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);

  return (
    <>
      <section
        id="products"
        className="
          relative
          overflow-hidden
          py-28
          bg-[#faf8fd]
        "
      >
        {/* GRID */}

        <div className="products-grid-lines" />

        {/* GLOW */}

        <div className="products-glow" />

        {/* FLOATING BOXES */}

        <div className="products-box box-1" />
        <div className="products-box box-2" />
        <div className="products-box box-3" />

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
          {/* INTRO */}

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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-[700px]"
            >
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

                Our Technology
              </div>

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
                BioMANS{" "}

                <span className="italic text-[#6040a8]">
                  Products
                </span>
              </h2>
            </motion.div>

            {/* RIGHT */}

            <motion.p
              initial={{ opacity: 0, y: 40 }}
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
                max-w-[460px]
                text-lg
                leading-[1.9]
                text-[#1a0f30]/60
              "
            >
              Click any product to see exactly
              how it&apos;s manufactured from
              agro-waste and its verified
              real-world environmental impact.
            </motion.p>
          </div>

          {/* PRODUCTS GRID */}

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
              mt-20
            "
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 50,
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
                  product-card
                  group
                  cursor-pointer
                "
                onClick={() =>
                  setSelectedProduct(
                    productsData[
                      product.id as keyof typeof productsData
                    ]
                  )
                }
              >
                {/* IMAGE */}

                <div className="product-image-wrap">
                  <Image
                    fill
                    src={product.image}
                    alt={product.title}
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="product-image-overlay" />

                  <div className="product-tag">
                    BioMANS
                  </div>
                </div>

                {/* BODY */}

                <div className="product-body">
                  <h3 className="product-title">
                    {product.title}
                  </h3>

                  <p className="product-subtitle">
                    {product.subtitle}
                  </p>

                  <div className="product-footer">
                    <div className="product-impact">
                      {product.impact}
                    </div>

                    <button
                      type="button"
                      className="product-btn"
                    >
                      How it&apos;s made

                      <ArrowOutwardIcon
                        sx={{ fontSize: 16 }}
                      />
                    </button>
                  </div>
                </div>

                {/* HOVER */}

                <div className="product-hover-glow" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}

      <ProductModal
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </>
  );
}
