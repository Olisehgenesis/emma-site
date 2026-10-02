import { Link } from "react-router-dom";
import { directors, services } from "../data";
import useTitle from "../useTitle";

const steps = [
  {
    title: "Advise",
    text: "Look at the site and the brief before the client commits to building. Pre-investment advice sits here.",
  },
  {
    title: "Draw",
    text: "Architecture, interiors, and landscape, developed as one design rather than three separate packages.",
  },
  {
    title: "Resolve",
    text: "Engineering and planning coordinated with the drawings, so structure and services belong to the building.",
  },
  {
    title: "Stay",
    text: "Project management and supervision through construction, until what is built still matches what was drawn.",
  },
];

const capacity = [
  {
    title: "Architects",
    text: "Two registered architects lead the office. Design and the relationship with the client stay with them.",
  },
  {
    title: "Project managers",
    text: "The principal architect is a Project Management Professional. Programme and coordination are part of the commission, not a separate firm.",
  },
  {
    title: "Engineers",
    text: "Engineering design is offered with the architecture, so the structure is resolved while the building is still being drawn.",
  },
];

export default function Expertise() {
  useTitle("Expertise");

  return (
    <section className="page">
      <div className="page-intro">
        <p className="kicker">Expertise</p>
        <h1>Competence in the drawing. Capacity to stay with the build.</h1>
        <p>
          The aim is a consultancy known for careful design and for decisions a client can trust. The mission is practical: design that answers the social, environmental, and economic needs of the project.
        </p>
      </div>

      <div className="split-notes">
        <article>
          <p className="kicker">Vision</p>
          <h2>A centre of excellence for architectural design and the built environment.</h2>
        </article>
        <article>
          <p className="kicker">Mission</p>
          <h2>Creative design that meets a client’s social, environmental, and economic needs.</h2>
        </article>
      </div>

      <div className="section-head">
        <h2>How a commission runs</h2>
      </div>
      <ol className="steps">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="section-head">
        <h2>What the office does</h2>
      </div>
      <ul className="service-list">
        {services.map((service) => (
          <li key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </li>
        ))}
      </ul>

      <div className="section-head">
        <h2>Who does the work</h2>
      </div>
      <ul className="capacity">
        {capacity.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>

      <div className="directors">
        {directors.map((person) => (
          <article key={person.name}>
            <p className="kicker">{person.role}</p>
            <h3>{person.name}</h3>
            <ul>
              {person.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p>{person.experience}</p>
          </article>
        ))}
      </div>

      <div className="values">
        <h2>How the office expects to be known</h2>
        <ol>
          <li>Earn confidence with design and with business decisions made in the open, from experience.</li>
          <li>Put a working team around a project, rather than handing a client from desk to desk.</li>
          <li>Treat detail as the thing that lets a project finish well.</li>
          <li>Stay respectful, clear, and honest. That is why clients come back.</li>
        </ol>
      </div>

      <p>
        <Link className="btn" to="/contact">
          Start a project
        </Link>
      </p>
    </section>
  );
}
