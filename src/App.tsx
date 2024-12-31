import { useState, useEffect } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Onboarding from "./components/Onboarding";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Activities from "./components/pages/Activities";
import WheelPage from "./components/pages/Wheel";
import Settings from "./components/pages/Settings";
import Calendar from "./components/pages/Calendar";
import type { TabId } from "./types/navigation";
import { ActivityProvider } from "./context/ActivityContext";
import { NavigationProvider } from "./context/NavigationContext";
import { useSettings } from "./context/SettingsContext";

function App() {
  const { settings, updateSettings } = useSettings();
  const [showIntro, setShowIntro] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      checkOnboarding();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const checkOnboarding = () => {
    const MAX_ONBOARDING_SHOWS = 3;
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (settings.onboardingShownCount >= MAX_ONBOARDING_SHOWS) {
      return;
    }

    const lastShown = settings.lastOnboardingDate
      ? new Date(settings.lastOnboardingDate).getTime()
      : 0;
    const timeSinceLastShow = Date.now() - lastShown;

    if (timeSinceLastShow >= ONE_WEEK || !settings.lastOnboardingDate) {
      setShowOnboarding(true);
      updateSettings({
        onboardingShownCount: settings.onboardingShownCount + 1,
        lastOnboardingDate: new Date().toISOString(),
      });
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    updateSettings({ hasCompletedOnboarding: true });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "activities":
        return <Activities />;
      case "wheel":
        return <WheelPage />;
      case "calendar":
        return <Calendar />;
      case "settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <NavigationProvider>
      <ActivityProvider>
        {showIntro && <IntroAnimation />}
        {!showIntro && showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        <div
          className={`min-h-screen transition-colors duration-200 ${
            settings.theme === "dark"
              ? "bg-gradient-to-b from-gray-900 to-gray-800"
              : "bg-gradient-to-b from-primary-50 to-secondary-50"
          } pb-16`}
        >
          {/* Main content */}
          <header className="py-6 px-4">
            <h1 className="text-center text-4xl font-display text-primary-600 dark:text-primary-400">
              Together Time Evening
            </h1>
            <p className="text-center mt-2 text-primary-400 dark:text-primary-500">
              Make every moment count ✨
            </p>
          </header>

          {/* Content area */}
          <main className="max-w-screen-xl mx-auto px-4 mt-8">
            {renderContent()}
          </main>
        </div>
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </ActivityProvider>
    </NavigationProvider>
  );
}

export default App;
