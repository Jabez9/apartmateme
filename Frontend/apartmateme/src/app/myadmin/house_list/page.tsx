// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Head from "next/head";
// import axios from "axios";

// const HouseList = () => {
//   const [houses, setHouses] = useState([]);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
//         const token = localStorage.getItem("accessToken");

//         const response = await axios.get(`${apiUrl}/api/house_list/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setHouses(response.data);
//       } catch (error) {
//         console.error("Error fetching houses:", error);
//       }
//     };

//     fetchHouses();
//   }, []);

//   const handleDelete = async (houseId) => {
//     if (!window.confirm("Are you sure you want to delete this house?")) return;

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
//       const token = localStorage.getItem("accessToken");

//       await axios.delete(`${apiUrl}/api/deletehouse/${houseId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setHouses((prevHouses) => prevHouses.filter((house) => house.id !== houseId));
//     } catch (error) {
//       console.error("Failed to delete house:", error);
//       alert("Failed to delete the house. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>ApartmateMe</title>
//         <link rel="icon" href="/assets/images/icons/apartmateme_logo.jpeg" />
//         <link
//           href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
//           rel="stylesheet"
//         />
//         <link
//           href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
//           rel="stylesheet"
//         />
//       </Head>

//       {/* Header Section */}
//       <div className="container-fluid bg-breadcrumb">
//         <div
//           className="container text-center py-5 wow animate__animated animate__fadeInDown"
//           style={{ maxWidth: 900 }}
//           data-wow-delay="0.1s"
//         >
//           <h4 className="text-white display-4 mb-4 fw-bold">List of Houses</h4>
//           <ol className="breadcrumb d-flex justify-content-center mb-0 wow animate__animated animate__fadeInDown" data-wow-delay="0.3s">
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">House List</li>
//           </ol>
//         </div>
//       </div>

//       {/* Table Section */}
//       <section className="py-5" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
//         <div className="container">
//           <div className="table-responsive wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
//             <table className="table table-bordered table-hover text-center align-middle bg-white rounded shadow-sm">
//               <thead className="table-dark">
//                 <tr>
//                   <th>Name</th>
//                   <th>Type</th>
//                   <th>Status</th>
//                   <th>Location</th>
//                   <th>Owner</th>
//                   <th>Agent</th>
//                   <th>Agent Phone</th>
//                   <th>Coordinates</th>
//                   <th>Rent</th>
//                   <th>Date Added</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {houses.length > 0 ? (
//                   houses.map((house) => (
//                     <tr key={house.id}>
//                       <td>{house.name}</td>
//                       <td>{Array.isArray(house.type) ? house.type.join(", ") : house.type || "N/A"}</td>
//                       <td>{house.status}</td>
//                       <td>{house.location}</td>
//                       <td>{house.landlord?.name || "N/A"}</td>
//                       <td>{house.agent_name || "N/A"}</td>
//                       <td>{house.agent_phone || "N/A"}</td>
//                       <td>{house.coordinates || "N/A"}</td>
//                       <td>{Array.isArray(house.rent) ? house.rent.join(", ") : house.rent || "N/A"}</td>
//                       <td>{house.dateadded || "N/A"}</td>
//                       <td>
//                         <Link href={`/myadmin/houses/${house.id}`} className="btn btn-sm btn-primary me-1">
//                           View
//                         </Link>
//                         <Link href={`/myadmin/edit_house/${house.id}`} className="btn btn-sm btn-warning me-1">
//                           Edit
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(house.id)}
//                           className="btn btn-sm btn-danger"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="10">No houses found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HouseList;
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

// Define the House type
interface House {
  id: number;
  name: string;
  type: string | string[];
  status: string;
  location: string;
  landlord?: { name: string } | null;
  agent_name?: string;
  agent_phone?: string;
  coordinates?: string;
  rent: string | string[];
  dateadded?: string;
}

const HouseList = () => {
  // Type your state as an array of House
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        const token = localStorage.getItem("accessToken");

        const response = await axios.get<House[]>(`${apiUrl}/api/house_list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHouses(response.data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, []);

  // Explicitly type houseId as number here
  const handleDelete = async (houseId: number) => {
    if (!window.confirm("Are you sure you want to delete this house?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const token = localStorage.getItem("accessToken");

      await axios.delete(`${apiUrl}/api/deletehouse/${houseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHouses((prevHouses) => prevHouses.filter((house) => house.id !== houseId));
    } catch (error) {
      console.error("Failed to delete house:", error);
      alert("Failed to delete the house. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>ApartmateMe</title>
        <link rel="icon" href="/assets/images/icons/apartmateme_logo.jpeg" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* Header Section */}
      <div className="container-fluid bg-breadcrumb">
        <div
          className="container text-center py-5 wow animate__animated animate__fadeInDown"
          style={{ maxWidth: 900 }}
          data-wow-delay="0.1s"
        >
          <h4 className="text-white display-4 mb-4 fw-bold">List of Houses</h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">House List</li>
          </ol>
        </div>
      </div>

      {/* Table Section */}
      <section className="py-5" style={{ backgroundColor: "rgb(243, 246, 248)" }}>
        <div className="container">
          <div
            className="table-responsive wow animate__animated animate__fadeInUp"
            data-wow-delay="0.2s"
          >
            <table className="table table-bordered table-hover text-center align-middle bg-white rounded shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Owner</th>
                  <th>Agent</th>
                  <th>Agent Phone</th>
                  <th>Coordinates</th>
                  <th>Rent</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {houses.length > 0 ? (
                  houses.map((house) => (
                    <tr key={house.id}>
                      <td>{house.name}</td>
                      <td>{Array.isArray(house.type) ? house.type.join(", ") : house.type || "N/A"}</td>
                      <td>{house.status}</td>
                      <td>{house.location}</td>
                      <td>{house.landlord?.name || "N/A"}</td>
                      <td>{house.agent_name || "N/A"}</td>
                      <td>{house.agent_phone || "N/A"}</td>
                      <td>{house.coordinates || "N/A"}</td>
                      <td>{Array.isArray(house.rent) ? house.rent.join(", ") : house.rent || "N/A"}</td>
                      <td>{house.dateadded || "N/A"}</td>
                      <td>
                        <Link href={`/myadmin/houses/${house.id}`} className="btn btn-sm btn-primary me-1">
                          View
                        </Link>
                        <Link href={`/myadmin/edit_house/${house.id}`} className="btn btn-sm btn-warning me-1">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(house.id)}
                          className="btn btn-sm btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11}>No houses found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default HouseList;
