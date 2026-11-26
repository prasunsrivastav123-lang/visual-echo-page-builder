import { z } from "zod";
import { WEEKLY_MENU } from "./business";

export type MenuMeal = "lunch" | "dinner";

export type MenuCandidate = {
  day: string;
  meal: MenuMeal;
  dish: string;
};

export const MenuRecommendationSchema = z.object({
  day: z.string(),
  meal: z.enum(["lunch", "dinner"]),
  dish: z.string(),
  reason: z.string().trim().min(1).max(240),
}).strict();

const MenuRecommendationPayloadSchema = z.object({
  recommendations: z.array(MenuRecommendationSchema).max(3),
}).strict();

export type MenuRecommendation = z.infer<typeof MenuRecommendationSchema>;

export function getWeeklyMenuCandidates(): MenuCandidate[] {
  return WEEKLY_MENU.flatMap((day): MenuCandidate[] => {
    const candidates: MenuCandidate[] = [
      { day: day.day, meal: "lunch", dish: day.lunch.join(", ") },
      { day: day.day, meal: "dinner", dish: day.dinner.join(", ") },
    ];

    if (day.nonVeg) {
      candidates.push({ day: day.day, meal: "dinner", dish: day.nonVeg });
    }

    return candidates;
  });
}

function candidateKey(candidate: MenuCandidate): string {
  return `${candidate.day}\u0000${candidate.meal}\u0000${candidate.dish}`;
}

export function parseMenuRecommendations(payload: unknown): MenuRecommendation[] | null {
  const parsed = MenuRecommendationPayloadSchema.safeParse(payload);
  if (!parsed.success) return null;

  const menuKeys = new Set(getWeeklyMenuCandidates().map(candidateKey));
  const seen = new Set<string>();
  const valid: MenuRecommendation[] = [];

  for (const recommendation of parsed.data.recommendations) {
    const key = candidateKey(recommendation);
    if (!menuKeys.has(key) || seen.has(key)) continue;
    seen.add(key);
    valid.push(recommendation);
  }

  return valid;
}