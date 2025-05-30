
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// export default function TwoBedroomPage() {
//   const [houses, setHouses] = useState([]);
//   const [locationFilter, setLocationFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [nameSearch, setNameSearch] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/twobd/`, {
//           cache: "no-store",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setHouses(data);
//         }
//       } catch (err) {
//         console.error("Error fetching houses:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const uniqueLocations = [...new Set(houses.map(h => h.location))];
//   const uniquePrices = [
//     ...new Set(
//       houses.flatMap(h =>
//         Array.isArray(h.rent)
//           ? h.rent.map(r => r.replace(/,/g, ""))
//           : [h.rent?.toString().replace(/,/g, "")]
//       )
//     ),
//   ].sort((a, b) => parseInt(a) - parseInt(b));

//   const filteredHouses = houses.filter(h => {
//     const locMatch = !locationFilter || h.location === locationFilter;
//     const priceMatch =
//       !priceFilter ||
//       (Array.isArray(h.rent)
//         ? h.rent.some(r => r.replace(/,/g, "") === priceFilter)
//         : h.rent?.toString().replace(/,/g, "") === priceFilter);
//     const nameMatch = !nameSearch || h.name.toLowerCase().includes(nameSearch.toLowerCase());
//     return locMatch && priceMatch && nameMatch;
//   });

//   return (
//     <main className="bg-light">
//       <div className="container-fluid bg-breadcrumb">
//         <div className="container text-center py-5" style={{ maxWidth: 900 }}>
//           <h4
//             className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
//             data-wow-delay="0.1s"
//             style={{ fontWeight: "bolder" }}
//           >
//             Two Bedroom Apartments
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
//             data-wow-delay="0.3s"
//           >
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Two Bedrooms</li>
//           </ol>
//         </div>
//       </div>

//       <div className="container py-4">
//         <div className="row g-3 mb-3 wow fadeInUp">
//           <div className="col-md-4">
//             <label className="form-label fw-bold">Location</label>
//             <select
//               className="form-select"
//               value={locationFilter}
//               onChange={e => setLocationFilter(e.target.value)}
//             >
//               <option value="">All Locations</option>
//               {uniqueLocations.map(loc => (
//                 <option key={loc} value={loc}>{loc}</option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-4">
//             <label className="form-label fw-bold">Rent Price</label>
//             <select
//               className="form-select"
//               value={priceFilter}
//               onChange={e => setPriceFilter(e.target.value)}
//             >
//               <option value="">All Prices</option>
//               {uniquePrices.map(price => (
//                 <option key={price} value={price}>KSh {price}</option>
//               ))}
//             </select>
//           </div>
//           <div className="col-md-4">
//             <label className="form-label fw-bold">Search by Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Apartment name..."
//               value={nameSearch}
//               onChange={e => setNameSearch(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="text-end mb-4">
//           <button
//             className="btn btn-secondary"
//             onClick={() => {
//               setLocationFilter("");
//               setPriceFilter("");
//               setNameSearch("");
//             }}
//           >
//             Clear Filters
//           </button>
//         </div>

//         {filteredHouses.length === 0 ? (
//           <div className="text-center text-danger wow fadeInUp">
//             <h5>Sorry, no houses meet your criteria.</h5>
//           </div>
//         ) : (
//           <div className="row g-4 wow fadeInUp">
//             {filteredHouses.map(h => (
//               <div key={h.id} className="col-md-6 col-lg-4">
//                 <HouseCard house={h} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// function HouseCard({ house }) {
//   const [showModal, setShowModal] = useState(false);
//   const [hover, setHover] = useState(false);

//   return (
//     <>
//       <div className="card h-100 shadow-sm">
//         <div className="position-relative">
//           <span className="badge bg-success position-absolute top-0 start-0 m-2">{house.status}</span>
//           <Image
//             src={house.main_image || "/assets/img/placeholder.jpg"}
//             alt={house.name}
//             width={400}
//             height={250}
//             layout="responsive"
//             objectFit="cover"
//             className="card-img-top rounded-top zoom-on-hover"
//           />
//         </div>
//         <div className="card-body">
//           <h5 className="card-title text-primary">{house.name}</h5>
//           <p className="card-text text-muted">
//             <i className="bi bi-geo-alt-fill me-1"></i>
//             {house.location}
//           </p>
//           <ul className="list-unstyled fw-bold text-success mb-3">
//             {Array.isArray(house.rent) && house.rent.length > 0 ? (
//               house.rent.map((r, i) => <li key={i}>KSh {r}</li>)
//             ) : house.rent ? (
//               <li>KSh {house.rent}</li>
//             ) : (
//               <li>No rent info</li>
//             )}
//           </ul>
//           <button
//             className="btn"
//             style={{
//               backgroundColor: hover ? "#0d6efd" : "rgb(40, 128, 6)",
//               color: "#fff",
//               width: "30%",
//             }}
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//             onClick={() => setShowModal(true)}
//           >
//             Details
//           </button>
//         </div>
//       </div>

//       {showModal && <HouseModal house={house} onClose={() => setShowModal(false)} />}
//     </>
//   );
// }

