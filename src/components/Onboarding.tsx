import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../context/SettingsContext";
import { useGameSounds } from "../hooks/useGameSounds";

const steps = [
  {
    title: "Welcome to Together Time Quest! 🎉",
    description: "Let's make choosing activities fun and exciting together.",
    image: "🎯",
  },
  {
    title: "Spin the Wheel 🎡",
    description:
      "Add your favorite activities and let the wheel decide what to do next!",
    image: "🎲",
  },
  {
    title: "Customize Activities 📝",
    description:
      "Create and manage your own list of activities to keep things fresh.",
    image: "✨",
  },
];

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { playSelect } = useGameSounds();
  const { updateSettings } = useSettings();

  const handleNext = () => {
    playSelect();
    if (currentStep === steps.length - 1) {
      updateSettings({ hasCompletedOnboarding: true });
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-md mx-auto px-4 text-center space-y-8"
        >
          <motion.div
            className="text-8xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            {steps[currentStep].image}
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-2xl font-display text-primary-800 dark:text-primary-200">
              {steps[currentStep].title}
            </h2>
            <p className="text-primary-600 dark:text-primary-400">
              {steps[currentStep].description}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? "bg-primary-600 dark:bg-primary-400"
                      : "bg-primary-200 dark:bg-primary-800"
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
