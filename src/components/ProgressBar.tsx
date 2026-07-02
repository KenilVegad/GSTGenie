import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-gray-700">{percentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
