
import React from 'react';

interface AIGuidanceProps {
  tip: {
    title: string;
    points: string[];
  } | null;
}

const AIGuidance: React.FC<AIGuidanceProps> = ({ tip }) => {
  const handleChatClick = () => {
    // In a real application, this would open a chat window.
    alert('Opening AI chat...');
  };

  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md h-full flex flex-col">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          {tip ? tip.title : 'AI Guidance'}
        </h3>
        {tip ? (
          <ul className="space-y-3">
            {tip.points.map((point, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 mr-3 mt-1 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <p className="text-gray-700">{point}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Click on any field to get helpful tips and suggestions.</p>
        )}
      </div>

      <div className="mt-auto pt-6">
        <div className="border-t border-gray-300 mb-4"></div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h4>
        <p className="text-gray-600 mb-4">Can't find what you're looking for? Our AI assistant can help.</p>
        <button 
          onClick={handleChatClick}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Chat with our AI
        </button>
      </div>
    </div>
  );
};

export default AIGuidance;
