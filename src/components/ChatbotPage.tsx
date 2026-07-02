import React from 'react';

interface ChatbotPageProps {
  onClose: () => void;
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col z-50">
      <div className="w-full flex justify-end p-4">
        <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <iframe
          src="https://agent.jotform.com/01994edff66f7dd784cd68a4ba9eecf5bf09"
          className="w-full h-full border-none"
          title="Chatbot for Startup Queries"
        ></iframe>
      </div>
    </div>
  );
};

export default ChatbotPage;
