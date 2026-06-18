const ImageReveal = ({
  src,
  alt,
  className = "",
  ratio = "standard",
  loading = "lazy",
}) => (
  <div className={`image-frame image-${ratio === "standard" ? "standard" : ratio} ${className}`}>
    <img src={src} alt={alt} loading={loading} decoding="async" />
  </div>
);

export default ImageReveal;
