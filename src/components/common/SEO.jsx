import { Helmet } from "react-helmet-async";
import { defaultOgImage, getCanonicalUrl } from "../../data/seoConfig";
import { businessInfo } from "../../data/businessInfo";

const SEO = ({ title, description, path, type = "website", schema }) => {
  const canonical = getCanonicalUrl(path);
  const schemaData = schema
    ? Array.isArray(schema)
      ? { "@context": "https://schema.org", "@graph": schema }
      : schema
    : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={defaultOgImage} />
      <meta property="og:site_name" content={businessInfo.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />

      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
