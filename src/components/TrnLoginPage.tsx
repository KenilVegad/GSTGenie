
import React from 'react';
import { ArrowRight, ChevronLeft, LogIn } from 'lucide-react';

interface TrnLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

const TrnLoginPage: React.FC<TrnLoginPageProps> = ({ onLogin, onBack }) => {

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(); 
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        
        <div className="text-center mb-8">
          <LogIn className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Login with TRN</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your TRN to continue your application.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="trn" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Temporary Reference Number (TRN)
            </label>
            <input
              type="text"
              id="trn"
              name="trn"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              placeholder="Enter your TRN"
            />
          </div>

          <div>
             <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Captcha
            </label>
            <div className="flex items-center mt-1">
                <div className="flex-grow bg-gray-200 dark:bg-gray-700 rounded-l-md p-3 text-center font-bold text-lg tracking-widest text-gray-700 dark:text-gray-300 italic">
                    <span>C 8 T 9 Z</span>
                </div>
                <input
                  type="text"
                  id="captcha"
                  name="captcha"
                  required
                  className="w-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  placeholder="Enter Captcha"
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Proceed to Login <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
            <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center w-full">
                <ChevronLeft className="h-4 w-4 mr-1"/> Back
            </button>
        </div>

      </div>
    </div>
  );
};

export default TrnLoginPage;
