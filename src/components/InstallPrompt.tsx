import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 left-4 right-4 z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mx-auto max-w-sm border border-primary-100 dark:border-primary-800">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <PlusCircleIcon className="h-8 w-8 text-primary-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-primary-900 dark:text-primary-100">
              Install Together Time
            </h3>
            <p className="text-xs text-primary-500 dark:text-primary-400">
              Add to your home screen for quick access
            </p>
          </div>
          <button
            onClick={handleInstallClick}
            className="flex-shrink-0 bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Install
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InstallPrompt;
