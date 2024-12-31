import { motion } from "framer-motion";

interface SpinningParticlesProps {
  isSpinning: boolean;
}

const SpinningParticles = ({ isSpinning }: SpinningParticlesProps) => {
  const particles = Array.from({ length: 20 });

  if (!isSpinning) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-400 rounded-full"
          initial={{
            x: "50%",
            y: "50%",
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: ["50%", `${Math.random() * 100}%`],
            y: ["50%", `${Math.random() * 100}%`],
            scale: [0, 1, 0],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default SpinningParticles;
