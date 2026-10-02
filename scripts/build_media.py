#!/usr/bin/env python3
"""Build the web image set for the Allistar Technologies site.

Reads the original photography in ../ALISTER and the renders embedded in the
company profile PDF, then writes responsive WebP files to public/media/<slug>/
plus src/media.json describing every image.

The generated files are committed, so this script only needs to run when the
source photography or the profile changes. The site build does not use it.

Run:  python3 scripts/build_media.py

Override the source locations with ALLISTAR_ASSETS and ALLISTAR_PDF, or by
placing the profile at ../Allistar Company Profile.pdf.
"""

from __future__ import annotations

import hashlib
import io
import json
import os
import re
import shutil
from pathlib import Path

import numpy as np
import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(os.environ.get("ALLISTAR_ASSETS") or ROOT.parent / "ALISTER")
PDF_CANDIDATES = [
    os.environ.get("ALLISTAR_PDF"),
    ROOT.parent / "Allistar Company Profile (1).pdf",
    ROOT.parent / "Allistar Company Profile.pdf",
    Path.home() / "Downloads/Allistar Company Profile (1).pdf",
]
OUT = ROOT / "public" / "media"
MANIFEST = ROOT / "src" / "media.json"


def find_pdf() -> Path:
    for candidate in PDF_CANDIDATES:
        if candidate and Path(candidate).exists():
            return Path(candidate)
    raise SystemExit(
        "Company profile PDF not found. Set ALLISTAR_PDF to its path, or place it "
        f"next to the project folder. Looked in: {ROOT.parent}"
    )


PDF = None  # resolved in main()

WIDTHS = (480, 960, 1600)
QUALITY = 74

# --------------------------------------------------------------------------
# Project definitions. Images are listed in gallery order.
# Each source is either a path relative to ASSETS or a ("pdf", page, xref)
# tuple pointing at an image embedded in the company profile.
# --------------------------------------------------------------------------

