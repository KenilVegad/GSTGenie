
import React from 'react';
import { User, Users, Briefcase } from 'lucide-react';

interface UserSummaryProps {
  formData: any;
}

const UserSummary: React.FC<UserSummaryProps> = ({ formData }) => {
  const { legalName, tradeName } = formData.businessDetails || {};
  const promoters = formData.promoters || [];
  const authorizedSignatory = formData.authorizedSignatory || {};

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Briefcase className="mr-3 text-blue-500" />
        Application Snapshot
      </h3>
      <div className="space-y-6">
        
        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Business Details</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
            <p><strong className="font-medium text-gray-800 dark:text-gray-200">Legal Name:</strong> {legalName}</p>
            <p><strong className="font-medium text-gray-800 dark:text-gray-200">Trade Name:</strong> {tradeName}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Promoters / Partners
          </h4>
          <ul className="list-disc list-inside ml-4 text-gray-600 dark:text-gray-400 space-y-1">
            {promoters.map((promoter: any, index: number) => (
              <li key={index} className="text-sm">{promoter.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Authorized Signatory
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">{authorizedSignatory.name}</p>
        </div>

      </div>
    </div>
  );
};

export default UserSummary;
