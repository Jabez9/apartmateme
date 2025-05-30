// "use client";
// import { useState } from 'react';
// import Link from 'next/link';

// type ResetPasswordProps = {
//   onSubmit?: (params: { new_password1: string; new_password2: string }) => Promise<void>;
// };

// export default function ResetPassword({ onSubmit }: ResetPasswordProps) {
//   const [newPassword1, setNewPassword1] = useState('');
//   const [newPassword2, setNewPassword2] = useState('');
//   const [errors, setErrors] = useState({ newPassword1: '', newPassword2: '', nonField: '' });
//   const [submitting, setSubmitting] = useState(false);

//   // Simple client-side validation before submit
//   const validate = () => {
//     let valid = true;
//     const newErrors = { newPassword1: '', newPassword2: '', nonField: '' };

//     if (!newPassword1) {
//       newErrors.newPassword1 = 'This field is required.';
//       valid = false;
//     }
//     if (!newPassword2) {
//       newErrors.newPassword2 = 'This field is required.';
//       valid = false;
//     }
//     if (newPassword1 && newPassword2 && newPassword1 !== newPassword2) {
//       newErrors.nonField = 'Passwords do not match.';
//       valid = false;
//     }
//     setErrors(newErrors);
//     return valid;
//   };

//   interface ResetPasswordFormValues {
//     new_password1: string;
//     new_password2: string;
//   }

//   interface ResetPasswordErrors {
//     newPassword1: string;
//     newPassword2: string;
//     nonField: string;
//   }

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ): Promise<void> => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);
//     setErrors({ newPassword1: '', newPassword2: '', nonField: '' });

//     try {
//       // Call your API or handler passed as prop
//       if (onSubmit) {
//         await onSubmit({ new_password1: newPassword1, new_password2: newPassword2 });
//       } else {
//         // Example: send POST request to your Django backend API
//         const res: Response = await fetch('/api/reset-password/', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ new_password1: newPassword1, new_password2: newPassword2 }),
//         });
//         if (!res.ok) {
//           const data: { error?: string } = await res.json();
//           setErrors(prev => ({ ...prev, nonField: data.error || 'Failed to reset password' }));
//         } else {
//           // Redirect or show success
//           window.location.href = '/login';
//         }
//       }
//     } catch {
//       setErrors(prev => ({ ...prev, nonField: 'Network error' }));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4"
//             style={{ fontWeight: 'bolder' }}
//           >
//             Reset Password
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0">
//             <li className="breadcrumb-item">
//               <Link href="/" className="text-white">
//                 Home
//               </Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Reset Password</li>
//           </ol>
//         </div>
//       </div>
//       {/* Main section */}
//       <section style={{ backgroundColor: 'rgb(229, 238, 245)' }}>
//         <div className="container py-5">
//           <div className="row justify-content-center">
//             <div className="col-12 col-md-8 col-lg-6">
//               <div className="card rounded p-4">
//                 <h1 className="text-center mb-4">Choose a New Password</h1>

//                 {errors.nonField && (
//                   <div className="alert alert-danger" role="alert">
//                     {errors.nonField}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} noValidate>
//                   <div className="mb-3">
//                     <label htmlFor="new_password1" className="form-label">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="new_password1"
//                       name="new_password1"
//                       className={`form-control ${errors.newPassword1 ? 'is-invalid' : ''}`}
//                       value={newPassword1}
//                       onChange={(e) => setNewPassword1(e.target.value)}
//                       required
//                     />
//                     {errors.newPassword1 && (
//                       <div className="invalid-feedback">{errors.newPassword1}</div>
//                     )}
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="new_password2" className="form-label">
//                       Repeat New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="new_password2"
//                       name="new_password2"
//                       className={`form-control ${errors.newPassword2 ? 'is-invalid' : ''}`}
//                       value={newPassword2}
//                       onChange={(e) => setNewPassword2(e.target.value)}
//                       required
//                     />
//                     {errors.newPassword2 && (
//                       <div className="invalid-feedback">{errors.newPassword2}</div>
//                     )}
//                   </div>

//                   <div className="d-flex justify-content-center">
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       disabled={submitting}
//                     >
//                       {submitting ? 'Resetting...' : 'Reset Password'}
//                     </button>
//                   </div>
//                 </form>

//                 <p className="text-center mt-3">
//                   <Link href="/login" style={{ color: 'green' }}>
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
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { uidb64, token } = useParams() as { uidb64: string; token: string };
  const router = useRouter();

  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    if (!newPassword1 || !newPassword2) {
      setError("Both fields are required.");
      return false;
    }
    if (newPassword1 !== newPassword2) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reset_password/${uidb64}/${token}/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            new_password1: newPassword1,
            new_password2: newPassword2,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          router.push('/users/login');
        }, 2000);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Breadcrumb Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4 className="text-white display-4 mb-4" style={{ fontWeight: 'bolder' }}>
            Reset Password
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-white">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Reset Password</li>
          </ol>
        </div>
      </div>

      {/* Main Form Section */}
      <section style={{ backgroundColor: 'rgb(229, 238, 245)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card rounded p-4">
                <h1 className="text-center mb-4">Choose a New Password</h1>

                {error && <p className="text-danger text-center">{error}</p>}
                {success && <p className="text-success text-center">{success}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="new_password1" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="new_password1"
                      value={newPassword1}
                      onChange={(e) => setNewPassword1(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="new_password2" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="new_password2"
                      value={newPassword2}
                      onChange={(e) => setNewPassword2(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? "Resetting..." : "Reset Password"}
                    </button>
                  </div>
                </form>

                <p className="text-center mt-3">
                  <Link href="/users/login" style={{ color: 'green' }}>
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
