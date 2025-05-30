
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddLandlordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeat_pass: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.repeat_pass) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add_landlord/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        alert('Landlord added successfully!');
        router.push('/myadmin/landlords'); // Redirect after success
      } else {
        // Try to parse error message from backend
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      alert('Failed to add landlord.');
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: '900px' }}>
          <h4
            className="text-white display-4 mb-4 animate__animated animate__fadeInDown"
            style={{ fontWeight: 'bolder' }}
          >
            Append a Landlord
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 animate__animated animate__fadeInDown">
            <li className="breadcrumb-item">
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active text-danger">New Landlord</li>
          </ol>
        </div>
      </div>

      {/* Form Section */}
      <section style={{ backgroundColor: 'rgb(229, 238, 245)' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card rounded p-4">
                <h1 className="text-center mb-4">Add Landlord</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="repeat_pass" className="form-label">
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="repeat_pass"
                      name="repeat_pass"
                      required
                      value={formData.repeat_pass}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
