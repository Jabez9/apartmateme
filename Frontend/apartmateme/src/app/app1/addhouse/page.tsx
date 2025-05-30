"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Choice = { value: string; label: string };

export default function AddHouse() {
  const router = useRouter();

  const [options, setOptions] = useState<{
    type_choices: Choice[];
    rent_choices: Choice[];
    status_choices: Choice[];
    location_choices: Choice[];
  }>({
    type_choices: [],
    rent_choices: [],
    status_choices: [],
    location_choices: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    type: [] as string[],
    rent: [] as string[],
    status: "",
    location: "",
    coordinates: "",
    main_image: null as File | null,
    additional_images: [] as File[],
    description: "",
    pros: "",
    agent_name: "",
    agent_phone: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchChoices = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/house-choices/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch house choices");
        const data = await res.json();
        setOptions({
          type_choices: data.type_choices || [],
          rent_choices: data.rent_choices || [],
          status_choices: data.status_choices || [],
          location_choices: data.location_choices || [],
        });
      } catch (error) {
        console.error("Error fetching house choices:", error);
      }
    };
    fetchChoices();
  }, [router]);

  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const target = e.target;
  const name = target.name;
  const value = target.value;

  if (target instanceof HTMLInputElement) {
    const type = target.type;
    const checked = target.checked;

    if (target.files) {
      if (name === "main_image") {
        setFormData((prev) => ({ ...prev, main_image: target.files![0] || null }));
      } else if (name === "additional_images") {
        setFormData((prev) => ({ ...prev, additional_images: Array.from(target.files!) }));
      }
      return;
    }

    if (type === "checkbox") {
      const currentValues = Array.isArray(formData[name as keyof typeof formData])
        ? (formData[name as keyof typeof formData] as string[])
        : [];

      const updated = checked
        ? [...currentValues, value]
        : currentValues.filter((v) => v !== value);

      setFormData((prev) => ({ ...prev, [name]: updated }));
      return;
    }
  }

  // For select or textarea or input types without files or checkbox:
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (key === "additional_images") {
        (value as File[]).forEach((file) => payload.append("additional_images", file));
      } else if (Array.isArray(value)) {
        payload.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value as string | Blob);
      }
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to submit.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} ${errorText}`);
      }

      alert("House submitted successfully!");
      // on success, redirect to landlord dashboard
      router.push("/users/landlorddashboard");
      setFormData({
        name: "",
        type: [],
        rent: [],
        status: "",
        location: "",
        coordinates: "",
        main_image: null,
        additional_images: [],
        description: "",
        pros: "",
        agent_name: "",
        agent_phone: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error submitting form:", err);
        alert(`Error submitting the form: ${err.message}`);
      } else {
        console.error("Unknown error occurred.");
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add House</title>
      </Head>

      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4
            className="text-white display-4 mb-4 animate__animated animate__fadeInDown"
            style={{ fontWeight: "bolder" }}
          >
            Add Your House
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 fadeInDown">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Add House</li>
          </ol>
        </div>
      </div>

      <div className="container py-5" style={{ backgroundColor: "aliceblue", borderRadius: "10px" }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-4" style={{ color: "crimson" }}>
            Add House
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
            <div className="mb-3">
              <label className="form-label">
                <strong>Premises Name</strong>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Type</strong>
              </label>
              <br />
              {options.type_choices.map((opt) => (
                <div key={opt.value} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    name="type"
                    value={opt.value}
                    checked={formData.type.includes(opt.value)}
                    onChange={handleChange}
                    className="form-check-input"
                    id={`type_${opt.value}`}
                  />
                  <label className="form-check-label" htmlFor={`type_${opt.value}`}>
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Rent Type</strong>
              </label>
              <br />
              {options.rent_choices.map((opt) => (
                <div key={opt.value} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    name="rent"
                    value={opt.value}
                    checked={formData.rent.includes(opt.value)}
                    onChange={handleChange}
                    className="form-check-input"
                    id={`rent_${opt.value}`}
                  />
                  <label className="form-check-label" htmlFor={`rent_${opt.value}`}>
                    {opt.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Status</strong>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Status</option>
                {options.status_choices.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Location</strong>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Location</option>
                {options.location_choices.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Coordinates</strong>
              </label>
              <input
                type="text"
                name="coordinates"
                className="form-control"
                value={formData.coordinates}
                onChange={handleChange}
                placeholder="Latitude, Longitude"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Main Image</strong>
              </label>
              <input
                type="file"
                name="main_image"
                accept="image/*"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Additional Images</strong>
              </label>
              <input
                type="file"
                name="additional_images"
                accept="image/*"
                multiple
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Description</strong>
              </label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Pros</strong>
              </label>
              <textarea
                name="pros"
                className="form-control"
                value={formData.pros}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Agent Name</strong>
              </label>
              <input
                type="text"
                name="agent_name"
                className="form-control"
                value={formData.agent_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <strong>Agent Phone</strong>
              </label>
              <input
                type="tel"
                name="agent_phone"
                className="form-control"
                value={formData.agent_phone}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-danger w-100 mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
