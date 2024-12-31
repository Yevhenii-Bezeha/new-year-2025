import { motion, AnimatePresence } from "framer-motion";
import type { Activity } from "../../types/activity";

interface ResultRevealProps {
  activity: Activity | null;
  onReset: () => void;
}

const ResultReveal = ({ activity, onReset }: ResultRevealProps) => {
  if (!activity) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="space-y-4"
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-primary-100 dark:border-primary-800"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <motion.div
            className="text-4xl mb-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {activity.emoji}
          </motion.div>
          <motion.h3
            className="text-xl font-medium text-primary-800 dark:text-primary-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            {activity.name}
          </motion.h3>
          <motion.p
            className="text-primary-600 dark:text-primary-400 mt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            {activity.description}
          </motion.p>
        </motion.div>
        <motion.button
          onClick={onReset}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResultReveal;
