
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function AdminLogin() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Save tokens in localStorage
//         localStorage.setItem("accessToken", data.access);
//         localStorage.setItem("refreshToken", data.refresh);
//         // Set cookie (non-HTTP-only)
//         document.cookie = `accessToken=${data.access}; path=/; max-age=3600; secure; samesite=strict`;

//         router.push("/myadmin/admin_dashboard");
//       } else {
//         setErrorMsg(data.message || "Login failed");
//       }
//     } catch (error) {
//       setErrorMsg("Error connecting to server");
//       console.error(error);
//     }
//   };

//   return (
//     <main>
//       {/* Header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
//             data-wow-delay="0.1s"
//             style={{ fontWeight: "bolder" }}
//           >
//             Admin Login
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
//             data-wow-delay="0.3s"
//           >
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Admin Login</li>
//           </ol>
//         </div>
//       </div>

//       {/* Form Section */}
//       <div className="container py-5">
//         <div
//           className="mx-auto p-4 bg-white rounded shadow-sm wow fadeInUp"
//           data-wow-delay="0.2s"
//           style={{ maxWidth: 500 }}
//         >
//           {errorMsg && (
//             <div className="alert alert-danger text-center">{errorMsg}</div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="username" className="form-label fw-bold">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 className="form-control"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 autoComplete="username"
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label fw-bold">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//               />
//             </div>
//             <button type="submit" className="btn btn-danger w-100">Login</button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save tokens in localStorage
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        // Set cookie (non-HTTP-only)
        document.cookie = `accessToken=${data.access}; path=/; max-age=3600; secure; samesite=strict`;

        router.push("/myadmin/admin_dashboard");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg("Error connecting to server");
      console.error(error);
    }
  };

  return (
    <main>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
            style={{ fontWeight: "bolder" }}
          >
            Admin Login
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Admin Login</li>
          </ol>
        </div>
      </div>

      {/* Form Section */}
      <div className="container py-5">
        <div
          className="mx-auto p-4 bg-white rounded shadow-sm wow fadeInUp"
          data-wow-delay="0.2s"
          style={{ maxWidth: 500 }}
        >
          {errorMsg && (
            <div className="alert alert-danger text-center">{errorMsg}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
