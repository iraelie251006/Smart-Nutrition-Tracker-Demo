import { Button } from "@/components/ui/button";
import { Activity, GraduationCap, LayoutDashboard, ShoppingBasket, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const node = ref.current;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        raf = requestAnimationFrame(step);
        io.disconnect();
      }
    });
    if (node) io.observe(node);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return { value, ref } as const;
}

export default function Index() {
  const schools = useCountUp(100);
  const farmers = useCountUp(500);
  const reduction = useCountUp(30);

  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/8466771/pexels-photo-8466771.jpeg"
          alt="Smiling children eating together at school"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
        <div className="relative container min-h-[78vh] flex items-center">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" /> Trusted • Impact-driven • Data-smart
            </p>
            <h1 className="font-heading mt-4 text-5xl md:text-6xl font-bold leading-[1.1]">
              Transforming Nutrition in Rwanda with Smart Data.
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Empowering families, schools, and communities through data-driven nutrition and education.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl">
                <Link to="/growth-tracker">View Demo</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl bg-white text-primary hover:bg-white/90">
                <a href="/about">Partner With Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Activity, title: "Growth Tracking", desc: "Simple, offline-first growth monitoring." },
            { icon: GraduationCap, title: "Nutrition Education", desc: "Bite-sized lessons in Kinyarwanda & English." },
            { icon: LayoutDashboard, title: "School Dashboard", desc: "Actionable insights for coordinators." },
            { icon: ShoppingBasket, title: "Food Marketplace", desc: "Linking farmers to nutrition programs." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-4">
        <div className="rounded-2xl bg-primary text-primary-foreground p-6 md:p-8 shadow-md">
          <div className="grid gap-6 text-center md:grid-cols-3">
            <div>
              <span ref={schools.ref} className="text-4xl font-bold">{schools.value}+</span>
              <p className="text-sm opacity-90 mt-1">schools connected</p>
            </div>
            <div>
              <span ref={farmers.ref} className="text-4xl font-bold">{farmers.value}+</span>
              <p className="text-sm opacity-90 mt-1">farmers onboarded</p>
            </div>
            <div>
              <span ref={reduction.ref} className="text-4xl font-bold">{reduction.value}%</span>
              <p className="text-sm opacity-90 mt-1">reduction target in malnutrition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">Why Smart Nutrition Rwanda?</h2>
            <p className="mt-4 text-muted-foreground">
              We blend community warmth with data precision. Our tools are simple, locally relevant, and work offline-first.
              Schools, CHWs, and families can monitor growth, learn healthy habits, and access nutritious foods.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /> Designed for Rwanda’s context</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> Works online & offline</li>
              <li className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /> Built with educators and health workers</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src="https://images.pexels.com/photos/8061688/pexels-photo-8061688.jpeg"
              alt="Healthcare worker using MUAC to assess nutrition"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Supported by */}
      <section className="container pb-16">
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-center text-sm text-muted-foreground">Supported by</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-80">
            {['MoH','MoE','UNICEF','WFP','Local NGOs'].map((n) => (
              <div key={n} className="flex items-center justify-center rounded-xl border py-6 text-sm font-medium">
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
