import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function GrowthTracker() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return 0;
    const meters = h / 100;
    return Number((w / (meters * meters)).toFixed(1));
  }, [height, weight]);

  const status = useMemo(() => {
    if (!submitted) return null;
    if (bmi === 0) return null;
    if (bmi < 14) return { label: "Alert: undernutrition risk", color: "#ef4444" };
    if (bmi < 16) return { label: "Moderate risk: monitor closely", color: "#f59e0b" };
    if (bmi <= 19) return { label: "Healthy range", color: "#22c55e" };
    return { label: "Above healthy range: seek guidance", color: "#f59e0b" };
  }, [bmi, submitted]);

  const data = useMemo(() => {
    const base = [16.2, 16.4, 16.3, 16.5, 16.6, 16.7];
    const latest = bmi || 16.8;
    return base.map((v, i) => ({ month: `M${i + 1}`, bmi: v })).concat([{ month: "Now", bmi: latest }]);
  }, [bmi]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container py-10 md:py-16">
      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">Track Child Growth with Confidence.</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Elie" className="rounded-xl" required />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" min={0} value={age} onChange={(e) => setAge(e.target.value)} placeholder="7" className="rounded-xl" required />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" min={40} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="120" className="rounded-xl" required />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" min={5} step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="24" className="rounded-xl" required />
                </div>
              </div>
              <Button type="submit" className="rounded-xl">Calculate</Button>
              {submitted && (
                <div className="mt-2 text-sm text-muted-foreground">
                  Results are illustrative only. For medical decisions, consult a health professional.
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-2xl">BMI / Growth Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[12, 22]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bmi" stroke="#2E7D32" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {submitted && status && (
              <div className="mt-4 rounded-xl border p-4 flex items-start gap-3" style={{ borderColor: status.color }}>
                <div className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: status.color }} />
                <div>
                  <p className="font-semibold">{name ? `${name}’s` : "Child’s"} growth</p>
                  <p className="text-sm text-muted-foreground">
                    {status.label}. Keep providing a balanced diet with local foods rich in iron and protein.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
