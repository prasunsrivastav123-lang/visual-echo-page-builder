import { createFileRoute } from "@tanstack/react-router";
import { PageHead, btnCls, meta } from "@/components/site";
import { BUSINESS, SERVICE_PINCODES, waLink } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact & Service Area — Urmesh Tiffin Services", "Call or WhatsApp 9415421456. Tiffin delivery across Gorakhpur from Bicchiya, near P.A.C. Camp."),
  component: () => (
    <>
      <PageHead eyebrow="Contact" title="Talk to us." sub="Call or WhatsApp for orders, menu questions, or bulk tiffin." />
      <section className="container-x grid gap-10 md:grid-cols-2">
        <div className="space-y-6 rounded-lg border bg-card p-7">
          <div><p className="eyebrow">Phone / WhatsApp</p><p className="mt-2 font-serif text-2xl text-primary">+91 {BUSINESS.phone}</p></div>
          <div><p className="eyebrow">Kitchen</p><p className="mt-2">{BUSINESS.address}</p></div>
          <div><p className="eyebrow">Delivery hours</p><p className="mt-2">{BUSINESS.hours}</p><p className="text-sm text-muted-foreground">{BUSINESS.cutoff}</p></div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+91${BUSINESS.phone}`} className={btnCls()}>Call now</a>
            <a href={waLink("Namaste, I have a question about tiffin service.")} target="_blank" rel="noreferrer" className={btnCls("green")}>WhatsApp</a>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-7">
          <p className="eyebrow">Service area</p>
          <p className="mt-2 text-foreground/85">We currently deliver to these Gorakhpur PIN codes:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SERVICE_PINCODES.map((p) => <span key={p} className="rounded border bg-background px-3 py-1 text-sm">{p}</span>)}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">Outside these areas? Message us — we may still be able to deliver.</p>
        </div>
      </section>
    </>
  ),
});
