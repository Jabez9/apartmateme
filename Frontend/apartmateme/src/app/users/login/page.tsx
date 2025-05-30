// "use client";
// import { useState } from 'react';

// // Helper function to get auth token from localStorage
// function getAuthToken() {
//   return localStorage.getItem('authToken');
// }

// // Example helper to make authenticated fetch requests
// async function authFetch(url, options = {}) {
//   const token = getAuthToken();
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(options.headers || {}),
//   };
//   if (token) {
//     headers['Authorization'] = `Token ${token}`;
//   }
//   const response = await fetch(url, {
//     ...options,
//     headers,
//   });
//   return response;
// }

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         console.log('Login successful:', data);
//         // Save token in localStorage
//         localStorage.setItem('authToken', data.access);
//         localStorage.setItem('refreshToken', data.refresh);

//         // Redirect to dashboard or wherever
//         window.location.href = '/users/landlorddashboard';
//       } else {
//         const data = await res.json();
//         setErrorMessage(data.error || 'Invalid credentials.');
//       }
//     } catch (err) {
//       setErrorMessage('Network error. Please try again later.');
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-2" style={{ maxWidth: '900px' }}>
//           <h4
//             className="text-white display-4 mb-4"
//             style={{ fontWeight: 'bolder' }}
//           >
//             Home Owners&apos; Login
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0">
//             <li className="breadcrumb-item">
//               <a href="/" className="text-white">Home</a>
//             </li>
//             <li className="breadcrumb-item active text-danger">Login</li>
//           </ol>
//         </div>
//       </div>

//       {/* Main section */}
//       <section className="vh-100" style={{ backgroundColor: 'rgb(243, 246, 248)' }}>
//         <div className="mask d-flex align-items-center h-100 gradient-custom-3">
//           <div className="container h-100">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="col-12 col-md-9 col-lg-7 col-xl-6">
//                 <div className="card" style={{ borderRadius: '15px' }}>
//                   <div className="card-body p-5">
//                     <h2 className="text-uppercase text-center mb-5">Login</h2>

//                     {/* Error message */}
//                     {errorMessage && (
//                       <div className="alert alert-danger" role="alert">
//                         {errorMessage}
//                       </div>
//                     )}

//                     <form onSubmit={handleSubmit}>

//                       <div className="form-outline mb-4">
//                         <input
//                           type="email"
//                           name="email"
//                           id="form3Example3cg"
//                           className="form-control form-control-lg"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           required
//                         />
//                         <label className="form-label" htmlFor="form3Example3cg">
//                           Your Email
//                         </label>
//                       </div>

//                       <div className="form-outline mb-4">
//                         <input
//                           type="password"
//                           name="password"
//                           id="form3Example4cg"
//                           className="form-control form-control-lg"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                         <label className="form-label" htmlFor="form3Example4cg">
//                           Password
//                         </label>
//                       </div>

//                       <div className="mb-4 text-end">
//                         <a href="/users/forgot_password" className="text-muted" style={{ fontSize: '0.9rem' }}>
//                           Forgot Password?
//                         </a>
//                       </div>

//                       <div className="d-flex justify-content-center">
//                         <button
//                           type="submit"
//                           className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
//                         >
//                           Login
//                         </button>
//                       </div>

//                       <p className="text-center text-muted mt-5 mb-0">
//                         Don&apos;t have an account?{' '}
//                         <a href="/users/register" style={{ color: 'green' }}>
//                           Register here
//                         </a>
//                       </p>
//                     </form>
//                   </div>
//                 </div>
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

// Helper function to get auth token from localStorage
// function getAuthToken() {
//   return localStorage.getItem("authToken");
// }

// Commented out to avoid unused var error, uncomment if needed later
/*
async function authFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }
  const response = await fetch(url, {
    ...options,
    headers,
  });
  return response;
}
*/

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Typed response data to avoid 'any'
      const data: { access?: string; refresh?: string; error?: string } = await res.json();

      if (res.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("authToken", data.access!);
        localStorage.setItem("refreshToken", data.refresh!);
        window.location.href = "/users/landlorddashboard";
      } else {
        setErrorMessage(data.error || "Invalid credentials.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-2" style={{ maxWidth: "900px" }}>
          <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
            Home Owners&apos; Login
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active text-danger">Login</li>
          </ol>
        </div>
      </div>

      {/* Main section */}
      <section className="vh-100" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>

                    {/* Error message */}
                    {errorMessage && (
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="mb-4 text-end">
                        <Link
                          href="/users/forgot_password"
                          className="text-muted"
                          style={{ fontSize: "0.9rem" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Don&apos;t have an account?{" "}
                        <Link href="/users/register" style={{ color: "green" }}>
                          Register here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
