import { useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  ListBulletIcon,
  ArrowPathIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import type { TabId } from "../types/navigation";

interface IconProps {
  className?: string;
}

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: {
  id: TabId;
  label: string;
  icon: React.ComponentType<IconProps>;
}[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "activities", label: "Activities", icon: ListBulletIcon },
  { id: "wheel", label: "Wheel", icon: ArrowPathIcon },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
  { id: "settings", label: "Settings", icon: Cog6ToothIcon },
];

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-primary-100 dark:border-primary-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {tabs.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-full ${
                activeTab === item.id
                  ? "text-primary-600"
                  : "text-primary-400 hover:text-primary-500"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-100 rounded-lg"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative">
                <item.icon className="w-6 h-6" />
              </span>
              <span className="relative text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
