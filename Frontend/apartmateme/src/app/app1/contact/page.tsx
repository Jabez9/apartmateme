// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function ContactPage() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Dynamically load WOW.js on client-side
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const script = document.createElement("script");
//       script.src = "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js";
//       script.async = true;
//       script.onload = () => {
//         if (window.WOW) {
//           new window.WOW().init();
//         }
//       };
//       document.body.appendChild(script);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData);

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const text = await res.text();
//       let result;
//       try {
//         result = JSON.parse(text);
//       } catch {
//         throw new Error("Server did not return JSON: " + text);
//       }

//       if (result.status === "success") {
//         setSuccess("Message sent successfully!");
//         e.target.reset();

//         setTimeout(() => setSuccess(""), 2500);
//       } else {
//         setError(result.message || "Failed to send message.");
//       }
//     } catch {
//       setError("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main>
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
//             style={{ fontWeight: "bolder" }}
//           >
//             Contact Us
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0 wow animate__animated animate__fadeInDown">
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Contact</li>
//           </ol>
//         </div>
//       </div>

//       <section id="contact" className="py-5" style={{ backgroundColor: "#f3f6f8" }}>
//         <div className="container">
//           <div
//             className="text-center mx-auto pb-5 wow animate__animated animate__fadeInUp"
//             style={{ maxWidth: 800 }}
//           >
//             <h1 className="display-5 text-capitalize mb-3">
//               <span style={{ color: "black", fontWeight: "bold" }}>Contact </span>
//               <span style={{ color: "red", fontWeight: "bold" }}>Us</span>
//             </h1>
//             <p className="mb-0">
//               Just get in touch any day, any time through the avenues below.
//             </p>
//           </div>

//           <div className="row gy-4">
//             {/* Left column with cards for Address, Phone, Email */}
//             <div className="col-md-6">
//               <div className="contact-card bg-white rounded shadow-sm p-4 text-center mb-4 wow animate__animated animate__fadeInUp">
//                 <i className="bi bi-geo-alt text-primary fs-1"></i>
//                 <h5 className="mt-3">Address</h5>
//                 <p className="mb-0">P.O Box 15653 - 00100, Nairobi</p>
//               </div>
//               <div className="contact-card bg-white rounded shadow-sm p-4 text-center mb-4 wow animate__animated animate__fadeInUp">
//                 <i className="bi bi-telephone text-success fs-1"></i>
//                 <h5 className="mt-3">Call Us</h5>
//                 <a href="tel:+254791751475" className="text-dark">
//                   +254791751475
//                 </a>
//               </div>
//               <div className="contact-card bg-white rounded shadow-sm p-4 text-center wow animate__animated animate__fadeInUp">
//                 <i className="bi bi-envelope text-danger fs-1"></i>
//                 <h5 className="mt-3">Email Us</h5>
//                 <a href="mailto:apartmateme@gmail.com" className="text-dark">
//                   apartmateme@gmail.com
//                 </a>
//               </div>
//             </div>

//             {/* Right column with map and contact form */}
//             <div className="col-md-6">
//               <div className="contact-card bg-white rounded shadow-sm p-4 wow animate__animated animate__fadeInUp mb-4">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.657302780396!2d36.76590507574663!3d-1.3822639986046639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f059ba53cc253%3A0x84f65413371bebb!2sMultimedia%20University%20of%20Kenya!5e0!3m2!1sen!2ske!4v1732543338767!5m2!1sen!2ske"
//                   width="100%"
//                   height="250"
//                   style={{ border: 0 }}
//                   allowFullScreen={true}
//                   loading="lazy"
//                   title="Google Map Location"
//                 />
//               </div>

//               <div className="contact-card bg-white rounded shadow-sm p-4 wow animate__animated animate__fadeInUp">
//                 <form onSubmit={handleSubmit} noValidate>
//                   <div className="row gx-3 gy-3">
//                     <div className="col-md-6">
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-control"
//                         placeholder="Your Name"
//                         required
//                         style={{ minWidth: "100%" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input
//                         type="email"
//                         name="email"
//                         className="form-control"
//                         placeholder="Your Email"
//                         required
//                         style={{ minWidth: "100%" }}
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-3 mt-3">
//                     <input
//                       type="text"
//                       name="subject"
//                       className="form-control"
//                       placeholder="Subject"
//                       required
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <textarea
//                       name="message"
//                       rows={5}
//                       className="form-control"
//                       placeholder="Message"
//                       required
//                     ></textarea>
//                   </div>

