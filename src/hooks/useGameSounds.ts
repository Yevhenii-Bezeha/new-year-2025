import useSound from "use-sound";
import { SOUNDS } from "../constants/sounds";
import { useSettings } from "../context/SettingsContext";

export const useGameSounds = () => {
  const { settings } = useSettings();
  const volume = settings.soundEnabled ? 0.5 : 0;

  const [playClick] = useSound(SOUNDS.CLICK, { volume: volume * 0.5 });
  const [playHover] = useSound(SOUNDS.HOVER, { volume: volume * 0.3 });
  const [playSelect] = useSound(SOUNDS.SELECT, { volume });
  const [playStart] = useSound(SOUNDS.START, { volume });
  const [playWin] = useSound(SOUNDS.WIN, { volume });
  const [playSpin] = useSound(SOUNDS.SPIN, { volume });

  return {
    playClick,
    playHover,
    playSelect,
    playStart,
    playWin,
    playSpin,
  };
};
