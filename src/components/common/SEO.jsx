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
      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="max-snippet:160, max-image-preview:large, max-video-preview:-1"
      />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/png" sizes="256x256" href="/assets/brand/dc-logo-black-256.png" />
      <link rel="shortcut icon" type="image/png" sizes="64x64" href="/assets/brand/dc-logo-black-64.png" />
      <link rel="apple-touch-icon" sizes="256x256" href="/assets/brand/dc-logo-black-256.png" />

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
