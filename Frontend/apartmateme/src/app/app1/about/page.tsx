"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);
  const [formData, setFormData] = useState({ phone_number: "", amount: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

    // ✅ Auto-hide thank you message after 5 seconds
  useEffect(() => {
    if (thankYouVisible) {
      const timer = setTimeout(() => {
        setThankYouVisible(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [thankYouVisible]);


  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stk_push/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }

      setTimeout(() => {
        setModalOpen(false);
        setThankYouVisible(true);
        setIsSubmitting(false);
        setFormData({ phone_number: "", amount: "" });
      }, 1000);
    } catch (err) {
      setIsSubmitting(false);
      if (err instanceof Error) {
        // If it's a known error, set the error message
        setError(err.message);
      } else {
        // If it's an unknown error, set a generic message
        setError("An unexpected error occurred. Please try again.");
      }
      
    }
  };

  return (
    <main>
      {/* Header & Breadcrumb */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h4 className="text-white display-4 mb-4">About Us</h4>
          <ol className="breadcrumb d-flex justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active text-danger">About</li>
          </ol>
        </div>
      </div>

      {/* About Section */}
      <section className="about section" style={{ backgroundColor: "#f3f6f8" }}>
        <div className="text-center mx-auto pb-5" style={{ maxWidth: 800 }}>
          <h1 className="display-5 mb-3">
            <span style={{ color: "black", fontWeight: "bold" }}>About </span>
            <span style={{ color: "red", fontWeight: "bold" }}>Us</span>
          </h1>
          <p className="mb-0">
            We are ApartmateMe, a team helping you get your dream house with ease.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 content">
              <h3>Your service is our command.</h3>
              <p className="fst-italic">
                We ensure you get the best houses in Ongata Rongai—rent or buy, fast and easy.
              </p>
              <ul>
                <li>✅ No more house hunting — we deliver!</li>
                <li>✅ Laundry services coming soon.</li>
                <li>✅ We value your feedback: &quot;I am because we are&quot;.</li>
              </ul>
              <p>Want to support the ApartmateMe project?</p>
              <a
                href="#"
                className="mpesa-donation"
                onClick={(e) => {
                  e.preventDefault();
                  setModalOpen(true);
                  setThankYouVisible(false);
                }}
              >
                <span>Buy a coffee</span>
              </a>

              {/* Modal */}
              {modalOpen && (
                <div className="donatemodal">
                  <div className="donatemodal-content">
                          {/* Close (X) button */}
                            <button
                              className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
                              onClick={() => setModalOpen(false)}
                            >
                              &times;
                            </button>
                    <button className="btn-close" onClick={() => setModalOpen(false)} />
                    <h2 className="mb-3">Support via M-Pesa</h2>
                    <form onSubmit={handleDonate}>
                      <input
                        type="text"
                        placeholder="MPesa No : Please start with 254XXXXXXXX"
                        className="form-control mb-3"
                        required
                        value={formData.phone_number}
                        onChange={(e) =>
                          setFormData({ ...formData, phone_number: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Amount (KES)"
                        className="form-control mb-3"
                        required
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                      />
                      <button type="submit" className="btn btn-danger w-100" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Proceed"}
                      </button>
                    </form>
                    {error && <div className="text-danger mt-2">{error}</div>}
                  </div>
                </div>
              )}

              {/* Thank You Message */}
              {thankYouVisible && (
                <div className="alert alert-success mt-4" role="alert">
                  <strong>Thank you for donating! 🤗</strong><br />
                  Complete the M-Pesa prompt on your phone to finish.
                </div>
              )}

              {/* Styles */}
              <style jsx>{`
                .donatemodal {
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: rgba(0, 0, 0, 0.6);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 9999;
                }
                .donatemodal-content {
                  background: #fff;
                  padding: 30px;
                  border-radius: 8px;
                  width: 100%;
                  max-width: 400px;
                  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                  position: relative;
                }
                .btn-close {
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  background: none;
                  border: none;
                  font-size: 1.5rem;
                  cursor: pointer;
                }
                .mpesa-donation {
                  display: inline-block;
                  background-color: rgb(233, 6, 29);
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 4px;
                  font-weight: bold;
                }
                .mpesa-donation:hover {
                  background-color: #ff0019;
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
