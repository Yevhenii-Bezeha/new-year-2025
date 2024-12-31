import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { Activity } from "../../types/activity";
import { CATEGORY_COLORS } from "../../constants/colors";

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const recentActivities = useMemo(() => {
    return activities
      .filter((activity) => activity.lastUsedAt)
      .sort((a, b) => {
        const dateA = parseISO(a.lastUsedAt || "");
        const dateB = parseISO(b.lastUsedAt || "");
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5); // Show last 5 activities
  }, [activities]);

  if (recentActivities.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No recent activities found
      </div>
    );
  }

  const formatDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "EEEE, MMMM d 'at' h:mm a");
  };

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div
          key={`${activity.id}-${activity.lastUsedAt}`}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-primary-100 dark:border-primary-800"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">{activity.emoji}</span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {activity.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    CATEGORY_COLORS[activity.category]
                  }`}
                >
                  {activity.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(activity.lastUsedAt!)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
