import React, { useState, useEffect } from 'react';
import { Info, Volume2, Pause } from 'lucide-react';

export const speech = {
  utterance: null as SpeechSynthesisUtterance | null,
  eventTarget: null as EventTarget | null,
  isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
  voices: [] as SpeechSynthesisVoice[],
  
  init() {
    if (!this.isSupported || !window.speechSynthesis) {
        console.warn("Speech synthesis is not supported.");
        return;
    }
    
    this.utterance = new SpeechSynthesisUtterance();
    this.eventTarget = new EventTarget();

    this.utterance.onstart = () => this.eventTarget?.dispatchEvent(new CustomEvent('statechange', { detail: { isPlaying: true } }));
    this.utterance.onend = () => this.eventTarget?.dispatchEvent(new CustomEvent('statechange', { detail: { isPlaying: false } }));
    this.utterance.onerror = (e) => {
        if (e.error === 'interrupted') {
            return;
        }
        console.error("Speech synthesis error:", e);
        this.eventTarget?.dispatchEvent(new CustomEvent('statechange', { detail: { isPlaying: false } }));
    };

    const loadVoices = () => {
      this.voices = window.speechSynthesis.getVoices();
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  },

  speak(text: string) {
    if (!this.isSupported || !this.utterance || !window.speechSynthesis) return;
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    this.utterance.text = text;
    if (this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices();
    }

    const femaleVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && 
      (
        voice.name.includes('Female') || 
        voice.name.includes('Zira') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google US English')
      )
    );
    
    this.utterance.voice = femaleVoice || this.voices.find(voice => voice.lang.startsWith('en')) || null;
    this.utterance.volume = 1;
    this.utterance.rate = 1;
    this.utterance.pitch = 1;

    window.speechSynthesis.speak(this.utterance);
  }
};

if (typeof window !== 'undefined') {
    speech.init();
}

interface AIPoweredGuidanceProps {
  show: boolean;
  guidance: {
    voice: string;
    text: string;
  } | null;
}

const AIPoweredGuidance: React.FC<AIPoweredGuidanceProps> = ({ show, guidance }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleStateChange = (event: Event) => {
      setIsPlaying((event as CustomEvent).detail.isPlaying);
    };

    speech.eventTarget?.addEventListener('statechange', handleStateChange);

    return () => {
      speech.eventTarget?.removeEventListener('statechange', handleStateChange);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!show && isPlaying) {
      window.speechSynthesis.cancel();
    }
  }, [show, isPlaying]);

  const handlePlaySound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (guidance?.voice) {
      speech.speak(guidance.voice);
    }
  };
  
  if (!speech.isSupported) return null;

  return (
    <div 
        className={`fixed top-20 right-8 w-80 z-50 transition-all duration-300 ease-in-out ${show && guidance ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
    >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <p className="text-sm text-slate-700 dark:text-slate-200">
                            {guidance?.text}
                        </p>
                    </div>
                    {guidance?.voice && (
                        <div className="ml-4 flex-shrink-0 flex items-center">
                            <button 
                            onClick={handlePlaySound} 
                            className={`relative text-white rounded-full w-7 h-7 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 ${
                                isPlaying ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                            }`}
                            aria-label={isPlaying ? "Stop guidance audio" : "Play guidance audio"}
                            >
                            {isPlaying ? <Pause size={14} /> : <Volume2 size={14} />}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AIPoweredGuidance;
