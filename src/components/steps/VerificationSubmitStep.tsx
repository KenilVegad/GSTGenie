
import React, { useState, useEffect } from 'react';
import GstnAndArn from '../GstnAndArn';
import { ChevronRight, Lock, Mail, ArrowLeft, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance'; // Import the component
import { useAIGuidance } from '../../hooks/useAIGuidance';

// --- Guidance Data ---
const verificationGuidance = {
  affirmation: {
    voice: "Please check this box to declare that all information you\'ve provided is true and correct.",
    text: "By checking this box, you are making a legal declaration that all the information you have provided is true and correct to the best of your knowledge."
  },
  authSignatory: {
    voice: "Now, please select the person who is legally authorized to sign on behalf of the business.",
    text: "Select the name of the person who is legally authorized to sign on behalf of the business. This is usually a director, partner, or proprietor."
  },
  place: {
    voice: "Finally, enter the city or town where you are signing this declaration.",
    text: "Enter the city or town where you are signing this declaration. This is typically the location of your principal place of business."
  },
  submit_dsc: {
    voice: "You can submit using a Digital Signature Certificate, if you have one.",
    text: "Choose this option to sign and submit the application using your DSC. The certificate must be registered on the GST portal."
  },
  submit_evc: {
    voice: "Or, you can submit using an Electronic Verification Code sent to your mobile.",
    text: "Choose this option to receive a one-time password (OTP) on your registered mobile and email. This is the most common method."
  }
};


interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  activeField: string | null;
  setActiveField: (field: string | null) => void;
}

const VerificationSubmitStep: React.FC<StepProps> = ({
  formData,
  onBack,
  activeField,
  setActiveField,
}) => {
  const [affirmed, setAffirmed] = useState(false);
  const [authSignatory, setAuthSignatory] = useState('');
  const [place, setPlace] = useState('');
  const [designation, setDesignation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signatories, setSignatories] = useState<string[]>([]);

  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, verificationGuidance);

  useEffect(() => {
    const promoterNames = formData.promoters?.map((p: any) => p.name) || [];
    const authorizedSignatoryName = formData.authorizedSignatory?.name ? [formData.authorizedSignatory.name] : [];
    const allSignatories = [...new Set([...promoterNames, ...authorizedSignatoryName])];
    
    const primaryPromoter = formData.promoters?.find((p: any) => p.isPrimary);
    if (primaryPromoter) {
      setAuthSignatory(primaryPromoter.name);
    } else if (formData.authorizedSignatory?.name) {
      setAuthSignatory(formData.authorizedSignatory.name);
    }

    setSignatories(allSignatories);
  }, [formData]);

  const handleSubmit = (method: 'DSC' | 'EVC') => {
    if (!isFormValid) return;
    console.log(`Submitting with ${method}`);
    setIsSubmitted(true);
  };

  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  const isFormValid = affirmed && authSignatory && place && designation;

  if (isSubmitted) {
    return <GstnAndArn formData={formData} />;
  }

  return (
    <div className="space-y-8 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary" onClick={() => setActiveField(null)}>
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <h2 className="text-3xl font-bold text-secondary dark:text-dark-secondary">Application Verification</h2>
      
      <div 
        className="p-6 bg-primary dark:bg-dark-primary rounded-lg shadow-md border border-secondary dark:border-dark-secondary relative"
        onFocus={() => handleFocus('affirmation')}
      >
        <div className="flex items-start">
          <input 
            type="checkbox" 
            id="affirmation"
            checked={affirmed} 
            onChange={() => setAffirmed(!affirmed)} 
            className="h-5 w-5 text-indigo-600 border-secondary dark:border-dark-secondary rounded mt-1 focus:ring-indigo-500 bg-primary dark:bg-dark-primary"
          />
          <label htmlFor="affirmation" className="ml-3 block text-secondary dark:text-dark-secondary">
            I/We hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my/our knowledge and belief and nothing has been concealed therefrom.
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label htmlFor="authSignatory" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">
            Name of Authorized Signatory <span className="text-red-500">*</span>
             <button type="button" onClick={(e) => handleButtonClick(e, 'authSignatory')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </label>
          <select 
            id="authSignatory" 
            value={authSignatory} 
            onChange={(e) => setAuthSignatory(e.target.value)} 
            onFocus={() => handleFocus('authSignatory')}
            className="w-full p-3 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
          >
            <option value="">Select Signatory</option>
            <option value="Primary Promoter">Primary Promoter</option>
            {signatories.map(name => (
                <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label htmlFor="place" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">
            Place <span className="text-red-500">*</span>
             <button type="button" onClick={(e) => handleButtonClick(e, 'place')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </label>
          <input 
            type="text" 
            id="place" 
            value={place} 
            onChange={(e) => setPlace(e.target.value)} 
            onFocus={() => handleFocus('place')}
            className="w-full p-3 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
            placeholder="Enter city/town"
          />
        </div>
        <div
          onFocus={() => handleFocus('designation')}
        >
          <label htmlFor="designation" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">
            Designation / Status <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="designation" 
            value={designation} 
            onChange={(e) => setDesignation(e.target.value)} 
            className="w-full p-3 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
            placeholder="e.g., Director, Partner"
          />
        </div>
        <div
          onFocus={() => handleFocus('date')}
        >
          <label htmlFor="date" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full p-3 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
          />
        </div>
      </div>

      <div className={`p-4 rounded-lg text-center transition-opacity duration-300 ${isFormValid ? 'opacity-0 h-0 p-0' : 'opacity-100 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'}`}>
        <p>Please fill all mandatory fields and affirm the declaration to proceed.</p>
      </div>

      <div className="space-y-4 pt-4 border-t border-secondary dark:border-dark-secondary">
        <h3 className="text-xl font-semibold text-center text-secondary dark:text-dark-secondary">Choose Your Submission Method</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); handleSubmit('DSC'); }} 
              onFocus={() => handleFocus('submit_dsc')}
              disabled={!isFormValid}
              className={`w-full p-6 rounded-lg text-left flex items-center justify-between transition-all duration-300 transform 
                ${isFormValid 
                  ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:-translate-y-1' 
                  : 'bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary cursor-not-allowed'}`}
            >
              <div>
                <h4 className="font-bold text-lg flex items-center"><Lock className="mr-2"/> SUBMIT WITH DSC</h4>
                <p className="text-sm mt-1 opacity-90">Use your Digital Signature Certificate</p>
              </div>
              <ChevronRight className={`transition-transform ${isFormValid ? 'translate-x-1' : ''}`} />
            </button>
          </div>
          
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); handleSubmit('EVC'); }} 
              onFocus={() => handleFocus('submit_evc')}
              disabled={!isFormValid}
              className={`w-full p-6 rounded-lg text-left flex items-center justify-between transition-all duration-300 transform 
                ${isFormValid 
                  ? 'bg-green-600 text-white shadow-lg hover:bg-green-700 hover:-translate-y-1' 
                  : 'bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary cursor-not-allowed'}`}
            >
              <div>
                <h4 className="font-bold text-lg flex items-center"><Mail className="mr-2"/> SUBMIT WITH EVC</h4>
                <p className="text-sm mt-1 opacity-90">Use an Electronic Verification Code</p>
              </div>
              <ChevronRight className={`transition-transform ${isFormValid ? 'translate-x-1' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-8">
        <button onClick={onBack} className="flex items-center px-6 py-2 bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary rounded-md hover:bg-opacity-80 font-semibold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4"/>
          Back
        </button>
      </div>
    </div>
  );
};

export default VerificationSubmitStep;
