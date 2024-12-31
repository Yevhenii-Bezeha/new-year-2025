import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useActivities } from "../../context/ActivityContext";
import { useGameSounds } from "../../hooks/useGameSounds";
import { useNavigation } from "../../hooks/useNavigation";
import PageTransition from "../ui/PageTransition";

const Home = () => {
  const { activities } = useActivities();
  const { playSelect, playHover } = useGameSounds();
  const { setActiveTab } = useNavigation();

  const handleSpinWheel = () => {
    playSelect();
    setActiveTab("wheel");
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-display text-primary-800 dark:text-primary-200">
            Welcome Back! 🎉
          </h1>
          <p className="text-primary-600 dark:text-primary-400">
            Ready for your next adventure together?
          </p>
        </div>

        <motion.button
          onClick={handleSpinWheel}
          onHoverStart={() => playHover()}
          className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl border border-primary-100 dark:border-primary-800 text-left space-y-4 hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowPathIcon className="w-8 h-8 text-primary-500" />
          <div>
            <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
              Spin the Wheel
            </h3>
            <p className="text-primary-600 dark:text-primary-400">
              Let the wheel decide your next activity!
            </p>
          </div>
        </motion.button>

        {/* Recent Activities */}
        <section className="space-y-4">
          <h2 className="text-xl font-medium text-primary-800 dark:text-primary-200">
            Recent Activities
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-primary-100 dark:border-primary-800">
            <div className="space-y-2">
              {activities.slice(0, 3).map((activity) => (
                <motion.div
                  key={activity.id}
                  className="flex items-center space-x-3 p-2 hover:bg-primary-50 dark:hover:bg-primary-900 rounded-lg"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl">{activity.emoji}</span>
                  <span className="text-primary-700 dark:text-primary-300">
                    {activity.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
