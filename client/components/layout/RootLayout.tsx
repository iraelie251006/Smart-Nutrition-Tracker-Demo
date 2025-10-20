import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/growth-tracker", label: "Growth Tracker" },
  { to: "/education", label: "Education" },
  { to: "/dashboard", label: "School Dashboard" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/about", label: "About / Partners" },
];

export default function RootLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl brand-gradient" />
            <div className="leading-tight">
              <p className="font-heading font-semibold text-lg tracking-tight">Smart Nutrition Rwanda</p>
              <p className="text-xs text-muted-foreground -mt-0.5">Data for healthier futures</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive || pathname === item.to
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="hidden md:inline-flex rounded-xl">
              <a href="mailto:thierryhareriamana@gmail.com">Contact</a>
            </Button>
            <Button asChild className="rounded-xl">
              <Link to="/growth-tracker">View Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container py-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-heading font-semibold text-lg">Smart Nutrition Rwanda</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-sm">
              We connect families, schools, and health workers through intelligent digital solutions to reduce malnutrition.
            </p>
          </div>
          <div>
            <p className="font-semibold mb-2">Contact</p>
            <ul className="space-y-1 text-sm">
              <li>
                <a className="hover:underline" href="mailto:thierryhareriamana@gmail.com">thierryhareriamana@gmail.com</a>
              </li>
              <li className="text-muted-foreground">Tel: +250 780 158 711</li>
              <li className="text-muted-foreground">Kigali, Rwanda</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Follow</p>
            <div className="flex gap-3">
              <a href="#" aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:thierryhareriamana@gmail.com" aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Smart Nutrition Rwanda. All rights reserved.</div>
      </footer>
    </div>
  );
}
