// "use client";
// import Link from "next/link";
// import { useEffect } from "react";

// // Services data
// const services = [
//   {
//     icon: "tshirt",
//     title: "Laundry Services",
//     description:
//       "We bring together several Laundry service providers to make your cleaning hassle free.",
//     delay: 100,
//   },
//   {
//     icon: "bicycle",
//     title: "Bike Renting",
//     description:
//       "Formless, hit us up to rent a bike be it for a person or wewe na mbogi yako. Lazima uride.",
//     delay: 200,
//   },
//   {
//     icon: "code",
//     title: "Web Development",
//     description:
//       "Behind this website is a brilliant team of individuals that make it possible for you to access ApartmateMe. In need of one for your wonderful ideas? Look no further than the designer below.",
//     delay: 300,
//   },
//   {
//     icon: "route",
//     title: "Road Trips",
//     description:
//       "In 2025, with the addition of further properties, we are bringing on board various road trip ideas. Be on the lookout.",
//     delay: 400,
//   },
//   {
//     icon: "laptop",
//     title: "Laptop Repair",
//     description:
//       "We collaborate with several trusted Laptop and other electronic repair shops. If your device gets faulty, look no further.",
//     delay: 500,
//   },
//   {
//     icon: "car-front",
//     title: "Migration Service",
//     description:
//       "We are able to provide you with the necessary trusted mode of transportation of your paraphernalia to your new house.",
//     delay: 600,
//   },
// ];

// export default function ServicesPage() {
//   useEffect(() => {
//     import("wow.js").then((module) => {
//       const WOW = module.default || module;
//       new WOW().init();
//     });
//   }, []);

//   return (
//     <main className="bg-light">
//       {/* Header Section */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
//             data-wow-delay="0.1s"
//             style={{ fontWeight: "bolder" }}
//           >
//             Our Services
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
//             data-wow-delay="0.3s"
//           >
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Services</li>
//           </ol>
//         </div>
//       </div>

//       {/* Section Title */}
//       <section className="py-4">
//         <div
//           className="text-center mx-auto pb-5 wow fadeInUp"
//           data-wow-delay="0.1s"
//           style={{ maxWidth: 800 }}
//         >
//           <h1 className="display-5 text-capitalize mb-3">
//             <span className="text-dark fw-bold">ApartmateMe </span>
//             <span className="fw-bold" style={{ color: "red" }}>
//               Services
//             </span>
//           </h1>
//           <p className="mb-0 text-muted">We also provide a wide range of services.</p>
//         </div>
//       </section>

//       {/* Services Cards */}
//       <section className="py-4">
//         <div
//           className="container card rounded shadow-lg"
//           style={{ backgroundColor: "#dedfdf", padding: "30px" }}
//         >
//           <div className="row g-4 wow fadeInUp">
//             {services.map((service, index) => (
//               <div key={index} className="col-md-6 col-lg-4">
//                 <ServiceCard
//                   icon={service.icon}
//                   title={service.title}
//                   delay={service.delay}
//                 >
//                   {service.description}
//                 </ServiceCard>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// // ServiceCard Component
// function ServiceCard({
//   icon,
//   title,
//   children,
//   delay,
// }: {
//   icon: string;
//   title: string;
//   children: React.ReactNode;
//   delay: number;
// }) {
//   return (
//     <div
//       className="card h-100 shadow-sm p-4 wow fadeInUp service-hover-card"
//       data-wow-delay={`${delay}ms`}
//     >
//       <div className="text-center mb-3">
//         <i className={`bi bi-${icon} service-icon`}></i>
//       </div>
//       <div className="card-body text-center">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text">{children}</p>
//       </div>

//       {/* Inline styles for hover effect */}
//       <style jsx>{`
//         .service-hover-card {
//           transition: all 0.4s ease;
//           border-radius: 10px;
//           background-color: #fff;
//         }

