import { useEffect } from "react";

const SITE = "Allistar Technologies";

export default function useTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : `${SITE} · Architectural design and built environment consultancy`;
  }, [title]);

  useEffect(() => {
    if (!description) return;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [description]);
}