import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Placeholder({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: string }) {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild className="rounded-xl">
            <Link to="/growth-tracker">Try the Demo</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href="mailto:niyubwayoiraelie5777@gmail.com">{cta || "Contact Us"}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
