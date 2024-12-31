import type { Activity } from "../types/activity";
import type { Settings } from "../types/settings";

const STORAGE_KEYS = {
  ACTIVITIES: "activities",
  SETTINGS: "settings",
  SELECTED_ACTIVITIES: "selected-activities",
  HISTORY: "spin-history",
  SCHEDULED_ACTIVITIES: "scheduled-activities",
} as const;

export interface SpinHistoryEntry {
  timestamp: number;
  activityId: string;
}

export interface ScheduledActivity {
  date: string; // ISO string format
  activityId: string;
}

export const storage = {
  getActivities: (): Activity[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : [];
  },

  setActivities: (activities: Activity[]) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  },

  getSettings: (): Settings => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!saved) {
      return {
        theme: "light",
        soundEnabled: true,
        showConfetti: true,
        hasCompletedOnboarding: false,
        onboardingShownCount: 0,
        lastOnboardingDate: null,
      };
    }
    return JSON.parse(saved);
  },

  setSettings: (settings: Partial<Settings>) => {
    const current = storage.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  },

  getSelectedActivities: (): string[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_ACTIVITIES);
    return saved ? JSON.parse(saved) : [];
  },

  setSelectedActivities: (activityIds: string[]) => {
    localStorage.setItem(
      STORAGE_KEYS.SELECTED_ACTIVITIES,
      JSON.stringify(activityIds)
    );
  },

  getSpinHistory: (): SpinHistoryEntry[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return saved ? JSON.parse(saved) : [];
  },

  addSpinHistory: (activityId: string) => {
    const history = storage.getSpinHistory();
    const newEntry: SpinHistoryEntry = {
      timestamp: Date.now(),
      activityId,
    };
    history.push(newEntry);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  },

  clearHistory: () => {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  },

  getScheduledActivities: (): ScheduledActivity[] => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHEDULED_ACTIVITIES);
    return saved ? JSON.parse(saved) : [];
  },

  setScheduledActivities: (activities: ScheduledActivity[]) => {
    localStorage.setItem(
      STORAGE_KEYS.SCHEDULED_ACTIVITIES,
      JSON.stringify(activities)
    );
  },

  updateScheduledActivity: (date: string, activityId: string) => {
    const activities = storage.getScheduledActivities();
    const existingIndex = activities.findIndex((a) => a.date === date);

    if (existingIndex >= 0) {
      activities[existingIndex].activityId = activityId;
    } else {
      activities.push({ date: date, activityId });
    }

    storage.setScheduledActivities(activities);
  },
};