//         .service-hover-card:hover {
//           background-color: #dc3545 !important;
//           border-radius: 40px;
//           color: #fff;
//         }

//         .service-hover-card:hover .card-title,
//         .service-hover-card:hover .card-text,
//         .service-hover-card:hover .service-icon {
//           color: #fff !important;
//         }

//         .service-icon {
//           font-size: 2rem;
//           transition: color 0.4s ease;
//           color: #dc3545;
//         }

//         .card-title,
//         .card-text {
//           transition: color 0.4s ease;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useEffect } from "react";

const services = [
  {
    icon: "droplet", // substitute for tshirt (Laundry)
    title: "Laundry Services",
    description:
      "We bring together several Laundry service providers to make your cleaning hassle free.",
    delay: 100,
  },
  {
    icon: "bicycle",
    title: "Bike Renting",
    description:
      "Formless, hit us up to rent a bike be it for a person or wewe na mbogi yako. Lazima uride.",
    delay: 200,
  },
  {
    icon: "code",
    title: "Web Development",
    description:
      "Behind this website is a brilliant team of individuals that make it possible for you to access ApartmateMe. In need of one for your wonderful ideas? Look no further than the designer below.",
    delay: 300,
  },
  {
    icon: "compass", // substitute for route (Road Trips)
    title: "Road Trips",
    description:
      "In 2025, with the addition of further properties, we are bringing on board various road trip ideas. Be on the lookout.",
    delay: 400,
  },
  {
    icon: "laptop",
    title: "Laptop Repair",
    description:
      "We collaborate with several trusted Laptop and other electronic repair shops. If your device gets faulty, look no further.",
    delay: 500,
  },
  {
    icon: "car-front",
    title: "Migration Service",
    description:
      "We are able to provide you with the necessary trusted mode of transportation of your paraphernalia to your new house.",
    delay: 600,
  },
];

type ServiceCardProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
  delay: number;
};

export default function ServicesPage() {
 useEffect(() => {
    import("wow.js").then((module) => {
      const WOW = module.default;
      new WOW().init();
    });
  }, []);

  return (
    <main className="bg-light">
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
            style={{ fontWeight: "bolder" }}
          >
            Our Services
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Services</li>
          </ol>
        </div>
      </div>

      <section className="py-4">
        <div
          className="text-center mx-auto pb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: 800 }}
        >
          <h1 className="display-5 text-capitalize mb-3">
            <span className="text-dark fw-bold">ApartmateMe </span>
            <span style={{ color: "red" }} className="fw-bold">
              Services
            </span>
          </h1>
          <p className="mb-0 text-muted">
            We also provide a wide range of services.
          </p>
        </div>
      </section>

      <section className="py-4">
        <div
          className="container card rounded shadow-lg"
          style={{ backgroundColor: "#dedfdf", padding: "30px" }}
        >
          <div className="row g-4 wow fadeInUp">
            {services.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  delay={service.delay}
                >
                  {service.description}
                </ServiceCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ icon, title, children, delay }: ServiceCardProps) {
  return (
    <div
      className="service-card card h-100 shadow-sm p-4 wow fadeInUp"
      data-wow-delay={`${delay}ms`}
    >
      <div className="text-center mb-3">
        <i
          className={`bi bi-${icon} text-danger`}
          style={{ fontSize: "2rem" }}
          aria-hidden="true"
        ></i>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title text-primary">{title}</h5>
        <p className="card-text text-muted">{children}</p>
      </div>

      <style jsx>{`
        .service-card {
          background-color: white;
          border-radius: 8px;
          transition: border-radius 0.4s ease, box-shadow 0.4s ease;
          position: relative;
          z-index: 0;
          cursor: pointer;
        }

        .service-card:hover {
          border-radius: 40px;
          background-color: white;
          box-shadow:
            inset 12px 12px 0 0 red,
            inset -12px 12px 0 0 red,
            inset 12px -12px 0 0 red,
            inset -12px -12px 0 0 red;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
