import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { LoaderCircle, Search } from "lucide-react";
import { Btn } from "@/components/site";
import { WEEKLY_MENU } from "@/lib/business";
import { recommendMenu } from "@/lib/menu-recommendations.functions";
import type { MenuRecommendation } from "@/lib/menu-recommendations";

type View = "lunch" | "dinner" | "both";

export function WeeklyMenu() {
  const [view, setView] = useState<View>("both");
  const [nonVeg, setNonVeg] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState<MenuRecommendation[] | null>(null);
  const [recommendationError, setRecommendationError] = useState<string | null>(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const requestRecommendations = useServerFn(recommendMenu);

  async function submitPreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoadingRecommendations(true);
    setRecommendations(null);
    setRecommendationError(null);

    try {
      const result = await requestRecommendations({ data: { preferences } });
      setRecommendations(result.recommendations);
      setRecommendationError(result.error);
    } catch {
      setRecommendationError("Menu suggestions are temporarily unavailable. Please try again later.");
    } finally {
      setIsLoadingRecommendations(false);
    }
  }

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
      <section className="mt-8 border-y py-6" aria-labelledby="dietary-match-title">
        <form onSubmit={submitPreferences} aria-busy={isLoadingRecommendations}>
          <div className="grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <label id="dietary-match-title" htmlFor="dietary-preferences" className="font-serif text-xl text-primary">Your food preferences</label>
              <textarea
                id="dietary-preferences"
                value={preferences}
                onChange={(event) => setPreferences(event.target.value)}
                placeholder="For example: vegetarian, mild spice, no paneer"
                minLength={3}
                maxLength={500}
                required
                rows={2}
                className="mt-3 w-full resize-y rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <Btn type="submit" disabled={isLoadingRecommendations || preferences.trim().length < 3}>
              {isLoadingRecommendations ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Search size={16} aria-hidden="true" />}
              {isLoadingRecommendations ? "Finding dishes…" : "Find dishes"}
            </Btn>
          </div>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">Menu names don't list every ingredient. Confirm allergies or strict dietary needs with us before ordering.</p>
        {(isLoadingRecommendations || recommendationError || recommendations) && (
          <div className="mt-5" aria-live="polite" aria-atomic="true">
            {isLoadingRecommendations && <p className="text-sm text-muted-foreground">Checking this week's menu…</p>}
            {recommendationError && <p role="alert" className="text-sm text-destructive">{recommendationError}</p>}
            {!isLoadingRecommendations && !recommendationError && recommendations?.length === 0 && (
              <p className="text-sm text-muted-foreground">No close match in this week's menu. Try changing your preferences.</p>
            )}
            {!isLoadingRecommendations && !recommendationError && recommendations && recommendations.length > 0 && (
              <ol className="divide-y border-y">
                {recommendations.map((recommendation) => (
                  <li key={`${recommendation.day}-${recommendation.meal}-${recommendation.dish}`} className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4">
                    <p className="text-sm font-semibold text-secondary">{recommendation.day} · {recommendation.meal === "lunch" ? "Lunch" : "Dinner"}</p>
                    <div>
                      <p className="text-sm font-medium">{recommendation.dish}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{recommendation.reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </section>
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
