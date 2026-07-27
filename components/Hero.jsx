"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Biology-notebook annotations — one set per chapter, per orientation.
   x/y = the part being pointed at, lx/ly = where the label sits (viewport %). */
/* Positions verified against real extracted frames (10% grid overlay), not guessed. */
const ANNOS = [
  { // 0 · city, wide static shot — red coil rear suspension
    tall: [
      { t: "Full rear suspension", x: 44, y: 47, lx: 50, ly: 24 },
    ],
    wide: [
      { t: "Full rear suspension", x: 37, y: 51, lx: 16, ly: 26 },
    ],
  },
  { // 1 · city close-up — headlight (front, under handlebar) + battery (under seat)
    tall: [
      { t: "LED headlight", x: 68, y: 40, lx: 36, ly: 22 },
      { t: "48 V removable battery", x: 45, y: 51, lx: 50, ly: 78 },
    ],
    wide: [
      { t: "LED headlight", x: 58, y: 45, lx: 30, ly: 24 },
      { t: "48 V removable battery", x: 48, y: 45, lx: 40, ly: 80 },
    ],
  },
  { // 2 · mountain — rear hub motor (under seat) + front disc brake (front wheel)
    tall: [
      { t: "Rear hub motor", x: 48, y: 53, lx: 50, ly: 82 },
      { t: "Hydraulic disc brakes", x: 77, y: 61, lx: 60, ly: 27 },
    ],
    wide: [
      { t: "Rear hub motor", x: 44, y: 57, lx: 55, ly: 84 },
      { t: "Hydraulic disc brakes", x: 64, y: 66, lx: 48, ly: 27 },
    ],
  },
  { // 3 · beach static side — weather-sealed build + front suspension fork
    tall: [
      { t: "Weather-sealed build", x: 46, y: 50, lx: 34, ly: 30 },
      { t: "Front suspension fork", x: 69, y: 47, lx: 58, ly: 80 },
    ],
    wide: [
      { t: "Weather-sealed build", x: 40, y: 48, lx: 26, ly: 26 },
      { t: "Front suspension fork", x: 58, y: 40, lx: 48, ly: 82 },
    ],
  },
  { // 4 · POV on the pier — both callouts converge on the same LCD screen
    tall: [
      { t: "Live LCD dashboard", x: 47, y: 46, lx: 28, ly: 74 },
      { t: "50–80 km range", x: 47, y: 46, lx: 68, ly: 74 },
    ],
    wide: [
      { t: "Live LCD dashboard", x: 51, y: 46, lx: 16, ly: 78 },
      { t: "50–80 km range", x: 51, y: 46, lx: 82, ly: 78 },
    ],
  },
];

const KF = [0.02, 0.29, 0.55, 0.80, 0.97];
const N = KF.length;
const CH_VH = 150; // long holds between transitions

// Native source dimensions of each video — required to undo object-fit:cover's
// crop. ANNOS x/y are measured on these raw frames; without this correction
// they only land correctly when the viewport happens to share the video's
// aspect ratio, and drift everywhere else (this was the actual bug: dots
// looked fine on a 16:9-ish test window but missed on other window shapes).
const NATIVE = { wide: { w: 1920, h: 1080 }, tall: { w: 720, h: 1280 } };

// Maps a point measured on the raw video frame (0-100) to where object-fit:cover
// actually renders it inside a `boxW x boxH` container.
function coverMap(x0, y0, boxW, boxH, videoW, videoH) {
  const boxA = boxW / boxH, videoA = videoW / videoH;
  if (boxA > videoA) {
    // container is relatively wider than the video → video fills width, top/bottom cropped
    const scaledH = boxW / videoA;
    const cropFrac = ((scaledH - boxH) / 2) / scaledH; // fraction cropped off top (and bottom)
    return { x: x0, y: ((y0 - cropFrac * 100) / (100 - 2 * cropFrac * 100)) * 100 };
  }
  // container is relatively taller/narrower → video fills height, left/right cropped
  const scaledW = boxH * videoA;
  const cropFrac = ((scaledW - boxW) / 2) / scaledW; // fraction cropped off left (and right)
  return { x: ((x0 - cropFrac * 100) / (100 - 2 * cropFrac * 100)) * 100, y: y0 };
}

