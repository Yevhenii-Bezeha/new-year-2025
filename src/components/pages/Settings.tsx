import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import {
  MoonIcon,
  SunIcon,
  SpeakerWaveIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useSettings } from "../../context/SettingsContext";
import { useGameSounds } from "../../hooks/useGameSounds";
import PageTransition from "../ui/PageTransition";

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const { playClick } = useGameSounds();

  const handleToggle = (key: keyof typeof settings) => {
    playClick();
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <h2 className="text-2xl font-display text-primary-800 dark:text-primary-200">
          Settings
        </h2>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {settings.theme === "dark" ? (
                    <MoonIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  ) : (
                    <SunIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  )}
                  <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
                    Dark Mode
                  </h3>
                </div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                checked={settings.theme === "dark"}
                onChange={() =>
                  updateSettings({
                    theme: settings.theme === "dark" ? "light" : "dark",
                  })
                }
                className={`${
                  settings.theme === "dark"
                    ? "bg-primary-600"
                    : "bg-primary-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <motion.span
                  layout
                  className={`${
                    settings.theme === "dark"
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <SpeakerWaveIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
                    Sound Effects
                  </h3>
                </div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Enable or disable game sounds
                </p>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onChange={() => handleToggle("soundEnabled")}
                className={`${
                  settings.soundEnabled ? "bg-primary-600" : "bg-primary-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <motion.span
                  layout
                  className={`${
                    settings.soundEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Confetti Toggle */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-primary-100 dark:border-primary-800">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
                    Celebration Effects
                  </h3>
                </div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Show confetti on activity selection
                </p>
              </div>
              <Switch
                checked={settings.showConfetti}
                onChange={() => handleToggle("showConfetti")}
                className={`${
                  settings.showConfetti ? "bg-primary-600" : "bg-primary-200"
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
              >
                <motion.span
                  layout
                  className={`${
                    settings.showConfetti ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
