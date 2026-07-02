import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Government of India. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          <p>This website is designed, developed and hosted by National Informatics Centre, Ministry of Electronics & Information Technology, Government of India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
