import { useCallback, useEffect, useRef, useState } from "react";
import Img from "./Img";

export default function Lightbox({ images, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const [ready, setReady] = useState(false);
  const image = images[index];

  const move = useCallback(
    (delta) => {
      onStep((index + delta + images.length) % images.length);
    },
    [index, images.length, onStep]
  );

  useEffect(() => {
    setReady(true);
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, onClose]);

  return (
    <div
      className={`lightbox${ready ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <div className="lightbox-inner" onClick={(event) => event.stopPropagation()}>
        <Img
          image={image}
          sizes="92vw"
          alt={`View ${index + 1} of ${images.length}`}
          priority
          ratio
          className="lightbox-img"
        />
        {images.length > 1 && (
          <>
            <button type="button" className="lightbox-nav prev" onClick={() => move(-1)} aria-label="Previous image">
              <Arrow direction="left" />
            </button>
            <button type="button" className="lightbox-nav next" onClick={() => move(1)} aria-label="Next image">
              <Arrow direction="right" />
            </button>
          </>
        )}
        <div className="lightbox-bar">
          <span className="lightbox-count">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button type="button" ref={closeRef} className="lightbox-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Arrow({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 4 L7 12 L15 20" : "M9 4 L17 12 L9 20"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}