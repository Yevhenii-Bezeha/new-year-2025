import { useState } from "react";
import Modal from "../ui/Modal";
import type { Activity } from "../../types/activity";
import { useActivities } from "../../context/ActivityContext";
import { MOOD_COLORS } from "../../constants/colors";

const AVAILABLE_CATEGORIES = [
  "movie",
  "game",
  "cooking",
  "outdoor",
  "creative",
  "music",
  "reading",
  "relaxing",
  "active",
  "seasonal",
];

const AVAILABLE_MOODS = [
  "relaxing",
  "romantic",
  "active",
  "creative",
  "fun",
  "intellectual",
  "peaceful",
  "energetic",
  "productive",
  "cozy",
  "silly",
  "nostalgic",
  "competitive",
  "teamwork",
];

interface EditActivityModalProps {
  activity: Activity;
  isOpen: boolean;
  onClose: () => void;
  isNew?: boolean;
}

export const EditActivityModal = ({
  activity,
  isOpen,
  onClose,
  isNew = false,
}: EditActivityModalProps) => {
  const { updateActivity, addActivity } = useActivities();
  const [formData, setFormData] = useState({
    name: activity.name,
    emoji: activity.emoji,
    description: activity.description,
    category: activity.category,
    moods: activity.moods,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      await addActivity({
        ...formData,
        isCustom: true,
      });
    } else {
      await updateActivity(activity.id, {
        ...formData,
        isCustom: activity.isCustom,
      });
    }
    onClose();
  };

  const toggleMood = (mood: string) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood],
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Create Activity" : "Edit Activity"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
            Activity Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
            Emoji
          </label>
          <input
            type="text"
            value={formData.emoji}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, emoji: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            required
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a category</option>
            {AVAILABLE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
            Moods
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MOODS.map((mood) => (
              <button
                key={mood}
                type="button"
                onClick={() => toggleMood(mood)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.moods.includes(mood)
                    ? MOOD_COLORS[mood]?.replace("hover:", "") ||
                      "bg-gray-200 text-gray-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            rows={3}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            {isNew ? "Create Activity" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
