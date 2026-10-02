const SIZES = "(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 620px";

function widthOf(src) {
  const match = src.match(/-(\d+)\.webp$/);
  return match ? Number(match[1]) : 1600;
}

export default function Img({ image, sizes = SIZES, alt = "", priority = false, className, ratio }) {
  const { srcs, blur, w, h } = image;
  const srcSet = srcs.map((src) => `${src} ${widthOf(src)}w`).join(", ");
  const fallback = srcs.reduce((best, src) => (widthOf(src) > widthOf(best) ? src : best), srcs[0]);

  return (
    <img
      className={className}
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={{
        backgroundImage: blur ? `url(${blur})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        aspectRatio: ratio ? undefined : `${w} / ${h}`,
      }}
    />
  );
}