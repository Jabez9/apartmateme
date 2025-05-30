
// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import axios from "axios";

// // export default function LandlordsList() {
// //   const [landlords, setLandlords] = useState([]);
// //   const [nextPage, setNextPage] = useState(null);
// //   const [prevPage, setPrevPage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [deleteId, setDeleteId] = useState(null);

// //   const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// //   const fetchLandlords = async (url = `${API_BASE}/api/landlords/`) => {
// //     setLoading(true);
// //     const token = localStorage.getItem("accessToken");

// //     try {
// //       const res = await axios.get(url, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       setLandlords(res.data.results);
// //       setNextPage(res.data.next);
// //       setPrevPage(res.data.previous);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error(err);
// //       setError("Failed to load landlords");
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchLandlords();
// //   }, []);

// //   const confirmDelete = (id) => setDeleteId(id);
// //   const cancelDelete = () => setDeleteId(null);

// //   const handleDeleteConfirmed = async () => {
// //     const id = deleteId;
// //     cancelDelete();

// //     const token = localStorage.getItem("accessToken");

// //     try {
// //       await axios.delete(`${API_BASE}/api/landlords/delete/${id}/`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       fetchLandlords();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to delete landlord");
// //     }
// //   };

// //   // Filter out admin landlords
// //   const nonAdminLandlords = landlords.filter(
// //     (landlord) => !landlord.is_admin && !landlord.is_superuser && !landlord.is_staff
// //   );

// //   if (loading) return <p className="text-center py-5">Loading landlords...</p>;
// //   if (error) return <p className="text-danger text-center py-5">{error}</p>;

// //   return (
// //     <>
// //       <style>{`
// //         .bg-primary-light {
// //           background-color: #e5eef5;
// //         }
// //         .table thead th {
// //           background-color: #2a9df4;
// //           color: white;
// //           font-weight: 600;
// //         }
// //         .btn-info {
// //           background-color: #3b82f6;
// //           border-color: #3b82f6;
// //         }
// //         .btn-info:hover {
// //           background-color: #2563eb;
// //           border-color: #2563eb;
// //         }
// //         .btn-warning {
// //           background-color: #fbbf24;
// //           border-color: #fbbf24;
// //           color: #1f2937;
// //         }
// //         .btn-warning:hover {
// //           background-color: #f59e0b;
// //           border-color: #f59e0b;
// //         }
// //         .btn-danger {
// //           background-color: #ef4444;
// //           border-color: #ef4444;
// //         }
// //         .btn-danger:hover {
// //           background-color: #dc2626;
// //           border-color: #dc2626;
// //         }
// //         .breadcrumb a {
// //           text-decoration: none;
// //           color: #2563eb;
// //         }
// //         .breadcrumb a:hover {
// //           text-decoration: underline;
// //         }
// //       `}</style>

// //       <section className="bg-primary-light min-vh-100 py-5">
// //         <div className="container text-center" style={{ maxWidth: 900 }}>
// //           <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown text-primary">
// //             List of Landlords
// //           </h1>
// //         </div>

// //         <div className="container" style={{ maxWidth: 900 }}>
// //           <table className="table table-bordered table-hover align-middle">
// //             <thead>
// //               <tr>
// //                 <th>NAME</th>
// //                 <th>EMAIL</th>
// //                 <th>ACTIONS</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {nonAdminLandlords.length === 0 ? (
// //                 <tr>
// //                   <td colSpan={3} className="text-center py-3">
// //                     No landlords found
// //                   </td>
// //                 </tr>
// //               ) : (
// //                 nonAdminLandlords.map((landlord) => (
// //                   <tr key={landlord.id}>
// //                     <td>{landlord.name}</td>
// //                     <td>{landlord.email}</td>
// //                     <td>
// //                       <Link
// //                         href={`/myadmin/view_landlord_houses/${landlord.id}/`}
// //                         className="btn btn-info me-2"
// //                       >
// //                         View
// //                       </Link>
// //                       {/* <Link
// //                         href={`/myadmin/edit_landlord/${landlord.id}/`}
// //                         className="btn btn-warning me-2"
// //                       >
// //                         Edit
// //                       </Link> */}
// //                       <button
// //                         className="btn btn-danger"
// //                         onClick={() => confirmDelete(landlord.id)}
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               )}
// //             </tbody>
// //           </table>

// //           {/* Pagination */}
// //           <div className="d-flex justify-content-between align-items-center mt-4">
// //             <button
// //               className="btn btn-outline-primary"
// //               disabled={!prevPage}
// //               onClick={() => fetchLandlords(prevPage)}
// //             >
// //               Previous
// //             </button>
// //             <Link href="/myadmin/add_landlord/" className="btn btn-primary">
// //               Add New Landlord
// //             </Link>
// //             <button
// //               className="btn btn-outline-primary"
// //               disabled={!nextPage}
// //               onClick={() => fetchLandlords(nextPage)}
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>

