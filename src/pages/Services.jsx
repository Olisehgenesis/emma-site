import Reveal from "../components/Reveal";
import { process, services, studio } from "../data";
import useTitle from "../useTitle";

export default function Services() {
  useTitle(
    "Services",
    "Allistar Technologies: architectural design, interior and landscape design, engineering, planning, pre-investment advice, project management and supervision."
  );

  return (
    <section className="page">
      <header className="page-intro">
        <p className="kicker">Services</p>
        <h1>Full consultancy, from pre-investment advice to supervision on site.</h1>
        <p>
          The office holds eight services in one place, so the client deals with one team across the whole
          commission rather than coordinating separate consultants.
        </p>
      </header>

      <ol className="service-numbers">
        {services.map((service, index) => (
          <Reveal as="li" key={service.title} delay={(index % 2) * 60}>
            <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <div className="section-head services-head">
        <div>
          <p className="kicker">How a commission runs</p>
          <h2>Four stages, one team.</h2>
        </div>
      </div>
      <ol className="steps">
        {process.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 70}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </ol>

      <div className="service-cta">
        <div>
          <p className="kicker kicker-light">Next step</p>
          <h2>Send a short brief.</h2>
          <p>
            Say where the plot is and what the building has to do. The office replies with a way forward, and a
            site visit if it helps.
          </p>
        </div>
        <div className="service-cta-actions">
          <a className="btn btn-light" href={studio.phones[0].href}>
            Call {studio.phones[0].display}
          </a>
          <a className="btn btn-ghost" href={`mailto:${studio.email}`}>
            {studio.email}
          </a>
        </div>
      </div>
    </section>
  );
}