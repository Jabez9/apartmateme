
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// export default function BedsittersPage() {
//   const [houses, setHouses] = useState([]);
//   const [locationFilter, setLocationFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [nameSearch, setNameSearch] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bedsitters/`, {
//           cache: "no-store",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setHouses(data);
//         }
//       } catch (err) {
//         console.error("Error fetching bedsitters:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const uniqueLocations = [...new Set(houses.map(h => h.location))];
//   const uniquePrices = [...new Set(houses.flatMap(h => h.rent?.map(r => r.replace(/,/g, "")) || []))].sort(
//     (a, b) => parseInt(a) - parseInt(b)
//   );

//   const filteredHouses = houses.filter(h => {
//     const locMatch = !locationFilter || h.location === locationFilter;
//     const priceMatch = !priceFilter || h.rent?.some(r => r.replace(/,/g, "") === priceFilter);
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
//             Bedsitters
//           </h4>
//           <ol
//             className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
//             data-wow-delay="0.3s"
//           >
//             <li className="breadcrumb-item">
//               <Link href="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item active text-danger">Bedsitters</li>
//           </ol>
//         </div>
//       </div>

//       <div className="container py-4">
//         <div className="row g-3 mb-3 wow fadeInUp">
//           <div className="col-md-4">
//             <label htmlFor="location-filter" className="form-label fw-bold">Location</label>
//             <select
//               id="location-filter"
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
//             <label htmlFor="price-filter" className="form-label fw-bold">Rent Price</label>
//             <select
//               id="price-filter"
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
//             <label htmlFor="name-search" className="form-label fw-bold">Search by Name</label>
//             <input
//               type="text"
//               id="name-search"
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
//                 <BedsitterCard house={h} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

// function BedsitterCard({ house }) {
//   const [showModal, setShowModal] = useState(false);
//   const [hover, setHover] = useState(false);

//   const buttonStyle = {
//     width: "30%",
//     padding: "0.375rem 0.75rem",
//     border: "1px solid #0d6efd",
//     backgroundColor: hover ? "#0d6efd" : "rgb(40, 128, 6)",
//     color: hover ? "#fff" : "#fff",
//     borderRadius: "0.25rem",
//     fontWeight: "400",
//     fontSize: "1rem",
//     cursor: "pointer",
//     transition: "all 0.15s ease-in-out",
//   };

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
//             {house.rent?.length ? (
//               house.rent.map((r, i) => <li key={i}>KSh {r}</li>)
//             ) : (
//               <li>No rent info</li>
//             )}
//           </ul>
//           <button
//             style={buttonStyle}
//             onMouseEnter={() => setHover(true)}
//             onMouseLeave={() => setHover(false)}
//             onClick={() => setShowModal(true)}
//           >
//             Details
//           </button>
//         </div>
//       </div>

//       {showModal && <BedsitterModal house={house} onClose={() => setShowModal(false)} />}
//     </>
//   );
// }

// function BedsitterModal({ house, onClose }) {
//   return (
//     <div className="modal d-block fade show modal-backdrop-custom" tabIndex="-1" role="dialog">
//       <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">{house.name} Details</h5>
//             <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
//           </div>
//           <div className="modal-body">
//             <a href="tel:+254791751475" className="btn btn-success mb-3">
//               Request Visit or Booking
//             </a>
//             <p><strong>Location:</strong> {house.location}</p>
//             <p><strong>Description:</strong> {house.description}</p>
//             <p><strong>Pros:</strong></p>
//             <ul>
//               {house.pros && Array.isArray(house.pros) && house.pros.length > 0 ? (
//                 house.pros.map((pro, i) => <li key={i}>{pro}</li>)
//               ) : (
//                 <li>No pros listed</li>
//               )}
//             </ul>
//             <h6 className="mt-4">Gallery:</h6>
//             <div className="row g-2">
//               {house.images?.length ? (
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
  status: string;
  main_image?: string;
  rent?: string[];
  description?: string;
  pros?: string[];
  images?: HouseImage[];
}

export default function BedsittersPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [nameSearch, setNameSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bedsitters/`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data: House[] = await res.json();
          setHouses(data);
        }
      } catch (err) {
        console.error("Error fetching bedsitters:", err);
      }
    };

    fetchData();
  }, []);

  const uniqueLocations = [...new Set(houses.map(h => h.location))];
  const uniquePrices = [...new Set(houses.flatMap(h => h.rent?.map(r => r.replace(/,/g, "")) || []))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const filteredHouses = houses.filter(h => {
    const locMatch = !locationFilter || h.location === locationFilter;
    const priceMatch = !priceFilter || h.rent?.some(r => r.replace(/,/g, "") === priceFilter);
    const nameMatch = !nameSearch || h.name.toLowerCase().includes(nameSearch.toLowerCase());
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
            Bedsitters
          </h4>
          <ol
            className="breadcrumb d-flex justify-content-center mb-0 wow fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">Bedsitters</li>
          </ol>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3 mb-3 wow fadeInUp">
          <div className="col-md-4">
            <label htmlFor="location-filter" className="form-label fw-bold">Location</label>
            <select
              id="location-filter"
              className="form-select"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="price-filter" className="form-label fw-bold">Rent Price</label>
            <select
              id="price-filter"
              className="form-select"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              {uniquePrices.map(price => (
                <option key={price} value={price}>KSh {price}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="name-search" className="form-label fw-bold">Search by Name</label>
            <input
              type="text"
              id="name-search"
              className="form-control"
              placeholder="Apartment name..."
              value={nameSearch}
              onChange={e => setNameSearch(e.target.value)}
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
            {filteredHouses.map(h => (
              <div key={h.id} className="col-md-6 col-lg-4">
                <BedsitterCard house={h} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function BedsitterCard({ house }: { house: House }) {
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(false);

  const buttonStyle: React.CSSProperties = {
    width: "30%",
    padding: "0.375rem 0.75rem",
    border: "1px solid #0d6efd",
    backgroundColor: hover ? "#0d6efd" : "rgb(40, 128, 6)",
    color: "#fff",
    borderRadius: "0.25rem",
    fontWeight: "400",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.15s ease-in-out",
  };

  return (
    <>
      <div className="card h-100 shadow-sm">
        <div className="position-relative">
          <span className="badge bg-success position-absolute top-0 start-0 m-2">{house.status}</span>
          <Image
            src={house.main_image || "/assets/img/placeholder.jpg"}
            alt={house.name}
            width={400}
            height={250}
            style={{ objectFit: "cover" }}
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
            {house.rent?.length ? (
              house.rent.map((r, i) => <li key={i}>KSh {r}</li>)
            ) : (
              <li>No rent info</li>
            )}
          </ul>
          <button
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setShowModal(true)}
          >
            Details
          </button>
        </div>
      </div>

      {showModal && <BedsitterModal house={house} onClose={() => setShowModal(false)} />}
    </>
  );
}

function BedsitterModal({ house, onClose }: { house: House; onClose: () => void }) {
  return (
    <div className="modal d-block fade show modal-backdrop-custom" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{house.name} Details</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <a href="tel:+254791751475" className="btn btn-success mb-3">
              Request Visit or Booking
            </a>
            <p><strong>Location:</strong> {house.location}</p>
            <p><strong>Description:</strong> {house.description}</p>
            <p><strong>Pros:</strong></p>
            <ul>
              {house.pros && house.pros.length > 0 ? (
                house.pros.map((pro, i) => <li key={i}>{pro}</li>)
              ) : (
                <li>No pros listed</li>
              )}
            </ul>
            <h6 className="mt-4">Gallery:</h6>
            <div className="row g-2">
              {house.images?.length ? (
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
