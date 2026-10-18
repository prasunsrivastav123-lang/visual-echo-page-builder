import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, meta } from "@/components/site";
import { PlanCards } from "@/components/PlanCards";

export const Route = createFileRoute("/plans")({
  head: () => meta("Tiffin Plans & Pricing — Urmesh Tiffin Services", "Monthly, 3-month saver and custom tiffin subscriptions in Gorakhpur with transparent pricing and savings."),
  component: () => (
    <>
      <PageHead eyebrow="Plans" title="Choose how you eat." sub="Every plan includes fresh daily meals. The 3-month saver gives you the best price." />
      <section className="container-x"><PlanCards /></section>
      <section className="container-x mt-16 grid gap-8 md:grid-cols-3">
        {[
          ["Pause", "Travelling? Pause deliveries with one day's notice. Paused days are added to the end of your plan."],
          ["Cancellation", "Monthly plans can be cancelled before renewal. Prepaid plans refund unused meals minus the saver discount."],
          ["Missed delivery", "If we miss a delivery, that meal is credited back to your plan — no questions asked."],
        ].map(([t, d]) => (
          <div key={t} className="border-t pt-5"><p className="font-serif text-lg text-primary">{t}</p><p className="mt-2 text-sm text-muted-foreground">{d}</p></div>
        ))}
      </section>
      <p className="container-x mt-8 text-sm text-muted-foreground">Read the full <Link to="/policies" className="underline">subscription policies</Link>.</p>
    </>
  ),
});
