// "use client";

// import React from "react";
// import LandlordHouses from "../LandlordHouses";

// type PageProps = {
//   params: { id: string };
// };

// export default function Page({ params }: PageProps) {
//   return <LandlordHouses landlordId={params.id} />;
// }

import React from "react";
import LandlordHouses from "../LandlordHouses";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  // Wait for params to resolve if it's a Promise
  const resolvedParams = await params;
  return <LandlordHouses landlordId={resolvedParams.id} />;
}
