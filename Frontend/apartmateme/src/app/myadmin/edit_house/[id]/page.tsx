
// import { cookies } from 'next/headers';
// import EditHouse, { InitialHouse } from '@/app/users/edit_house/EditHouse';

// export default async function EditHousePage({ params }: { params: { id: string } }) {
//   const { id } = params;

//   // Read cookies from the request headers
//   const cookieStore = cookies();
//   const accessToken = cookieStore.get('accessToken')?.value;

//   // Use token in fetch headers (e.g. Authorization)
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${id}`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   if (!res.ok) {
//     // handle error, e.g. return some error message or redirect
//     throw new Error('Failed to fetch house data');
//   }

//   const initialHouse: InitialHouse = await res.json();

//   return (
//     <div className="container py-4">
//       <h2 className="mb-4">Edit House (Admin)</h2>
//       <EditHouse initialHouse={initialHouse} isAdmin={true} />
//     </div>
//   );
// }
import { Metadata } from "next";
import { cookies } from "next/headers";
import EditHouse, { InitialHouse } from "@/app/users/edit_house/EditHouse";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit House ${id}`,
  };
}

export default async function EditHousePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/houses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch house data");
  }

  const initialHouse: InitialHouse = await res.json();

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit House (Admin)</h2>
      <EditHouse initialHouse={initialHouse} isAdmin={true} />
    </div>
  );
}