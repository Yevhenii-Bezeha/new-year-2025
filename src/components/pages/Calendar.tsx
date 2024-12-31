import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useActivities } from "../../context/ActivityContext";
import { useGameSounds } from "../../hooks/useGameSounds";
import PageTransition from "../ui/PageTransition";
import Modal from "../ui/Modal";
import { storage } from "../../utils/storage";
import type { Activity } from "../../types/activity";

interface ScheduledActivity {
  date: Date;
  activity: Activity;
}

const Calendar = () => {
  const { activities } = useActivities();
  const { playClick, playSelect } = useGameSounds();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledActivities, setScheduledActivities] = useState<
    ScheduledActivity[]
  >([]);
  const [editingActivity, setEditingActivity] =
    useState<ScheduledActivity | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadScheduledActivities(currentDate);
  }, [currentDate, activities]);

  const loadScheduledActivities = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const savedActivities = storage.getScheduledActivities();
    const scheduled: ScheduledActivity[] = [];

    // Get all Fridays in the month
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 5) {
        const activityDate = new Date(d);
        activityDate.setHours(19, 0, 0, 0);

        // Check if we have a saved activity for this date
        const savedActivity = savedActivities.find(
          (sa) =>
            new Date(sa.date).toDateString() === activityDate.toDateString()
        );

        let activity;
        if (savedActivity) {
          activity = activities.find((a) => a.id === savedActivity.activityId);
        }

        if (!activity) {
          // If no saved activity or activity not found, select random
          activity = activities[Math.floor(Math.random() * activities.length)];
        }

        scheduled.push({
          date: activityDate,
          activity,
        });
      }
    }

    setScheduledActivities(scheduled);
  };

  const handleEditActivity = (scheduled: ScheduledActivity) => {
    setEditingActivity(scheduled);
    setShowEditModal(true);
  };

  const handleActivityChange = (newActivityId: string) => {
    if (!editingActivity) return;

    const newActivity = activities.find((a) => a.id === newActivityId);
    if (!newActivity) return;

    // Update in storage
    storage.updateScheduledActivity(
      editingActivity.date.toISOString(),
      newActivityId
    );

    // Update in state
    setScheduledActivities((prev) =>
      prev.map((sa) =>
        sa.date.toDateString() === editingActivity.date.toDateString()
          ? { ...sa, activity: newActivity }
          : sa
      )
    );

    playSelect();
    setShowEditModal(false);
    setEditingActivity(null);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const changeMonth = (increment: number) => {
    playClick();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startingDay }, (_, i) => i);

  const getScheduledActivity = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return scheduledActivities.find(
      (sa) => sa.date.toDateString() === date.toDateString()
    );
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display text-primary-800 dark:text-primary-200">
            Activity Calendar
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium text-primary-700 dark:text-primary-300">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-primary-100 dark:border-primary-800 overflow-hidden">
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-center border-b border-primary-100 dark:border-primary-800">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-sm font-medium text-primary-600 dark:text-primary-400"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {blanks.map((blank) => (
              <div
                key={`blank-${blank}`}
                className="aspect-square border-b border-r border-primary-100 dark:border-primary-800"
              />
            ))}
            {days.map((day) => {
              const scheduledActivity = getScheduledActivity(day);
              return (
                <motion.div
                  key={day}
                  className={`aspect-square border-b border-r border-primary-100 dark:border-primary-800 p-1 relative ${
                    scheduledActivity
                      ? "bg-primary-50 dark:bg-primary-900/30"
                      : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm text-primary-700 dark:text-primary-300">
                    {day}
                  </div>
                  {scheduledActivity && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="text-2xl">
                        {scheduledActivity.activity.emoji}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Activities List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
            Scheduled Activities
          </h3>
          <div className="space-y-2">
            {scheduledActivities.map((scheduled, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-primary-100 dark:border-primary-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CalendarIcon className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="text-sm text-primary-600 dark:text-primary-400">
                        {scheduled.date.toLocaleDateString("default", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl">
                          {scheduled.activity.emoji}
                        </span>
                        <span className="text-primary-800 dark:text-primary-200">
                          {scheduled.activity.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditActivity(scheduled)}
                    className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edit Activity Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Change Activity"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => handleActivityChange(activity.id)}
                  className={`p-3 rounded-lg border ${
                    editingActivity?.activity.id === activity.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30"
                      : "border-primary-100 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/30"
                  }`}
                >
                  <div className="text-2xl mb-1">{activity.emoji}</div>
                  <div className="text-sm text-primary-800 dark:text-primary-200">
                    {activity.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </PageTransition>
  );
};

export default Calendar;
