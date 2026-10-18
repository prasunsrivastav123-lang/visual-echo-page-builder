import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Leaf, Truck } from "lucide-react";
import hero from "@/assets/hero-tiffin.jpg";
import kitchen from "@/assets/kitchen.jpg";
import { btnCls, meta } from "@/components/site";
import { WeeklyMenu } from "@/components/WeeklyMenu";
import { PlanCards } from "@/components/PlanCards";

export const Route = createFileRoute("/")({
  head: () => meta("Urmesh Tiffin Services — Ghar jaisa khana in Gorakhpur", "Freshly prepared homemade tiffin with balanced portions and dependable daily delivery in Gorakhpur. Monthly and 3-month plans."),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="container-x grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="eyebrow">Homemade food · Gorakhpur</p>
          <h1 className="mt-5 text-5xl leading-[1.05] text-primary md:text-6xl">Ghar jaisa khana.<br />Har din.</h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Freshly prepared meals, balanced portions, and dependable delivery. Good food that feels like home.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/plans" className={btnCls()}>Explore Tiffin Plans</Link>
            <Link to="/menu" className={btnCls("outline")}>View Weekly Menu</Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Freshly prepared · Simple ingredients · Delivered to your door</p>
        </div>
        <img src={hero} alt="Steel thali with roti, rice, dal, aloo sabzi and salad" width={1200} height={1408} className="aspect-[4/5] w-full rounded-xl object-cover shadow-soft" />
      </section>

      <section className="border-y bg-cream">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-3">
          {[
            { i: Home, t: "Homemade Taste", d: "Cooked like at home — less oil, honest masala." },
            { i: Leaf, t: "Fresh Daily Meals", d: "Prepared the same day. Nothing reheated." },
            { i: Truck, t: "Reliable Delivery", d: "On time for lunch and dinner, every day." },
          ].map(({ i: I, t, d }) => (
            <div key={t} className="flex gap-4">
              <I className="mt-1 shrink-0 text-secondary" size={22} />
              <div><p className="font-serif text-lg text-primary">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-20">
        <p className="eyebrow">This week</p>
        <h2 className="mt-3 text-4xl text-primary">Weekly menu</h2>
        <div className="mt-8"><WeeklyMenu /></div>
      </section>

      <section className="container-x py-12">
        <p className="eyebrow">Subscriptions</p>
        <h2 className="mt-3 text-4xl text-primary">Simple, transparent plans</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">Prices shown are sample rates and may be confirmed on order. No hidden charges.</p>
        <div className="mt-10"><PlanCards /></div>
      </section>

      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2">
        <img src={kitchen} alt="Fresh rotis being rolled in a home kitchen" loading="lazy" width={1408} height={1008} className="w-full rounded-xl object-cover" />
        <div>
          <p className="eyebrow">Our kitchen</p>
          <h2 className="mt-3 text-4xl text-primary">Cooked fresh, every single day.</h2>
          <p className="mt-5 text-muted-foreground">Every roti is rolled by hand and every dal cooked in small batches. We cook the way you'd cook at home — so you can focus on your work, studies, or family.</p>
          <Link to="/about" className={`${btnCls("outline")} mt-8`}>About us</Link>
        </div>
      </section>
    </>
  );
}
