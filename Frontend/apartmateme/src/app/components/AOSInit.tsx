// components/AOSInit.tsx
"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,     // Animation duration
      once: true,        // Whether animation should happen only once
      mirror: false,     // Don't re-animate elements on scroll down
    });
  }, []);

  return null;
};