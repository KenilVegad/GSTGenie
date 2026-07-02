
import React from 'react';
import { CheckCircle } from 'lucide-react';

const complianceDeadlines = [
  'GSTR-1 Filing',
  'GSTR-3B Filing',
  'Income Tax Return',
  'TDS Return',
  'Professional Tax',
  'MCA Filings',
];

const CalendarIntegration: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Automate Your Compliance Calendar</h2>
      <p className="text-center text-gray-400 mb-8">Integrate with your favorite calendar to automatically sync important deadlines.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Included Deadlines</h3>
          <ul className="space-y-3">
            {complianceDeadlines.map((deadline) => (
              <li key={deadline} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-300">{deadline}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg flex flex-col justify-center">
          <h3 className="font-semibold text-lg mb-4">Connect Your Calendar</h3>
          <p className="text-gray-400 mb-6 text-sm">Click below to connect your calendar and we'll automatically create recurring events for all relevant compliance dates.</p>
          <div className="space-y-4">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-3" />
              Connect Google Calendar
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-colors">
              <img src="https://www.microsoft.com/favicon.ico" alt="Outlook" className="h-5 w-5 mr-3" />
              Connect Outlook Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-xs">By connecting your calendar, you agree to allow us to create and manage compliance-related events. <br />You can revoke access at any time from your calendar settings.</p>
      </div>
    </div>
  );
};

export default CalendarIntegration;
