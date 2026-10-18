import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { PageHead, btnCls, meta } from "@/components/site";
import { DURATIONS, SERVICE_PINCODES, quote, inr, waLink, BUSINESS, type Duration, type MealType } from "@/lib/business";

const search = z.object({ plan: z.enum(["monthly", "saver", "custom"]).optional() });

export const Route = createFileRoute("/order")({
  validateSearch: search,
  head: () => meta("Order Tiffin — Urmesh Tiffin Services", "Book your homemade tiffin subscription in Gorakhpur in under two minutes."),
  component: Order,
});

const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().slice(0, 10); };

function Order() {
  const { plan = "monthly" } = Route.useSearch();
  const [meal, setMeal] = useState<MealType>("lunch");
  const [days, setDays] = useState(6);
  const [duration, setDuration] = useState<Duration>(plan === "saver" ? "3m" : "1m");
  const [pref, setPref] = useState<"veg" | "nonveg">("veg");
  const [start, setStart] = useState(tomorrow());
  const [f, setF] = useState({ name: "", phone: "", address: "", landmark: "", pin: "" });
  const [pay, setPay] = useState<"cod" | "upi">("cod");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ref, setRef] = useState<string | null>(null);

  const q = useMemo(() => quote(meal, days, duration), [meal, days, duration]);
  const isCustom = plan === "custom";

  function validate() {
    const e: Partial<Record<"name"|"phone"|"address"|"pin"|"start", string>> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";
    if (f.address.trim().length < 8) e.address = "Please enter your full delivery address.";
    if (!/^\d{6}$/.test(f.pin)) e.pin = "Enter a 6-digit PIN code.";
    else if (!SERVICE_PINCODES.includes(f.pin)) e.pin = "Sorry, we don't deliver to this PIN yet. WhatsApp us to check.";
    if (!start || start < tomorrow()) e.start = "Start date must be tomorrow or later.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    const r = "UT-" + Date.now().toString(36).toUpperCase().slice(-6);
    const msg = [
      `Namaste! New tiffin request (${r})`,
      `Plan: ${planName(plan, duration)}`,
      `Meals: ${meal === "both" ? "Lunch + Dinner" : meal} · ${q.daysPerWeek} days/week · ${pref === "veg" ? "Veg" : "Non-veg OK"}`,
      `Duration: ${DURATIONS[duration].label}, starting ${start}`,
      `Amount: ${inr(q.total)}${q.discount ? ` (incl. ${inr(q.discount)} discount)` : ""}`,
      `Payment: ${pay === "cod" ? "Cash on delivery" : "UPI on confirmation"}`,
      `Name: ${f.name}`, `Phone: ${f.phone}`, `Address: ${f.address}, ${f.landmark ? f.landmark + ", " : ""}${f.pin}`,
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    setRef(r);
  }

  if (ref) {
    return (
      <section className="container-x max-w-xl py-24 text-center">
        <p className="eyebrow">Request sent</p>
        <h1 className="mt-3 text-4xl text-primary">Almost done, {f.name.split(" ")[0]}.</h1>
        <p className="mt-4 text-muted-foreground">Your request reference is <span className="font-semibold text-foreground">{ref}</span>. Please press <b>Send</b> in WhatsApp. Your order is confirmed once our team replies — usually within an hour.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={submit} className={btnCls("green")}>Reopen WhatsApp</button>
          <a href={`tel:+91${BUSINESS.phone}`} className={btnCls("outline")}>Call {BUSINESS.phone}</a>
        </div>
        <Link to="/" className="mt-8 inline-block text-sm underline">Back to home</Link>
      </section>
    );
  }

  const field = "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";
  const err = (k: string) => errors[k] && <p className="mt-1 text-sm text-destructive">{errors[k]}</p>;

  return (
    <>
      <PageHead eyebrow="Order tiffin" title="Book your tiffin." sub="No account needed. Takes about two minutes." />
      <section className="container-x grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <Step n={1} t="Your plan">
            <div className="grid grid-cols-3 gap-2">
              {(["monthly", "saver", "custom"] as const).map((p) => (
                <Link key={p} to="/order" search={{ plan: p }} onClick={() => { setDuration(p === "saver" ? "3m" : "1m"); if (p !== "custom") setDays(6); }} className={choice(plan === p)}>{p === "monthly" ? "Monthly" : p === "saver" ? "3-Month Saver" : "Custom"}</Link>
              ))}
            </div>
          </Step>
          <Step n={2} t="Meals">
            <div className="grid grid-cols-3 gap-2">
              {(["lunch", "dinner", "both"] as MealType[]).map((m) => (
                <button key={m} onClick={() => setMeal(m)} className={choice(meal === m)}>{m === "both" ? "Both" : m.charAt(0).toUpperCase() + m.slice(1)}</button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => setPref("veg")} className={choice(pref === "veg")}>Pure veg</button>
              <button onClick={() => setPref("nonveg")} className={choice(pref === "nonveg")}>Non-veg on available days</button>
            </div>
            {isCustom && (
              <div className="mt-5">
                <label className="text-sm font-medium">Days per week: {days}</label>
                <input type="range" min={1} max={7} value={days} onChange={(e) => setDays(+e.target.value)} className="mt-2 w-full accent-[var(--saffron)]" />
              </div>
            )}
          </Step>
          <Step n={3} t="Start date & duration">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><input type="date" min={tomorrow()} value={start} onChange={(e) => setStart(e.target.value)} className={field} />{err("start")}</div>
              <select value={duration} disabled={!isCustom} onChange={(e) => setDuration(e.target.value as Duration)} className={field}>
                {(Object.keys(DURATIONS) as Duration[]).map((d) => <option key={d} value={d}>{DURATIONS[d].label}</option>)}
              </select>
            </div>
          </Step>
          <Step n={4} t="Delivery details">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><input placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={field} />{err("name")}</div>
              <div><input placeholder="Mobile number" inputMode="numeric" maxLength={10} value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value.replace(/\D/g, "") })} className={field} />{err("phone")}</div>
              <div className="sm:col-span-2"><textarea placeholder="House no., street, area" rows={2} value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} className={field} />{err("address")}</div>
              <input placeholder="Nearby landmark (optional)" value={f.landmark} onChange={(e) => setF({ ...f, landmark: e.target.value })} className={field} />
              <div><input placeholder="PIN code" inputMode="numeric" maxLength={6} value={f.pin} onChange={(e) => setF({ ...f, pin: e.target.value.replace(/\D/g, "") })} className={field} />{err("pin")}</div>
            </div>
          </Step>
          <Step n={5} t="Payment">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setPay("cod")} className={choice(pay === "cod")}>Cash on delivery</button>
              <button onClick={() => setPay("upi")} className={choice(pay === "upi")}>UPI after confirmation</button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">You pay only after we confirm your order. Nothing is charged online.</p>
          </Step>
        </div>

        <aside className="h-fit rounded-lg border bg-card p-6 shadow-soft lg:sticky lg:top-24">
          <p className="font-serif text-xl text-primary">{planName(plan, duration)}</p>
          <dl className="mt-5 space-y-2.5 text-sm">
            <Row k="Meals per day" v={String(q.mealsPerDay)} />
            <Row k="Days per week" v={String(q.daysPerWeek)} />
            <Row k="Duration" v={DURATIONS[duration].label} />
            <Row k="Approx. meals" v={String(q.totalMeals)} />
            <div className="border-t pt-2.5" />
            <Row k="Subtotal" v={inr(q.subtotal)} />
            {q.discount > 0 && <Row k="3-month discount" v={"− " + inr(q.discount)} accent />}
            <Row k="Delivery" v={q.delivery ? inr(q.delivery) : "Included"} />
            <div className="flex justify-between border-t pt-3 text-base font-semibold"><dt>Total payable</dt><dd>{inr(q.total)}</dd></div>
          </dl>
          <button onClick={submit} className={`${btnCls()} mt-6 w-full`}>Send order on WhatsApp</button>
          <p className="mt-3 text-xs text-muted-foreground">Sample pricing, confirmed by our team. By ordering you agree to our <Link to="/policies" className="underline">pause, cancellation & refund policies</Link>.</p>
        </aside>
      </section>
    </>
  );
}

function planName(p: string, d: Duration) {
  return p === "saver" ? "3-Month Saver" : p === "custom" ? `Custom · ${DURATIONS[d].label}` : "Monthly Plan";
}
function choice(active: boolean) {
  return `rounded-md border px-3 py-2.5 text-center text-sm transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary/40"}`;
}
function Step({ n, t, children }: { n: number; t: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 flex items-center gap-3 font-serif text-xl text-primary"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-cream font-sans text-sm">{n}</span>{t}</p>
      {children}
    </div>
  );
}
function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return <div className="flex justify-between"><dt className="text-muted-foreground">{k}</dt><dd className={accent ? "font-medium text-secondary" : ""}>{v}</dd></div>;
}