//                   {loading && <div className="text-primary mb-2">Sending...</div>}
//                   {success && !loading && (
//                     <div className="text-success mb-2">{success}</div>
//                   )}
//                   {error && <div className="text-danger mb-2">{error}</div>}

//                   <div className="text-center">
//                     <button type="submit" className="btn btn-danger btn-send">
//                       Send Message
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Animate.css CSS */}
//       <link
//         rel="stylesheet"
//         href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
//       />

//       <style jsx>{`
//         .contact-card {
//           transition: box-shadow 0.3s ease;
//         }
//         .contact-card:hover {
//           box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15);
//         }
//         .btn-send {
//           min-width: 150px;
//         }
//       `}</style>
//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Extend the Window interface to include WOW
declare global {
  interface Window {
    WOW: {
      new (): { init(): void };
    };
  }
}

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dynamically load WOW.js on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js";
      script.async = true;
      script.onload = () => {
        if (window.WOW) {
          new window.WOW().init();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server did not return JSON: " + text);
      }

      if (result.status === "success") {
        setSuccess("Message sent successfully!");
        e.currentTarget.reset();

        setTimeout(() => setSuccess(""), 2500);
      } else {
        setError(result.message || "Failed to send message.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
            style={{ fontWeight: "bolder" }}
          >
            Contact Us
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 wow animate__animated animate__fadeInDown">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Contact</li>
          </ol>
        </div>
      </div>

      <section id="contact" className="py-5" style={{ backgroundColor: "#f3f6f8" }}>
        <div className="container">
          <div
            className="text-center mx-auto pb-5 wow animate__animated animate__fadeInUp"
            style={{ maxWidth: 800 }}
          >
            <h1 className="display-5 text-capitalize mb-3">
              <span style={{ color: "black", fontWeight: "bold" }}>Contact </span>
              <span style={{ color: "red", fontWeight: "bold" }}>Us</span>
            </h1>
            <p className="mb-0">
              Just get in touch any day, any time through the avenues below.
            </p>
          </div>

          <div className="row gy-4">
            {/* Left column with cards for Address, Phone, Email */}
            <div className="col-md-6">
              <div className="contact-card bg-white rounded shadow-sm p-4 text-center mb-4 wow animate__animated animate__fadeInUp">
                <i className="bi bi-geo-alt text-primary fs-1"></i>
                <h5 className="mt-3">Address</h5>
                <p className="mb-0">P.O Box 15653 - 00100, Nairobi</p>
              </div>
              <div className="contact-card bg-white rounded shadow-sm p-4 text-center mb-4 wow animate__animated animate__fadeInUp">
                <i className="bi bi-telephone text-success fs-1"></i>
                <h5 className="mt-3">Call Us</h5>
                <a href="tel:+254791751475" className="text-dark">
                  +254791751475
                </a>
              </div>
              <div className="contact-card bg-white rounded shadow-sm p-4 text-center wow animate__animated animate__fadeInUp">
                <i className="bi bi-envelope text-danger fs-1"></i>
                <h5 className="mt-3">Email Us</h5>
                <a href="mailto:apartmateme@gmail.com" className="text-dark">
                  apartmateme@gmail.com
                </a>
              </div>
            </div>

            {/* Right column with map and contact form */}
            <div className="col-md-6">
              <div className="contact-card bg-white rounded shadow-sm p-4 wow animate__animated animate__fadeInUp mb-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.657302780396!2d36.76590507574663!3d-1.3822639986046639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f059ba53cc253%3A0x84f65413371bebb!2sMultimedia%20University%20of%20Kenya!5e0!3m2!1sen!2ske!4v1732543338767!5m2!1sen!2ske"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Google Map Location"
                />
              </div>

              <div className="contact-card bg-white rounded shadow-sm p-4 wow animate__animated animate__fadeInUp">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row gx-3 gy-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required
                        style={{ minWidth: "100%" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Your Email"
                        required
                        style={{ minWidth: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="mb-3 mt-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="message"
                      rows={5}
                      className="form-control"
                      placeholder="Message"
                      required
                    ></textarea>
                  </div>

                  {loading && <div className="text-primary mb-2">Sending...</div>}
                  {success && !loading && (
                    <div className="text-success mb-2">{success}</div>
                  )}
                  {error && <div className="text-danger mb-2">{error}</div>}

                  <div className="text-center">
                    <button type="submit" className="btn btn-danger btn-send" disabled={loading}>
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animate.css CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />

      <style jsx>{`
        .contact-card {
          transition: box-shadow 0.3s ease;
        }
        .contact-card:hover {
          box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.15);
        }
        .btn-send {
          min-width: 150px;
        }
      `}</style>
    </main>
  );
}
