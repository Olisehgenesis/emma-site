import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import { featuredSlugs, homeSlugs, projectsBySlugs, services, studio, values } from "../data";
import useTitle from "../useTitle";

const featured = projectsBySlugs(featuredSlugs);
const selected = projectsBySlugs(homeSlugs);
const homeServices = services.filter((service) =>
  ["Architectural design", "Interior design", "Engineering design", "Supervision"].includes(service.title)
);

export default function Home() {
  useTitle("", studio.tagline);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const project = featured[index];

  useEffect(() => {
    if (paused) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % featured.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  function choose(next) {
    setIndex(next);
    setPaused(true);
  }

  function onRunnerKey(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      choose((index + 1) % featured.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      choose((index - 1 + featured.length) % featured.length);
    }
  }

  return (
    <>
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Img
          key={project.slug}
          image={project.images[0]}
          className="hero-photo"
          sizes="100vw"
          alt={`${project.name}, ${project.place}`}
          priority
          ratio
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <p className="kicker kicker-light">Architectural design · Ntinda, Kampala</p>
            <h1>
              From the drawing
              <br />
              to the site.
            </h1>
            <p className="hero-project">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {project.name}
            </p>
            <p className="hero-meta">
              {project.place} · {project.category}
            </p>
            <div className="hero-actions">
              <Link className="btn btn-light" to="/contact">
                Start a project
              </Link>
              <Link className="btn btn-ghost" to={`/work/${project.slug}`}>
                About this project
              </Link>
            </div>
          </div>

          <div className="runner" role="group" aria-label="Featured projects" onKeyDown={onRunnerKey}>
            <p className="runner-label">Featured work</p>
            <ol>
              {featured.map((item, itemIndex) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    className={itemIndex === index ? "is-active" : undefined}
                    aria-current={itemIndex === index ? "true" : undefined}
                    aria-label={`Show ${item.name}`}
                    onClick={() => choose(itemIndex)}
                  >
                    <Img image={item.images[0]} sizes="160px" alt="" ratio />
                    <span>{itemIndex + 1}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true" />
      </section>

      <section className="band intro">
        <div className="intro-copy">
          <Reveal>
            <p className="kicker">The office</p>
            <h2>Design and supervision, held in one consultancy.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p>
              Allistar Technologies works with clients who need a building drawn properly and then watched while
              it is built. The office covers architecture, interiors, landscape, engineering, planning and site
              supervision.
            </p>
            <p>
              The practice is led by two registered architects. Arch. Muhumuza Emmanuel, registration No. 311, is
              the principal and a project management professional. Arch. Aheebwa Philemon, registration No. 330,
              leads design.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link className="text-link" to="/studio">
              More about the studio <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
        <dl className="facts">
          <Reveal as="div" delay={40}>
            <dt>Projects in the profile</dt>
            <dd>21</dd>
          </Reveal>
          <Reveal as="div" delay={90}>
            <dt>Services in the office</dt>
            <dd>8</dd>
          </Reveal>
          <Reveal as="div" delay={140}>
            <dt>Architects Board</dt>
            <dd className="facts-small">311 · 330</dd>
          </Reveal>
          <Reveal as="div" delay={190}>
            <dt>Studio</dt>
            <dd className="facts-small">Ntinda</dd>
          </Reveal>
        </dl>
      </section>

      <section className="dark-band">
        <div className="dark-band-inner">
          <Reveal>
            <p className="kicker kicker-light">Capability</p>
            <h2>From the first line to handover.</h2>
            <p className="dark-band-lead">
              A commission can start with advice on a site, move through design and engineering, and stay with
              Allistar through construction.
            </p>
            <Link className="btn btn-light" to="/services">
              See the services
            </Link>
          </Reveal>
          <ul className="dark-cards">
            {homeServices.map((service, serviceIndex) => (
              <Reveal as="li" key={service.title} delay={serviceIndex * 70}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="section-head">
          <div>
            <p className="kicker">Selected work</p>
            <h2>Projects from the boards.</h2>
          </div>
          <Link className="text-link" to="/work">
            All {21} projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="work-grid">
          {selected.map((item, itemIndex) => (
            <Reveal key={item.slug} delay={itemIndex * 60}>
              <ProjectCard project={item} sizes="(max-width: 680px) 92vw, (max-width: 980px) 46vw, 30vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band values-band">
        <div className="section-head">
          <div>
            <p className="kicker">How we work</p>
            <h2>Four commitments.</h2>
          </div>
        </div>
        <ul className="values-grid">
          {values.map((value, valueIndex) => (
            <Reveal as="li" key={value.title} delay={valueIndex * 70}>
              <span>{String(valueIndex + 1).padStart(2, "0")}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="visit">
        <Reveal className="visit-block">
          <p className="kicker kicker-light">Visit</p>
          <h2>Suite 16C, Ntinda Shopping Centre.</h2>
          <p>2nd Floor, Plot 1, Kimera Road, Ntinda. P.O. Box 184535, Kampala.</p>
          <a className="btn btn-light" href={studio.mapUrl} target="_blank" rel="noreferrer">
            How to find the office
          </a>
        </Reveal>
        <Reveal className="visit-block visit-block-alt" delay={90}>
          <p className="kicker kicker-light">Contact</p>
          <h2>Bring the plot, or just the idea.</h2>
          <p>Call, or send a short brief. Say what the building needs to do and where it sits.</p>
          <Link className="btn btn-light" to="/contact">
            Start a project
          </Link>
        </Reveal>
      </section>
    </>
  );
}