import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, MapPin, MessageCircle } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/business";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/plans", label: "Plans" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Btn({ variant = "primary", className = "", ...p }: React.ComponentProps<"button"> & { variant?: "primary" | "outline" | "green" }) {
  return <button {...p} className={`${btnCls(variant)} ${className}`} />;
}
export function btnCls(variant: "primary" | "outline" | "green" = "primary") {
  const base = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";
  if (variant === "outline") return `${base} border border-primary/25 text-primary hover:bg-cream`;
  if (variant === "green") return `${base} bg-secondary text-secondary-foreground hover:bg-secondary/90`;
  return `${base} bg-primary text-primary-foreground hover:bg-primary/90`;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-primary py-2 text-center text-xs text-primary-foreground/90 tracking-wide">Ghar jaisa swaad, roz aapke saath.</div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="leading-none" onClick={() => setOpen(false)}>
            <span className="block font-serif text-xl font-semibold tracking-wider text-primary">URMESH</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Tiffin Services</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="text-sm text-foreground/75 transition-colors hover:text-primary" activeProps={{ className: "text-sm text-primary font-medium" }} activeOptions={{ exact: true }}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/order" className={`${btnCls()} hidden py-2.5 sm:inline-flex`}>Order Tiffin</Link>
            <button aria-label="Open menu" className="p-2 md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {open && (
          <nav className="border-t bg-background md:hidden">
            <div className="container-x flex flex-col py-3">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 text-base">{n.label}</Link>
              ))}
              <Link to="/order" onClick={() => setOpen(false)} className={`${btnCls()} mt-2`}>Order Tiffin</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-cream">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-primary">{BUSINESS.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{BUSINESS.tagline}</p>
          <p className="mt-3 text-sm">{BUSINESS.hindiTagline}</p>
          <div className="mt-6 space-y-2 text-sm text-foreground/80">
            <p className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /><a href={`tel:+91${BUSINESS.phone}`} className="hover:text-primary">+91 {BUSINESS.phone}</a></p>
            <p className="flex gap-2"><MessageCircle size={16} className="mt-0.5 shrink-0" /><a href={waLink("Namaste, I'd like to know about tiffin plans.")} target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp us</a></p>
            <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{BUSINESS.address}</p>
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-primary">Weekly menu</Link></li>
            <li><Link to="/plans" className="hover:text-primary">Subscription plans</Link></li>
            <li><Link to="/order" className="hover:text-primary">Order tiffin</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Service area</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Policies</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/policies" hash="subscription" className="hover:text-primary">Subscription & pause</Link></li>
            <li><Link to="/policies" hash="refund" className="hover:text-primary">Cancellation & refund</Link></li>
            <li><Link to="/policies" hash="privacy" className="hover:text-primary">Privacy policy</Link></li>
            <li><Link to="/policies" hash="terms" className="hover:text-primary">Terms of service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {BUSINESS.name}, Gorakhpur</div>
    </footer>
  );
}

export function PageHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="container-x pt-16 pb-10 md:pt-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl text-primary md:text-5xl">{title}</h1>
      {sub && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
    </section>
  );
}

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
