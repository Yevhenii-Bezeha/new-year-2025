import { motion } from "framer-motion";

const IntroAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-primary-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 2 }}
      onAnimationComplete={() => {
        document.body.style.overflow = "auto";
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1.5,
        }}
        className="text-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-display text-primary-600"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Together Time Evening
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-primary-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Let's make every moment special ✨
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default IntroAnimation;
