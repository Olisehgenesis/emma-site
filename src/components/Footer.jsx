import { Link } from "react-router-dom";
import { studio, services } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-studio">
          <p className="kicker kicker-light">The studio</p>
          <p className="footer-lead">
            Architectural design, interiors, engineering and supervision from one office in Ntinda, Kampala.
          </p>
          <p>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
          </p>
        </div>

        <div>
          <p className="kicker kicker-light">Services</p>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service.title}>
                <Link to="/services">{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker kicker-light">Visit</p>
          <address className="footer-address">
            {studio.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a className="text-link-light" href={studio.mapUrl} target="_blank" rel="noreferrer">
            Open in maps
          </a>
        </div>

        <div>
          <p className="kicker kicker-light">Call</p>
          <ul className="footer-list">
            {studio.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href}>{phone.display}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {studio.name}. Registered architects, Uganda Architects Registration
          Board.
        </p>
        <ul>
          <li><Link to="/work">Work</Link></li>
          <li><Link to="/studio">Studio</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <p className="footer-mark" aria-hidden="true">
        Allistar
      </p>
    </footer>
  );
}