import { createFileRoute } from "@tanstack/react-router";
import { PageHead, meta } from "@/components/site";
import { BUSINESS } from "@/lib/business";

const SECTIONS = [
  { id: "subscription", t: "Subscription & pause policy", p: ["Subscriptions start on the date you choose, subject to confirmation by our team.", "You can pause deliveries with notice by 9:00 PM the previous day. Paused meals are added to the end of your plan.", "Monthly plans allow up to 5 pause days; 3-month plans allow up to 10.", "Missed deliveries caused by us are credited back as extra meals."] },
  { id: "refund", t: "Cancellation & refund policy", p: ["Monthly plans may be cancelled any time before the next renewal.", "For prepaid plans, unused meals are refunded at the standard (non-discounted) monthly rate within 7 working days.", "Meals already prepared on the day of cancellation are not refundable."] },
  { id: "privacy", t: "Privacy policy", p: ["We collect only your name, phone number and delivery address to deliver your meals.", "We never sell or share your details with third parties.", `To request deletion of your data, call ${BUSINESS.phone}.`] },
  { id: "terms", t: "Terms of service", p: ["Prices shown on the website are indicative and confirmed at the time of order.", "Menu items may change based on seasonal availability.", "Delivery times are best-effort; we will inform you of any delays."] },
];

export const Route = createFileRoute("/policies")({
  head: () => meta("Policies — Urmesh Tiffin Services", "Subscription, pause, cancellation, refund, privacy and terms for Urmesh Tiffin Services."),
  component: () => (
    <>
      <PageHead eyebrow="Policies" title="Clear and fair, in writing." />
      <section className="container-x max-w-3xl space-y-12">
        {SECTIONS.map((s) => (
          <div key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-2xl text-primary">{s.t}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/85">{s.p.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </section>
    </>
  ),
});
