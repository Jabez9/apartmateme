// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function ShopsPage() {
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters state
//   const [locationFilter, setLocationFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     async function fetchHouses() {
//       try {
//         const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

//         const res = await fetch(`${backendUrl}/api/shop/`, {
//           cache: "no-store",
//         });

//         if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

//         const data = await res.json();
//         setHouses(data);
//       } catch (error) {
//         console.error("Error fetching houses:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHouses();

//     // Initialize AOS only once on mount
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   // Filter shops only
//   const shops = houses.filter((h) => h.type === "Shop");

//   // Extract unique locations
//   const uniqueLocations = [...new Set(shops.map((h) => h.location))];

//   // Extract unique prices (clean numbers, sort ascending)
//   const uniquePrices = [
//     ...new Set(
//       shops.flatMap((h) =>
//         h.rent
//           ? h.rent.map((r) => r.replace(/,/g, "")) // Remove commas
//           : []
//       )
//     ),
//   ].sort((a, b) => parseInt(a) - parseInt(b));

//   // Filter by location, price, search
//   const filteredShops = shops.filter((shop) => {
//     const matchesLocation = locationFilter ? shop.location === locationFilter : true;

//     const matchesPrice = priceFilter
//       ? shop.rent && shop.rent.some((r) => r.replace(/,/g, "") === priceFilter)
//       : true;

//     const matchesSearch = searchTerm
//       ? shop.name.toLowerCase().includes(searchTerm.toLowerCase())
//       : true;

//     return matchesLocation && matchesPrice && matchesSearch;
//   });

//   function clearFilters() {
//     setLocationFilter("");
//     setPriceFilter("");
//     setSearchTerm("");
//   }

//   return (
//     <main className="bg-gray-100" style={{ backgroundColor: "#f3f6f8" }}>
//       {/* Header Section */}
//       <div className="container-fluid bg-blue-700 py-8">
//         <div className="container max-w-[900px] mx-auto text-center">
//           <h4 className="text-white text-4xl font-extrabold mb-4">Shops</h4>
//           <ol className="flex justify-center items-center gap-2 text-sm md:text-base text-white">
//             <li>
//               <Link href="/" className="hover:text-red-300 transition-colors">
//                 Home
//               </Link>
//             </li>
//             <li className="text-red-500">Shops</li>
//           </ol>
//         </div>
//       </div>

//       {/* Hero Message */}
//       <div className="container mx-auto text-center py-6">
//         <h3 className="text-gray-700 text-xl md:text-2xl">
//           Here are some shops on our website
//         </h3>
//       </div>

//       {/* Filters Section */}
//       <section className="py-6 px-4 bg-white">
//         <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
//           <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//             <select
//               value={locationFilter}
//               onChange={(e) => setLocationFilter(e.target.value)}
//               className="p-2 border rounded"
//               aria-label="Filter by location"
//             >
//               <option value="">All Locations</option>
//               {uniqueLocations.map((loc) => (
//                 <option key={loc} value={loc}>
//                   {loc}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={priceFilter}
//               onChange={(e) => setPriceFilter(e.target.value)}
//               className="p-2 border rounded"
//               aria-label="Filter by price"
//             >
//               <option value="">All Prices</option>
//               {uniquePrices.map((price) => (
//                 <option key={price} value={price}>
//                   KSh {price}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="text"
//               value={searchTerm}
//               placeholder="Search by name..."
//               className="p-2 border rounded"
//               onChange={(e) => setSearchTerm(e.target.value)}
//               aria-label="Search by name"
//             />
//           </div>

//           <button
//             onClick={clearFilters}
//             className="mt-2 sm:mt-0 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
//             aria-label="Clear filters"
//           >
//             Clear Filters
//           </button>
//         </div>
//       </section>

//       {/* No Results Message */}
//       {!loading && filteredShops.length === 0 && (
//         <div className="text-center text-red-600 mt-4" id="no-results-message">
//           <h5>Sorry, no shops meet your criteria.</h5>
//         </div>
//       )}