PROJECTS = [
    {
        "slug": "buddo",
        "name": "Mixed-use block, Buddo",
        "category": "Mixed use",
        "status": "Proposed",
        "place": "Buddo, Kyengera, Wakiso District",
        "sources": [
            *[(f"Commercial buildings/Commercial mixed Use Building at Buddo/{n}")
              for n in [
                  "Buddo_Mixed Use_1.jpg.jpeg",
                  "Buddo_Mixed Use_2.jpg.jpeg",
                  "Buddo_Mixed Use_3.jpg.jpeg",
                  "Buddo_Mixed Use_4.jpg.jpeg",
                  "Buddo_Mixed Use_5.jpg.jpeg",
                  "Buddo_Mixed Use_6.jpg.jpeg",
                  "Buddo_Mixed Use_7.jpg.jpeg",
                  "Buddo_Mixed Use_8.jpg.jpeg",
                  "Buddo_Mixed Use_9.jpg.jpeg",
                  "Buddo_Mixed Use_10.jpg.jpeg",
              ]],
            ("pdf", 8, 29),
            ("pdf", 8, 30),
        ],
    },
    {
        "slug": "roxxana",
        "name": "Roxxana Logistics warehouse",
        "category": "Industrial",
        "status": "Proposed",
        "place": "Old Kampala, Kampala Central",
        "sources": [
            ("pdf", 5, 13),
            ("pdf", 5, 14),
            "Industrial & Ware Housing/Roxxana Logistics Ware housing/A3035CA3-DF6C-4994-83E4-3F68F21626E2.JPG.jpeg",
            "Industrial & Ware Housing/Roxxana Logistics Ware housing/A642A1AD-185C-41D1-8FD9-BA0A45427DF6.JPG.jpeg",
        ],
    },
    {
        "slug": "kazwe",
        "name": "Kazwe industry and logistics warehouse",
        "category": "Industrial",
        "status": "Proposed",
        "place": "Kamengo, Mpigi District",
        "sources": [("pdf", 5, 15)],
    },
    {
        "slug": "batching-plant",
        "name": "Concrete batching plant and site camp",
        "category": "Industrial",
        "status": "Proposed",
        "place": "Ngwedo, Buliisa District",
        "sources": [("pdf", 6, 20), ("pdf", 6, 18), ("pdf", 6, 21)],
    },
    {
        "slug": "vacker",
        "name": "Vacker Company Limited premises",
        "category": "Industrial",
        "status": "On site",
        "place": "Mbogo Road, Kiwatule, Kampala",
        "sources": [("pdf", 7, 24), ("pdf", 7, 25), ("pdf", 7, 26)],
    },
    {
        "slug": "ibanda",
        "name": "Mixed-use commercial block, Ibanda",
        "category": "Mixed use",
        "status": "Proposed",
        "place": "High Street and Rutehenda Road, Ibanda",
        "sources": [("pdf", 9, 33), ("pdf", 9, 34), ("pdf", 9, 36)],
    },
    {
        "slug": "ishanyu",
        "name": "Mini commercial hub, Ishanyu",
        "category": "Commercial",
        "status": "Proposed",
        "place": "Ishanyu, Ibanda Road, Mbarara District",
        "sources": [("pdf", 10, 39), ("pdf", 10, 41)],
    },
    {
        "slug": "nyakisharara",
        "name": "Apartments at Nyakisharara",
        "category": "Residential",
        "status": "Proposed",
        "place": "Nyakisharara, Ibanda Road, Mbarara District",
        "sources": [
            *[(f"Apartments/Apartments at Nyakisharara/{n}")
              for n in [
                  "Front View Nyakisharara.JPG.jpeg",
                  "Side View Nyakisharara .JPG.jpeg",
                  "Side view 2 Nyakisharara .JPG.jpeg",
                  "Back view Nyakisharara.JPG.jpeg",
                  "Back 2 Nyakisharara .JPG.jpeg",
              ]],
            ("pdf", 10, 42),
        ],
    },
    {
        "slug": "mbalwa",
        "name": "One-bedroom apartments, Mbalwa",
        "category": "Residential",
        "status": "Proposed",
        "place": "Mbalwa, Kira, Wakiso District",
        "sources": [("pdf", 11, 45), ("pdf", 11, 46), ("pdf", 11, 47)],
    },
    {
        "slug": "kitagobwa",
        "name": "One- and two-bedroom apartments, Kitagobwa",
        "category": "Residential",
        "status": "Proposed",
        "place": "Kitagobwa, Kasangati, Wakiso District",
        "sources": [("pdf", 12, 52), ("pdf", 12, 51), ("pdf", 12, 54)],
    },
    {
        "slug": "kisenyi",
        "name": "Primary school, Kisenyi",
        "category": "Civic",
        "status": "On site",
        "place": "Kisenyi, Kakoba, Mbarara District",
        "sources": [("pdf", 13, 57), ("pdf", 13, 58), ("pdf", 13, 59)],
    },
    {
        "slug": "sowing-hope",
        "name": "Sowing Hope nursery and primary school",
        "category": "Civic",
        "status": "On site",
        "place": "Isingiro",
        "sources": [("pdf", 15, 70), ("pdf", 15, 72), ("pdf", 15, 68), ("pdf", 16, 75)],
    },
    {
        "slug": "laura",
        "name": "Laura Ministries",
        "category": "Civic",
        "status": "Proposed",
        "place": "Bwaise, Kawempe, Kampala",
        "sources": [
            "Apartments/Laura Ministries/Laura Ministries View 1.png",
            "Apartments/Laura Ministries/Laura Ministries View 2.png",
            "Apartments/Laura Ministries/Laura Ministries View 3.png",
            "Apartments/Laura Ministries/Laura Ministries View 4.png",
            "Apartments/Laura Ministries/Laura Ministries View 5.png",
            ("pdf", 14, 63),
            ("pdf", 14, 65),
        ],
    },
    {
        "slug": "buloba",
        "name": "Buloba Nabukalu Church School",
        "category": "Civic",
        "status": "Proposed",
        "place": "Buloba, Wakiso District",
        "sources": [
            *[(f"CIVIC BUILDINGS/Buloba Nabukalu Church School/{n}")
              for n in [
                  "Buloba Nabukalu Church School_1.jpg.jpeg",
                  "Buloba Nabukalu Church School_2.jpg.jpeg",
                  "Buloba Nabukalu Church School_3.jpg.jpeg",
                  "Buloba Nabukalu Church School_4.jpg.jpeg",
                  "Buloba Nabukalu Church School_Aerial.jpg.jpeg",
              ]],
        ],
    },
    {
        "slug": "buruhwari",
        "name": "Buruhwari Plaza",
        "category": "Commercial",
        "status": "Proposed",
        "place": "Buruhwari, Wakiso District",
        "sources": [
            *[(f"Commercial buildings/Buruhwari Plaza- Mall/{n}")
              for n in [
                  "183088D0-FD0B-4316-A82F-EBBE4C22B049.JPG.jpeg",
                  "269A5016-F1D0-49FA-B6E6-5EEE765D7B84.JPG.jpeg",
                  "7EFE299D-C3AB-4CD5-9BC4-977BB71DD612.JPG.jpeg",
                  "D5C35ECF-157B-4C20-9EFA-A84295AD0DBE.JPG.jpeg",
              ]],
        ],
    },
    {
        "slug": "pearl-marina",
        "name": "Pearl Marina",
        "category": "Residential",
        "status": "Proposed",
        "place": "Wakiso District",
        "sources": [
            *(f"RESIDENTIALS/PEARL MARINA/PEARL MARINA IMAGE {n}.png" for n in (7, 8, 9, 14)),
        ],
    },
    {
        "slug": "mwiri",
        "name": "Mwiri Country House",
        "category": "Residential",
        "status": "Proposed",
        "place": "Mwiri, Wakiso District",
        "sources": [
            *(f"RESIDENTIALS/MWIRI COUNTRY HOUSE/{n}" for n in [
                "MWIRI COUNTRY HOUSE VIEW A.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW B.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW C.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW D.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW E.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW F.jpg.jpeg",
                "MWIRI COUNTRY HOUSE VIEW G.jpg.jpeg",
            ]),
        ],
    },
    {
        "slug": "bungalow",
        "name": "Residential bungalow",
        "category": "Residential",
        "status": "Proposed",
        "place": "Kampala",
        "sources": [*(f"RESIDENTIALS/Bungalow/CAM {n}.png" for n in range(1, 9))],
    },
    {
        "slug": "byakatonda",
        "name": "Byakatonda residence",
        "category": "Residential",
        "status": "Proposed",
        "place": "Kampala",
        "sources": [
            *(f"RESIDENTIALS/Byakatonda Alex/Byakatonda Alex Image {n}.png" for n in range(1, 9)),
        ],
    },
    {
        "slug": "residences",
        "name": "Private residences",
        "category": "Residential",
        "status": "Proposed",
        "place": "Kampala",
        "sources": [
            "RESIDENTIALS/residence/IMG_0144.PNG",
            "RESIDENTIALS/residence/IMG_0145.PNG",
            "RESIDENTIALS/IMG_0122.JPG.jpeg",
            "RESIDENTIALS/IMG_0123.JPG.jpeg",
            "RESIDENTIALS/WhatsApp Image 2026-09-11 at 17.59.32 (18).jpeg",
            "RESIDENTIALS/WhatsApp Image 2026-09-11 at 17.59.32 (19).jpeg",
            "RESIDENTIALS/WhatsApp Image 2026-09-11 at 17.59.32 (20).jpeg",
            "RESIDENTIALS/WhatsApp Image 2026-09-11 at 17.59.32 (21).jpeg",
            "WhatsApp Image 2026-09-11 at 17.59.32 (22).jpeg",
        ],
    },
    {
        "slug": "lux-life",
        "name": "Lux-Life Gym",
        "category": "Interior",
        "status": "Proposed",
        "place": "Kampala",
        "sources": [
            *(f"Lux-Life Gym/WhatsApp Image 2026-09-11 at 17.59.32 ({n}).jpeg"
              for n in range(2, 17)),
        ],
    },
]

