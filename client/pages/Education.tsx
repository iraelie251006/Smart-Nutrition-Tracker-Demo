import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Utensils, Baby, HeartPulse, School, Store, Users, ChevronRight, Languages, Info } from "lucide-react";
import { Link } from "react-router-dom";

// Types
type Lang = "en" | "rw";

type Topic = {
  id: string;
  icon: any;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  category: string;
  content: Record<Lang, { paragraphs: string[]; tips?: string[]; videoUrl?: string }>;
};

// Content
const topics: Topic[] = [
  {
    id: "balanced-meal",
    icon: Utensils,
    category: "Balanced Diet",
    title: {
      en: "How to prepare balanced meals for children",
      rw: "Uko utegura amafunguro arimo intungamubiri ku bana",
    },
    summary: {
      en: "Use local foods: beans, plantain, maize, greens, eggs, milk.",
      rw: "Koresha ibiribwa by’iwacu: ibishyimbo, ibitoki, ibigori, imboga, amagi, amata.",
    },
    content: {
      en: {
        paragraphs: [
          "A balanced meal includes energy (rice, maize, cassava), protein (beans, fish, eggs), vegetables (spinach, amaranth), fruits (bananas, papaya), and dairy (milk, yogurt).",
          "Tip: Use local ingredients! Beans and green leafy vegetables are great affordable sources of protein and iron.",
          "Remember: Always wash hands and clean utensils before cooking.",
        ],
        tips: ["Add green veggies to every meal", "Include beans or eggs for protein", "Offer fruit for dessert"],
        videoUrl: "https://www.youtube.com/embed/0O2aH4XLbto",
      },
      rw: {
        paragraphs: [
          "Ifunguro ririmo intungamubiri rigizwe n’ibyubaka umubiri, ibyongera ingufu, n’ibirinda indwara.",
          "Icyitonderwa: Koresha ibiribwa by’iwanyu! Ibishyimbo n’imboga z’ubwatsi bitanga poroteyine n’umunyungugu wa fer.",
          "Ibuka: Karaba intoki n’ibikoresho mbere yo guteka.",
        ],
        tips: ["Shyiramo imboga zabisi ku ifunguro", "Koresha ibishyimbo cyangwa amagi", "Tanga imbuto nyuma y’ifunguro"],
        videoUrl: "https://www.youtube.com/embed/0O2aH4XLbto",
      },
    },
  },
  {
    id: "child-growth",
    icon: Baby,
    category: "Child Growth",
    title: {
      en: "What is stunting and how to prevent it",
      rw: "Uko wirinda kugwingira",
    },
    summary: {
      en: "Measure height and weight regularly and follow WHO charts.",
      rw: "Pima uburebure n’ibiro kenshi, ukurikirane imbonerahamwe za WHO.",
    },
    content: {
      en: {
        paragraphs: [
          "Stunting is low height-for-age. It affects learning and health.",
          "Prevention: balanced diet, clean water, regular growth monitoring, deworming when advised.",
        ],
      },
      rw: {
        paragraphs: [
          "Kugwingira ni kuba muto ugereranyije n’imyaka. Bigira ingaruka ku myigire n’ubuzima.",
          "Kw preventiva: ifunguro ririmo intungamubiri, amazi meza, gupimisha kenshi, no gutanga umuti w’inzoka igihe cyagenwe.",
        ],
      },
    },
  },
  {
    id: "local-foods",
    icon: Users,
    category: "Local Foods & Nutrition",
    title: { en: "Iron-rich foods in Rwanda", rw: "Ibiribwa bikize kuri fer mu Rwanda" },
    summary: { en: "Beans, spinach, sorghum, liver — affordable and nutritious.", rw: "Ibishyimbo, isogi, amasaka, umwijima — bihendutse kandi bifasha." },
    content: {
      en: { paragraphs: ["Include beans often. Add greens like spinach. Combine with vitamin C fruits for better iron absorption."] },
      rw: { paragraphs: ["Ikundire ibishyimbo, wongeremo imboga z’icyatsi n’imbuto zifite vitamine C kugira ngo fer yinjire neza."] },
    },
  },
  {
    id: "hygiene",
    icon: HeartPulse,
    category: "Health & Hygiene",
    title: { en: "Importance of clean water", rw: "Akamaro k’amazi meza" },
    summary: { en: "Prevent diarrhea and malnutrition.", rw: "Birinda impiswi n’imikorere mibi y’umubiri." },
    content: {
      en: { paragraphs: ["Boil or treat drinking water. Wash hands before cooking and feeding."] },
      rw: { paragraphs: ["Vuguta cyangwa uvure amazi yo kunywa. Karaba intoki mbere yo guteka no guha umwana ifunguro."] },
    },
  },
  {
    id: "school-nutrition",
    icon: School,
    category: "School Nutrition",
    title: { en: "What makes a healthy school meal?", rw: "Ni iki kigize ifunguro ryiza ku ishuri?" },
    summary: { en: "Balance energy and protein; include vegetables and fruit.", rw: "Shyiramo ibyongera ingufu, poroteyine, imboga n’imbuto." },
    content: {
      en: { paragraphs: ["Plan menus with beans, maize, greens, and fruit. Track feeding days and attendance." ] },
      rw: { paragraphs: ["Tegura indyo irimo ibishyimbo, ibigori, imboga n’imbuto. Kurikirana iminsi yo kugaburira n’igitsura." ] },
    },
  },
  {
    id: "community-market",
    icon: Store,
    category: "Community & Marketplace",
    title: { en: "Supporting local farmers", rw: "Gushyigikira abahinzi b’iwacu" },
    summary: { en: "Buy fresh foods from cooperatives.", rw: "Gura ibiribwa bishya mu makoperative." },
    content: {
      en: { paragraphs: ["Connect with local cooperatives for affordable, fresh produce that supports nutrition programs."] },
      rw: { paragraphs: ["Hura n’amakoperative y’abahinzi kugira ngo ubone ibiribwa bishya kandi byoroshye." ] },
    },
  },
  {
    id: "for-parents",
    icon: BookOpen,
    category: "For Parents",
    title: { en: "Simple home recipes", rw: "Uko utekera urugo byoroshye" },
    summary: { en: "Quick, nutritious meals for busy families.", rw: "Amafunguro yihuse kandi yuzuye intungamubiri." },
    content: {
      en: { paragraphs: ["Try bean-and-veg stew with plantain; add fruit like banana or papaya afterwards."] },
      rw: { paragraphs: ["Gerageza umuto w’ibishyimbo n’imboga n’ibitoki; ongeraho imbuto nk’igitoki cyangwa ipapayi." ] },
    },
  },
];

