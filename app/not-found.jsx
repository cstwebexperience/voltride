import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="notfound" id="main">
      <span className="section-label">Error 404</span>
      <h1>This road <span className="grad">doesn&apos;t exist.</span></h1>
      <p>The page you were looking for has moved or never existed. Let&apos;s get you back on the trail.</p>
      <div className="notfound-actions">
        <Link className="btn btn-primary btn-lg" href="/">Back home →</Link>
        <Link className="btn btn-ghost btn-lg" href="/#bikes">Browse the bikes</Link>
      </div>
    </main>
  );
}
