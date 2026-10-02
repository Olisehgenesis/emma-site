import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { studio } from "../data";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onScroll() {
      setSolid(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="nav-bar">
        <NavLink to="/" className="brand" aria-label={`${studio.name} home`}>
          <img className="brand-mark" src="/media/studio/logo-256.png" alt="" width="34" height="34" />
          <span className="brand-text">
            <strong>Allistar</strong>
            <em>Technologies</em>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-end">
          <a className="nav-phone" href={studio.phones[0].href}>
            {studio.phones[0].display}
          </a>
          <NavLink to="/contact" className="btn btn-small">
            Start a project
          </NavLink>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-bars" aria-hidden="true">
              <i />
              <i />
            </span>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end}>
            {link.label}
          </NavLink>
        ))}
        <a className="mobile-phone" href={studio.phones[0].href}>
          {studio.phones[0].display}
        </a>
        <p className="mobile-address">{studio.address[0]}, {studio.address[1]}</p>
      </div>
    </header>
  );
}