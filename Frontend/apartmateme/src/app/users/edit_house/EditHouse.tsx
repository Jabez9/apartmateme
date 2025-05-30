// "use client";

// import { useState, useEffect } from "react";
// import Head from "next/head";
// import { useRouter } from "next/navigation";


// export interface ChoiceOption {
//   label: string;
//   value: string;
// }

// export interface InitialHouse {
//   id: string;
//   name: string;
//   type: string[];
//   rent: string[];
//   status: string;
//   location: string;
//   coordinates: string;
//   main_image_url?: string;
//   description: string;
//   pros: string;
//   agent_name: string;
//   agent_phone: string;
// }

// export interface Props {
//   initialHouse: InitialHouse;
//   csrfToken?: string;
//   isAdmin: boolean;

// }

// export default function EditHouse({ initialHouse, csrfToken, isAdmin }: Props) {
//   const router = useRouter();

//   const [options, setOptions] = useState<{
//     type_choices: ChoiceOption[];
//     rent_choices: ChoiceOption[];
//     status_choices: ChoiceOption[];
//     location_choices: ChoiceOption[];
//   }>({
//     type_choices: [],
//     rent_choices: [],
//     status_choices: [],
//     location_choices: [],
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     type: [] as string[],
//     rent: [] as string[],
//     status: "",
//     location: "",
//     coordinates: "",
//     main_image: null as File | null,
//     additional_images: [] as File[],
//     description: "",
//     pros: "",
//     agent_name: "",
//     agent_phone: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     const fetchChoices = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/house-choices/`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error("Failed to fetch house choices");
//         const data = await res.json();
//         setOptions({
//           type_choices: data.type_choices || [],
//           rent_choices: data.rent_choices || [],
//           status_choices: data.status_choices || [],
//           location_choices: data.location_choices || [],
//         });
//       } catch (error) {
//         console.error("Error fetching choices:", error);
//       }
//     };

//     fetchChoices();

//     setFormData({
//       name: initialHouse.name || "",
//       type: Array.isArray(initialHouse.type) ? initialHouse.type : [],
//       rent: Array.isArray(initialHouse.rent) ? initialHouse.rent : [],
//       status: initialHouse.status || "",
//       location: initialHouse.location || "",
//       coordinates: initialHouse.coordinates || "",
//       main_image: null,
//       additional_images: [],
//       description: initialHouse.description || "",
//       pros: initialHouse.pros || "",
//       agent_name: initialHouse.agent_name || "",
//       agent_phone: initialHouse.agent_phone || "",
//     });
//   }, [initialHouse, router]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, files, checked } = e.target as HTMLInputElement;

//     if (files) {
//       if (name === "main_image") {
//         setFormData((prev) => ({ ...prev, main_image: files[0] || null }));
//       } else if (name === "additional_images") {
//         setFormData((prev) => ({ ...prev, additional_images: Array.from(files) }));
//       }
//       return;
//     }

//     if (type === "checkbox") {
//       const currentValues = Array.isArray(formData[name as keyof typeof formData])
//         ? (formData[name as keyof typeof formData] as string[])
//         : [];
//       const updated = checked
//         ? [...currentValues, value]
//         : currentValues.filter((v) => v !== value);
//       setFormData((prev) => ({ ...prev, [name]: updated }));
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = new FormData();
//     for (const key in formData) {
//       const value = formData[key as keyof typeof formData];
//       if (key === "additional_images" && Array.isArray(value)) {
//         value.forEach((file) => payload.append("additional_images", file));
//       } else if (Array.isArray(value)) {
//         payload.append(key, JSON.stringify(value));
//       } else if (value !== null && value !== undefined) {
//         payload.append(key, value as string | Blob);
//       }
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("You must be logged in.");
//         router.push("/login");
//         return;
//       }

//       const endpoint = isAdmin
//         ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/houses/${initialHouse.id}/`
//         : `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${initialHouse.id}/`;

