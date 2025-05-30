
// 'use client';

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";

// export default function HouseDetails() {
//   const params = useParams();
//   const id = params?.id;

//   const [house, setHouse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     const fetchHouse = async () => {
//       const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
//       const token = localStorage.getItem("accessToken");

//       try {
//         const res = await fetch(`${BASE_URL}/api/house/${id}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch house");
//         const data = await res.json();
//         setHouse(data);
//       } catch (err) {
//         console.error(err);
//         setHouse(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHouse();
//   }, [id]);

//   if (loading) return <p>Loading house details...</p>;
//   if (!house) return <p>House not found or you do not have access.</p>;

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//   return (
//     <main>
//       {/* Header Section */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
//             data-wow-delay="0.1s"
//             style={{ fontWeight: "bolder" }}
//           >
//             House Details
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
//             data-wow-delay="0.3s"
//           >
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item">
//               <Link href="/myadmin/house_list/">House List</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Details</li>
//           </ol>
//         </div>
//       </div>

//       {/* Details Section */}
//       <section style={{ backgroundColor: "rgb(243, 246, 248)" }}>
//         <div className="container py-5" style={{ maxWidth: 900 }}>
//           <div className="text-center mb-4 wow fadeInUp" data-wow-delay="0.1s">
//             <h2 className="display-6">
//               <span style={{ color: "black", fontWeight: "bold" }}>{house.name}</span>
//             </h2>
//           </div>

//           <div className="row gy-4 wow fadeInUp" data-wow-delay="0.2s">
//             <div className="col-12">
//               <p><strong>Type:</strong> {Array.isArray(house.type) ? house.type.join(", ") : house.type}</p>
//               <p><strong>Status:</strong> {house.status}</p>
//               <p><strong>Location:</strong> {house.location}</p>
//               <p><strong>Rent:</strong> {house.rent ? house.rent.join(", ") : "N/A"}</p>
//               <p><strong>Agent Name:</strong> {house.agent_name || "N/A"}</p>
//               <p><strong>Agent Phone:</strong> {house.agent_phone || "N/A"}</p>
//               <p><strong>Description:</strong> {house.description || "N/A"}</p>
//             <p><strong>Coordinates:</strong> {house.coordinates || "N/A"}</p>
//             </div>

//             {house.main_image && (
//               <div className="col-12">
//                 <img
//                   src={`${BASE_URL}${house.main_image}`}
//                   alt="Main House"
//                   style={{
//                     width: "100%",
//                     height: 300,
//                     objectFit: "cover",
//                     borderRadius: 8,
//                   }}
//                   className="img-fluid"
//                 />
//               </div>
//             )}

//             <div className="col-12">
//               <div className="row mt-3">
//                 {house.images && house.images.length > 0 ? (
//                   house.images.map((img, i) => (
//                     <div key={i} className="col-md-6 mb-3">
//                       <img
//                         src={`${BASE_URL}${img.image}`}
//                         alt={`Image ${i + 1}`}
//                         className="img-fluid rounded"
//                         style={{ height: 200, objectFit: "cover" }}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center">No additional images available.</p>
//                 )}
//               </div>
//             </div>

//             <div className="col-12 text-center">
//               <Link href="/myadmin/house_list/" className="btn btn-secondary mt-4">
//                 Back to Houses
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Define types for your house data
interface HouseImage {
  image: string;
}

interface House {
  id: number | string;
  name: string;
  type: string | string[];
  status: string;
  location: string;
  rent: string[] | null;
  agent_name?: string;
  agent_phone?: string;
  description?: string;
  coordinates?: string;
  main_image?: string;
  images?: HouseImage[];
}

export default function HouseDetails() {
  const params = useParams();
  const id = params?.id;

  // Use the defined type instead of any
  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchHouse = async () => {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("accessToken");

      try {
        const res = await fetch(`${BASE_URL}/api/house/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch house");
        // Use the House interface here
        const data: House = await res.json();
        setHouse(data);
      } catch (err) {
        console.error(err);
        setHouse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  if (loading) return <p>Loading house details...</p>;
  if (!house) return <p>House not found or you do not have access.</p>;

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return (
    <main>
      {/* Header Section */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
            style={{ fontWeight: "bolder" }}
          >
            House Details
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/myadmin/house_list/">House List</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Details</li>
          </ol>
        </div>
      </div>

      {/* Details Section */}
      <section style={{ backgroundColor: "rgb(243, 246, 248)" }}>
        <div className="container py-5" style={{ maxWidth: 900 }}>
          <div className="text-center mb-4 wow fadeInUp" data-wow-delay="0.1s">
            <h2 className="display-6">
              <span style={{ color: "black", fontWeight: "bold" }}>{house.name}</span>
            </h2>
          </div>

          <div className="row gy-4 wow fadeInUp" data-wow-delay="0.2s">
            <div className="col-12">
              <p><strong>Type:</strong> {Array.isArray(house.type) ? house.type.join(", ") : house.type}</p>
              <p><strong>Status:</strong> {house.status}</p>
              <p><strong>Location:</strong> {house.location}</p>
              <p><strong>Rent:</strong> {house.rent ? house.rent.join(", ") : "N/A"}</p>
              <p><strong>Agent Name:</strong> {house.agent_name || "N/A"}</p>
              <p><strong>Agent Phone:</strong> {house.agent_phone || "N/A"}</p>
              <p><strong>Description:</strong> {house.description || "N/A"}</p>
              <p><strong>Coordinates:</strong> {house.coordinates || "N/A"}</p>
            </div>

            {house.main_image && (
              <div className="col-12 position-relative" style={{ height: 300 }}>
                <Image
                  src={`${BASE_URL}${house.main_image}`}
                  alt="Main House"
                  fill
                  priority
                  className="rounded"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <div className="col-12">
              <div className="row mt-3">
                {house.images && house.images.length > 0 ? (
                  house.images.map((img, i) => (
                    <div key={i} className="col-md-6 mb-3 position-relative" style={{ height: 200 }}>
                      <Image
                        src={`${BASE_URL}${img.image}`}
                        alt={`Image ${i + 1}`}
                        fill
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-center">No additional images available.</p>
                )}
              </div>
            </div>

            <div className="col-12 text-center">
              <Link href="/myadmin/house_list/" className="btn btn-secondary mt-4">
                Back to Houses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
