import data from "@/data/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart } from "recharts";
import { AlertTriangle, BarChart2, PieChart, Users } from "lucide-react";
import { toast } from "sonner";

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

export default function Dashboard() {
  const [onlyAlerts, setOnlyAlerts] = useState(false);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const { summary, attendanceData, nutritionTrends, flaggedStudents } = data as any;

  const students = useCountUp(summary.students);
  const feeding = useCountUp(summary.feeding_days);
  const alerts = useCountUp(summary.alerts);
  const attendance = useCountUp(summary.attendance);

  const rows = useMemo(() => {
    let list = flaggedStudents as Array<{ name: string; age: number; bmi: number; status: string; last_check: string }>;
    if (onlyAlerts) list = list.filter((r) => r.status !== "Normal");
    list = list.slice().sort((a, b) => {
      const da = new Date(a.last_check).getTime();
      const db = new Date(b.last_check).getTime();
      return sort === "newest" ? db - da : da - db;
    });
    return list;
  }, [flaggedStudents, onlyAlerts, sort]);

  const exportCSV = () => {
    const headers = ["Name", "Age", "BMI", "Status", "Last Check", "Follow Up Done"];
    const lines = rows.map((r) => [r.name, r.age, r.bmi, r.status, r.last_check, followed[r.name] ? "Yes" : "No"].join(","));
    const csv = [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "school-dashboard-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const printSummary = () => {
    window.print();
  };

  const shareDHIS2 = () => {
    toast("Synced to DHIS2 (mock)", { description: "A secure integration will be added in Phase 2." });
  };

  return (
    <section className="container py-8 md:py-12">
      <div className="mb-6">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold">School Nutrition Dashboard - G.S. Nyamirambo</h1>
        <p className="text-muted-foreground mt-1">Monitor feeding, attendance and nutrition across your school.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-2xl border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Students Monitored</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-green-700"><span ref={students.ref}>{students.value}</span></div>
            <Users className="h-6 w-6 text-green-700" />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feeding Days (This Month)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-amber-600"><span ref={feeding.ref}>{feeding.value}</span>/20</div>
            <BarChart2 className="h-6 w-6 text-amber-600" />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-l-4 border-l-red-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Malnutrition Alerts</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-red-600"><span ref={alerts.ref}>{alerts.value}</span></div>
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-l-4 border-l-sky-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold text-sky-700"><span ref={attendance.ref}>{attendance.value}</span>%</div>
            <PieChart className="h-6 w-6 text-sky-600" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading">Feeding vs Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} />
                  <YAxis tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="feeding" name="Feeding Provided" fill="#FBC02D" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="attendance" name="Attendance" fill="#2E7D32" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Attendance increases by ~10% on days when meals are served.</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading">Nutrition Trends (Avg BMI)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nutritionTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} />
                  <YAxis domain={[16, 20]} tickLine={false} />
                  <Tooltip formatter={(v: any) => [`Avg BMI: ${v}`, ""]} />
                  <Line type="monotone" dataKey="avgBMI" stroke="#2E7D32" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flagged Students */}
      <div className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl">Flagged Students</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="onlyAlerts" checked={onlyAlerts} onCheckedChange={(v) => setOnlyAlerts(Boolean(v))} />
              <label htmlFor="onlyAlerts" className="text-sm">Show only alerts</label>
            </div>
            <Select value={sort} onValueChange={(v: any) => setSort(v)}>
              <SelectTrigger className="h-9 w-40">
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>BMI</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Check</TableHead>
                  <TableHead>Follow Up Done</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.age}</TableCell>
                    <TableCell>{r.bmi}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                        r.status === "Malnourished"
                          ? "bg-red-100 text-red-700"
                          : r.status === "Underweight"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {r.status === "Malnourished" ? "❗" : r.status === "Underweight" ? "⚠" : "✔"} {r.status}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(r.last_check).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={!!followed[r.name]}
                        onCheckedChange={(v) => setFollowed((s) => ({ ...s, [r.name]: Boolean(v) }))}
                        aria-label={`Follow up for ${r.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="rounded-lg">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button onClick={exportCSV} className="rounded-xl">Export CSV</Button>
        <Button onClick={printSummary} variant="outline" className="rounded-xl">Print Summary</Button>
        <Button onClick={shareDHIS2} variant="outline" className="rounded-xl">Share to DHIS2 (Mock)</Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Data synced automatically with Smart Nutrition Rwanda database. Integration with DHIS2 planned for Phase 2.
      </p>
    </section>
  );
}
