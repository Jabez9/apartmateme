

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { djangoFetch } from "@/lib/apiClient";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     repeat_pass: "",
//     termsAccepted: false,
//   });

//   const [errors, setErrors] = useState<string | null>(null);
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors(null);

//     if (!formData.termsAccepted) {
//       setErrors("You must accept the terms of service.");
//       return;
//     }

//     if (formData.password !== formData.repeat_pass) {
//       setErrors("Passwords do not match.");
//       return;
//     }

//     setSubmitting(true);

//     const { name, email, password } = formData;

//     try {
//       const data = await djangoFetch("/api/auth/register/", {
//         method: "POST",
//         body: JSON.stringify({ name, email, password }),
//       });

//       // Handle success
//       window.location.href = "/users/login";
//     } catch (error: any) {
//       setErrors(error.message || "Registration failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-2" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4"
//             style={{ fontWeight: "bolder" }}
//           >
//             Register
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0">
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Register</li>
//           </ol>
//         </div>
//       </div>
//       {/* Main section */}
//       <section
//         className="bg-image"
//         style={{ backgroundColor: "rgb(243, 246, 248)", paddingBottom: 40 }}
//       >
//         <h3 style={{ textAlign: "center", marginTop: 40 }}>
//           Are you a Landlord or House agent? Become Part of ApartmateMe:
//         </h3>
//         <div className="mask d-flex align-items-center h-95 gradient-custom-3">
//           <div className="container h-95">
//             <div className="row d-flex justify-content-center align-items-center h-100">
//               <div className="col-12 col-md-9 col-lg-7 col-xl-6">
//                 <div className="card" style={{ borderRadius: 15 }}>
//                   <div className="card-body p-5">
//                     <h2 className="text-uppercase text-center mb-5">
//                       Create an account
//                     </h2>

//                     {errors && (
//                       <div className="alert alert-danger" role="alert">
//                         {errors}
//                       </div>
//                     )}

//                     <form onSubmit={handleSubmit}>
//                       {/* Name Field */}
//                       <div className="form-outline mb-4">
//                         <input
//                           type="text"
//                           name="name"
//                           className="form-control form-control-lg"
//                           value={formData.name}
//                           onChange={handleChange}
//                           required
//                         />
//                         <label className="form-label">Your Name</label>
//                       </div>

//                       {/* Email Field */}
//                       <div className="form-outline mb-4">
//                         <input
//                           type="email"
//                           name="email"
//                           className="form-control form-control-lg"
//                           value={formData.email}
//                           onChange={handleChange}
//                           required
//                         />
//                         <label className="form-label">Your Email</label>
//                       </div>

//                       {/* Password Field */}
//                       <div className="form-outline mb-4">
//                         <input
//                           type="password"
//                           name="password"
//                           className="form-control form-control-lg"
//                           value={formData.password}
//                           onChange={handleChange}
//                           required
//                         />
//                         <label className="form-label">Password</label>
//                       </div>

//                       {/* Repeat Password Field */}
//                       <div className="form-outline mb-4">
//                         <input
//                           type="password"
//                           name="repeat_pass"
//                           className="form-control form-control-lg"
//                           value={formData.repeat_pass}
//                           onChange={handleChange}
//                           required
//                         />
//                         <label className="form-label">Repeat your password</label>
//                       </div>

//                       {/* Terms Checkbox */}
//                       <div className="form-check d-flex justify-content-center mb-5">
//                         <input
//                           className="form-check-input me-2"
//                           type="checkbox"
//                           name="termsAccepted"
//                           id="termsCheckbox"
//                           checked={formData.termsAccepted}
//                           onChange={handleChange}
//                           required
//                         />
//                         <label className="form-check-label" htmlFor="termsCheckbox">
//                           I agree to all statements in{" "}
//                           <a href="#termsModal" data-bs-toggle="modal" className="text-body">
//                             <u>Terms of Service</u>
//                           </a>
//                         </label>
//                       </div>

//                       {/* Submit Button */}
//                       <div className="d-flex justify-content-center">
//                         <button
//                           type="submit"
//                           className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
//                           disabled={submitting}
//                         >
//                           {submitting ? "Registering..." : "Register"}
//                         </button>
//                       </div>
//                     </form>

//                     {/* Login Link */}
//                     <p className="text-center text-muted mt-5 mb-0">
//                       Already have an account?{" "}
//                       <Link href="/users/login" style={{ color: "green" }}>
//                         Login here
//                       </Link>
//                     </p>
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
import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { djangoFetch } from "@/lib/apiClient";

interface FormData {
  name: string;
  email: string;
  password: string;
  repeat_pass: string;
  termsAccepted: boolean;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    repeat_pass: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Typed event as ChangeEvent for inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Typed event as FormEvent for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

    if (!formData.termsAccepted) {
      setErrors("You must accept the terms of service.");
      return;
    }

    if (formData.password !== formData.repeat_pass) {
      setErrors("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const { name, email, password } = formData;

    try {
      // We don't need the returned data if not used, so omit 'data'
      await djangoFetch("/api/auth/register/", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      // Redirect on success
      window.location.href = "/users/login";
    } catch (error) {
      // Properly type error as unknown first, then handle safely
      let message = "Registration failed";
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        message = (error as { message: string }).message;
      }
      setErrors(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-2" style={{ maxWidth: 900 }}>
          <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
            Register
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Register</li>
          </ol>
        </div>
      </div>
      {/* Main section */}
      <section
        className="bg-image"
        style={{ backgroundColor: "rgb(243, 246, 248)", paddingBottom: 40 }}
      >
        <h3 style={{ textAlign: "center", marginTop: 40 }}>
          Are you a Landlord or House agent? Become Part of ApartmateMe:
        </h3>
        <div className="mask d-flex align-items-center h-95 gradient-custom-3">
          <div className="container h-95">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    {errors && (
                      <div className="alert alert-danger" role="alert">
                        {errors}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      {/* Name Field */}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label">Your Name</label>
                      </div>

                      {/* Email Field */}
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label">Your Email</label>
                      </div>

                      {/* Password Field */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-lg"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label">Password</label>
                      </div>

                      {/* Repeat Password Field */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="repeat_pass"
                          className="form-control form-control-lg"
                          value={formData.repeat_pass}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-label">Repeat your password</label>
                      </div>

                      {/* Terms Checkbox */}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          name="termsAccepted"
                          id="termsCheckbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="termsCheckbox">
                          I agree to all statements in{" "}
                          <a href="#termsModal" data-bs-toggle="modal" className="text-body">
                            <u>Terms of Service</u>
                          </a>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          disabled={submitting}
                        >
                          {submitting ? "Registering..." : "Register"}
                        </button>
                      </div>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-muted mt-5 mb-0">
                      Already have an account?{" "}
                      <Link href="/users/login" style={{ color: "green" }}>
                        Login here
                      </Link>
                    </p>
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
