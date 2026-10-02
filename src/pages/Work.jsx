import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { categories, projects } from "../data";
import useTitle from "../useTitle";

export default function Work() {
  useTitle(
    "Work",
    "Projects by Allistar Technologies: residential, commercial, mixed use, civic, industrial and interior work from Kampala."
  );
  const [params, setParams] = useSearchParams();
  const active = params.get("type") || "All";
  const filters = ["All", ...categories];

  const counts = useMemo(() => {
    const map = { All: projects.length };
    projects.forEach((project) => {
      map[project.category] = (map[project.category] ?? 0) + 1;
    });
    return map;
  }, []);

  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  function setFilter(category) {
    if (category === "All") setParams({}, { replace: true });
    else setParams({ type: category }, { replace: true });
  }

  return (
    <section className="page">
      <header className="page-intro">
        <p className="kicker">Work</p>
        <h1>Every project in the company profile.</h1>
        <p>
          Twenty-one commissions across residential, commercial, mixed use, civic, industrial and interior work.
          Most are on the boards or on site; the descriptions come from the studio's own project notes.
        </p>
      </header>

      <div className="filters" role="group" aria-label="Filter projects by type">
        {filters.map((category) => (
          <button
            key={category}
            type="button"
            className={category === active ? "is-active" : undefined}
            aria-pressed={category === active}
            onClick={() => setFilter(category)}
          >
            {category}
            <span className="filters-count">{counts[category] ?? 0}</span>
          </button>
        ))}
      </div>

      <p className="filter-status" role="status">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {active !== "All" ? ` under ${active.toLowerCase()}` : ""}.
      </p>

      <div className="work-grid">
        {shown.map((project, projectIndex) => (
          <Reveal key={project.slug} delay={(projectIndex % 3) * 60}>
            <ProjectCard
              project={project}
              priority={projectIndex < 3}
              sizes="(max-width: 680px) 92vw, (max-width: 980px) 46vw, 30vw"
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}