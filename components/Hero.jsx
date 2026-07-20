"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Biology-notebook annotations — one set per chapter, per orientation.
   x/y = the part being pointed at, lx/ly = where the label sits (viewport %). */
const ANNOS = [
  { // 0 · city side view
    tall: [
      { t: "Full rear suspension", x: 40, y: 57, lx: 50, ly: 32 },
      { t: "Hydraulic disc brakes", x: 24, y: 62, lx: 50, ly: 80 },
    ],
    wide: [
      { t: "Full rear suspension", x: 39, y: 52, lx: 16, ly: 28 },
      { t: "Hydraulic disc brakes", x: 32, y: 66, lx: 58, ly: 84 },
    ],
  },
  { // 1 · city three-quarter (headlight + battery)
    tall: [
      { t: "LED headlight", x: 74, y: 33, lx: 38, ly: 24 },
      { t: "48 V removable battery", x: 48, y: 54, lx: 50, ly: 78 },
    ],
    wide: [
      { t: "Adjustable LED headlight", x: 72, y: 42, lx: 46, ly: 24 },
      { t: "48 V removable battery", x: 62, y: 54, lx: 40, ly: 80 },
    ],
  },
  { // 2 · mountain
    tall: [
      { t: "Hub motor · 70 Nm", x: 18, y: 56, lx: 50, ly: 80 },
      { t: "20×4.0 fat tyres", x: 78, y: 64, lx: 60, ly: 30 },
    ],
    wide: [
      { t: "Hub motor · 70 Nm", x: 24, y: 65, lx: 55, ly: 84 },
      { t: "20×4.0 fat tyres", x: 76, y: 62, lx: 48, ly: 30 },
    ],
  },
  { // 3 · beach side
    tall: [
      { t: "Weather-sealed build", x: 50, y: 50, lx: 50, ly: 30 },
      { t: "50–80 km range", x: 44, y: 58, lx: 50, ly: 80 },
    ],
    wide: [
      { t: "Weather-sealed build", x: 67, y: 50, lx: 44, ly: 28 },
      { t: "50–80 km range", x: 61, y: 62, lx: 42, ly: 80 },
    ],
  },
  { // 4 · POV on the pier
    tall: [
      { t: "Live LCD dashboard", x: 47, y: 50, lx: 52, ly: 74 },
      { t: "Front suspension fork", x: 63, y: 78, lx: 58, ly: 30 },
    ],
    wide: [
      { t: "Live LCD dashboard", x: 26, y: 51, lx: 14, ly: 76 },
      { t: "7-speed thumb shifter", x: 84, y: 44, lx: 56, ly: 28 },
    ],
  },
];

const KF = [0.02, 0.29, 0.55, 0.80, 0.97];
const N = KF.length;
const CH_VH = 150; // long holds between transitions

export default function Hero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const [chapter, setChapter] = useState(0);   // -1 while a transition plays
  const [tall, setTall] = useState(null);
  const [loading, setLoading] = useState(true);

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

    const onResize = () => pickSrc();
    const onRotate = () => setTimeout(pickSrc, 300);
    const onVis = () => { if (!document.hidden) startLoop(); };
    window.addEventListener("scroll", startLoop, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onRotate);
    document.addEventListener("visibilitychange", onVis);
    startLoop();

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

  return (
    <section className="hv" data-hero ref={sectionRef} style={{ height: `${N * CH_VH}vh` }}>
      <div className="hv-sticky" ref={stickyRef}>
        <video className="hv-video" ref={videoRef} muted playsInline preload="auto" disablePictureInPicture />
        <div className="hv-scrim" aria-hidden="true" />

        {annos.map((a) => {
          const side = a.lx < a.x ? "left" : "right";
          return (
            <div
              className={`anno anno-${side}`}
              key={`${chapter}-${a.t}`}
              style={{ "--x": `${a.x}%`, "--y": `${a.y}%`, "--lx": `${a.lx}%`, "--ly": `${a.ly}%` }}
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
