import { createFileRoute } from "@tanstack/react-router";
import kitchen from "@/assets/kitchen.jpg";
import { PageHead, meta } from "@/components/site";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us — Urmesh Tiffin Services", "A family-run home kitchen in Bicchiya, Gorakhpur, cooking fresh tiffin for students, professionals and families."),
  component: () => (
    <>
      <PageHead eyebrow="About us" title="A home kitchen, run with care." />
      <section className="container-x grid gap-12 md:grid-cols-2">
        <img src={kitchen} alt="Home kitchen preparing rotis and dal" width={1408} height={1008} className="w-full rounded-xl object-cover" />
        <div className="space-y-5 text-lg text-foreground/85">
          <p>Urmesh Tiffin Services started with a simple idea: people living away from home deserve food that tastes like home.</p>
          <p>From our kitchen near P.A.C. Camp, Bicchiya, we cook fresh lunch and dinner every day for students, working professionals and families across Gorakhpur.</p>
          <p>Simple ingredients, balanced portions, and meals delivered on time — that's our promise.</p>
          <p className="font-serif text-2xl text-primary">{BUSINESS.hindiTagline}</p>
        </div>
      </section>
    </>
  ),
});
