'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ResetPasswordFormProps {
  uidb64: string;
  token: string;
}

export default function ResetPasswordForm({ uidb64, token }: ResetPasswordFormProps) {
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [errors, setErrors] = useState({ newPassword1: '', newPassword2: '', nonField: '' });
  const [submitting, setSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (resetSuccess) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            window.location.href = '/users/login';
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resetSuccess]);

  const validate = () => {
    let valid = true;
    const newErrors = { newPassword1: '', newPassword2: '', nonField: '' };

    if (!newPassword1) {
      newErrors.newPassword1 = 'This field is required.';
      valid = false;
    }
    if (!newPassword2) {
      newErrors.newPassword2 = 'This field is required.';
      valid = false;
    }
    if (newPassword1 && newPassword2 && newPassword1 !== newPassword2) {
      newErrors.nonField = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({ newPassword1: '', newPassword2: '', nonField: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset_password/${uidb64}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uidb64,
          token,
          new_password1: newPassword1,
          new_password2: newPassword2,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(prev => ({ ...prev, nonField: data.error || 'Failed to reset password' }));
      } else {
        setResetSuccess(true);
      }
    } catch {
      setErrors(prev => ({ ...prev, nonField: 'Network error' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
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

      {/* Main section */}
      <section style={{ backgroundColor: 'rgb(229, 238, 245)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card rounded p-4">
                <h1 className="text-center mb-4">Choose a New Password</h1>

                {errors.nonField && (
                  <div className="alert alert-danger" role="alert">
                    {errors.nonField}
                  </div>
                )}

                {resetSuccess ? (
                  <div className="text-center">
                    <div className="alert alert-success" role="alert">
                      Password has been reset successfully!
                    </div>
                    <p>You will be redirected to the login page in <strong>{countdown}</strong> seconds...</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                      <label htmlFor="new_password1" className="form-label">New Password</label>
                      <input
                        type="password"
                        id="new_password1"
                        name="new_password1"
                        className={`form-control ${errors.newPassword1 ? 'is-invalid' : ''}`}
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value)}
                        required
                      />
                      {errors.newPassword1 && (
                        <div className="invalid-feedback">{errors.newPassword1}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="new_password2" className="form-label">Repeat New Password</label>
                      <input
                        type="password"
                        id="new_password2"
                        name="new_password2"
                        className={`form-control ${errors.newPassword2 ? 'is-invalid' : ''}`}
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        required
                      />
                      {errors.newPassword2 && (
                        <div className="invalid-feedback">{errors.newPassword2}</div>
                      )}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? 'Resetting...' : 'Reset Password'}
                      </button>
                    </div>
                  </form>
                )}

                <p className="text-center mt-3">
                  <Link href="/users/login" style={{ color: 'green' }}>Back to Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

