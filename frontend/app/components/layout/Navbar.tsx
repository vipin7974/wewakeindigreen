"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Drawer } from "@mui/material";
import { Menu, X } from "lucide-react";

const navLinks = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Plastic Crisis",
    href: "#plastic",
  },
  {
    label: "BioMANS",
    href: "#products",
  },
  {
    label: "SDG Goals",
    href: "#sdg",
  },
  {
    label: "Blog",
    href: "#blog",
  },
  {
    label: "Team",
    href: "#team",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg py-4 border-b border-brand-100"
              : "py-6"
          }
        `}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}

         <Link
  href="/"
  className="flex items-center gap-4 group"
>
  {/* LOGO */}

  <div
    className="
      relative
      w-12
      h-12
      transition-all
      duration-500
      group-hover:scale-105
      ml-4
    "
  >
    <Image
      src="/images/logo.PNG"
      alt="WeWake Logo"
      width={48}
      height={48}
      priority
      className="object-contain"
    />
  </div>

  {/* TEXT */}

  {/* <div className="flex flex-col leading-none">
    <span
      className="
        text-[20px]
        font-black
        tracking-[-0.03em]
        text-[#1a0f30]
      "
    >
      WeWake
    </span>

    <span
      className="
        text-[11px]
        uppercase
        tracking-[0.25em]
        text-[#6040a8]
        mt-1
      "
    >
      IndiGreen
    </span>
  </div> */}
</Link>

          {/* Desktop Links */}

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                  text-sm font-medium text-[#6b5f85]
                  hover:text-brand-600
                  transition-colors
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}

          <div className="hidden lg:block
          mr-4
          ">
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "999px",
                px: 3,
                py: 1.2,
                boxShadow:
                  "0 6px 20px rgba(78,47,142,0.28)",
              }}
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div className="w-[320px] h-full bg-white p-6 flex flex-col">
          {/* Top */}

          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-brand-800">
              Menu
            </h2>

            <button
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* Links */}

          <div className="flex flex-col gap-6 mt-12">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="
                  text-lg font-medium
                  text-[#6b5f85]
                  hover:text-brand-600
                "
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}

          <Button
            variant="contained"
            color="primary"
            className="!mt-auto"
            sx={{
              borderRadius: "999px",
              py: 1.5,
            }}
          >
            Contact Us
          </Button>
        </div>
      </Drawer>
    </>
  );
}
