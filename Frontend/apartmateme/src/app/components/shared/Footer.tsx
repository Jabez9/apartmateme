"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="footer position-relative dark-background">
      <div className="container footer-top" style={{ justifyContent: "center" }}>
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="footer-about">
              <Link href="/" className="logo sitename">ApartmateMe</Link>
              <div className="footer-contact pt-3">
                <p>Ongata Rongai</p>
                <p>P.O Box 15653 - 00100 , Nairobi</p>
                <p className="mt-3">
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+254791751475"
                    style={{ color: "white", textDecoration: "none" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "red")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                  >
                    +254791751475
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:apartmateme@gmail.com"
                    style={{ color: "white", textDecoration: "none" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "red")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "white")}
                  >
                    apartmateme@gmail.com
                  </a>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
                <a
                  href="https://wa.me/254791751475 "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/app1/about">About us</Link></li>
              <li><Link href="/app1/services">Services</Link></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          <span>Copyright &copy;</span>{" "}
          <strong className="px-1 sitename">
            {new Date().getFullYear()} ApartmateMe.
          </strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
          Designed by{" "}
          <a href="https://jabezhuya.tech " target="_blank" rel="noopener noreferrer">
            Muko
          </a>
        </div>
      </div>
    </footer>
  );
}