//       {/* Shop Cards */}
//       <section className="py-10 px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading
//             ? "Loading..."
//             : filteredShops.map((house) => <ShopCard key={house.id} house={house} />)}
//         </div>
//       </section>
//     </main>
//   );
// }

// // ShopCard and ShopModal unchanged, but with some minor fixes for tailwind className and accessibility

// function ShopCard({ house }) {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <div
//         className="cardhouse bg-white rounded shadow-md overflow-hidden h-full"
//         data-aos="fade-up"
//       >
//         <div className="relative">
//           <span className="absolute top-0 left-0 m-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
//             {house.status}
//           </span>
//           <Image
//             src={house.main_image || "/assets/img/placeholder.jpg"}
//             alt={house.name}
//             width={400}
//             height={250}
//             className="w-full h-48 object-cover"
//           />
//         </div>
//         <div className="p-4">
//           <h4 className="text-blue-700 font-bold">{house.name}</h4>
//           <h5 className="flex items-center text-gray-600">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               fill="currentColor"
//               viewBox="0 0 16 16"
//               className="mr-1"
//             >
//               <path d="M8 0a4 4 0 0 1 4 4c0 2.25-1.35 4.24-2.86 5.74l-1.14 1.25-1.14-1.25C5.35 8.24 4 6.25 4 4A4 4 0 0 1 8 0zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
//             </svg>
//             {house.location}
//           </h5>
//           <ul className="text-green-700 font-bold">
//             {house.rent && house.rent.length > 0 ? (
//               house.rent.map((r, idx) => <li key={idx}>KSh {r}</li>)
//             ) : (
//               <li>No rent info</li>
//             )}
//           </ul>
//           <button
//             className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             onClick={() => setShowModal(true)}
//             aria-label={`Show details for ${house.name}`}
//           >
//             Details
//           </button>
//         </div>
//       </div>

//       {showModal && <ShopModal house={house} onClose={() => setShowModal(false)} />}
//     </>
//   );
// }

// function ShopModal({ house, onClose }) {
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
//         <div className="modal-header p-4 border-b flex justify-between items-center">
//           <h5 id="modal-title" className="text-xl font-bold">
//             {house.name} Details
//           </h5>
//           <button
//             onClick={onClose}
//             className="text-xl font-bold hover:text-red-500"
//             aria-label="Close modal"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="modal-body p-4">
//           <a
//             href="tel:+254791751475"
//             className="btn bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
//           >
//             Request Visit or Booking
//           </a>
//           <h6 className="font-semibold">Location: {house.location}</h6>
//           <p className="mb-2">{house.description}</p>
//           <h6 className="font-semibold">Rent Options:</h6>
//           <ul className="text-green-700 font-bold">
//             {house.rent && house.rent.length > 0 ? (
//               house.rent.map((r, idx) => <li key={idx}>KSh {r}</li>)
//             ) : (
//               <li>No rent info</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Define the house type
interface House {
  id: number;
  name: string;
  type: string;
  location: string;
  rent?: string[]; // optional rent array of strings
  status: string;
  main_image?: string;
  description?: string;
}

