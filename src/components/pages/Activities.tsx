import { useState, useMemo } from "react";
import { useActivities } from "../../context/ActivityContext";
import { EditActivityModal } from "../activities/EditActivityModal";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import type { Activity } from "../../types/activity";
import { ActivityCard } from "../activities/ActivityCard";
import { MOOD_COLORS, CATEGORY_COLORS } from "../../constants/colors";

export default function Activities() {
  const { activities } = useActivities();
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const moods = useMemo(() => {
    const moodSet = new Set<string>();
    activities.forEach((activity) => {
      activity.moods.forEach((mood) => moodSet.add(mood));
    });
    return ["all", ...Array.from(moodSet)].sort();
  }, [activities]);

  const categories = useMemo(() => {
    const categorySet = new Set(activities.map((a) => a.category));
    return ["all", ...Array.from(categorySet)].sort();
  }, [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch = activity.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMood =
        selectedMood === "all" || activity.moods.includes(selectedMood);
      const matchesCategory =
        selectedCategory === "all" || activity.category === selectedCategory;
      return matchesSearch && matchesMood && matchesCategory;
    });
  }, [activities, searchTerm, selectedMood, selectedCategory]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedMood("all");
    setSelectedCategory("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Activities
        </h2>
        <button
          onClick={() => setIsAddingActivity(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Activity
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedMood("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedMood === "all"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Moods
          </button>
          {moods
            .filter((mood) => mood !== "all")
            .map((mood) => (
              <button
                key={mood}
                onClick={() =>
                  setSelectedMood(mood === selectedMood ? "all" : mood)
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  mood === selectedMood
                    ? `${MOOD_COLORS[mood]} ring-2 ring-offset-2 ring-primary-500`
                    : MOOD_COLORS[mood]
                }`}
              >
                {mood}
              </button>
            ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Categories
          </button>
          {categories
            .filter((category) => category !== "all")
            .map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? "all" : category
                  )
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? `${CATEGORY_COLORS[category]} ring-2 ring-offset-2 ring-primary-500`
                    : CATEGORY_COLORS[category]
                }`}
              >
                {category}
              </button>
            ))}
        </div>

        {(searchTerm ||
          selectedMood !== "all" ||
          selectedCategory !== "all") && (
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Found {filteredActivities.length} activities
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <XMarkIcon className="h-4 w-4" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ActivityCard activity={activity} onEdit={setEditingActivity} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {isAddingActivity && (
        <EditActivityModal
          activity={{
            id: "",
            name: "",
            emoji: "",
            description: "",
            category: "",
            moods: [],
            isCustom: true,
          }}
          isOpen={true}
          onClose={() => setIsAddingActivity(false)}
          isNew={true}
        />
      )}

      {editingActivity && (
        <EditActivityModal
          activity={editingActivity}
          isOpen={true}
          onClose={() => setEditingActivity(null)}
        />
      )}
    </div>
  );
}
