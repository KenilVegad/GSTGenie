
import React, { useState } from 'react';
import ProcessFlow from './ProcessFlow';
import UserSummary from './UserSummary';

interface GstnAndArnProps {
  formData: any;
}

const GstnAndArn: React.FC<GstnAndArnProps> = ({ formData }) => {
  const [arn, setArn] = useState('ARN1234567890'); // Example ARN
  const [showStatus, setShowStatus] = useState(false);

  const handleTrackStatus = () => {
    setShowStatus(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      {!showStatus ? (
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Application Submitted Successfully!</h2>
          <p className="mt-2 text-gray-600">Your Application Reference Number (ARN) has been generated. Please save it for future reference.</p>
        

        <div className="mt-6 bg-gray-50 p-4 rounded-md text-center">
          <p className="text-sm text-gray-500">Your ARN is</p>
          <p className="text-xl font-semibold text-gray-900">{arn}</p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">You can track the status of your application using your ARN.</p>
          <button 
            onClick={handleTrackStatus}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Track Application Status
          </button>
        </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProcessFlow />
          <UserSummary formData={formData} />
        </div>
      )}
    </div>
  );
};

export default GstnAndArn;
