import { createContext, useContext, useState, useEffect } from "react";
import type { Activity } from "../types/activity";
import { storage } from "../utils/storage";

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id">) => void;
  removeActivity: (id: string) => void;
  updateActivity: (id: string, activity: Omit<Activity, "id">) => void;
  resetActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

const defaultActivities: Activity[] = [
  {
    id: "1",
    name: "Movie Night",
    emoji: "🎥",
    category: "movie",
    description: "Pick a movie genre and enjoy a cozy night together",
    moods: ["relaxing", "romantic"],
    isCustom: false,
  },
  {
    id: "2",
    name: "Board Game Battle",
    emoji: "🎲",
    category: "game",
    description: "Challenge each other with your favorite board games",
    moods: ["fun", "competitive"],
    isCustom: false,
  },
  {
    id: "3",
    name: "Cooking Adventure",
    emoji: "🍳",
    category: "cooking",
    description: "Try cooking a new recipe from a different cuisine",
    moods: ["creative", "fun"],
    isCustom: false,
  },
  {
    id: "4",
    name: "Book Club Date",
    emoji: "📖",
    category: "reading",
    description: "Read and discuss a chapter together over coffee",
    moods: ["relaxing", "intellectual"],
    isCustom: false,
  },
  {
    id: "5",
    name: "Nature Walk",
    emoji: "🏞️",
    category: "outdoor",
    description: "Explore a new trail or park together",
    moods: ["active", "peaceful"],
    isCustom: false,
  },
  {
    id: "6",
    name: "Music & Dance",
    emoji: "🎧",
    category: "music",
    description: "Create a playlist and have a private dance party",
    moods: ["fun", "romantic"],
    isCustom: false,
  },
  {
    id: "7",
    name: "Picnic Time",
    emoji: "🧺",
    category: "outdoor",
    description: "Pack some snacks and find a beautiful spot outdoors",
    moods: ["romantic", "relaxing"],
    isCustom: false,
  },
  {
    id: "8",
    name: "Art Session",
    emoji: "🎨",
    category: "creative",
    description: "Paint, draw, or craft something together",
    moods: ["creative", "relaxing"],
    isCustom: false,
  },
  {
    id: "9",
    name: "Puzzle Challenge",
    emoji: "🧩",
    category: "game",
    description: "Work together to complete a challenging puzzle",
    moods: ["focused", "teamwork"],
    isCustom: false,
  },
  {
    id: "10",
    name: "Stargazing",
    emoji: "🌟",
    category: "outdoor",
    description: "Find a dark spot and watch the stars together",
    moods: ["romantic", "peaceful"],
    isCustom: false,
  },
  {
    id: "11",
    name: "Baking Fun",
    emoji: "🧁",
    category: "cooking",
    description: "Bake something sweet and decorate it together",
    moods: ["creative", "fun"],
    isCustom: false,
  },
  {
    id: "12",
    name: "Video Game Quest",
    emoji: "🎮",
    category: "game",
    description: "Team up or compete in your favorite video games",
    moods: ["fun", "competitive"],
    isCustom: false,
  },
  {
    id: "13",
    name: "Home Spa Day",
    emoji: "💆",
    category: "relaxing",
    description: "Create a spa experience with face masks and massages",
    moods: ["relaxing", "romantic"],
    isCustom: false,
  },
  {
    id: "14",
    name: "Photo Adventure",
    emoji: "📸",
    category: "creative",
    description: "Go on a photo walk and capture memories together",
    moods: ["creative", "active"],
    isCustom: false,
  },
  {
    id: "15",
    name: "Karaoke Night",
    emoji: "🎤",
    category: "music",
    description: "Sing your favorite songs and have a laugh",
    moods: ["fun", "silly"],
    isCustom: false,
  },
  {
    id: "16",
    name: "Garden Together",
    emoji: "🌱",
    category: "outdoor",
    description: "Plant some flowers or herbs and watch them grow",
    moods: ["peaceful", "productive"],
    isCustom: false,
  },
  {
    id: "17",
    name: "DIY Project",
    emoji: "🔨",
    category: "creative",
    description: "Work on a home improvement or craft project",
    moods: ["creative", "productive"],
    isCustom: false,
  },
  {
    id: "18",
    name: "Coffee Tasting",
    emoji: "☕",
    category: "food",
    description: "Try different coffee beans and compare notes",
    moods: ["relaxing", "intellectual"],
    isCustom: false,
  },
  {
    id: "19",
    name: "Dance Lesson",
    emoji: "💃",
    category: "active",
    description: "Learn a new dance style using online tutorials",
    moods: ["active", "fun"],
    isCustom: false,
  },
  {
    id: "20",
    name: "Memory Lane",
    emoji: "📱",
    category: "relaxing",
    description: "Look through old photos and share stories",
    moods: ["nostalgic", "romantic"],
    isCustom: false,
  },
  {
    id: "21",
    name: "Silent Movie Night",
    emoji: "🎬",
    category: "movie",
    description: "Mute a movie and create your own funny dialogues",
    moods: ["silly", "creative"],
    isCustom: false,
  },
  {
    id: "22",
    name: "Truth or Dare",
    emoji: "🎯",
    category: "game",
    description: "Classic game with a romantic twist",
    moods: ["fun", "romantic"],
    isCustom: false,
  },
  {
    id: "23",
    name: "Homemade Sushi",
    emoji: "🍱",
    category: "cooking",
    description: "Learn to make sushi rolls together",
    moods: ["creative", "fun"],
    isCustom: false,
  },
  {
    id: "24",
    name: "Moonlight Walk",
    emoji: "🌙",
    category: "outdoor",
    description: "Take a romantic evening stroll under the stars",
    moods: ["romantic", "peaceful"],
    isCustom: false,
  },
  {
    id: "25",
    name: "Blanket Fort",
    emoji: "🏰",
    category: "relaxing",
    description: "Build and decorate a cozy fort with blankets and pillows",
    moods: ["cozy", "romantic"],
    isCustom: false,
  },
  {
    id: "26",
    name: "Vision Board",
    emoji: "✨",
    category: "creative",
    description: "Create a board of your future dreams together",
    moods: ["creative", "romantic"],
    isCustom: false,
  },
  {
    id: "27",
    name: "Winter Hot Cocoa",
    emoji: "☕",
    category: "seasonal",
    description: "Make fancy hot chocolate with marshmallows",
    moods: ["cozy", "romantic"],
    season: "winter",
    isCustom: false,
  },
  {
    id: "28",
    name: "Summer Picnic",
    emoji: "🧺",
    category: "seasonal",
    description: "Pack a light meal and find a sunny spot",
    moods: ["romantic", "peaceful"],
    season: "summer",
    isCustom: false,
  },
  {
    id: "29",
    name: "Autumn Leaf Hunt",
    emoji: "🍁",
    category: "seasonal",
    description: "Collect and press colorful autumn leaves",
    moods: ["peaceful", "creative"],
    season: "autumn",
    isCustom: false,
  },
  {
    id: "30",
    name: "Spring Garden",
    emoji: "🌸",
    category: "seasonal",
    description: "Plant spring flowers or start an herb garden",
    moods: ["peaceful", "productive"],
    season: "spring",
    isCustom: false,
  },
  {
    id: "31",
    name: "Budget Movie Night",
    emoji: "🏠",
    category: "budget",
    description: "Stream a free movie and make homemade popcorn",
    moods: ["relaxing", "cozy"],
    isCustom: false,
  },
  {
    id: "32",
    name: "Story Writing",
    emoji: "✍️",
    category: "creative",
    description: "Write a story together, one line at a time",
    moods: ["creative", "fun"],
    isCustom: false,
  },
  {
    id: "33",
    name: "Time Capsule",
    emoji: "📦",
    category: "creative",
    description: "Create a box of memories to open in the future",
    moods: ["nostalgic", "romantic"],
    isCustom: false,
  },
  {
    id: "34",
    name: "Dream Vacation",
    emoji: "✈️",
    category: "planning",
    description: "Plan your dream trip together (even if imaginary)",
    moods: ["creative", "romantic"],
    isCustom: false,
  },
  {
    id: "35",
    name: "Couple's Workout",
    emoji: "🏋️",
    category: "active",
    description: "Follow an online workout video together",
    moods: ["active", "energetic"],
    isCustom: false,
  },
];

export const ActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = storage.getActivities();
    return saved.length > 0 ? saved : defaultActivities;
  });

  useEffect(() => {
    storage.setActivities(activities);
  }, [activities]);

  const addActivity = (activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      isCustom: true,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const updateActivity = (id: string, activityData: Omit<Activity, "id">) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, ...activityData } : activity
      )
    );
  };

  const resetActivities = () => {
    setActivities(defaultActivities);
    storage.setActivities(defaultActivities);
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        removeActivity,
        updateActivity,
        resetActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useActivities must be used within an ActivityProvider");
  }
  return context;
};
