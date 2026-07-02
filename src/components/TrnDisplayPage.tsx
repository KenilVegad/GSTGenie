
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface TrnDisplayPageProps {
  onContinue: () => void;
  trn: string;
}

const TrnDisplayPage: React.FC<TrnDisplayPageProps> = ({ onContinue, trn }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 dark:text-green-400" />
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">Verification Successful!</h1>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2">Your Temporary Reference Number (TRN) has been generated.</p>
        
        <div className="my-8 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your TRN is:</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">{trn}</p>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">Please save this TRN for future reference. You can use it to log in and continue your application later.</p>
        
        <div className="mt-8">
          <button
            onClick={onContinue}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue to Registration <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrnDisplayPage;
