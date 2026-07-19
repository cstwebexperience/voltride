"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const NOTES = [
  { k: "In the city", items: ["Street-legal — no license", "Silent electric drive", "Instant torque"] },
  { k: "Everyday build", items: ["20×4.0 fat all-terrain tyres", "Full suspension", "Hydraulic disc brakes"] },
  { k: "Off the grid", items: ["70 Nm climbing torque", "Fat tyres grip anything", "Goes where roads end"] },
  { k: "All-weather", items: ["Weather-sealed build", "Long-range battery", "Free shipping across Europe"] },
  { k: "Just ride", items: ["Live LCD dashboard", "Street-legal everywhere", "5 models to choose from"] },
];

const KF = [0.02, 0.29, 0.55, 0.80, 0.97];
const N = KF.length;
const CH_VH = 76;

export default function Hero() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const videoRef = useRef(null);
  const [activeNote, setActiveNote] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const section = sectionRef.current, sticky = stickyRef.current, video = videoRef.current;
    if (!section || !video) return;

    let dur = 0, isTall = null, settled = 0, primed = false, rafId = null, inView = true, alive = true;

    const pickSrc = () => {
      const tall = window.innerWidth < window.innerHeight;
      if (tall === isTall) return;
      isTall = tall; primed = false;
      video.src = tall ? "/assets/video/hero-9x16.mp4" : "/assets/video/hero-16x9.mp4";
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
        if (target === settled) setActiveNote(settled);
        else setActiveNote(-1);
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

  return (
    <section className="hv" data-hero ref={sectionRef} style={{ height: `${N * CH_VH}vh` }}>
      <div className="hv-sticky" ref={stickyRef}>
        <video className="hv-video" ref={videoRef} muted playsInline preload="auto" disablePictureInPicture />
        <div className="hv-scrim" aria-hidden="true" />

        <div className="hv-notes">
          {NOTES.map((n, i) => (
            <div className={`hv-note ${activeNote === i ? "is-on" : ""}`} key={n.k} aria-hidden={activeNote !== i}>
              <span className="hv-note-k">{n.k}</span>
              <ul>{n.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>

        <Link className="hv-cta btn btn-primary" href="/#bikes">
          Explore the bikes
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </Link>

        {loading && <div className="scrub-loading"><span className="scrub-spinner" /></div>}
      </div>
    </section>
  );
}
