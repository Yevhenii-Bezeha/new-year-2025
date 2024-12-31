import { useState, useRef } from "react";
import { motion, animate } from "framer-motion";
import useSound from "use-sound";
import type { Activity } from "../../types/activity";
import WheelSegment from "./WheelSegment";
import SpinningParticles from "../effects/SpinningParticles";
import { SOUNDS } from "../../constants/sounds";

interface WheelProps {
  activities: Activity[];
  onSpinEnd: (activity: Activity) => void;
}

const Wheel = ({ activities, onSpinEnd }: WheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [playSpinSound] = useSound(SOUNDS.SPIN, { volume: 0.3 });
  const [playWinSound] = useSound(SOUNDS.WIN, { volume: 0.3 });

  const spinWheel = () => {
    if (isSpinning || activities.length === 0) return;

    setIsSpinning(true);
    playSpinSound();

    const spinDuration = 4;
    const minSpins = 5;
    const maxSpins = 8;
    const spins = Math.floor(Math.random() * (maxSpins - minSpins) + minSpins);
    const selectedIndex = Math.floor(Math.random() * activities.length);
    const segmentAngle = 360 / activities.length;
    const targetRotation =
      spins * 360 + selectedIndex * segmentAngle + Math.random() * segmentAngle;

    animate(rotation, targetRotation, {
      duration: spinDuration,
      ease: [0.2, 0.8, 0.3, 0.99],
      onUpdate: (latest) => setRotation(latest),
      onComplete: () => {
        setIsSpinning(false);
        setTimeout(() => {
          playWinSound();
          onSpinEnd(activities[selectedIndex]);
        }, 300);
      },
    });
  };

  return (
    <div className="relative w-80 h-80 mx-auto">
      <motion.div
        ref={wheelRef}
        className="absolute inset-0"
        style={{ rotate: rotation }}
        transition={{ type: "spring", duration: 4 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-8 border-primary-200 dark:border-primary-700 shadow-lg backdrop-blur-sm overflow-hidden"
          animate={{
            boxShadow: isSpinning
              ? [
                  "0 0 20px rgba(var(--primary-400), 0.3)",
                  "0 0 40px rgba(var(--primary-400), 0.5)",
                  "0 0 20px rgba(var(--primary-400), 0.3)",
                ]
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 1, repeat: isSpinning ? Infinity : 0 }}
        />

        {activities.map((activity, index) => (
          <WheelSegment
            key={activity.id}
            activity={activity}
            angle={(360 / activities.length) * index}
            index={index}
            total={activities.length}
            isSpinning={isSpinning}
          />
        ))}
      </motion.div>

      {/* Pointer */}
      <motion.div
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: isSpinning ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          repeat: isSpinning ? Infinity : 0,
        }}
      >
        <div className="w-4 h-8 bg-primary-600 dark:bg-primary-400 rounded-r-full shadow-md" />
      </motion.div>

      {/* Spin Button */}
      <motion.button
        onClick={spinWheel}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg dark:bg-primary-500 dark:hover:bg-primary-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={
          isSpinning
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, -10, 10, -10, 10, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
          repeat: isSpinning ? Infinity : 0,
        }}
      >
        <span className="text-sm font-medium">
          {isSpinning ? "Spinning!" : "Spin!"}
        </span>
      </motion.button>

      <SpinningParticles isSpinning={isSpinning} />
    </div>
  );
};

export default Wheel;
