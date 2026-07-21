"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Biology-notebook annotations — one set per chapter, per orientation.
   x/y = the part being pointed at, lx/ly = where the label sits (viewport %). */
/* Positions verified against real extracted frames (10% grid overlay), not guessed. */
const ANNOS = [
  { // 0 · city, wide static shot — orange coil rear suspension
    tall: [
      { t: "Full rear suspension", x: 46, y: 53, lx: 50, ly: 30 },
    ],
    wide: [
      { t: "Full rear suspension", x: 35, y: 51, lx: 16, ly: 26 },
    ],
  },
  { // 1 · city close-up — headlight (front, under handlebar) + battery (under seat)
    tall: [
      { t: "LED headlight", x: 68, y: 40, lx: 36, ly: 22 },
      { t: "48 V removable battery", x: 45, y: 51, lx: 50, ly: 78 },
    ],
    wide: [
      { t: "LED headlight", x: 51, y: 22, lx: 26, ly: 10 },
      { t: "48 V removable battery", x: 48, y: 45, lx: 40, ly: 80 },
    ],
  },
  { // 2 · mountain — rear hub motor (below seat) + hydraulic disc brake (front wheel)
    tall: [
      { t: "Rear hub motor", x: 48, y: 53, lx: 50, ly: 80 },
      { t: "Hydraulic disc brakes", x: 62, y: 66, lx: 62, ly: 30 },
    ],
    wide: [
      { t: "Rear hub motor", x: 44, y: 57, lx: 55, ly: 84 },
      { t: "Hydraulic disc brakes", x: 64, y: 64, lx: 48, ly: 28 },
    ],
  },
  { // 3 · beach, static
    tall: [
      { t: "Weather-sealed build", x: 50, y: 50, lx: 50, ly: 30 },
      { t: "50–80 km range", x: 44, y: 58, lx: 50, ly: 80 },
    ],
    wide: [
      { t: "Weather-sealed build", x: 67, y: 50, lx: 44, ly: 28 },
      { t: "50–80 km range", x: 61, y: 62, lx: 42, ly: 80 },
    ],
  },
  { // 4 · POV on the pier — LCD showing "10" + front fork
    tall: [
      { t: "Live LCD dashboard", x: 48, y: 50, lx: 52, ly: 74 },
      { t: "Front suspension fork", x: 48, y: 66, lx: 58, ly: 30 },
    ],
    wide: [
      { t: "Live LCD dashboard", x: 50, y: 48, lx: 14, ly: 76 },
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
