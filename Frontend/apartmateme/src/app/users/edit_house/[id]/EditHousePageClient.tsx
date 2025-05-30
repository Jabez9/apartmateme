// "use client";

// import { useEffect, useState } from "react";
// import EditHouse from "../EditHouse";

// interface House {
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

// export default function EditHousePageClient({ houseId }: { houseId: string }) {
//   const [initialHouse, setInitialHouse] = useState<House | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHouse = async () => {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         window.location.href = "/login";
//         return;
//       }

//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${houseId}/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch house data");
//         }

//         const data = await res.json();
//         setInitialHouse(data);
//       } catch (error) {
//         console.error("Fetch error:", error);
//         alert("Unable to load house. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHouse();
//   }, [houseId]);

//   if (loading) return <div className="text-center mt-5">Loading house data...</div>;

//   if (!initialHouse) return <div className="text-center mt-5 text-danger">Failed to load house.</div>;

//   return <EditHouse initialHouse={initialHouse} csrfToken="" />;
// }
"use client";

import { useEffect, useState } from "react";
import EditHouse from "../EditHouse";

interface House {
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

export default function EditHousePageClient({ houseId }: { houseId: string }) {
  const [initialHouse, setInitialHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${houseId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch house data");
        }

        const data = await res.json();
        setInitialHouse(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Unable to load house. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [houseId]);

  if (loading)
    return <div className="text-center mt-5">Loading house data...</div>;

  if (!initialHouse)
    return (
      <div className="text-center mt-5 text-danger">Failed to load house.</div>
    );

  // Pass isAdmin prop (adjust as needed)
  return <EditHouse initialHouse={initialHouse} csrfToken="" isAdmin={false} />;
}
