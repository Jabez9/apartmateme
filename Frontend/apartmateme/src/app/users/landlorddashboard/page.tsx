
// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function YourPremises() {
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       setLoading(false);
//       setHouses([]);
//       return;
//     }

//     fetch(`${BASE_URL}/api/landlord/houses/`, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized or failed to fetch");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched houses:", data);
//         setHouses(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setHouses([]);
//         setLoading(false);
//       });
//   }, []);

//   const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
//             Your Premises
//           </h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0">
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Your Premises</li>
//           </ol>
//         </div>
//       </div>

//       {/* Main Section */}
//       <section className="container py-4">
//         {loading ? (
//           <p>Loading your houses...</p>
//         ) : houses.length > 0 ? (
//           <div className="row">
//             {houses.map((house) => (
//               <div key={house.id} className="col-md-6 mb-4">
//                 <div className="card p-3" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
//                   <p><strong>Apartment Name:</strong> {house.name}</p>
//                   <p><strong>Type:</strong> {house.type ? house.type.join(", ") : "N/A"}</p>
//                   <p><strong>Status:</strong> {house.status}</p>
//                   <p><strong>Location:</strong> {house.location}</p>

//                   <p><strong>Rent Prices:</strong></p>
//                   <ul>
//                     {house.rent && house.rent.length > 0 ? (
//                       house.rent.map((rentValue, i) => <li key={i}>KSh {rentValue}</li>)
//                     ) : (
//                       <li>No rent price set.</li>
//                     )}
//                   </ul>

//                   <p><strong>Coordinates:</strong> {house.coordinates || "N/A"}</p>
//                   <p><strong>Agent Name:</strong> {house.agent_name || "N/A"}</p>
//                   <p><strong>Agent Phone:</strong> {house.agent_phone || "N/A"}</p>
//                   <p><strong>Description:</strong> {house.description || "N/A"}</p>
//                   <p><strong>Pros:</strong> {house.pros || "N/A"}</p>

//                   <hr />
//                   <p><b>Main Image</b></p>
//                   {house.main_image ? (
//                     <Image
//                       src={`${BASE_URL}${house.main_image}`}
//                       alt="Main House Photo"
//                       width={800}
//                       height={300}
//                       style={{ objectFit: "cover", borderRadius: 8 }}
//                     />
//                   ) : (
//                     <p>No main image uploaded.</p>
//                   )}

//                   <p><b>Additional Images</b></p>
//                   <div className="row">
//                     {house.images && house.images.length > 0 ? (
//                       house.images.map((image, idx) => (
//                         <div key={idx} className="col-6 mb-3">
//                           <Image
//                             src={`${BASE_URL}${image.image}`}
//                             alt={`Additional House Image ${idx + 1}`}
//                             width={400}
//                             height={200}
//                             style={{ objectFit: "cover", borderRadius: 8 }}
//                           />
//                         </div>
//                       ))
//                     ) : (
//                       <p>No additional images.</p>
//                     )}
//                   </div>

//                   <Link href={`/users/edit_house/${house.id}`} className="btn btn-warning">
//                     Manage House
//                   </Link>
//                 </div>
//               </div>
//             ))}

//             {/* Add new house */}
//             <div className="col-md-6 mb-4">
//               <div className="card p-3" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
//                 <h6>Want to Add Another House?</h6>
//                 <Link href="/app1/addhouse" className="btn btn-primary">
//                   Add House
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center">
//             <h3>You haven&apos;t added any houses yet.</h3>
//             <Link href="/app1/addhouse" className="btn btn-primary">
//               Add a House
//             </Link>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface House {
  id: string;
  name: string;
  type: string[];
  rent: string[];
  status: string;
  location: string;
  coordinates: string;
  main_image?: string;
  images?: { image: string }[];
  agent_name: string;
  agent_phone: string;
  description: string;
  pros: string;
}

export default function YourPremises() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      setHouses([]);
      return;
    }

    fetch(`${BASE_URL}/api/landlord/houses/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to fetch");
        return res.json();
      })
      .then((data: House[]) => {
        setHouses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setHouses([]);
        setLoading(false);
      });
  }, []);

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4 className="text-white display-4 mb-4" style={{ fontWeight: "bolder" }}>
            Your Premises
          </h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Your Premises</li>
          </ol>
        </div>
      </div>

      {/* Main Section */}
      <section className="container py-4">
        {loading ? (
          <p>Loading your houses...</p>
        ) : houses.length > 0 ? (
          <div className="row">
            {houses.map((house) => (
              <div key={house.id} className="col-md-6 mb-4">
                <div className="card p-3" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
                  <p><strong>Apartment Name:</strong> {house.name}</p>
                  <p><strong>Type:</strong> {house.type ? house.type.join(", ") : "N/A"}</p>
                  <p><strong>Status:</strong> {house.status}</p>
                  <p><strong>Location:</strong> {house.location}</p>

                  <p><strong>Rent Prices:</strong></p>
                  <ul>
                    {house.rent && house.rent.length > 0 ? (
                      house.rent.map((rentValue, i) => <li key={i}>KSh {rentValue}</li>)
                    ) : (
                      <li>No rent price set.</li>
                    )}
                  </ul>

                  <p><strong>Coordinates:</strong> {house.coordinates || "N/A"}</p>
                  <p><strong>Agent Name:</strong> {house.agent_name || "N/A"}</p>
                  <p><strong>Agent Phone:</strong> {house.agent_phone || "N/A"}</p>
                  <p><strong>Description:</strong> {house.description || "N/A"}</p>
                  <p><strong>Pros:</strong> {house.pros || "N/A"}</p>

                  <hr />
                  <p><b>Main Image</b></p>
                  {house.main_image ? (
                    <Image
                      src={`${BASE_URL}${house.main_image}`}
                      alt="Main House Photo"
                      width={800}
                      height={300}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    <p>No main image uploaded.</p>
                  )}

                  <p><b>Additional Images</b></p>
                  <div className="row">
                    {house.images && house.images.length > 0 ? (
                      house.images.map((imageObj, idx) => (
                        <div key={idx} className="col-6 mb-3">
                          <Image
                            src={`${BASE_URL}${imageObj.image}`}
                            alt={`Additional House Image ${idx + 1}`}
                            width={400}
                            height={200}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                          />
                        </div>
                      ))
                    ) : (
                      <p>No additional images.</p>
                    )}
                  </div>

                  <Link href={`/users/edit_house/${house.id}`} className="btn btn-warning">
                    Manage House
                  </Link>
                </div>
              </div>
            ))}

            {/* Add new house */}
            <div className="col-md-6 mb-4">
              <div className="card p-3" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
                <h6>Want to Add Another House?</h6>
                <Link href="/app1/addhouse" className="btn btn-primary">
                  Add House
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3>You haven&apos;t added any houses yet.</h3>
            <Link href="/app1/addhouse" className="btn btn-primary">
              Add a House
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
