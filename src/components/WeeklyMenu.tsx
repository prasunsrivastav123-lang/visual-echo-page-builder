import { useState } from "react";
import { WEEKLY_MENU } from "@/lib/business";

type View = "lunch" | "dinner" | "both";

export function WeeklyMenu() {
  const [view, setView] = useState<View>("both");
  const [nonVeg, setNonVeg] = useState(false);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border bg-card p-1">
          {(["lunch", "dinner", "both"] as View[]).map((v) => (
            <button key={v} onClick={() => setView(v)} className={`rounded px-4 py-1.5 text-sm capitalize transition-colors ${view === v ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}>{v === "both" ? "Lunch & Dinner" : v}</button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
          <input type="checkbox" checked={nonVeg} onChange={(e) => setNonVeg(e.target.checked)} className="accent-[var(--saffron)] h-4 w-4" />
          Show non-veg options
        </label>
      </div>
      <div className="mt-8 divide-y rounded-lg border bg-card">
        {WEEKLY_MENU.map((d) => (
          <div key={d.day} className="grid gap-4 p-5 md:grid-cols-[140px_1fr_1fr] md:p-6">
            <p className="font-serif text-lg text-primary">{d.day}</p>
            {view !== "dinner" && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Lunch</p>
                <p className="mt-1.5 text-[15px]">{d.lunch.join(" · ")}</p>
              </div>
            )}
            {view !== "lunch" && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-secondary">Dinner</p>
                <p className="mt-1.5 text-[15px]">{d.dinner.join(" · ")}</p>
                {nonVeg && d.nonVeg && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-destructive"><span className="h-2 w-2 rounded-full bg-destructive" />Non-veg: {d.nonVeg}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Menu may change with seasonal vegetables. Pure veg by default; non-veg on select days on request.</p>
    </div>
  );
}
