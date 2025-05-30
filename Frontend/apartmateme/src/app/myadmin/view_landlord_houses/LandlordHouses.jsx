// "use client";

// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import axios from "axios";

// export default function LandlordHouses({ landlordId }) {
//   const API_BASE = process.env.NEXT_PUBLIC_API_URL;

//   const [landlord, setLandlord] = useState(null);
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchLandlordHouses = async () => {
//     if (!landlordId) {
//       setError("No landlord ID provided.");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       setError("You must be logged in as admin to view this page.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Fetch landlord details
//       const landlordRes = await axios.get(`${API_BASE}/api/landlords/${landlordId}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLandlord(landlordRes.data);

//       // Fetch houses for landlord
//       const housesRes = await axios.get(`${API_BASE}/api/landlords/${landlordId}/houses/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setHouses(housesRes.data.houses || [] ); // support pagination or no pagination
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load landlord or houses. Please try again.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLandlordHouses();
//   }, [landlordId]);

//   return (
//     <>
//       <Head>
//         <title>ApartmateMe | {landlord?.name || "Landlord"} Houses</title>
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//           integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
//           crossOrigin="anonymous"
//         />
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
//         />
//       </Head>

//       <main
//         style={{
//           backgroundColor: "rgb(229, 238, 245)",
//           minHeight: "100vh",
//           paddingTop: "3rem",
//           paddingBottom: "3rem",
//         }}
//       >
//         <div className="container" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-primary display-4 mb-4 animate__animated animate__fadeInDown"
//             style={{ fontWeight: "bolder" }}
//           >
//             {landlord ? `${landlord.name}'s Houses` : "Loading Landlord..."}
//           </h4>

//           {loading && <p className="text-center py-5">Loading houses...</p>}

//           {error && (
//             <div className="alert alert-danger" role="alert">
//               {error}
//             </div>
//           )}

//           {!loading && !error && houses.length === 0 && (
//             <p className="text-center">No houses found for this landlord.</p>
//           )}

//           {!loading && !error && houses.length > 0 && (
//             <table className="table table-bordered table-hover shadow-sm bg-white rounded">
//               <thead className="table-primary">
//                 <tr>
//                   <th>Apartment Name</th>
//                   <th>Location</th>
//                   <th>Type</th>
//                   <th>Coordinates</th>
//                   <th>Status</th>
//                   <th>Rent</th>
//                   <th>Agent</th>
//                   <th>Agent Phone</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {houses.map((house) => (
//                   <tr key={house.id}>
//                     <td>{house.name}</td>
//                     <td>{house.location}</td>
//                     <td>{house.type}</td>
//                     <td>{house.coordinates}</td>
//                     <td>{house.status}</td>
//                     <td>{house.rent}</td>
//                     <td>{house.agent_name}</td>
//                     <td>{house.agent_phone}</td>
//                     <td>
//                       <Link href={`/myadmin/houses/${house.id}`} className="btn btn-info btn-sm me-2">
//                         View
//                       </Link>
//                       <Link href={`/myadmin/edit_house/${house.id}`} className="btn btn-sm btn-warning me-1">
//                           Edit
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           <div className="text-center mt-4">
//             <Link href="/myadmin/landlords" className="btn btn-secondary">
//               Back to Landlords List
//             </Link>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

export default function LandlordHouses({ landlordId }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [landlord, setLandlord] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLandlordHouses = async () => {
    if (!landlordId) {
      setError("No landlord ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("You must be logged in as admin to view this page.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/landlords/${landlordId}/houses/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLandlord(res.data.landlord); // ✅ landlord comes from API response
      setHouses(res.data.houses || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load landlord or houses. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandlordHouses();
  }, [landlordId]);

  return (
    <>
      <Head>
        <title>ApartmateMe | {landlord?.name || "Landlord"} Houses</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>

      <main
        style={{
          backgroundColor: "rgb(229, 238, 245)",
          minHeight: "100vh",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div className="container" style={{ maxWidth: 900 }}>
          <h4
            className="text-primary display-4 mb-4 animate__animated animate__fadeInDown"
            style={{ fontWeight: "bolder" }}
          >
            {landlord ? `${landlord.name}'s Houses` : "Loading Landlord..."}
          </h4>

          {loading && <p className="text-center py-5">Loading houses...</p>}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {!loading && !error && houses.length === 0 && (
            <p className="text-center">No houses found for this landlord.</p>
          )}

          {!loading && !error && houses.length > 0 && (
            <table className="table table-bordered table-hover shadow-sm bg-white rounded">
              <thead className="table-primary">
                <tr>
                  <th>Apartment Name</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Coordinates</th>
                  <th>Status</th>
                  <th>Rent</th>
                  <th>Agent</th>
                  <th>Agent Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house) => (
                  <tr key={house.id}>
                    <td>{house.name}</td>
                    <td>{house.location}</td>
                    <td>{house.type}</td>
                    <td>{house.coordinates}</td>
                    <td>{house.status}</td>
                    <td>{house.rent}</td>
                    <td>{house.agent_name}</td>
                    <td>{house.agent_phone}</td>
                    <td>
                      <Link href={`/myadmin/houses/${house.id}`} className="btn btn-info btn-sm me-2">
                        View
                      </Link>
                      <Link href={`/myadmin/edit_house/${house.id}`} className="btn btn-sm btn-warning me-1">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="text-center mt-4">
            <Link href="/myadmin/landlords" className="btn btn-secondary">
              Back to Landlords List
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
