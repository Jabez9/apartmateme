/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

// Extend the Window interface to include AOS
declare global {
  interface Window {
    AOS: {
      init: () => void;
      [key: string]: any;
    };
  }
}

export default function Home() {
  return (
    <>
      {/* Load CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        rel="stylesheet"
      />

      <main className="main" style={{ backgroundColor: 'rgb(243, 246, 248)' }}>
        {/* Hero Section */}
        <section id="hero" className="hero section dark-background" style={{ backgroundColor: 'rgb(243, 246, 248)' }}>
          <Image
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
            alt="Hero"
            width={1920}
            height={600}
            className="w-100"
            data-aos="fade-in"
          />
          <div className="container" data-aos-delay="100">
            <div className="row justify-content-start">
              <div className="col-lg-8">
                <h2 data-aos="fade-right" data-aos-duration="1000">Welcome to ApartMateMe</h2>
                <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
                  We are determined to help you find your dream place of Stay in Ongata Rongai
                </p><br />
                <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">
                  From Masai Lodge, Tumaini, Mayor Road, Gataka Road, Sironik Road, Naivas, Tuskys,
                  Ole Kasasi, Mandazi Road, we got you covered, search in style
                </p>
                <a href="#getstarted" className="btn-get-started" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                  Get Started
               </a>
              </div>
            </div>
          </div>

          {/* Waves SVG */}
          <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
            <defs>
              <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
            </defs>
            <g className="wave1"><use href="#wave-path" x="50" y="3" /></g>
            <g className="wave2"><use href="#wave-path" x="50" y="0" /></g>
            <g className="wave3"><use href="#wave-path" x="50" y="9" /></g>
          </svg>
        </section>

        {/* Get Started Section */}
        <section id="getstarted" className="section section-4 bg-light py-5">
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-lg-5">
                <h2 className="font-weight-bold heading mb-4">Let&apos;s find a house that&apos;s perfect for you</h2>
                <p className="text-black-50">There after put an icing on the cake by converting your house to a home.</p>
              </div>
            </div>
            <div className="row justify-content-between mb-5">
              <div className="col-lg-7 mb-5 mb-lg-0 order-lg-2">
                <div className="img-about dots">
                  <Image
                    src="/assets/img/kenyasbeautiful.jpg"
                    alt="Kenya Beautiful"
                    width={800}
                    height={600}
                    className="img-fluid rounded"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                {[
                  { icon: "fa-home", title: "20+ Properties", text: "More than 20 houses on our platform as the number keeps increasing day by day." },
                  { icon: "fa-user-tie", title: "Top Rated Agent", text: "Our Agent is always working with their team to ensure excellent service delivery." },
                  { icon: "fa-shield-alt", title: "Legit Properties", text: "All properties on our website comply with all the laws of Kenya." }
                ].map(({ icon, title, text }, i) => (
                  <div className="d-flex feature-h mb-4" key={i}>
                    {/* <span className="wrap-icon me-3 text-primary"><i className={`fas ${icon}`}></i></span> */}
                    <span className="wrap-icon me-3" style={{ color: 'navy' }}>
                      <i className={`fas ${icon}`}></i>
                    </span>

                    <div className="feature-text">
                      <h3 className="heading h5">{title}</h3>
                      <p className="text-black-50">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section id="featured-properties" className="section py-5" style={{ backgroundColor: 'rgb(243, 246, 248)' }}>
          <div className="container" data-aos="fade-up">
            <div className="text-center mx-auto pb-5" style={{ maxWidth: '800px' }}>
              <h1 className="display-5 text-capitalize mb-3" style={{ fontFamily: 'Corbel, sans-serif' }}>
                <span style={{ color: 'black', fontWeight: 'bold' }}>Featured</span>
                <span style={{ color: 'red', fontWeight: 'bold' }}> Properties</span>
              </h1>
              <p className="mb-0" style={{ fontFamily: 'Corbel, sans-serif' }}>
                Here are some of the properties available on our website.
              </p>
            </div>

            <div className="row gy-4">
              {[
                {
                  title: 'BedSitters',
                  href: '/app1/bedsitters',
                  icon: 'fa-home',
                  img: 'https://images.unsplash.com/photo-1725631474965-b7a35c9f2057?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Affordable and cozy bedsitters perfect for singles or students.'
                },
                {
                  title: 'One Bedroom',
                  href: '/app1/onebd',
                  icon: 'fa-building',
                  img: 'https://images.unsplash.com/photo-1680210851377-b7168175ae9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Spacious one bedroom apartments for small families or couples.'
                },
                {
                  title: 'Two Bedroom',
                  href: '/app1/twobedroom',
                  icon: 'fa-bed',
                  img: 'https://plus.unsplash.com/premium_photo-1734545294117-a910817d5961?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Perfect for small to medium-sized families, with more comfort.'
                },
                {
                  title: 'Apartment',
                  href: '/app1/apartment',
                  icon: 'fa-store',
                  img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Modern apartments with all amenities included.'
                },
                {
                  title: 'Shops',
                  href: '/app1/shop',
                  icon: 'fa-shopping-cart',
                  img: 'https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  description: 'Commercial shops available at prime locations.'
                },
              ].map(({ title, href, icon, img, description }, idx) => (
                <div
                  key={idx}
                  className="col-sm-12 col-md-6 col-lg-3"
                  data-aos="zoom-in"
                  data-aos-delay={200 + idx * 100}
                >
                  <Link href={href} className="text-decoration-none text-dark">
                    <div className="card shadow-sm h-100">
                      <div className="position-relative" style={{ height: '180px' }}>
                        <Image
                          src={img}
                          alt={title}
                          fill
                          style={{ objectFit: 'cover', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex align-items-center mb-2 text-danger">
                          <i className={`fa ${icon} fs-4 me-2`}></i>
                          <h5 className="card-title mb-0">{title}</h5>
                        </div>
                        <p className="card-text text-muted flex-grow-1">{description}</p>
                        <button className="btn btn-danger mt-auto align-self-start">Explore</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials section py-5" style={{ backgroundColor: 'rgb(222, 229, 235)' }}>
          <div className="card rounded mx-4" style={{ backgroundColor: 'aliceblue' }}>
            <div className="container section-title text-center my-4">
              <h2>Tenant Reviews</h2>
              <p>Here is what some of our happy clients have to say about our services.</p>
            </div>
            <div className="container px-4" data-aos="fade-up" data-aos-delay="75">
              <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                <div className="carousel-inner d-flex flex-row w-100 overflow-hidden">
                  <div className="carousel-item active w-100">
                    <div className="testimonial-item text-center p-3">
                      <Image
                        src="/assets/images/testimony/omoke1.jpeg"
                        alt="Clinton Omoke"
                        width={100}
                        height={100}
                        className="rounded-circle mb-2"
                      />
                      <h3 className="font-semibold">Clinton Omoke</h3>
                      <h4 className="text-muted">Resident - Skylark</h4>
                      <div className="stars text-warning mb-2">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p className="italic">
                        Actually took me just 2 days to fully move in and settle in my house just hours after getting a vacant one on ApartmateMe.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item w-100">
                    <div className="testimonial-item text-center p-3">
                      <Image
                        src="/assets/images/testimony/melvin1.jpeg"
                        alt="Melvin Katua"
                        width={100}
                        height={100}
                        className="rounded-circle mb-2"
                      />
                      <h3 className="font-semibold">Melvin Katua</h3>
                      <h4 className="text-muted">Tenant - Dor Apartments</h4>
                      <div className="stars text-warning mb-2">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <p className="italic">
                        Happy to have found my house of choice in Mayor Road.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

  
       <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && window.AOS) {
            window.AOS.init();
          }
        }}
      />
      <style jsx>{`
        .card:hover {
          box-shadow: 0 8px 24px rgba(220, 53, 69, 0.3);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
