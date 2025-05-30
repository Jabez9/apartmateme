
// "use client";
// import { useEffect } from "react";

// export default function WowInit() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("wowjs").then(({ WOW }) => {
//         new WOW().init();
//       });
//     }
//   }, []);

//   return null;
// }

// "use client";
// import { useEffect } from "react";

// export default function WowInit() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       import("wowjs").then(WOWModule => {
//         new WOWModule.default().init();  // use default here
//       });
//     }
//   }, []);

//   return null;
// }
"use client";
import { useEffect } from "react";

export default function WowInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("wow.js").then((module) => {
        new module.default().init();
      });
    }
  }, []);

  return null;
}
