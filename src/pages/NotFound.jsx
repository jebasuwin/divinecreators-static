import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import PrimaryButton from "../components/common/PrimaryButton";
import { pageSeo } from "../data/seoConfig";

const NotFound = () => (
  <>
    <SEO
      title={pageSeo.notFound.title}
      description={pageSeo.notFound.description}
      path={pageSeo.notFound.path}
      noindex
    />
    <section className="section-pad not-found">
      <div className="container-gd">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <PrimaryButton to="/">Back to Home</PrimaryButton>
      </div>
    </section>
  </>
);

export default NotFound;
