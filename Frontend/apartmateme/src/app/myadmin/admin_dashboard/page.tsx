// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function AdminPage() {
//   const router = useRouter();
//   const [adminData, setAdminData] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     const fetchAdminData = async () => {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         router.push("/myadmin/login");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/admin_dashboard/`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();
//           setAdminData(data);
//         } else {
//           router.push("/myadmin/login");
//         }
//       } catch (error) {
//         console.error("Failed to fetch admin data", error);
//         setErrorMsg("Server error. Try again later.");
//       }
//     };

//     fetchAdminData();
//   }, [router]);

//   return (
//     <main>
//       {/* Breadcrumb Header Section */}
//       <div className="container-fluid bg-secondary">
//         <div
//           className="container text-center py-5"
//           style={{ maxWidth: 900 }}
//           data-aos="fade-down"
//         >
//           <h4
//             className="text-white display-4 mb-4"
//             style={{ fontWeight: "bolder" }}
//           >
//             Admin Dashboard
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0"
//             style={{ backgroundColor: "transparent" }}
//           >
//             <li className="breadcrumb-item">
//               <Link href="/" className="text-white">
//                 Home
//               </Link>
//             </li>
//             <li className="breadcrumb-item active text-danger" aria-current="page">
//               Admin
//             </li>
//           </ol>
//         </div>
//       </div>

//       {/* Main Admin Content Section */}
//       <section
//         className="section"
//         style={{ backgroundColor: "rgb(243, 246, 248)", minHeight: "70vh" }}
//       >
//         <div className="container" style={{ maxWidth: 900 }}>
//           {/* Welcome Text */}
//           <div
//             className="text-center mx-auto pb-5"
//             data-aos="fade-up"
//             style={{ maxWidth: 800 }}
//           >
//             <h2 className="display-5 text-capitalize mb-4">
//               {adminData
//                 ? (
//                     <>
//                       Welcome, <span style={{ color: "red", fontWeight: "bold" }}>{adminData.message}</span>
//                     </>
//                   )
//                 : "Loading admin data..."}
//             </h2>
//             {errorMsg && (
//               <p className="text-danger font-weight-bold">{errorMsg}</p>
//             )}
//           </div>

//           {/* Action Cards Grid */}
//           <div
//             className="row gy-4"
//             data-aos="zoom-in-up"
//           >
//             <div className="col-md-6">
//               <ActionCard title="Add Landlord" link="/myadmin/add_landlord" color="bg-secondary" />
//             </div>
//             <div className="col-md-6">
//               <ActionCard title="Link to Houses" link="/myadmin/house_list" color="bg-primary" />
//             </div>
//             <div className="col-md-6">
//               <ActionCard title="Link to Landlords" link="/myadmin/landlords" color="bg-info" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// // Reusable card component with Bootstrap style classes
// function ActionCard({ title, link, color }) {
//   return (
//     <div className="card shadow-sm rounded-lg h-100">
//       <div className={`card-header text-white ${color} text-center font-weight-bold`}>
//         {title}
//       </div>
//       <div className="card-body d-flex flex-column justify-content-center text-center">
//         <Link href={link} legacyBehavior>
//           <a
//             className={`btn btn-lg text-white ${color} mt-3`}
//             style={{ fontWeight: "600" }}
//           >
//             {title.includes("Add") ? "Add" : "Go to"} {title.split(" ").pop()}
//           </a>
//         </Link>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminData {
  message: string;
  // add other fields as needed
}

export default function AdminPage() {
  const router = useRouter();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/myadmin/login");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin_dashboard/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data: AdminData = await response.json();
          setAdminData(data);
        } else {
          router.push("/myadmin/login");
        }
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        setErrorMsg("Server error. Try again later.");
      }
    };

    fetchAdminData();
  }, [router]);

  return (
    <main>
      {/* Breadcrumb Header Section */}
      <div className="container-fluid bg-secondary">
        <div
          className="container text-center py-5"
          style={{ maxWidth: 900 }}
          data-aos="fade-down"
        >
          <h4
            className="text-white display-4 mb-4"
            style={{ fontWeight: "bolder" }}
          >
            Admin Dashboard
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0"
            style={{ backgroundColor: "transparent" }}
          >
            <li className="breadcrumb-item">
              <Link href="/" className="text-white">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active text-danger" aria-current="page">
              Admin
            </li>
          </ol>
        </div>
      </div>

      {/* Main Admin Content Section */}
      <section
        className="section"
        style={{ backgroundColor: "rgb(243, 246, 248)", minHeight: "70vh" }}
      >
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Welcome Text */}
          <div
            className="text-center mx-auto pb-5"
            data-aos="fade-up"
            style={{ maxWidth: 800 }}
          >
            <h2 className="display-5 text-capitalize mb-4">
              {adminData ? (
                <>
                  Welcome, <span style={{ color: "red", fontWeight: "bold" }}>{adminData.message}</span>
                </>
              ) : (
                "Loading admin data..."
              )}
            </h2>
            {errorMsg && (
              <p className="text-danger font-weight-bold">{errorMsg}</p>
            )}
          </div>

          {/* Action Cards Grid */}
          <div
            className="row gy-4"
            data-aos="zoom-in-up"
          >
            <div className="col-md-6">
              <ActionCard title="Add Landlord" link="/myadmin/add_landlord" color="bg-secondary" />
            </div>
            <div className="col-md-6">
              <ActionCard title="Link to Houses" link="/myadmin/house_list" color="bg-primary" />
            </div>
            <div className="col-md-6">
              <ActionCard title="Link to Landlords" link="/myadmin/landlords" color="bg-info" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ActionCard({ title, link, color }: { title: string; link: string; color: string }) {
  return (
    <div className="card shadow-sm rounded-lg h-100">
      <div className={`card-header text-white ${color} text-center font-weight-bold`}>
        {title}
      </div>
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <Link href={link} legacyBehavior>
          <a
            className={`btn btn-lg text-white ${color} mt-3`}
            style={{ fontWeight: "600" }}
          >
            {title.includes("Add") ? "Add" : "Go to"} {title.split(" ").pop()}
          </a>
        </Link>
      </div>
    </div>
  );
}
