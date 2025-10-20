import items, { Item, SellerType } from "@/data/marketplace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { BadgeCheck, MapPin, ShieldCheck, ShoppingBag, Store } from "lucide-react";
import { useMemo, useState } from "react";

const categories = ["All", "Vegetables", "Fruits", "Cereals", "Dairy", "Protein"] as const;
const districts = ["All", "Kigali", "Nyabihu District", "Nyarugenge, Kigali", "Rwamagana District", "Musanze District", "Rubavu District", "Huye District", "Kayonza District", "Bugesera District"] as const;
const sellerTypes: SellerType[] = ["Cooperative", "Individual", "School Supplier"];

export default function Marketplace() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof categories[number]>("All");
  const [district, setDistrict] = useState<typeof districts[number]>("All");
  const [sellerType, setSellerType] = useState<SellerType | "All">("All");
  const [maxPrice, setMaxPrice] = useState(2000);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (cat !== "All" && it.category !== cat) return false;
      if (district !== "All" && it.location !== district && !it.location.includes(district)) return false;
      if (sellerType !== "All" && it.sellerType !== sellerType) return false;
      if (it.price > maxPrice) return false;
      const qq = q.toLowerCase();
      if (
        qq &&
        ![it.name, it.seller, it.category, it.location].some((s) => s.toLowerCase().includes(qq))
      )
        return false;
      return true;
    });
  }, [q, cat, district, sellerType, maxPrice]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2252482/pexels-photo-2252482.jpeg"
          alt="Fresh local produce"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative container min-h-[50vh] flex items-center">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-accent" /> Verified local producers
            </p>
            <h1 className="font-heading mt-4 text-4xl md:text-5xl font-bold leading-[1.1]">Smart Nutrition Marketplace</h1>
            <p className="mt-3 text-white/90">Buy fresh, nutritious, locally produced food from trusted farmers and cooperatives across Rwanda.</p>
            <div className="mt-5 flex gap-3">
              <a href="#browse" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-primary shadow-sm">
                <ShoppingBag className="h-4 w-4" /> Browse Products
              </a>
              <a href="#join" className="inline-flex items-center gap-2 rounded-xl border border-white/60 px-4 py-2 text-white">
                <Store className="h-4 w-4" /> Become a Supplier
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="browse" className="border-b bg-white/70 backdrop-blur">
        <div className="container py-6 grid gap-3 md:grid-cols-4 items-end">
          <div className="md:col-span-2">
            <Label htmlFor="search" className="sr-only">Search</Label>
            <Input id="search" placeholder="Search (e.g., beans, milk, spinach)" value={q} onChange={(e) => setQ(e.target.value)} className="rounded-xl" />
            <p className="mt-1 text-xs text-muted-foreground">{filtered.length} item(s) available{district !== "All" ? ` near ${district}` : ""}</p>
          </div>
          <Select value={cat} onValueChange={(v: any) => setCat(v)}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={district} onValueChange={(v: any) => setDistrict(v)}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="District" /></SelectTrigger>
            <SelectContent>
              {districts.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div className="container pb-6 grid gap-3 md:grid-cols-3 items-center">
          <div className="grid grid-cols-2 gap-3">
            <Select value={sellerType} onValueChange={(v: any) => setSellerType(v)}>
              <SelectTrigger className="rounded-xl"><SelectValue placeholder="Seller Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sellers</SelectItem>
                {sellerTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
              </SelectContent>
            </Select>
            <div>
              <Label className="text-xs">Max Price (RWF)</Label>
              <Slider value={[maxPrice]} onValueChange={([v]) => setMaxPrice(v)} max={3000} step={100} className="mt-2" />
              <div className="mt-1 text-xs text-muted-foreground">Up to {maxPrice} RWF</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <Card key={it.id} className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={it.image} alt={it.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                {it.verified && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-primary shadow-sm">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{it.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm font-medium">{it.priceLabel}</p>
                <p className="mt-1 text-sm text-muted-foreground">{it.seller}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {it.location}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs font-medium ${it.availability === "In Stock" ? "text-green-700" : it.availability === "Limited" ? "text-amber-700" : "text-red-600"}`}>{it.availability}</span>
                  <ContactSellerButton item={it} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Producers */}
      <section className="container pb-12">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="font-heading text-2xl">Featured Producers</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { name: "Nyabihu Women’s Cooperative", desc: "Producing high-quality beans and vegetables for school feeding programs.", loc: "Nyabihu District", image: "https://images.pexels.com/photos/461426/pexels-photo-461426.jpeg" },
              { name: "Kigali Fresh Market", desc: "Youth-led organic food supplier.", loc: "Nyarugenge", image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg" },
              { name: "Rwamagana Dairy Group", desc: "Providing milk and yogurt for school nutrition programs.", loc: "Rwamagana", image: "https://images.pexels.com/photos/1435896/pexels-photo-1435896.jpeg" },
            ].map((p) => (
              <Card key={p.name} className="overflow-hidden rounded-2xl">
                <div className="aspect-video overflow-hidden"><img src={p.image} alt={p.name} className="h-full w-full object-cover" /></div>
                <CardHeader className="pb-2"><CardTitle className="text-lg">{p.name}</CardTitle></CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {p.loc}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-3 rounded-xl">View Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-2xl">
                      <DialogHeader>
                        <DialogTitle>{p.name}</DialogTitle>
                        <DialogDescription>{p.desc}</DialogDescription>
                      </DialogHeader>
                      <p className="text-sm">Location: {p.loc}</p>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="container pb-16">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-md">
          <h3 className="font-heading text-2xl">Empower Rwanda’s Food Ecosystem.</h3>
          <p className="mt-2 text-sm opacity-90">Are you a farmer, cooperative, or youth agribusiness? Join Smart Nutrition Marketplace and sell your products directly to schools and families.</p>
          <div className="mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl bg-white text-primary hover:bg-white/90">🌾 Register as a Supplier</Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Register as a Supplier</DialogTitle>
                  <DialogDescription>Fill out the form and we will reach out to you.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-3">
                  <Label htmlFor="org">Organization / Name</Label>
                  <Input id="org" placeholder="Your name or cooperative" className="rounded-xl" />
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="rounded-xl" />
                  <Label htmlFor="msg">Message</Label>
                  <Input id="msg" placeholder="Tell us about your products" className="rounded-xl" />
                  <Button className="rounded-xl">Submit</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactSellerButton({ item }: { item: Item }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-lg">Contact Seller</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle>Contact {item.seller}</DialogTitle>
          <DialogDescription>Request a quote or ask about availability.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-3">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" placeholder="Your name" className="rounded-xl" />
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="rounded-xl" />
          <Label htmlFor="message">Message</Label>
          <Input id="message" placeholder={`Hello, I’m interested in ${item.name}`} className="rounded-xl" />
          <Button className="rounded-xl">Send</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