// //         {/* Modal */}
// //         {deleteId !== null && (
// //           <div
// //             className="modal-overlay"
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               backgroundColor: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1050,
// //             }}
// //           >
// //             <div
// //               className="modal-content"
// //               style={{
// //                 backgroundColor: "#fff",
// //                 padding: "20px",
// //                 borderRadius: "8px",
// //                 maxWidth: "400px",
// //                 width: "90%",
// //                 textAlign: "center",
// //                 boxShadow: "0 5px 15px rgba(0,0,0,.5)",
// //               }}
// //             >
// //               <p style={{ fontSize: "1.2rem" }}>
// //                 Are you sure you want to delete this landlord?
// //               </p>
// //               <div className="mt-3">
// //                 <button
// //                   onClick={handleDeleteConfirmed}
// //                   className="btn btn-danger me-2"
// //                 >
// //                   Yes
// //                 </button>
// //                 <button onClick={cancelDelete} className="btn btn-secondary">
// //                   No
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </section>
// //     </>
// //   );
// // }
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";

// export default function LandlordsList() {
//   const [landlords, setLandlords] = useState([]);
//   const [nextPage, setNextPage] = useState(null);
//   const [prevPage, setPrevPage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const API_BASE = process.env.NEXT_PUBLIC_API_URL;

//   const fetchLandlords = useCallback(
//     async (url = `${API_BASE}/api/landlords/`) => {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");

//       try {
//         const res = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setLandlords(res.data.results);
//         setNextPage(res.data.next);
//         setPrevPage(res.data.previous);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load landlords");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [API_BASE]
//   );

//   useEffect(() => {
//     fetchLandlords();
//   }, [fetchLandlords]);

//   const confirmDelete = (id) => setDeleteId(id);
//   const cancelDelete = () => setDeleteId(null);

//   const handleDeleteConfirmed = async () => {
//     const token = localStorage.getItem("accessToken");
//     const id = deleteId;
//     cancelDelete();

//     try {
//       await axios.delete(`${API_BASE}/api/landlords/delete/${id}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchLandlords();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete landlord");
//     }
//   };

//   const nonAdminLandlords = landlords.filter(
//     (landlord) =>
//       !landlord.is_admin && !landlord.is_superuser && !landlord.is_staff
//   );

//   return (
//     <>
//       <style>{`
//         .bg-primary-light {
//           background-color: #e5eef5;
//         }
//         .table thead th {
//           background-color: #2a9df4;
//           color: white;
//           font-weight: 600;
//         }
//         .btn-info {
//           background-color: #3b82f6;
//           border-color: #3b82f6;
//         }
//         .btn-info:hover {
//           background-color: #2563eb;
//           border-color: #2563eb;
//         }
//         .btn-warning {
//           background-color: #fbbf24;
//           border-color: #fbbf24;
//           color: #1f2937;
//         }
//         .btn-warning:hover {
//           background-color: #f59e0b;
//           border-color: #f59e0b;
//         }
//         .btn-danger {
//           background-color: #ef4444;
//           border-color: #ef4444;
//         }
//         .btn-danger:hover {
//           background-color: #dc2626;
//           border-color: #dc2626;
//         }
//         .breadcrumb a {
//           text-decoration: none;
//           color: #2563eb;
//         }
//         .breadcrumb a:hover {
//           text-decoration: underline;
//         }
//       `}</style>

//       <section className="bg-primary-light min-vh-100 py-5">
//         <div className="container text-center" style={{ maxWidth: 900 }}>
//           <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown text-primary">
//             List of Landlords
//           </h1>
//         </div>

//         <div className="container" style={{ maxWidth: 900 }}>
//           {loading ? (
//             <p className="text-center py-5">Loading landlords...</p>
//           ) : error ? (
//             <p className="text-danger text-center py-5">{error}</p>
//           ) : (
//             <table className="table table-bordered table-hover align-middle">
//               <thead>
//                 <tr>
//                   <th>NAME</th>
//                   <th>EMAIL</th>
//                   <th>ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {nonAdminLandlords.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="text-center py-3">
//                       No landlords found
//                     </td>
//                   </tr>
//                 ) : (
//                   nonAdminLandlords.map((landlord) => (
//                     <tr key={landlord.id}>
//                       <td>{landlord.name}</td>
//                       <td>{landlord.email}</td>
//                       <td>
//                         <Link
//                           href={`/myadmin/view_landlord_houses/${landlord.id}/`}
//                           className="btn btn-info me-2"
//                         >
//                           View
//                         </Link>
//                         <button
//                           className="btn btn-danger"
//                           onClick={() => confirmDelete(landlord.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}