//       const res = await fetch(endpoint, {
//         method: "PUT",
//         headers: {
//           "X-CSRFToken": csrfToken,
//           Authorization: `Bearer ${token}`,
//         },
//         body: payload,
//         credentials: "include",
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Update failed: ${res.status} - ${errorText}`);
//       }

//       alert("House updated successfully!");
//       const redirectPath = isAdmin ? "/myadmin/admin_dashboard" : "/users/landlorddashboard";
//       router.push(redirectPath);
//     } catch (error: any) {
//       console.error("Error submitting form:", error);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{isAdmin ? "Admin Edit House" : "Edit House"}</title>
//       </Head>

//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
//           <h4
//             className="text-white display-4 mb-4 animate__animated animate__fadeInDown"
//             style={{ fontWeight: "bolder" }}
//           >
//             {isAdmin ? "Admin Edit House" : "Edit Your House"}
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0 animate__fadeInDown">
//             <li className="breadcrumb-item">
//               <a href="/">Home</a>
//             </li>
//             <li className="breadcrumb-item active text-danger">Edit House</li>
//           </ol>
//         </div>
//       </div>

//       <div className="container py-5" style={{ backgroundColor: "aliceblue", borderRadius: "10px" }}>
//         <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
//           <h2 className="text-center mb-4" style={{ color: "crimson" }}>
//             {isAdmin ? "Admin Edit House" : "Edit House"}
//           </h2>

//           <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
//             <div className="form-group mb-3">
//               <label>House Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>House Type</label>
//               {options.type_choices.map((choice) => (
//                 <div key={choice.value} className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name="type"
//                     value={choice.value}
//                     checked={formData.type.includes(choice.value)}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label">{choice.label}</label>
//                 </div>
//               ))}
//             </div>

//             <div className="form-group mb-3">
//               <label>Rent</label>
//               {options.rent_choices.map((choice) => (
//                 <div key={choice.value} className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     name="rent"
//                     value={choice.value}
//                     checked={formData.rent.includes(choice.value)}
//                     onChange={handleChange}
//                   />
//                   <label className="form-check-label">{choice.label}</label>
//                 </div>
//               ))}
//             </div>

//             <div className="form-group mb-3">
//               <label>Status</label>
//               <select
//                 name="status"
//                 className="form-control"
//                 value={formData.status}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Status</option>
//                 {options.status_choices.map((choice) => (
//                   <option key={choice.value} value={choice.value}>
//                     {choice.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group mb-3">
//               <label>Location</label>
//               <select
//                 name="location"
//                 className="form-control"
//                 value={formData.location}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Location</option>
//                 {options.location_choices.map((choice) => (
//                   <option key={choice.value} value={choice.value}>
//                     {choice.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group mb-3">
//               <label>Coordinates</label>
//               <input
//                 type="text"
//                 name="coordinates"
//                 className="form-control"
//                 value={formData.coordinates}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Main Image</label>
//               <input
//                 type="file"
//                 name="main_image"
//                 className="form-control"
//                 onChange={handleChange}
//                 accept="image/*"
//               />
//               {initialHouse.main_image_url && (
//                 <img
//                   src={initialHouse.main_image_url}
//                   alt="Current Main"
//                   className="img-thumbnail mt-2"
//                   width={150}
//                 />
//               )}
//             </div>

//             <div className="form-group mb-3">
//               <label>Additional Images</label>
//               <input
//                 type="file"
//                 name="additional_images"
//                 multiple
//                 className="form-control"
//                 onChange={handleChange}
//                 accept="image/*"
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 className="form-control"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Pros</label>
//               <textarea
//                 name="pros"
//                 className="form-control"
//                 value={formData.pros}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-3">
//               <label>Agent Name</label>
//               <input
//                 type="text"
//                 name="agent_name"
//                 className="form-control"
//                 value={formData.agent_name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-4">
//               <label>Agent Phone</label>
//               <input
//                 type="text"
//                 name="agent_phone"
//                 className="form-control"
//                 value={formData.agent_phone}
//                 onChange={handleChange}
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-danger d-block w-100"
//               style={{ fontWeight: "bolder", fontSize: "1.25rem" }}
//             >
//               Update House
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export interface ChoiceOption {
  label: string;
  value: string;
}

export interface InitialHouse {
  id: string;
  name: string;
  type: string[];
  rent: string[];
  status: string;
  location: string;
  coordinates: string;
  main_image_url?: string;
  description: string;
  pros: string;
  agent_name: string;
  agent_phone: string;
}

export interface Props {
  initialHouse: InitialHouse;
  csrfToken?: string;
  isAdmin: boolean;
}

export default function EditHouse({ initialHouse, csrfToken, isAdmin }: Props) {
  const router = useRouter();

  const [options, setOptions] = useState<{
    type_choices: ChoiceOption[];
    rent_choices: ChoiceOption[];
    status_choices: ChoiceOption[];
    location_choices: ChoiceOption[];
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
        console.error("Error fetching choices:", error);
      }
    };

    fetchChoices();

    setFormData({
      name: initialHouse.name || "",
      type: Array.isArray(initialHouse.type) ? initialHouse.type : [],
      rent: Array.isArray(initialHouse.rent) ? initialHouse.rent : [],
      status: initialHouse.status || "",
      location: initialHouse.location || "",
      coordinates: initialHouse.coordinates || "",
      main_image: null,
      additional_images: [],
      description: initialHouse.description || "",
      pros: initialHouse.pros || "",
      agent_name: initialHouse.agent_name || "",
      agent_phone: initialHouse.agent_phone || "",
    });
  }, [initialHouse, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files, checked } = e.target as HTMLInputElement;

    if (files) {
      if (name === "main_image") {
        setFormData((prev) => ({ ...prev, main_image: files[0] || null }));
      } else if (name === "additional_images") {
        setFormData((prev) => ({ ...prev, additional_images: Array.from(files) }));
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

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (key === "additional_images" && Array.isArray(value)) {
        value.forEach((file) => payload.append("additional_images", file));
      } else if (Array.isArray(value)) {
        payload.append(key, JSON.stringify(value));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value as string | Blob);
      }
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in.");
        router.push("/login");
        return;
      }

      const endpoint = isAdmin
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/houses/${initialHouse.id}/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${initialHouse.id}/`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "X-CSRFToken": csrfToken || "",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
        credentials: "include",
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Update failed: ${res.status} - ${errorText}`);
      }

      alert("House updated successfully!");
      const redirectPath = isAdmin ? "/myadmin/admin_dashboard" : "/users/landlorddashboard";
      router.push(redirectPath);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
        alert(`Error: ${error.message}`);
      } else {
        console.error("Unknown error", error);
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>{isAdmin ? "Admin Edit House" : "Edit House"}</title>
      </Head>

      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h4
            className="text-white display-4 mb-4 animate__animated animate__fadeInDown"
            style={{ fontWeight: "bolder" }}
          >
            {isAdmin ? "Admin Edit House" : "Edit Your House"}
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0 animate__fadeInDown">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Edit House</li>
          </ol>
        </div>
      </div>

      <div className="container py-5" style={{ backgroundColor: "aliceblue", borderRadius: "10px" }}>
        <div className="card shadow p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="text-center mb-4" style={{ color: "crimson" }}>
            {isAdmin ? "Admin Edit House" : "Edit House"}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
            <div className="form-group mb-3">
              <label>House Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>House Type</label>
              {options.type_choices.map((choice) => (
                <div key={choice.value} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="type"
                    value={choice.value}
                    checked={formData.type.includes(choice.value)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{choice.label}</label>
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label>Rent</label>
              {options.rent_choices.map((choice) => (
                <div key={choice.value} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="rent"
                    value={choice.value}
                    checked={formData.rent.includes(choice.value)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{choice.label}</label>
                </div>
              ))}
            </div>

            <div className="form-group mb-3">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                {options.status_choices.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>Location</label>
              <select
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                {options.location_choices.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>Coordinates</label>
              <input
                type="text"
                name="coordinates"
                className="form-control"
                value={formData.coordinates}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Main Image</label>
              <input
                type="file"
                name="main_image"
                className="form-control"
                onChange={handleChange}
                accept="image/*"
              />
              {initialHouse.main_image_url && (
                <Image
                  src={initialHouse.main_image_url}
                  alt="Current Main"
                  className="img-thumbnail mt-2"
                  width={150}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>

            <div className="form-group mb-3">
              <label>Additional Images</label>
              <input
                type="file"
                name="additional_images"
                className="form-control"
                onChange={handleChange}
                multiple
                accept="image/*"
              />
            </div>

            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Pros</label>
              <textarea
                name="pros"
                className="form-control"
                rows={2}
                value={formData.pros}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Agent Name</label>
              <input
                type="text"
                name="agent_name"
                className="form-control"
                value={formData.agent_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Agent Phone</label>
              <input
                type="text"
                name="agent_phone"
                className="form-control"
                value={formData.agent_phone}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-danger d-block w-100"
              style={{ fontWeight: "bolder", fontSize: "1.25rem" }}
            >
              Update House
            </button>
          </form>
        </div>
      </div>
    </>
  );
}



