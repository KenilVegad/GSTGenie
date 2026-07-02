import { speech } from '../components/AIPoweredGuidance';

export const useAIGuidance = (
  activeField: string | null | undefined,
  setActiveField: (field: string | null) => void,
  guidance: Record<string, { voice: string; text: string }>
) => {
  const handleFocus = (field: string) => {
    setActiveField(field);
    if (guidance[field]?.voice) {
      speech.speak(guidance[field].voice);
    }
  };

  const currentGuidance = activeField ? guidance[activeField] : null;

  return {
    handleFocus,
    currentGuidance,
  };
};