const categories = [
  "All",
  "Balanced Diet",
  "Child Growth",
  "Local Foods & Nutrition",
  "Health & Hygiene",
  "School Nutrition",
  "Community & Marketplace",
  "For Parents",
];

const tips: Record<Lang, string[]> = {
  en: [
    "Add green veggies to every meal",
    "Serve clean, safe drinking water",
    "Include beans or eggs for protein",
    "Offer fruit after meals",
    "Measure height and weight regularly",
  ],
  rw: [
    "Shyiramo imboga z’icyatsi ku ifunguro",
    "Tanga amazi meza kandi asukuye",
    "Koresha ibishyimbo cyangwa amagi",
    "Tanga imbuto nyuma y’ifunguro",
    "Pima uburebure n’ibiro kenshi",
  ],
};

export default function Education() {
  const [lang, setLang] = useState<Lang>("en");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % tips[lang].length);
    }, 3500);
    return () => clearInterval(id);
  }, [lang]);

  const filtered = useMemo(() => {
    return topics.filter((t) => {
      const matchesCat = cat === "All" || t.category === cat;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        t.title[lang].toLowerCase().includes(q) ||
        t.summary[lang].toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, cat, lang]);

  return (
    <div>
      {/* Hero + Filters */}
      <section className="border-b bg-white/70 backdrop-blur">
        <div className="container py-8 md:py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold">{lang === "en" ? "Learn Nutrition the Smart Way" : "Wigire ku mirire mu buryo bworoshye"}</h1>
              <p className="text-muted-foreground mt-2">{lang === "en" ? "Practical lessons for every family" : "Amasomo yoroheje ku miryango yose"}</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border bg-white p-1">
              <button
                className={`px-3 py-1.5 text-sm rounded-lg ${lang === "en" ? "bg-primary text-white" : "text-foreground"}`}
                onClick={() => setLang("en")}
                aria-label="Switch to English"
              >EN</button>
              <button
                className={`px-3 py-1.5 text-sm rounded-lg ${lang === "rw" ? "bg-primary text-white" : "text-foreground"}`}
                onClick={() => setLang("rw")}
                aria-label="Hindura mu Kinyarwanda"
              >RW</button>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-[2fr_1fr]">
            <div>
              <Label htmlFor="search" className="sr-only">Search</Label>
              <Input
                id="search"
                placeholder={lang === "en" ? "Search topics..." : "Shakisha amasomo..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Select value={cat} onValueChange={setCat}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics Grid */}
      <section className="container py-10 md:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Dialog key={t.id}>
              <DialogTrigger asChild>
                <button className="group rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <t.icon className="h-6 w-6 text-primary" />
                    <h3 className="font-semibold">{t.title[lang]}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{t.summary[lang]}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                    {lang === "en" ? "Read more" : "Soma birambuye"} <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl">{t.title[lang]}</DialogTitle>
                  <DialogDescription>{t.summary[lang]}</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-6">
                  {t.content[lang]?.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {t.content[lang]?.tips && (
                    <ul className="mt-2 grid gap-2">
                      {t.content[lang].tips!.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" /> {tip}</li>
                      ))}
                    </ul>
                  )}
                  {t.content[lang]?.videoUrl && (
                    <div className="aspect-video overflow-hidden rounded-xl border">
                      <iframe
                        className="h-full w-full"
                        src={t.content[lang].videoUrl}
                        title="Lesson video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Quick Tips Carousel */}
      <section className="container pb-4">
        <Card className="rounded-2xl bg-primary text-primary-foreground shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm opacity-90"><Info className="h-4 w-4" /> {lang === "en" ? "Quick Tip" : "Igitekerezo cyihuse"}</div>
            <div className="mt-2 text-xl font-semibold">
              {tips[lang][carouselIndex]}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Lesson + Actions */}
      <section className="container py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">
                {lang === "en" ? "Featured Lesson" : "Isomo ryatoranijwe"}: {topics[0].title[lang]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6">
              {topics[0].content[lang].paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl">{lang === "en" ? "Read More" : "Soma birambuye"}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-heading">{topics[0].title[lang]}</DialogTitle>
                    <DialogDescription>{topics[0].summary[lang]}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 text-sm leading-6">
                    {topics[0].content[lang].paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Quiz */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="font-heading text-2xl">{lang === "en" ? "Self-check Quiz" : "Isuzuma rito"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Quiz lang={lang} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-xl">
            <Link to="/growth-tracker">{lang === "en" ? "Try Growth Tracker" : "Gerageza urubaho rwo gukurikirana"}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <a href="mailto:niyubwayoiraelie5777@gmail.com">{lang === "en" ? "Share with Parents" : "Sangiza ababyeyi"}</a>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Quiz({ lang }: { lang: Lang }) {
  const questions = useMemo(
    () => [
      {
        q:
          lang === "en"
            ? "Which plate is most balanced for a child lunch?"
            : "Ni iyihe plate irimo intungamubiri ku ifunguro rya saa sita?",
        options:
          lang === "en"
            ? ["Rice only", "Beans, maize, greens", "Chips and soda"]
            : ["Umuceri gusa", "Ibishyimbo, ibigori, imboga", "Ifiriti n’ifu"] ,
        answer: 1,
      },
      {
        q:
          lang === "en"
            ? "How often should you measure height and weight?"
            : "Ni kangahe wapima uburebure n’ibiro?",
        options:
          lang === "en"
            ? ["Once a year", "Every few months", "Never necessary"]
            : ["Rimwe ku mwaka", "Buri mezi make", "Ntibikenewe"] ,
        answer: 1,
      },
    ],
    [lang],
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState<number | null>(null);

  const submit = () => {
    if (selected === null) return;
    setCorrect(selected === questions[idx].answer ? 1 : 0);
  };

  const next = () => {
    setIdx((i) => (i + 1) % questions.length);
    setSelected(null);
    setCorrect(null);
  };

  return (
    <div className="rounded-xl border p-4">
      <p className="font-medium">{questions[idx].q}</p>
      <div className="mt-3 grid gap-2">
        {questions[idx].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
              selected === i ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Button onClick={submit} className="rounded-xl" disabled={selected === null}>
          {lang === "en" ? "Check" : "Reba"}
        </Button>
        <Button onClick={next} variant="outline" className="rounded-xl">
          {lang === "en" ? "Next" : "Ikurikira"}
        </Button>
        {correct !== null && (
          <span className={`${correct ? "text-green-600" : "text-red-600"} text-sm font-medium`}>
            {correct ? (lang === "en" ? "Correct!" : "Ni byo!") : (lang === "en" ? "Try again" : "Ongera ugerageze")}
          </span>
        )}
      </div>
    </div>
  );
}
