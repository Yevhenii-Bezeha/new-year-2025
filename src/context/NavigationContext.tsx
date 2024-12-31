import { createContext, useState } from "react";
import type { TabId } from "../types/navigation";

interface NavigationContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};
