import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useActivities } from "../../context/ActivityContext";
import { useSettings } from "../../context/SettingsContext";
import { useGameSounds } from "../../hooks/useGameSounds";
import Wheel from "./Wheel";
import Confetti from "../ui/Confetti";
import ResultReveal from "./ResultReveal";
import { storage } from "../../utils/storage";

const WheelGame = () => {
  const { activities } = useActivities();
  const { settings } = useSettings();
  const { playClick } = useGameSounds();
  const [selectedActivities, setSelectedActivities] = useState(
    activities.slice(0, 6)
  );
  const [gameState, setGameState] = useState<
    "selecting" | "spinning" | "result"
  >("selecting");
  const [result, setResult] = useState<(typeof activities)[0] | null>(null);
  const [showMinimumWarning, setShowMinimumWarning] = useState(false);

  useEffect(() => {
    // Load selected activities from storage
    const savedIds = storage.getSelectedActivities();
    if (savedIds.length > 0) {
      const saved = activities.filter((a) => savedIds.includes(a.id));
      setSelectedActivities(saved);
    }
  }, [activities]);

  useEffect(() => {
    // Save selected activities to storage
    storage.setSelectedActivities(selectedActivities.map((a) => a.id));
  }, [selectedActivities]);

  const handleSpin = (activity: (typeof activities)[0]) => {
    setGameState("result");
    setResult(activity);
    storage.addSpinHistory(activity.id);
  };

  const handleReset = () => {
    setGameState("selecting");
    setResult(null);
  };

  const toggleActivity = (activity: (typeof activities)[0]) => {
    if (gameState !== "selecting") return;
    playClick();

    setSelectedActivities((prev) => {
      if (prev.find((a) => a.id === activity.id)) {
        const newSelection = prev.filter((a) => a.id !== activity.id);
        if (newSelection.length < 2) {
          setShowMinimumWarning(true);
          setTimeout(() => setShowMinimumWarning(false), 2000);
        }
        return newSelection;
      }
      if (prev.length >= 8) return prev;
      return [...prev, activity];
    });
  };

  return (
    <div className="space-y-8">
      {/* Activity Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
            Select Activities (max 8)
          </h3>
          <span className="text-sm text-primary-500 dark:text-primary-400">
            {selectedActivities.length}/8 selected
          </span>
        </div>
        <motion.div className="grid grid-cols-2 gap-2 md:grid-cols-4" layout>
          {activities.map((activity) => (
            <motion.button
              key={activity.id}
              onClick={() => toggleActivity(activity)}
              disabled={
                gameState !== "selecting" ||
                (selectedActivities.length >= 8 &&
                  !selectedActivities.find((a) => a.id === activity.id))
              }
              className={`p-3 rounded-lg border transition-colors relative ${
                selectedActivities.find((a) => a.id === activity.id)
                  ? "bg-primary-100 border-primary-300 dark:bg-primary-800 dark:border-primary-600"
                  : "bg-white border-primary-100 dark:bg-gray-800 dark:border-primary-800"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              <span className="text-2xl">{activity.emoji}</span>
              <p className="text-sm text-primary-700 dark:text-primary-300">
                {activity.name}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {showMinimumWarning && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-red-500 text-center"
          >
            Please select at least 2 activities
          </motion.p>
        )}
      </div>

      {/* Wheel Section */}
      {selectedActivities.length >= 2 && (
        <div className="text-center space-y-6">
          {gameState === "selecting" && (
            <motion.button
              onClick={() => setGameState("spinning")}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Spinning!
            </motion.button>
          )}
          {gameState === "spinning" && (
            <Wheel activities={selectedActivities} onSpinEnd={handleSpin} />
          )}
          {gameState === "result" && (
            <ResultReveal activity={result} onReset={handleReset} />
          )}
        </div>
      )}

      {settings.showConfetti && gameState === "result" && <Confetti />}
    </div>
  );
};

export default WheelGame;