// function HouseModal({ house, onClose }) {
//   return (
//     <div className="modal d-block fade show modal-backdrop-custom" tabIndex="-1">
//       <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{house.name} Details</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <a href="tel:+254791751475" className="btn btn-success mb-3">
//               Request Visit or Booking
//             </a>
//             <p><strong>Location:</strong> {house.location}</p>
//             <p><strong>Description:</strong> {house.description}</p>
//             <p><strong>Pros:</strong></p>
//             <ul>
//               {Array.isArray(house.pros) && house.pros.length > 0 ? (
//                 house.pros.map((pro, i) => <li key={i}>{pro}</li>)
//               ) : (
//                 <li>No pros listed</li>
//               )}
//             </ul>
//             <h6 className="mt-4">Gallery:</h6>
//             <div className="row g-2">
//               {Array.isArray(house.images) && house.images.length > 0 ? (
//                 house.images.map((img, i) => (
//                   <div key={i} className="col-md-4">
//                     <Image
//                       src={img.image || "/assets/img/placeholder.jpg"}
//                       alt={`Gallery ${i + 1}`}
//                       width={300}
//                       height={200}
//                       className="img-fluid rounded"
//                       style={{ objectFit: "cover" }}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 <p>No images available</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HouseImage {
  image: string;
}

interface House {
  id: number;
  name: string;
  location: string;
  rent: string | string[];
  status: string;
  main_image?: string;
  description?: string;
  pros?: string[];
  images?: HouseImage[];
}

export default function TwoBedroomPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/twobd/`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data: House[] = await res.json();
          setHouses(data);
        } else {
          console.error("Failed to fetch houses, status:", res.status);
        }
      } catch (err) {
        console.error("Error fetching houses:", err);
      }
    };
    fetchData();
  }, []);

  const uniqueLocations = [...new Set(houses.map((h) => h.location))];
  const uniquePrices = [
    ...new Set(
      houses.flatMap((h) =>
        Array.isArray(h.rent)
          ? h.rent.map((r) => r.replace(/,/g, ""))
          : [h.rent?.toString().replace(/,/g, "")]
      )
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const filteredHouses = houses.filter((h) => {
    const locMatch = !locationFilter || h.location === locationFilter;
    const priceMatch =
      !priceFilter ||
      (Array.isArray(h.rent)
        ? h.rent.some((r) => r.replace(/,/g, "") === priceFilter)
        : h.rent?.toString().replace(/,/g, "") === priceFilter);
    const nameMatch =
      !nameSearch || h.name.toLowerCase().includes(nameSearch.toLowerCase());
    return locMatch && priceMatch && nameMatch;
  });

  return (
    <main className="bg-light">
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4
            className="text-white display-4 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
            style={{ fontWeight: "bolder" }}
          >
            Two Bedroom Apartments
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Two Bedrooms</li>
          </ol>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3 mb-3 wow fadeInUp">
          <div className="col-md-4">
            <label className="form-label fw-bold">Location</label>
            <select
              className="form-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Rent Price</label>
            <select
              className="form-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              {uniquePrices.map((price) => (
                <option key={price} value={price}>
                  KSh {price}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Search by Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Apartment name..."
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="text-end mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setLocationFilter("");
              setPriceFilter("");
              setNameSearch("");
            }}
          >
            Clear Filters
          </button>
        </div>

        {filteredHouses.length === 0 ? (
          <div className="text-center text-danger wow fadeInUp">
            <h5>Sorry, no houses meet your criteria.</h5>
          </div>
        ) : (
          <div className="row g-4 wow fadeInUp">
            {filteredHouses.map((h) => (
              <div key={h.id} className="col-md-6 col-lg-4">
                <HouseCard house={h} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function HouseCard({ house }: { house: House }) {
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <div className="card h-100 shadow-sm">
        <div className="position-relative">
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            {house.status}
          </span>
          <Image
            src={house.main_image || "/assets/img/placeholder.jpg"}
            alt={house.name}
            width={400}
            height={250}
            layout="responsive"
            objectFit="cover"
            className="card-img-top rounded-top zoom-on-hover"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title text-primary">{house.name}</h5>
          <p className="card-text text-muted">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {house.location}
          </p>
          <ul className="list-unstyled fw-bold text-success mb-3">
            {Array.isArray(house.rent) && house.rent.length > 0 ? (
              house.rent.map((r, i) => <li key={i}>KSh {r}</li>)
            ) : house.rent ? (
              <li>KSh {house.rent}</li>
            ) : (
              <li>No rent info</li>
            )}
          </ul>
          <button
            className="btn"
            style={{
              backgroundColor: hover ? "#0d6efd" : "rgb(40, 128, 6)",
              color: "#fff",
              width: "30%",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setShowModal(true)}
          >
            Details
          </button>
        </div>
      </div>

      {showModal && <HouseModal house={house} onClose={() => setShowModal(false)} />}
    </>
  );
}

function HouseModal({
  house,
  onClose,
}: {
  house: House;
  onClose: () => void;
}) {
  return (
    <div className="modal d-block fade show modal-backdrop-custom" tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{house.name} Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <a href="tel:+254791751475" className="btn btn-success mb-3">
              Request Visit or Booking
            </a>
            <p>
              <strong>Location:</strong> {house.location}
            </p>
            <p>
              <strong>Description:</strong> {house.description}
            </p>
            <p>
              <strong>Pros:</strong>
            </p>
            <ul>
              {Array.isArray(house.pros) && house.pros.length > 0 ? (
                house.pros.map((pro, i) => <li key={i}>{pro}</li>)
              ) : (
                <li>No pros listed</li>
              )}
            </ul>
            <h6 className="mt-4">Gallery:</h6>
            <div className="row g-2">
              {Array.isArray(house.images) && house.images.length > 0 ? (
                house.images.map((img, i) => (
                  <div key={i} className="col-md-4">
                    <Image
                      src={img.image || "/assets/img/placeholder.jpg"}
                      alt={`Gallery ${i + 1}`}
                      width={300}
                      height={200}
                      className="img-fluid rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
