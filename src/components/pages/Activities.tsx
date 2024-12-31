import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useActivities } from "../../context/ActivityContext";
import { useGameSounds } from "../../hooks/useGameSounds";
import PageTransition from "../ui/PageTransition";
import Modal from "../ui/Modal";
import type { Activity, ActivityCategory } from "../../types/activity";

const CATEGORIES: { id: ActivityCategory; label: string }[] = [
  { id: "movie", label: "Movies" },
  { id: "game", label: "Games" },
  { id: "cooking", label: "Cooking" },
  { id: "outdoor", label: "Outdoor" },
  { id: "music", label: "Music" },
  { id: "reading", label: "Reading" },
  { id: "creative", label: "Creative" },
  { id: "other", label: "Other" },
];

interface ActivityFormData {
  name: string;
  emoji: string;
  description: string;
  category: ActivityCategory;
}

const Activities = () => {
  const { activities, addActivity, removeActivity, updateActivity } =
    useActivities();
  const { playClick, playSelect } = useGameSounds();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ActivityCategory | "all"
  >("all");
  const [formData, setFormData] = useState<ActivityFormData>({
    name: "",
    emoji: "",
    description: "",
    category: "other",
  });

  const filteredActivities = useMemo(() => {
    return activities
      .filter((activity) => {
        const matchesSearch =
          activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || activity.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [activities, searchQuery, selectedCategory]);

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    playSelect();
    addActivity({
      ...formData,
      moods: [],
    });
    resetForm();
    setShowAddModal(false);
  };

  const handleEditClick = (activity: Activity) => {
    playClick();
    setSelectedActivity(activity);
    setFormData({
      name: activity.name,
      emoji: activity.emoji,
      description: activity.description,
      category: activity.category,
    });
    setShowEditModal(true);
  };

  const handleEditActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedActivity) return;

    playSelect();
    updateActivity(selectedActivity.id, {
      ...formData,
      moods: selectedActivity.moods,
    });
    resetForm();
    setShowEditModal(false);
  };

  const handleDeleteClick = (activity: Activity) => {
    playClick();
    setSelectedActivity(activity);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedActivity) {
      playSelect();
      removeActivity(selectedActivity.id);
      setShowDeleteModal(false);
      setSelectedActivity(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      emoji: "",
      description: "",
      category: "other",
    });
    setSelectedActivity(null);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-display text-primary-800 dark:text-primary-200">
            Activities
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Activity</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full rounded-lg border-primary-300 dark:border-primary-700 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? "bg-primary-600 text-white"
                    : "bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {filteredActivities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-primary-100 dark:border-primary-800 relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl mb-2">{activity.emoji}</div>
                    <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
                      {activity.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 mt-1">
                      {activity.description}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-300">
                      {
                        CATEGORIES.find((c) => c.id === activity.category)
                          ?.label
                      }
                    </span>
                  </div>
                  {activity.isCustom && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        onClick={() => handleEditClick(activity)}
                        className="p-2 text-primary-500 hover:text-primary-600"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(activity)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Activity Form Modal (used for both Add and Edit) */}
        <Modal
          isOpen={showAddModal || showEditModal}
          onClose={() => {
            resetForm();
            setShowAddModal(false);
            setShowEditModal(false);
          }}
          title={showEditModal ? "Edit Activity" : "Add New Activity"}
        >
          <form
            onSubmit={showEditModal ? handleEditActivity : handleAddActivity}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
                Emoji
              </label>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, emoji: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-primary-300 dark:border-primary-700 dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mt-1 block w-full rounded-md border-primary-300 dark:border-primary-700 dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md border-primary-300 dark:border-primary-700 dark:bg-gray-800"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300">
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
                className="mt-1 block w-full rounded-md border-primary-300 dark:border-primary-700 dark:bg-gray-800"
                required
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-primary-600 dark:text-primary-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                {showEditModal ? "Save Changes" : "Add Activity"}
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Activity"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-red-600">
              <ExclamationCircleIcon className="w-6 h-6" />
              <p>Are you sure you want to delete this activity?</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-primary-600 dark:text-primary-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default Activities;
