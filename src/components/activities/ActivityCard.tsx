import { useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useActivities } from "../../context/ActivityContext";
import type { Activity } from "../../types/activity";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
}

export const ActivityCard = ({ activity, onEdit }: ActivityCardProps) => {
  const { removeActivity } = useActivities();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    await removeActivity(activity.id);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-primary-100 dark:border-primary-800">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-4xl mb-2">{activity.emoji}</span>
            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
              {activity.name}
            </h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(activity)}
              className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              title="Edit activity"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete activity"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">
          {activity.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {activity.moods.map((mood) => (
            <span
              key={mood}
              className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300"
            >
              {mood}
            </span>
          ))}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        activityName={activity.name}
      />
    </>
  );
};
