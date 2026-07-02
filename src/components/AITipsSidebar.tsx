import { useState, useEffect } from 'react';
import { MessageSquare, Zap } from 'lucide-react';
import { aiTips } from '../data/aiTips';

interface AITipsSidebarProps {
  onChatClick: () => void;
  activeField: string | null;
  currentStep: number;
}

const AITipsSidebar = ({ onChatClick, activeField, currentStep }: AITipsSidebarProps) => {
  const [tip, setTip] = useState('');

  const stepTipMap: { [key: number]: keyof typeof aiTips } = {
    0: 'businessDetails',
    1: 'promoterDetails',
    2: 'authorizedSignatory',
    3: 'authorizedRepresentative',
    4: 'principalPlace',
    5: 'additionalPlace',
    6: 'goodsAndServices',
    7: 'stateSpecificInformation',
    8: 'aadhaarAuth', // Corresponds to AadhaarAuthStep
    9: 'verification' // Corresponds to VerificationSubmitStep
  };

  useEffect(() => {
    const stepKey = stepTipMap[currentStep];
    if (stepKey) {
      const tipsForStep = aiTips[stepKey as keyof typeof aiTips];
      
      if (tipsForStep) {
        if (activeField && activeField in tipsForStep) {
          // @ts-ignore
          setTip(tipsForStep[activeField]);
        } else {
          // Fallback to the first tip for the current step if no field is active
          const firstTipKey = Object.keys(tipsForStep)[0];
           // @ts-ignore
          setTip(tipsForStep[firstTipKey] || 'Select a field to see AI-powered tips.');
        }
      } else {
        setTip('No tips available for this step.');
      }
    } else {
      setTip('No tips available for this step.');
    }
  }, [activeField, currentStep]);

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          AI-Powered Guidance
        </h3>
        <div className="bg-blue-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-inner min-h-[100px]">
          <p className="text-sm text-gray-800 dark:text-gray-200 transition-opacity duration-300">
            {tip}
          </p>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Can't find what you're looking for?</p>
        <button
          onClick={onChatClick}
          className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors font-semibold"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Ask Our AI Assistant
        </button>
      </div>
    </div>
  );
};

export default AITipsSidebar;
