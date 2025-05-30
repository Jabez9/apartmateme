
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Head from "next/head";
// import Link from "next/link";
// import axios from "axios";

// interface EditLandlordProps {
//   params: {
//     id: string;
//   };
// }

// export default function EditLandlord({ params }: EditLandlordProps) {
//   const router = useRouter();
//   const id = params.id;

//   const [formData, setFormData] = useState({ name: "", email: "" });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     axios
//       .get(`/api/landlords/${id}/`)
//       .then((response) => {
//         console.log("API response:", response.data);
//         const { name, email } = response.data;
//         setFormData({ name, email });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Failed to load landlord:", error);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/landlords/${id}/`, formData);
//       router.push("/myadmin/landlords"); // adjust path as needed
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <>
//       <Head>
//         <title>ApartmateMe - Edit Landlord</title>
//         <link rel="icon" href="/assets/images/icons/apartmateme_logo.jpeg" />
//       </Head>
//       <section style={{ backgroundColor: "rgb(229, 238, 245)" }}>
//         <div className="container-fluid">
//           <div
//             className="container text-center py-5"
//             style={{ maxWidth: "900px" }}
//           >
//             <h4
//               className="text-primary display-4 mb-4 animate__animated animate__fadeInDown"
//               style={{ fontWeight: "bolder" }}
//             >
//               Edit Landlord Details
//             </h4>
//           </div>
//         </div>

//         <div className="container mt-5">
//           <div className="edit-landlord-container">
//             <Link href="/myadmin/landlords" className="btn btn-primary btn-lg">
//               <i className="fas fa-arrow-left"></i> Back to Landlords
//             </Link>

//             <div className="card edit-landlord-card mt-4 p-4">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-control"
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-warning">
//                   Save Changes
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

// No need to define PageProps or params here
export default function EditLandlord({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();

  // Use async/await inside useEffect to extract the id
  const [id, setId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract id from params
    params.then((p) => {
      setId(p.id);
      fetchLandlordData(p.id);
    });
  }, [params]);

  const fetchLandlordData = async (id: string) => {
    try {
      const response = await axios.get(`/api/landlords/${id}`);
      const { name, email } = response.data;
      setFormData({ name, email });
    } catch (error) {
      console.error("Failed to load landlord:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await axios.put(`/api/landlords/${id}`, formData);
      router.push("/myadmin/landlords");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Head>
        <title>ApartmateMe - Edit Landlord</title>
        <link rel="icon" href="/assets/images/icons/apartmateme_logo.jpeg" />
      </Head>
      <section style={{ backgroundColor: "rgb(229, 238, 245)" }}>
        <div className="container-fluid">
          <div
            className="container text-center py-5"
            style={{ maxWidth: "900px" }}
          >
            <h4
              className="text-primary display-4 mb-4 animate__animated animate__fadeInDown"
              style={{ fontWeight: "bolder" }}
            >
              Edit Landlord Details
            </h4>
          </div>
        </div>

        <div className="container mt-5">
          <div className="edit-landlord-container">
            <Link href="/myadmin/landlords" className="btn btn-primary btn-lg">
              <i className="fas fa-arrow-left"></i> Back to Landlords
            </Link>

            <div className="card edit-landlord-card mt-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-warning">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}