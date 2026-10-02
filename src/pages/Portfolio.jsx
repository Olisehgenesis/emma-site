import { Link, useSearchParams } from "react-router-dom";
import { categories, onTheBoards, projects, underConstruction } from "../data";
import useTitle from "../useTitle";

export default function Portfolio() {
  useTitle("Portfolio");
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "All";
  const filters = ["All", ...categories];
  const shown =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  function setFilter(category) {
    if (category === "All") setParams({});
    else setParams({ category });
  }

  return (
    <section className="page">
      <div className="page-intro">
        <p className="kicker">Portfolio</p>
        <h1>Projects, by the kind of building.</h1>
        <p>
          The drawings below are design studies from the office. Photographs of finished buildings, and of sites still under construction, will be added as they are taken.
        </p>
      </div>

      <div className="filters" role="toolbar" aria-label="Project categories">
        {filters.map((category) => (
          <button
            key={category}
            type="button"
            className={category === active ? "is-active" : undefined}
            aria-pressed={category === active}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {shown.length > 0 && (
        <div className="work-grid">
          {shown.map((project) => (
            <Link className="card" key={project.slug} to={`/portfolio/${project.slug}`}>
              <span className="card-media">
                <img src={project.images[0]} alt="" />
                <span className="badge">{project.status}</span>
              </span>
              <span className="card-meta">{project.category}</span>
              <span className="card-title">{project.name}</span>
              <span className="card-place">{project.location}</span>
            </Link>
          ))}
        </div>
      )}

      {active === "Recently completed" && (
        <div className="empty">
          <h2>Photographs of finished buildings are not in yet.</h2>
          <p>
            Completed projects will be shown here once a photographer has recorded them on site. The design work is in the other categories.
          </p>
        </div>
      )}

      {(active === "All" || active === "Under construction") && (
        <div className="list-block">
          <h2>Under construction</h2>
          <p>These are on site. Photographs will follow.</p>
          <ul>
            {underConstruction.map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.location}</span>
                <em>{item.note}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(active === "All" || (shown.length === 0 && active !== "Recently completed" && active !== "Under construction")) &&
        active !== "Under construction" && (
          <div className="list-block">
            <h2>Also on the boards</h2>
            <p>Commissions in the company profile that are not in the photograph set yet.</p>
            <ul>
              {onTheBoards.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.location}</span>
                  <em>{item.note}</em>
                </li>
              ))}
            </ul>
          </div>
        )}

      {shown.length === 0 && active !== "Recently completed" && active !== "Under construction" && active !== "All" && (
        <div className="empty">
          <h2>Nothing in {active} has a photograph yet.</h2>
          <p>When drawings or site photos are ready, they will be filed here.</p>
        </div>
      )}
    </section>
  );
}
