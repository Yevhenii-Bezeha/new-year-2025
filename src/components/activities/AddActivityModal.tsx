import { useState } from "react";
import Modal from "../ui/Modal";
import type { Activity, ActivityCategory } from "../../types/activity";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (activity: Omit<Activity, "id">) => void;
}

const categories: { value: ActivityCategory; label: string }[] = [
  { value: "movie", label: "Movie" },
  { value: "game", label: "Game" },
  { value: "cooking", label: "Cooking" },
  { value: "outdoor", label: "Outdoor" },
  { value: "music", label: "Music" },
  { value: "reading", label: "Reading" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" },
];

const AVAILABLE_MOODS = [
  { value: "relaxing", label: "Relaxing" },
  { value: "romantic", label: "Romantic" },
  { value: "active", label: "Active" },
  { value: "creative", label: "Creative" },
  { value: "fun", label: "Fun" },
  { value: "intellectual", label: "Intellectual" },
  { value: "peaceful", label: "Peaceful" },
  { value: "energetic", label: "Energetic" },
  { value: "productive", label: "Productive" },
  { value: "cozy", label: "Cozy" },
  { value: "silly", label: "Silly" },
  { value: "nostalgic", label: "Nostalgic" },
  { value: "competitive", label: "Competitive" },
  { value: "teamwork", label: "Teamwork" },
];

const AddActivityModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddActivityModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    category: "custom" as ActivityCategory,
    description: "",
    moods: [] as any[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, isCustom: true });
    onClose();
    setFormData({
      name: "",
      emoji: "",
      category: "custom" as ActivityCategory,
      description: "",
      moods: [],
    });
  };

  const toggleMood = (mood: any) => {
    setFormData((prev) => ({
      ...prev,
      moods: prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Activity">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Activity Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Emoji
          </label>
          <input
            type="text"
            required
            value={formData.emoji}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, emoji: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            placeholder="🎮"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value as ActivityCategory,
              }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Moods
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MOODS.map((mood: any) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => toggleMood(mood.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.moods.includes(mood.value)
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full rounded-lg border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Add Activity
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddActivityModal;
