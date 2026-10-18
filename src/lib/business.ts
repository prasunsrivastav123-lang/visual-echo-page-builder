// Sample business configuration. Prices are placeholders until confirmed by the owner.
export const BUSINESS = {
  name: "Urmesh Tiffin Services",
  phone: "9415421456",
  whatsapp: "919415421456",
  address: "Doon Public School, near P.A.C. Camp, Bicchiya, Gorakhpur, Uttar Pradesh",
  tagline: "Fresh, Healthy & Delicious",
  hindiTagline: "घर जैसा स्वाद, रोज आपके साथ",
  hours: "Lunch 12:30–2:00 PM · Dinner 7:30–9:00 PM",
  cutoff: "Order changes by 9:00 PM the previous day",
};

export const SERVICE_PINCODES = ["273001", "273002", "273003", "273004", "273005", "273008", "273010", "273014", "273015", "273016"];

export type MealType = "lunch" | "dinner" | "both";

export const PRICING = {
  /** Sample monthly price for one meal a day, 6 days/week (₹). Configurable. */
  monthlyOneMeal: 4000,
  /** Both meals multiplier relative to one meal. */
  bothMultiplier: 1.8,
  baseDaysPerWeek: 6,
  threeMonthDiscountPct: 10,
  deliveryPerMonth: 0,
};

export type Duration = "1w" | "1m" | "3m";
export const DURATIONS: Record<Duration, { label: string; months: number }> = {
  "1w": { label: "1 week", months: 0.25 },
  "1m": { label: "1 month", months: 1 },
  "3m": { label: "3 months", months: 3 },
};

export type Quote = {
  mealsPerDay: number;
  daysPerWeek: number;
  totalMeals: number;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
};

/** Single source of truth for pricing. Only the 3-month discount applies — discounts never stack. */
export function quote(meal: MealType, daysPerWeek: number, duration: Duration, p = PRICING): Quote {
  const days = Math.min(7, Math.max(1, Math.round(daysPerWeek)));
  const months = DURATIONS[duration].months;
  const mealFactor = meal === "both" ? p.bothMultiplier : 1;
  const perMonth = (p.monthlyOneMeal * mealFactor * days) / p.baseDaysPerWeek;
  const subtotal = Math.round(perMonth * months);
  const discount = duration === "3m" ? Math.round((subtotal * p.threeMonthDiscountPct) / 100) : 0;
  const delivery = Math.round(p.deliveryPerMonth * Math.max(months, 0.25));
  const mealsPerDay = meal === "both" ? 2 : 1;
  const totalMeals = Math.round(days * mealsPerDay * (months * 52) / 12);
  return { mealsPerDay, daysPerWeek: days, totalMeals, subtotal, discount, delivery, total: subtotal - discount + delivery };
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export type DayMenu = { day: string; lunch: string[]; dinner: string[]; nonVeg?: string };
export const WEEKLY_MENU: DayMenu[] = [
  { day: "Monday", lunch: ["Rajma", "Rice", "Roti", "Salad"], dinner: ["Seasonal sabzi", "Roti", "Sevai"] },
  { day: "Tuesday", lunch: ["Aloo chana", "Dal", "Rice", "Roti"], dinner: ["Tahri", "Curd", "Chutney", "Salad"] },
  { day: "Wednesday", lunch: ["Matar paneer", "Fried dal", "Rice", "Roti"], dinner: ["Veg sabzi", "Rice", "Salad"], nonVeg: "Chicken curry, rice & salad" },
  { day: "Thursday", lunch: ["Kadhi pakodi", "Rice", "Roti", "Salad"], dinner: ["Chole", "Puri or roti"] },
  { day: "Friday", lunch: ["Green vegetables", "Mixed dal", "Rice", "Roti"], dinner: ["Aloo gobhi", "Roti", "Salad"] },
  { day: "Saturday", lunch: ["Matar mushroom", "Dal", "Rice", "Roti"], dinner: ["Paratha", "Sabzi", "Salad"] },
  { day: "Sunday", lunch: ["Aloo bhujia", "Pakodi", "Rice", "Salad"], dinner: ["Roti", "Sabzi", "Sevai"] },
];

export function waLink(text: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
}
