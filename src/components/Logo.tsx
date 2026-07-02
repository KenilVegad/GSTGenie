import React from 'react';

const Logo: React.FC = () => {
  return (
    <img
      src="/logo.png"
      alt="GSTGenie Logo"
      width="55"
      height="55"
      className="text-blue-600 dark:text-blue-500 rounded-full"
    />
  );
};

export default Logo;