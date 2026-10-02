import Img from "../components/Img";
import Reveal from "../components/Reveal";
import { directorPortraits, directors, process, services, studio, values } from "../data";
import useTitle from "../useTitle";

export default function Studio() {
  useTitle(
    "Studio",
    "Allistar Technologies is an architectural consultancy in Ntinda, Kampala, led by two architects registered with the Uganda Architects Registration Board."
  );

  return (
    <>
      <section className="page">
        <header className="page-intro">
          <p className="kicker">Studio</p>
          <h1>An architecture office in Kampala, working across the built environment.</h1>
          <p>
            Allistar Technologies provides full consultancy services in building construction: architectural and
            interior design, landscape design, engineering design, urban and regional planning, pre-investment
            advisory services, project planning and management, and supervision. The team is committed to
            delivering the highest quality and exceeding expectations.
          </p>
        </header>

        <div className="split-notes">
          <Reveal>
            <p className="kicker">Vision</p>
            <h2>To be a centre of excellence of architectural design and built environment services.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="kicker">Mission</p>
            <h2>
              To excel and provide creative design solutions that address our clients' social, environmental and
              economic needs for sustainable development.
            </h2>
          </Reveal>
        </div>

        <section className="values-band">
          <div className="section-head">
            <div>
              <p className="kicker">Core beliefs and values</p>
              <h2>How the office expects to be known.</h2>
            </div>
          </div>
          <ul className="values-grid">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 70}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      </section>

      <section className="directors-band">
        <div className="directors-band-inner">
          <div className="section-head">
            <div>
              <p className="kicker kicker-light">Directors</p>
              <h2>Two registered architects lead the office.</h2>
            </div>
          </div>
          <div className="director-grid">
            {directors.map((person, index) => {
              const portrait = directorPortraits[person.slug];
              return (
                <Reveal as="article" key={person.slug} delay={index * 90} className="director-card">
                  {portrait && (
                    <div className="director-portrait">
                      <Img image={portrait} sizes="(max-width: 760px) 92vw, 340px" alt={person.name} />
                    </div>
                  )}
                  <div className="director-body">
                    <p className="kicker">{person.role}</p>
                    <h3>{person.name}</h3>
                    <h4>Registration</h4>
                    <ul>
                      {person.registration.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <h4>Qualifications</h4>
                    <ul>
                      {person.qualifications.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <h4>Professional experience</h4>
                    <ol className="timeline">
                      {person.experience.map((role) => (
                        <li key={`${role.period}-${role.place}`}>
                          <span className="timeline-period">{role.period}</span>
                          <span className="timeline-role">
                            {role.role}, {role.place}
                          </span>
                          {role.detail && <span className="timeline-detail">{role.detail}</span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page">
        <div className="section-head">
          <div>
            <p className="kicker">How a commission runs</p>
            <h2>Four stages.</h2>
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

        <section className="studio-visit">
          <div>
            <p className="kicker">Where to find us</p>
            <h2>Second floor, Ntinda Shopping Centre.</h2>
            <address>
              {studio.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p className="studio-visit-actions">
              <a className="btn" href={studio.mapUrl} target="_blank" rel="noreferrer">
                Open in maps
              </a>
              <a className="btn btn-ghost-dark" href={`mailto:${studio.email}`}>
                {studio.email}
              </a>
            </p>
          </div>
          <div className="studio-map">
            <iframe
              title="Map of Ntinda Shopping Centre on Kimera Road, Kampala"
              src={studio.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </section>
    </>
  );
}