export default function ShopsPage() {
  const [houses, setHouses] = useState<House[]>([]); // <--- Typed here
  const [loading, setLoading] = useState(true);

  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchHouses() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const res = await fetch(`${backendUrl}/api/shop/`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data: House[] = await res.json(); // assert type if you want

        setHouses(data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHouses();

    AOS.init({ duration: 800, once: true });
  }, []);

  // Filter shops only
  const shops = houses.filter((h) => h.type === "Shop");

  // Extract unique locations
  const uniqueLocations = [...new Set(shops.map((h) => h.location))];

  // Extract unique prices (clean numbers, sort ascending)
  const uniquePrices = [
    ...new Set(
      shops.flatMap((h) =>
        h.rent
          ? h.rent.map((r) => r.replace(/,/g, "")) // Remove commas
          : []
      )
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  // Filter by location, price, search
  const filteredShops = shops.filter((shop) => {
    const matchesLocation = locationFilter ? shop.location === locationFilter : true;

    const matchesPrice = priceFilter
      ? shop.rent && shop.rent.some((r) => r.replace(/,/g, "") === priceFilter)
      : true;

    const matchesSearch = searchTerm
      ? shop.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesLocation && matchesPrice && matchesSearch;
  });

  function clearFilters() {
    setLocationFilter("");
    setPriceFilter("");
    setSearchTerm("");
  }

  return (
    <main className="bg-gray-100" style={{ backgroundColor: "#f3f6f8" }}>
      {/* Header Section */}
      <div className="container-fluid bg-blue-700 py-8">
        <div className="container max-w-[900px] mx-auto text-center">
          <h4 className="text-white text-4xl font-extrabold mb-4">Shops</h4>
          <ol className="flex justify-center items-center gap-2 text-sm md:text-base text-white">
            <li>
              <Link href="/" className="hover:text-red-300 transition-colors">
                Home
              </Link>
            </li>
            <li className="text-red-500">Shops</li>
          </ol>
        </div>
      </div>

      {/* Hero Message */}
      <div className="container mx-auto text-center py-6">
        <h3 className="text-gray-700 text-xl md:text-2xl">
          Here are some shops on our website
        </h3>
      </div>

      {/* Filters Section */}
      <section className="py-6 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="p-2 border rounded"
              aria-label="Filter by location"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="p-2 border rounded"
              aria-label="Filter by price"
            >
              <option value="">All Prices</option>
              {uniquePrices.map((price) => (
                <option key={price} value={price}>
                  KSh {price}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={searchTerm}
              placeholder="Search by name..."
              className="p-2 border rounded"
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search by name"
            />
          </div>

          <button
            onClick={clearFilters}
            className="mt-2 sm:mt-0 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            aria-label="Clear filters"
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* No Results Message */}
      {!loading && filteredShops.length === 0 && (
        <div className="text-center text-red-600 mt-4" id="no-results-message">
          <h5>Sorry, no shops meet your criteria.</h5>
        </div>
      )}

      {/* Shop Cards */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? "Loading..."
            : filteredShops.map((house) => <ShopCard key={house.id} house={house} />)}
        </div>
      </section>
    </main>
  );
}

interface ShopCardProps {
  house: House;
}

function ShopCard({ house }: ShopCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="cardhouse bg-white rounded shadow-md overflow-hidden h-full"
        data-aos="fade-up"
      >
        <div className="relative">
          <span className="absolute top-0 left-0 m-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded">
            {house.status}
          </span>
          <Image
            src={house.main_image || "/assets/img/placeholder.jpg"}
            alt={house.name}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="text-blue-700 font-bold">{house.name}</h4>
          <h5 className="flex items-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mr-1"
            >
              <path d="M8 0a4 4 0 0 1 4 4c0 2.25-1.35 4.24-2.86 5.74l-1.14 1.25-1.14-1.25C5.35 8.24 4 6.25 4 4A4 4 0 0 1 8 0zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            {house.location}
          </h5>
          <ul className="text-green-700 font-bold">
            {house.rent && house.rent.length > 0 ? (
              house.rent.map((r, idx) => <li key={idx}>KSh {r}</li>)
            ) : (
              <li>No rent info</li>
            )}
          </ul>
          <button
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowModal(true)}
            aria-label={`Show details for ${house.name}`}
          >
            Details
          </button>
        </div>
      </div>

      {showModal && <ShopModal house={house} onClose={() => setShowModal(false)} />}
    </>
  );
}

interface ShopModalProps {
  house: House;
  onClose: () => void;
}

function ShopModal({ house, onClose }: ShopModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
        <div className="modal-header p-4 border-b flex justify-between items-center">
          <h5 id="modal-title" className="text-xl font-bold">
            {house.name} Details
          </h5>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:text-red-500"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body p-4">
          <a
            href="tel:+254791751475"
            className="btn bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
          >
            Request Visit or Booking
          </a>
          <h6 className="font-semibold">Location: {house.location}</h6>
          <p className="mb-2">{house.description}</p>
          <h6 className="font-semibold">Rent Options:</h6>
          <ul className="text-green-700 font-bold">
            {house.rent && house.rent.length > 0 ? (
              house.rent.map((r, idx) => <li key={idx}>KSh {r}</li>)
            ) : (
              <li>No rent info</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