PORTRAITS = [("pdf", 4, 9), ("pdf", 4, 10)]
COVER = ("pdf", 1, 784)
LOGO = ("pdf", 1, 798)


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------


def natural_key(text: str):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", text)]


def signature(image: Image.Image) -> bytes:
    grey = np.asarray(image.convert("L").resize((32, 32)), dtype=np.uint8)
    return hashlib.md5(grey.tobytes()).hexdigest().encode()


class PdfImages:
    """Lazy access to images embedded in the company profile."""

    def __init__(self, path: Path):
        self.doc = pymupdf.open(path)
        self.cache: dict[tuple[int, int], Image.Image] = {}

    def get(self, page: int, xref: int) -> Image.Image:
        key = (page, xref)
        if key not in self.cache:
            data = self.doc.extract_image(xref)
            self.cache[key] = Image.open(io.BytesIO(data["image"])).convert("RGB")
        return self.cache[key]

    def save_cover(self) -> None:
        """The profile cover photograph, used for social previews."""
        image = self.get(*COVER[1:])
        target = ROOT / "public" / "media" / "studio" / "cover.jpg"
        target.parent.mkdir(parents=True, exist_ok=True)
        image.copy()
        image.save(target, "JPEG", quality=82, optimize=True, progressive=True)


def load(pdf: PdfImages, source) -> Image.Image:
    if isinstance(source, tuple) and source[0] == "pdf":
        return pdf.get(source[1], source[2])
    path = ASSETS / source
    if not path.exists():
        raise FileNotFoundError(path)
    return Image.open(path).convert("RGB")


