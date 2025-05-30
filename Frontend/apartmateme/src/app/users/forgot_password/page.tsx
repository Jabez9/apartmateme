// "use client";
// import { useState } from "react";
// import Link from "next/link";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/forgot_password/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       );

//       if (res.ok) {
//         const data = await res.json();
//         setMessage(data.message || "Reset link sent successfully! Check your email.");
//         setEmail("");
//       } else {
//         const data = await res.json();
//         setError(data.error || "Something went wrong.");
//       }
//     } catch (err) {
//       setError("Network error. Please try again later.");
//     }
//   };

//   return (
//     <>
//       {/* Breadcrumb and header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
//           <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
//             Forgot Password
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0">
//             <li className="breadcrumb-item">
//               <a href="/" className="text-white">
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item active text-danger">Forgot Password</li>
//           </ol>
//         </div>
//       </div>

//       {/* Main form section */}
//       <section style={{ backgroundColor: "rgb(229, 238, 245)" }}>
//         <div className="container py-5">
//           <div className="row justify-content-center">
//             <div className="col-12 col-md-8 col-lg-6">
//               <div className="card rounded p-4">
//                 <h1 className="text-center mb-4">Reset Your Password</h1>

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label htmlFor="email" className="form-label">
//                       Enter your email address
//                     </label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       name="email"
//                       placeholder="your-email@example.com"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>

//                   <div className="d-flex justify-content-center">
//                     <button type="submit" className="btn btn-primary">
//                       Send Reset Link
//                     </button>
//                   </div>
//                 </form>

//                 {message && <p className="text-success mt-3 text-center">{message}</p>}
//                 {error && <p className="text-danger mt-3 text-center">{error}</p>}

//                 <p className="text-center mt-3">
//                   <Link href="/login" style={{ color: "green" }}>
//                     Back to Login
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forgot_password/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || "Reset link sent successfully! Check your email.");
        setEmail("");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <>
      {/* Breadcrumb and header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
            Forgot Password
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active text-danger">Forgot Password</li>
          </ol>
        </div>
      </div>

      {/* Main form section */}
      <section style={{ backgroundColor: "rgb(229, 238, 245)" }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card rounded p-4">
                <h1 className="text-center mb-4">Reset Your Password</h1>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Enter your email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="your-email@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Send Reset Link
                    </button>
                  </div>
                </form>

                {message && <p className="text-success mt-3 text-center">{message}</p>}
                {error && <p className="text-danger mt-3 text-center">{error}</p>}

                <p className="text-center mt-3">
                  <Link href="/login" style={{ color: "green" }}>
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
