export type Theme = "light" | "dark";

export interface Settings {
  theme: Theme;
  soundEnabled: boolean;
  showConfetti: boolean;
  hasCompletedOnboarding: boolean;
  onboardingShownCount: number;
  lastOnboardingDate: string | null;
}
