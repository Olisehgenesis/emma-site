import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const Project = lazy(() => import("./pages/Project"));
const Studio = lazy(() => import("./pages/Studio"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader-bar" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<Project />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <section className="page narrow">
      <p className="kicker">404</p>
      <h1>That page is not on this site.</h1>
      <p>
        <Link className="btn" to="/">
          Back to the home page
        </Link>
      </p>
    </section>
  );
}