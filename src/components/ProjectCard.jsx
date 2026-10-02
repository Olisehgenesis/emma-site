import { Link } from "react-router-dom";
import Img from "./Img";

export default function ProjectCard({ project, priority = false, sizes }) {
  const cover = project.images[0];
  return (
    <Link className="card" to={`/work/${project.slug}`}>
      <span className="card-media">
        {cover ? (
          <Img image={cover} sizes={sizes} alt={`${project.name}, ${project.place}`} priority={priority} />
        ) : (
          <span className="card-blank" aria-hidden="true" />
        )}
        <span className="badge">{project.status}</span>
      </span>
      <span className="card-meta">
        {project.category} <span aria-hidden="true">·</span> {project.place}
      </span>
      <span className="card-title">{project.name}</span>
      <span className="card-cta">
        Read the project <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}