def write_variants(image: Image.Image, slug: str, index: int, name: str) -> dict:
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    out: dict = {"name": name, "srcs": []}
    widths = [w for w in WIDTHS if w < image.width] or [image.width]
    widths.append(min(WIDTHS[-1], image.width))
    seen: list[int] = []
    for width in widths:
        if width in seen or width > image.width * 1.05:
            continue
        seen.append(width)
        scaled = image if width == image.width else image.resize(
            (width, max(1, round(image.height * width / image.width))), Image.LANCZOS
        )
        filename = f"{index:02d}-{name}-{width}.webp"
        scaled.save(folder / filename, "WEBP", quality=QUALITY, method=6)
        out["srcs"].append(f"/media/{slug}/{filename}")
    out["w"], out["h"] = image.size
    thumb = image.resize((20, max(1, round(image.height * 20 / image.width))), Image.LANCZOS)
    buffer = io.BytesIO()
    thumb.save(buffer, "WEBP", quality=40, method=4)
    out["blur"] = "data:image/webp;base64," + base64(buffer.getvalue())
    return out


def base64(data: bytes) -> str:
    import base64 as b64

    return b64.b64encode(data).decode()


def write_logo(pdf: PdfImages) -> None:
    """Rebuild the studio logo from the profile cover as a transparent mark."""
    image = pdf.get(*LOGO[1:])
    data = np.asarray(image.convert("RGB"), dtype=np.uint8).copy()
    # The profile places the mark on white; key white out to alpha.
    alpha = np.where(data.min(axis=2) > 235, 0, 255).astype(np.uint8)
    rgba = np.dstack([data, alpha])
    folder = OUT / "studio"
    folder.mkdir(parents=True, exist_ok=True)
    for width in (256, 512, 1024):
        height = max(1, round(rgba.shape[0] * width / rgba.shape[1]))
        Image.fromarray(rgba).resize((width, height), Image.LANCZOS).save(
            folder / f"logo-{width}.png"
        )


def write_portraits(pdf: PdfImages) -> dict:
    folder = OUT / "studio"
    folder.mkdir(parents=True, exist_ok=True)
    out = []
    for index, source in enumerate(PORTRAITS, start=1):
        image = load(pdf, source)
        name = ["muhumuza", "aheebwa"][index - 1]
        widths = [w for w in WIDTHS if w < image.width] + [min(WIDTHS[-1], image.width)]
        entry = {"srcs": [], "w": image.width, "h": image.height}
        for width in dict.fromkeys(widths):
            scaled = image.resize((width, round(image.height * width / image.width)), Image.LANCZOS)
            filename = f"portrait-{name}-{width}.webp"
            scaled.save(folder / filename, "WEBP", quality=QUALITY, method=6)
            entry["srcs"].append(f"/media/studio/{filename}")
        out.append(entry)
    return {"directors": out}


# --------------------------------------------------------------------------


def main() -> None:
    global PDF
    PDF = find_pdf()
    if not ASSETS.exists():
        raise SystemExit(f"Photography folder not found: {ASSETS}")

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    pdf = PdfImages(PDF)
    manifest: dict[str, list] = {}
    seen: dict[bytes, str] = {}
    used_sources: set = set()
    skipped: list[str] = []

    for project in PROJECTS:
        slug = project["slug"]
        gallery = []
        for source in project["sources"]:
            used_sources.add(source)
            try:
                image = load(pdf, source)
            except FileNotFoundError:
                skipped.append(str(source))
                continue
            mark = signature(image)
            if mark in seen:
                # Identical frame already filed under another project.
                gallery.append({"ref": seen[mark]})
                continue
            label = f"{slug}-{len(gallery) + 1}"
            entry = write_variants(image, slug, len(gallery) + 1, slug)
            entry["id"] = label
            seen[mark] = label
            gallery.append(entry)
        manifest[slug] = gallery

    # Fold "ref" placeholders back to real entries.
    by_id = {entry["id"]: entry for gallery in manifest.values() for entry in gallery if "id" in entry}
    for gallery in manifest.values():
        for index, entry in enumerate(gallery):
            if "ref" in entry:
                gallery[index] = dict(by_id[entry["ref"]])

    payload = {"projects": manifest, **write_portraits(pdf)}
    write_logo(pdf)
    pdf.save_cover()

    MANIFEST.write_text(json.dumps(payload, indent=1))
    total = sum(len(v) for v in manifest.values())
    print(f"{len(manifest)} projects, {total} images -> {OUT}")
    if skipped:
        print("missing sources:", *skipped, sep="\n  ")


if __name__ == "__main__":
    main()