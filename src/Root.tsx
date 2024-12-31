import { SettingsProvider } from "./context/SettingsContext";
import App from "./App";

const Root = () => {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
};

export default Root;
