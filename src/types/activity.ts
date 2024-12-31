export type ActivityCategory =
  | "movie"
  | "game"
  | "cooking"
  | "outdoor"
  | "music"
  | "reading"
  | "creative"
  | "relaxing"
  | "active"
  | "seasonal"
  | "budget"
  | "planning"
  | "food"
  | "other";

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface Activity {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: ActivityCategory;
  moods: string[];
  isCustom?: boolean;
  season?: Season;
}