//           <div className="d-flex justify-content-between align-items-center mt-4">
//             <button
//               className="btn btn-outline-primary"
//               disabled={!prevPage}
//               onClick={() => fetchLandlords(prevPage)}
//             >
//               Previous
//             </button>
//             <Link href="/myadmin/add_landlord/" className="btn btn-primary">
//               Add New Landlord
//             </Link>
//             <button
//               className="btn btn-outline-primary"
//               disabled={!nextPage}
//               onClick={() => fetchLandlords(nextPage)}
//             >
//               Next
//             </button>
//           </div>
//         </div>

//         {/* Modal */}
//         {deleteId !== null && (
//           <div
//             className="modal-overlay"
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0,0,0,0.5)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               zIndex: 1050,
//             }}
//           >
//             <div
//               className="modal-content"
//               style={{
//                 backgroundColor: "#fff",
//                 padding: "20px",
//                 borderRadius: "8px",
//                 maxWidth: "400px",
//                 width: "90%",
//                 textAlign: "center",
//                 boxShadow: "0 5px 15px rgba(0,0,0,.5)",
//               }}
//             >
//               <p style={{ fontSize: "1.2rem" }}>
//                 Are you sure you want to delete this landlord?
//               </p>
//               <div className="mt-3">
//                 <button
//                   onClick={handleDeleteConfirmed}
//                   className="btn btn-danger me-2"
//                 >
//                   Yes
//                 </button>
//                 <button onClick={cancelDelete} className="btn btn-secondary">
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>
//     </>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function LandlordsList() {
  const [landlords, setLandlords] = useState<any[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const fetchLandlords = useCallback(
    async (url: string = `${API_BASE}/api/landlords/`) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLandlords(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load landlords");
      } finally {
        setLoading(false);
      }
    },
    [API_BASE]
  );

  useEffect(() => {
    fetchLandlords();
  }, [fetchLandlords]);

  const confirmDelete = (id: number) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDeleteConfirmed = async () => {
    const token = localStorage.getItem("accessToken");
    const id = deleteId;
    cancelDelete();

    if (id === null) return;

    try {
      await axios.delete(`${API_BASE}/api/landlords/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchLandlords();
    } catch (err) {
      console.error(err);
      alert("Failed to delete landlord");
    }
  };

  // Filter out admins, superusers, and staff landlords
  const nonAdminLandlords = landlords.filter(
    (landlord) =>
      !landlord.is_admin && !landlord.is_superuser && !landlord.is_staff
  );

  return (
    <>
      <style>{`
        .bg-primary-light {
          background-color: #e5eef5;
        }
        .table thead th {
          background-color: #2a9df4;
          color: white;
          font-weight: 600;
        }
        .btn-info {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        .btn-info:hover {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        .btn-warning {
          background-color: #fbbf24;
          border-color: #fbbf24;
          color: #1f2937;
        }
        .btn-warning:hover {
          background-color: #f59e0b;
          border-color: #f59e0b;
        }
        .btn-danger {
          background-color: #ef4444;
          border-color: #ef4444;
        }
        .btn-danger:hover {
          background-color: #dc2626;
          border-color: #dc2626;
        }
        .breadcrumb a {
          text-decoration: none;
          color: #2563eb;
        }
        .breadcrumb a:hover {
          text-decoration: underline;
        }
      `}</style>

      <section className="bg-primary-light min-vh-100 py-5">
        <div className="container text-center" style={{ maxWidth: 900 }}>
          <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInDown text-primary">
            List of Landlords
          </h1>
        </div>

        <div className="container" style={{ maxWidth: 900 }}>
          {loading ? (
            <p className="text-center py-5">Loading landlords...</p>
          ) : error ? (
            <p className="text-danger text-center py-5">{error}</p>
          ) : (
            <table className="table table-bordered table-hover align-middle">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {nonAdminLandlords.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-3">
                      No landlords found
                    </td>
                  </tr>
                ) : (
                  nonAdminLandlords.map((landlord) => (
                    <tr key={landlord.id}>
                      <td>{landlord.name}</td>
                      <td>{landlord.email}</td>
                      <td>
                        <Link
                          href={`/myadmin/view_landlord_houses/${landlord.id}/`}
                          className="btn btn-info me-2"
                        >
                          View
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => confirmDelete(landlord.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-primary"
              disabled={!prevPage}
              onClick={() => prevPage && fetchLandlords(prevPage)}
            >
              Previous
            </button>
            <Link href="/myadmin/add_landlord/" className="btn btn-primary">
              Add New Landlord
            </Link>
            <button
              className="btn btn-outline-primary"
              disabled={!nextPage}
              onClick={() => nextPage && fetchLandlords(nextPage)}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {deleteId !== null && (
          <div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "400px",
                width: "90%",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,.5)",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>
                Are you sure you want to delete this landlord?
              </p>
              <div className="mt-3">
                <button
                  onClick={handleDeleteConfirmed}
                  className="btn btn-danger me-2"
                >
                  Yes
                </button>
                <button onClick={cancelDelete} className="btn btn-secondary">
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
