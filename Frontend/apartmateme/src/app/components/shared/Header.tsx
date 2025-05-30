
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 85);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const linkStyle = (path: string) => ({
    backgroundColor: pathname === path ? "red" : "transparent",
    borderRadius: "4px",
    padding: "4px 8px",
    transition: "background-color 0.3s ease",
  });

  return (
    <>
      <header
        className={`header fixed-top d-flex align-items-center ${
          scrolled ? "bg-visible" : "bg-hidden"
        }`}
      >
        <div className="container d-flex align-items-center position-relative">
          {/* Logo on left */}
          <Link href="/" className="logo d-flex align-items-center text-decoration-none">
            <Image
              src="/assets/images/icons/apartmateme_logo.jpeg"
              alt="Logo"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <h1 className="sitename ms-2 mb-0 text-white">ApartmateMe</h1>
          </Link>

          {/* Desktop Nav: flex grow to take available space and center it */}
          <nav
            id="navmenu"
            className="navmenu d-none d-xl-flex flex-grow-1 justify-content-center"
          >
            <ul className="d-flex gap-4 list-unstyled mb-0 p-0">
              <li>
                <Link
                  href="/"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/app1/about"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/app1/about")}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/app1/services"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/app1/services")}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/app1/contact"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/app1/contact")}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/app1/bedsitters"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/app1/bedsitters")}
                >
                  Bedsitters
                </Link>
              </li>
              <li>
                <Link
                  href="/app1/onebd"
                  className="text-white text-decoration-none fw-bold"
                  style={linkStyle("/app1/onebd")}
                >
                  OneBd
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger button: absolutely positioned top-right on small screens */}
          <button
            className="mobile-nav-toggle d-xl-none btn btn-link p-0"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#007bff",
              borderRadius: "4px",
              padding: "4px 8px",
              color: "white",
              border: "none",
              zIndex: 20,
            }}
          >
            <i className={`bi ${mobileMenuOpen ? "bi-x" : "bi-list"} fs-2`}></i>
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <nav className="mobile-nav d-xl-none bg-dark text-white p-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <Link
                href="/"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/")}
              >
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/app1/about"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/app1/about")}
              >
                About
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/app1/services"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/app1/services")}
              >
                Services
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/app1/contact"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/app1/contact")}
              >
                Contact
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/app1/bedsitters"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/app1/bedsitters")}
              >
                Bedsitters
              </Link>
            </li>
            <li>
              <Link
                href="/app1/onebd"
                className="text-white text-decoration-none fw-bold"
                style={linkStyle("/app1/onebd")}
              >
                OneBd
              </Link>
            </li>
          </ul>
        </nav>
      )}

      {/* Styling */}
      <style jsx>{`
        header.header {
          height: 100px;
          width: 100%;
          z-index: 1030;
          transition: background 0.5s ease-in-out;
        }

        .bg-hidden {
          background: transparent;
        }

        .bg-visible {
          background: linear-gradient(
              rgba(31, 46, 78, 1),
              rgba(0, 12, 33, 0.8)
            ),
            url("/assets/img/fact-bg.jpg");
          background-position: center top;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .mobile-nav {
          position: fixed;
          top: 100px;
          left: 0;
          right: 0;
          z-index: 1029;
          background-color: #0d6efd;
          color: white;
        }

        .mobile-nav a {
          color: white;
        }
        .mobile-nav a:hover {
          text-decoration: underline;
          color: #ffc107;
        }
      `}</style>
    </>
  );
}
