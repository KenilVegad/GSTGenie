
import { Check, Loader, Clock, Award } from 'lucide-react';

const ProcessFlow = () => {
  const steps = [
    { name: 'Application Submitted', status: 'completed', icon: <Check size={20}/>, color: 'green' },
    { name: 'Verification', status: 'completed', icon: <Check size={20}/>, color: 'green' },
    { name: 'Processing', status: 'inprogress', icon: <Loader size={20} className="animate-spin"/>, color: 'blue' },
    { name: 'GSTIN Allotted', status: 'pending', icon: <Clock size={20}/>, color: 'gray' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-100 dark:bg-green-900/50',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-300 dark:border-green-700'
        };
      case 'blue':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/50',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-300 dark:border-blue-700'
        };
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-700',
          text: 'text-gray-500 dark:text-gray-400',
          border: 'border-gray-300 dark:border-gray-600'
        };
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Registration Journey</h3>
      <div className="relative">
        {/* The connecting line */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
        
        <ul className="space-y-6">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            return (
              <li key={index} className="relative flex items-start">
                <div className="flex-shrink-0">
                  <span className={`flex items-center justify-center h-10 w-10 rounded-full ${colors.bg} ${colors.text} border-2 ${colors.border}`}>
                    {step.icon}
                  </span>
                </div>
                <div className="ml-4">
                  <p className={`font-semibold text-gray-800 dark:text-gray-100`}>{step.name}</p>
                  <p className={`text-sm ${colors.text.replace('600', '500')}`}>
                    {step.status === 'completed' ? 'Completed' : step.status === 'inprogress' ? 'In Progress' : 'Pending'}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProcessFlow;
