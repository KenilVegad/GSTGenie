import React from 'react';
import { StepProps } from '../../types/FormData';
import { FileText, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const stateSpecificGuidance = {
  profTaxEC: {
    voice: "Enter your Professional Tax Employee Code, if applicable.",
    text: "This is a registration number for professional tax, which is a state-level tax. Enter it if your business is liable to pay professional tax."
  },
  profTaxRC: {
    voice: "Now, enter your Professional Tax Registration Certificate number.",
    text: "This is the registration certificate number for professional tax. Not all states have this tax, so it may not be applicable to you."
  },
  exciseLicense: {
    voice: "If your business deals with goods subject to state excise, please enter your license number.",
    text: "This is required if you are involved in the manufacture or sale of goods like alcohol or other items covered under the State Excise Act."
  },
  exciseLicenseHolder: {
    voice: "Please enter the name of the person in whose name the excise license is held.",
    text: "The name should be exactly as it appears on the state excise license document."
  }
};

const StateSpecificInformationStep: React.FC<StepProps> = ({ onNext, onBack, setActiveField, activeField }) => {
  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, stateSpecificGuidance);
  
  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary">
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <FileText className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">State Specific Information</h2>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="profTaxEC" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Professional Tax E.C. No.
                <button type="button" onClick={(e) => handleButtonClick(e, 'profTaxEC')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="profTaxEC"
              name="profTaxEC"
              onFocus={() => handleFocus('profTaxEC')}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="profTaxRC" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Professional Tax R.C. No.
                <button type="button" onClick={(e) => handleButtonClick(e, 'profTaxRC')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="profTaxRC"
              name="profTaxRC"
              onFocus={() => handleFocus('profTaxRC')}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="exciseLicense" className="block text-sm font-medium text-secondary dark:text-dark-secondary">State Excise License No.
                <button type="button" onClick={(e) => handleButtonClick(e, 'exciseLicense')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="exciseLicense"
              name="exciseLicense"
              onFocus={() => handleFocus('exciseLicense')}
              className={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="exciseLicenseHolder" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Name of person in whose name Excise License is held
                <button type="button" onClick={(e) => handleButtonClick(e, 'exciseLicenseHolder')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="exciseLicenseHolder"
              name="exciseLicenseHolder"
              onFocus={() => handleFocus('exciseLicenseHolder')}
              className={inputStyle}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-2 rounded-lg hover:bg-opacity-80 font-semibold">BACK</button>
        <button onClick={onNext} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">SAVE & CONTINUE</button>
      </div>
    </div>
  );
};

export default StateSpecificInformationStep;
