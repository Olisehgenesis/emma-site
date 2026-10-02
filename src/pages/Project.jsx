import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Img from "../components/Img";
import Lightbox from "../components/Lightbox";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { getProject, relatedProjects } from "../data";
import useTitle from "../useTitle";

export default function Project() {
  const { slug } = useParams();
  const project = getProject(slug);
  useTitle(project ? project.name : "Project not found", project?.summary);

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    setActive(0);
    setZoom(null);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <section className="page narrow">
        <p className="kicker">Work</p>
        <h1>That project is not in the profile.</h1>
        <p>
          <Link className="btn" to="/work">
            Back to all work
          </Link>
        </p>
      </section>
    );
  }

  const gallery = project.images;
  const current = gallery[active] ?? gallery[0];
  const more = relatedProjects(project);

  function step(delta) {
    setActive((value) => (value + delta + gallery.length) % gallery.length);
  }

  return (
    <article className="page project-page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/work">Work</Link>
        <span aria-hidden="true">/</span>
        <span>{project.category}</span>
      </nav>

      <header className="project-head">
        <h1>{project.name}</h1>
        <dl className="project-spec">
          <div>
            <dt>Location</dt>
            <dd>{project.place}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          {project.scale && (
            <div>
              <dt>Scale</dt>
              <dd>{project.scale}</dd>
            </div>
          )}
        </dl>
      </header>

      {current && (
        <figure className="project-hero">
          <button type="button" className="project-hero-btn" onClick={() => setZoom(active)}>
            <Img
              image={current}
              sizes="(max-width: 1180px) 94vw, 1180px"
              alt={`${project.name}, view ${active + 1} of ${gallery.length}`}
              priority
            />
            <span className="zoom-hint" aria-hidden="true">
              View full size
            </span>
          </button>
          {gallery.length > 1 && (
            <figcaption>
              <span>
                View {active + 1} of {gallery.length}
              </span>
              <span className="hero-nav">
                <button type="button" onClick={() => step(-1)} aria-label="Previous view">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next view">
                  →
                </button>
              </span>
            </figcaption>
          )}
        </figure>
      )}

      {gallery.length > 1 && (
        <ul className="thumbs">
          {gallery.map((image, index) => (
            <li key={image.srcs[0]}>
              <button
                type="button"
                className={index === active ? "is-active" : undefined}
                aria-label={`Show view ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <Img image={image} sizes="140px" alt="" ratio />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="project-body">
        <div className="project-copy">
          <p className="lede">{project.summary}</p>
          {project.body.map((paragraph, index) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p className="project-actions">
            <Link className="btn" to="/contact">
              Discuss a project like this
            </Link>
          </p>
        </div>

        {project.facts?.length > 0 && (
          <aside className="project-facts">
            <h2>Key points</h2>
            <dl>
              {project.facts.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>

      {gallery.length > 1 && (
        <section className="project-strip" aria-label="All views">
          <h2 className="section-title">All views</h2>
          <ul>
            {gallery.map((image, index) => (
              <li key={`strip-${image.srcs[0]}`}>
                <button type="button" onClick={() => setZoom(index)}>
                  <Img
                    image={image}
                    sizes="(max-width: 680px) 46vw, 30vw"
                    alt={`${project.name}, view ${index + 1}`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="more-work">
        <div className="section-head">
          <h2 className="section-title">More work</h2>
          <Link className="text-link" to="/work">
            All projects <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="work-grid">
          {more.map((item, itemIndex) => (
            <Reveal key={item.slug} delay={itemIndex * 60}>
              <ProjectCard project={item} sizes="(max-width: 680px) 92vw, (max-width: 980px) 46vw, 30vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {zoom !== null && (
        <Lightbox
          images={gallery}
          index={zoom}
          onClose={() => setZoom(null)}
          onStep={(next) => {
            setZoom(next);
            setActive(next);
          }}
        />
      )}
    </article>
  );
}