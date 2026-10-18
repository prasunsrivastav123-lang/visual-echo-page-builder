import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PRICING, quote, inr } from "@/lib/business";
import { btnCls } from "./site";

export function PlanCards() {
  const m = quote("lunch", 6, "1m");
  const q = quote("lunch", 6, "3m");
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex flex-col rounded-lg border bg-card p-7">
        <h3 className="text-2xl text-primary">Monthly Plan</h3>
        <p className="mt-2 text-sm text-muted-foreground">Flexible, renews each month.</p>
        <p className="mt-6 font-serif text-4xl text-primary">{inr(m.total)}<span className="font-sans text-sm text-muted-foreground"> / month</span></p>
        <p className="mt-1 text-xs text-muted-foreground">1 meal/day · {PRICING.baseDaysPerWeek} days/week</p>
        <Features items={["Lunch or dinner", "Pause with 1 day notice", "Cancel any time before renewal"]} />
        <Link to="/order" search={{ plan: "monthly" }} className={`${btnCls("outline")} mt-auto`}>Choose monthly</Link>
      </div>
      <div className="relative flex flex-col rounded-lg border-2 border-saffron bg-card p-7 shadow-soft">
        <span className="absolute -top-3 left-7 rounded bg-saffron px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-saffron-foreground">Best Value</span>
        <h3 className="text-2xl text-primary">3-Month Saver</h3>
        <p className="mt-2 text-sm text-muted-foreground">Prepaid for three months.</p>
        <p className="mt-6 font-serif text-4xl text-primary">{inr(q.total)}<span className="font-sans text-sm text-muted-foreground"> / 3 months</span></p>
        <p className="mt-1 text-xs text-muted-foreground"><s>{inr(q.subtotal)}</s> · <span className="font-medium text-secondary">You save {inr(q.discount)}</span></p>
        <Features items={[`${PRICING.threeMonthDiscountPct}% off monthly price`, "Up to 10 pause days", "Priority delivery slot"]} />
        <Link to="/order" search={{ plan: "saver" }} className={`${btnCls()} mt-auto`}>Choose 3-month saver</Link>
      </div>
      <div className="flex flex-col rounded-lg border bg-card p-7">
        <h3 className="text-2xl text-primary">Custom Plan</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your meals, your days.</p>
        <p className="mt-6 font-serif text-4xl text-primary">Your way</p>
        <p className="mt-1 text-xs text-muted-foreground">Price calculated instantly</p>
        <Features items={["Lunch, dinner or both", "1–7 days a week", "1 week to 3 months"]} />
        <Link to="/order" search={{ plan: "custom" }} className={`${btnCls("outline")} mt-auto`}>Build your plan</Link>
      </div>
    </div>
  );
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="my-7 space-y-2.5 text-sm">
      {items.map((i) => (
        <li key={i} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-secondary" />{i}</li>
      ))}
    </ul>
  );
}
