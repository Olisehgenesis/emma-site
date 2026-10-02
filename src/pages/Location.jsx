import { Link } from "react-router-dom";
import { studio } from "../data";
import useTitle from "../useTitle";

export default function Location() {
  useTitle("Location");

  return (
    <section className="page">
      <div className="page-intro">
        <p className="kicker">Location</p>
        <h1>The studio is on the second floor at Ntinda Shopping Centre.</h1>
        <p>Plot 1, Kimera Road, Ntinda. Ask for Suite 16C.</p>
      </div>

      <div className="location-layout">
        <div className="address-card">
          {studio.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <a href={`mailto:${studio.email}`}>{studio.email}</a>
          </p>
          <ul>
            {studio.phones.map((phone) => (
              <li key={phone.href}>
                <a href={phone.href}>{phone.display}</a>
              </li>
            ))}
          </ul>
          <a className="btn" href={studio.mapUrl} target="_blank" rel="noreferrer">
            Open in maps
          </a>
          <Link className="text-link" to="/contact">
            Send a brief instead
          </Link>
        </div>
        <iframe
          className="map"
          title="Map of Ntinda Shopping Centre on Kimera Road, Kampala"
          src={studio.mapEmbed}
          loading="lazy"
        />
      </div>
    </section>
  );
}
