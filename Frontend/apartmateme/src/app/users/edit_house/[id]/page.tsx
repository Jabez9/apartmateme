




// // src/app/users/edit_house/[id]/page.tsx
// 'use client';

// import EditHouse from '../EditHouse';

// interface PageProps {
//   params: { id: string };
// }

// export default function EditHousePage({ params }: PageProps) {
//   return <EditHouse houseId={params.id} />;
// }







// import EditHouse from "@/app/users/edit_house/EditHouse";

// interface PageProps {
//   params: { id: string };
// }

// export default async function EditHousePage({ params }: PageProps) {
//   const houseId = params.id;

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${houseId}/`,
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       const errorText = await res.text(); // read error body for debugging
//       console.error(`❌ Failed to fetch house. Status: ${res.status}, Body: ${errorText}`);
//       return (
//         <div className="text-center text-danger mt-5">
//           Failed to load house data.
//         </div>
//       );
//     }

//     const initialHouse = await res.json();

//     return <EditHouse initialHouse={initialHouse} csrfToken="" />;
//   } catch (error) {
//     console.error("💥 Server error:", error);
//     return (
//       <div className="text-center text-danger mt-5">
//         An unexpected error occurred.
//       </div>
//     );
//   }
// }




// app/users/edit_house/[id]/page.tsx

// import EditHouseWrapper from "./EditHouseWrapper";

// export default function Page({ params }: { params: { id: string } }) {
//   return <EditHouseWrapper houseId={params.id} />;
// }
import EditHouseWrapper from "./EditHouseWrapper";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <EditHouseWrapper houseId={id} />;
}