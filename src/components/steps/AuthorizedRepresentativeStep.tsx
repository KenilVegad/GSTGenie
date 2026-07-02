
import React from 'react';
import { StepProps } from '../../types/FormData';
import { UserCheck } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';

const representativeGuidance = {
  hasAuthorizedRepresentative: {
    voice: "Do you have an authorized representative, such as a GST practitioner, who will file on your behalf? If so, enable this option.",
    text: "An authorized representative is a person authorized by you to appear on your behalf before the tax authority, like a GST practitioner, lawyer, or CA."
  },
  representativeType: {
    voice: "Please select the type of authorized representative you have appointed.",
    text: "Choose whether your representative is a registered GST Practitioner or another type of professional."
  },
  enrolmentId: {
    voice: "Please enter the Enrolment ID of your GST practitioner or the name of the representative.",
    text: "If you have selected a GST Practitioner, enter their unique Enrolment ID. For other representatives, provide their full name."
  }
};

const AuthorizedRepresentativeStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, setActiveField, activeField }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const inputValue = (type === 'checkbox') 
      ? (e.target as HTMLInputElement).checked 
      : value;
    updateFormData({ [name]: inputValue });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (setActiveField) {
      setActiveField(e.target.name);
    }
  };
  
  const currentGuidance = activeField ? representativeGuidance[activeField as keyof typeof representativeGuidance] : null;

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary" onClick={() => setActiveField && setActiveField(null)}>
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <UserCheck className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Authorized Representative</h2>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="flex items-center justify-between">
          <label htmlFor="hasAuthorizedRepresentative" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Do you have any Authorized Representative?</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="hasAuthorizedRepresentative"
              name="hasAuthorizedRepresentative"
              className="sr-only peer"
              checked={!!formData.hasAuthorizedRepresentative}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border-secondary dark:after:border-dark-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {formData.hasAuthorizedRepresentative && (
        <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="representativeType" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Type of Representative</label>
              <select
                id="representativeType"
                name="representativeType"
                className={inputStyle}
                onChange={handleChange}
                onFocus={handleFocus}
              >
                <option>Select</option>
                <option>GST Practitioner</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="enrolmentId" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Enrolment ID / Name</label>
              <input
                type="text"
                id="enrolmentId"
                name="enrolmentId"
                className={inputStyle}
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-2 rounded-lg hover:bg-opacity-80 font-semibold">BACK</button>
        <button
          onClick={onNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >SAVE & CONTINUE
        </button>
      </div>
    </div>
  );
};

export default AuthorizedRepresentativeStep;
