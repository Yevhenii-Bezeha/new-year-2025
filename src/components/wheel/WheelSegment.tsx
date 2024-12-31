import { motion } from "framer-motion";
import type { Activity } from "../../types/activity";

const SEGMENT_COLORS = [
  "from-blue-500/20 to-blue-600/20",
  "from-green-500/20 to-green-600/20",
  "from-purple-500/20 to-purple-600/20",
  "from-pink-500/20 to-pink-600/20",
  "from-yellow-500/20 to-yellow-600/20",
  "from-indigo-500/20 to-indigo-600/20",
  "from-red-500/20 to-red-600/20",
  "from-teal-500/20 to-teal-600/20",
];

interface WheelSegmentProps {
  activity: Activity;
  angle: number;
  index: number;
  total: number;
  isSpinning: boolean;
}

const WheelSegment = ({
  activity,
  angle,
  index,
  total,
  isSpinning,
}: WheelSegmentProps) => {
  return (
    <motion.div
      className="absolute w-full h-full origin-center"
      style={{ transform: `rotate(${angle}deg)` }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className={`absolute left-1/2 w-1/2 h-full origin-left flex items-center justify-center bg-gradient-to-r ${
          SEGMENT_COLORS[index % SEGMENT_COLORS.length]
        } dark:opacity-80`}
        style={{ transform: `rotate(${180 / total}deg)` }}
      >
        <motion.div
          className="text-2xl -rotate-90 bg-white/50 dark:bg-gray-800/50 p-2 rounded-full"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={
            isSpinning
              ? {
                  scale: [1, 1.1, 1],
                  rotate: [-90, -85, -95, -90],
                }
              : {}
          }
          transition={{
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
            type: "spring",
            stiffness: 400,
            damping: 17,
          }}
        >
          {activity.emoji}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WheelSegment;
