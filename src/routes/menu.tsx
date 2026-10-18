import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, btnCls, meta } from "@/components/site";
import { WeeklyMenu } from "@/components/WeeklyMenu";

export const Route = createFileRoute("/menu")({
  head: () => meta("Weekly Menu — Urmesh Tiffin Services", "Monday to Sunday lunch and dinner menu: rajma, kadhi pakodi, matar paneer, chole and more. Veg with non-veg options."),
  component: () => (
    <>
      <PageHead eyebrow="Weekly menu" title="Seven days of home-style food." sub="A rotating menu of familiar dishes, balanced across the week." />
      <section className="container-x">
        <WeeklyMenu />
        <Link to="/order" className={`${btnCls()} mt-10`}>Order tiffin</Link>
      </section>
    </>
  ),
});
