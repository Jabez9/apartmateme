"use client";

import dynamic from "next/dynamic";

// Dynamically load EditHousePageClient without SSR
const EditHousePageClient = dynamic(() => import("./EditHousePageClient"), {
  ssr: false,
});

export default function EditHouseWrapper({ houseId }: { houseId: string }) {
  return <EditHousePageClient houseId={houseId} />;
}