export default function Hero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const [chapter, setChapter] = useState(0);   // -1 while a transition plays
  const [tall, setTall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const section = sectionRef.current, sticky = stickyRef.current, video = videoRef.current;
    if (!section || !video) return;

    let dur = 0, isTall = null, settled = 0, primed = false, rafId = null, inView = true, alive = true;

    const pickSrc = () => {
      const t = window.innerWidth < window.innerHeight;
      if (t === isTall) return;
      isTall = t; primed = false;
      setTall(t);
      video.src = t ? "/assets/video/hero-9x16.mp4" : "/assets/video/hero-16x9.mp4";
      video.load();
    };
    const play = () => { const q = video.play(); if (q && q.catch) q.catch(() => {}); };

    const onMeta = () => { dur = video.duration || 6; try { video.currentTime = KF[settled] * dur; } catch {} };
    const onData = () => {
      dur = video.duration || 6;
      if (!primed) { primed = true; try { video.currentTime = KF[settled] * dur; } catch {} video.pause(); }
      setLoading(false);
    };
    video.muted = true;
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onData);
    pickSrc();

    const progress = () => {
      const r = section.getBoundingClientRect();
      const total = r.height - sticky.clientHeight;
      const p = total > 0 ? -r.top / total : 0;
      return Math.max(0, Math.min(1, p));
    };

    const frame = () => {
      if (!alive) return;
      if (dur > 0) {
        const p = progress();
        const target = Math.max(0, Math.min(N - 1, Math.floor(p * N)));
        const ct = video.currentTime;

        if (target > settled) {
          if (video.paused) play();
          if (ct >= KF[target] * dur - 0.02) { video.pause(); settled = target; }
        } else if (target < settled) {
          if (!video.paused) video.pause();
          try { video.currentTime = KF[target] * dur; } catch {}
          settled = target;
        } else {
          if (!video.paused) video.pause();
          if (!video.seeking && Math.abs(ct - KF[settled] * dur) > 0.2) {
            try { video.currentTime = KF[settled] * dur; } catch {}
          }
        }
        setChapter(target === settled ? settled : -1);
      }
      rafId = inView ? requestAnimationFrame(frame) : null;
    };
    const startLoop = () => { if (rafId == null && alive) rafId = requestAnimationFrame(frame); };

    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((es) => { inView = es[0].isIntersecting; if (inView) startLoop(); else video.pause(); }, { rootMargin: "200px" })
      : null;
    if (io) io.observe(section);

    const measure = () => setBox({ w: sticky.clientWidth, h: sticky.clientHeight });
    const onResize = () => { pickSrc(); measure(); };
    const onRotate = () => setTimeout(() => { pickSrc(); measure(); }, 300);
    const onVis = () => { if (!document.hidden) startLoop(); };
    window.addEventListener("scroll", startLoop, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onRotate);
    document.addEventListener("visibilitychange", onVis);
    startLoop();
    measure();

    return () => {
      alive = false;
      if (rafId != null) cancelAnimationFrame(rafId);
      if (io) io.disconnect();
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onData);
      window.removeEventListener("scroll", startLoop);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onRotate);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const annos = chapter >= 0 && tall !== null ? ANNOS[chapter][tall ? "tall" : "wide"] : [];
  const native = tall ? NATIVE.tall : NATIVE.wide;
  const canMap = box.w > 0 && box.h > 0;

  return (
    <section className="hv" data-hero ref={sectionRef} style={{ height: `${N * CH_VH}vh` }}>
      <div className="hv-sticky" ref={stickyRef}>
        <video className="hv-video" ref={videoRef} muted playsInline preload="auto" disablePictureInPicture />
        <div className="hv-scrim" aria-hidden="true" />

        {canMap && annos.map((a) => {
          const side = a.lx < a.x ? "left" : "right";
          const { x, y } = coverMap(a.x, a.y, box.w, box.h, native.w, native.h);
          return (
            <div
              className={`anno anno-${side}`}
              key={`${chapter}-${a.t}`}
              style={{ "--x": `${x}%`, "--y": `${y}%`, "--lx": `${a.lx}%`, "--ly": `${a.ly}%` }}
            >
              <span className="anno-dot" />
              <span className="anno-v" />
              <span className="anno-h" />
              <span className="anno-label">{a.t}</span>
            </div>
          );
        })}

        <Link className="hv-cta btn btn-primary" href="/#bikes">
          Explore the bikes
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>

        {loading && <div className="scrub-loading"><span className="scrub-spinner" /></div>}
      </div>
    </section>
  );
}
