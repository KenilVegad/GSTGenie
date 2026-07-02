import React from 'react';
import { StepProps } from '../../types/FormData';
import { ChevronRight, ChevronLeft, Volume2 } from 'lucide-react';
import AIPoweredGuidance, { speech } from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const guidance = {
  legalName: {
    voice: "Please enter the legal name of your business as it appears on your PAN card.",
    text: "The legal name of the business should be exactly as mentioned on the PAN card. Any discrepancy can lead to application rejection."
  },
  tradeName: {
      voice: "Now, enter the trade name of your business, if it's different from the legal name.",
      text: "The trade name is the name under which you do business. It can be different from the legal name."
  },
  constitution: {
      voice: "Select the type of business structure, for example, proprietorship, partnership, or private limited company.",
      text: "Choose the correct legal structure of your business. This determines the documents you need to provide."
  },
  reason: {
      voice: "Why are you registering for GST? Please select the most appropriate reason from the list.",
      text: "The reason for registration helps the tax authorities understand your business context."
  },
  commencementDate: {
      voice: "Please select the date when your business operations started.",
      text: "This is the date from which your business is liable for GST registration."
  },
  casualTaxablePerson: {
      voice: "Are you registering as a casual taxable person for a temporary period? If so, check this box.",
      text: "A casual taxable person is one who occasionally undertakes transactions in a State or a Union territory where he has no fixed place of business."
  },
  compositionScheme: {
      voice: "Would you like to opt for the composition scheme? This is a simplified GST scheme for small businesses.",
      text: "The composition scheme is a simple and easy scheme under GST for taxpayers. Small taxpayers can get rid of tedious GST formalities and pay GST at a fixed rate of turnover."
  }
};

const BusinessDetailsStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, setActiveField, activeField }) => {
    const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, guidance);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        updateFormData({ [name]: inputValue });
    };

    const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
        e.stopPropagation();
        handleFocus(fieldName);
    };

  const constitutionOptions = [
    'Foreign Company', 'Foreign Limited Liability Partnership', 'Government Department', 
    'Hindu Undivided Family', 'Limited Liability Partnership', 'Local Authority', 'Others',
    'Partnership', 'Private Limited Company', 'Public Limited Company',
    'Public Sector Undertaking', 'Society/ Club/ Trust/ AOP', 'Statutory Body', 'Unlimited Company'
  ];

  const reasonOptions = [
    'Crossing the Threshold', 'Inter-State supply', 'Liability to pay as recipient of goods or services',
    'Transfer / Succession of business', 'Death of the Proprietor', 'De-merger', 
    'Change in constitution of business', 'Merger /Amalgamation', 'E-Commerce Operator',
    'Selling through e-Commerce portal', 'Voluntary Basis', 'Input Service Distributor only',
    'Supplies on behalf of other taxable Person', 'SEZ Unit', 'SEZ Developer', 'Others',
    'Corporate Debtor undergoing the Corporate Insolvency Resolution Process with IRP/RP'
  ];

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";
  const labelStyle = "block text-sm font-medium text-secondary dark:text-dark-secondary";

  return (
    <div className="space-y-8">
        <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-secondary dark:text-dark-secondary">Business Details</h2>
        <p className="text-sm text-secondary-light dark:text-dark-secondary-light">Provide the legal and trade names of your business.</p>
      </div>

      <div className="space-y-4 p-6 border dark:border-dark-secondary rounded-lg">
        <h3 className="font-semibold text-lg text-secondary dark:text-dark-secondary">Business Name</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="legalName" className={labelStyle}>Legal Name of Business *
                <button type="button" onClick={(e) => handleButtonClick(e, 'legalName')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="legalName" name="legalName" className={inputStyle} value={formData.legalName || ''} onChange={handleChange} onFocus={() => handleFocus('legalName')} placeholder="As per PAN" />
          </div>
          <div className="relative">
            <label htmlFor="tradeName" className={labelStyle}>Trade Name *
                <button type="button" onClick={(e) => handleButtonClick(e, 'tradeName')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="tradeName" name="tradeName" className={inputStyle} value={formData.tradeName || ''} onChange={handleChange} onFocus={() => handleFocus('tradeName')} placeholder="Your brand name" />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 border dark:border-dark-secondary rounded-lg">
        <h3 className="font-semibold text-lg text-secondary dark:text-dark-secondary">Registration Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="constitution" className={labelStyle}>Constitution of Business *
                <button type="button" onClick={(e) => handleButtonClick(e, 'constitution')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <select id="constitution" name="constitution" className={inputStyle} value={formData.constitution || ''} onChange={handleChange} onFocus={() => handleFocus('constitution')}>
              <option value="">Select type</option>
              {constitutionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="relative">
            <label htmlFor="reason" className={labelStyle}>Reason for Registration *
                <button type="button" onClick={(e) => handleButtonClick(e, 'reason')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <select id="reason" name="reason" className={inputStyle} value={formData.reason || ''} onChange={handleChange} onFocus={() => handleFocus('reason')}>
              <option value="">Select reason</option>
              {reasonOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="relative">
            <label htmlFor="commencementDate" className={labelStyle}>Date of Business Commencement *
                <button type="button" onClick={(e) => handleButtonClick(e, 'commencementDate')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="date" id="commencementDate" name="commencementDate" className={inputStyle} value={formData.commencementDate || ''} onChange={handleChange} onFocus={() => handleFocus('commencementDate')} />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 border dark:border-dark-secondary rounded-lg">
        <h3 className="font-semibold text-lg text-secondary dark:text-dark-secondary">Schemes & Options</h3>
        <div className="space-y-4">
          <div className="relative flex items-center justify-between p-3 bg-primary-light dark:bg-dark-primary-light rounded-lg">
            <label htmlFor="casualTaxablePerson" className="text-sm font-medium text-secondary dark:text-dark-secondary">Register as a Casual Taxable Person?
                <button type="button" onClick={(e) => handleButtonClick(e, 'casualTaxablePerson')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="casualTaxablePerson" id="casualTaxablePerson" className="sr-only peer" checked={!!formData.casualTaxablePerson} onChange={handleChange} onFocus={() => handleFocus('casualTaxablePerson')} />
              <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border after:rounded-full after:h-5 after:w-5 transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="relative flex items-center justify-between p-3 bg-primary-light dark:bg-dark-primary-light rounded-lg">
            <label htmlFor="compositionScheme" className="text-sm font-medium text-secondary dark:text-dark-secondary">Opt-in for Composition Scheme?
                <button type="button" onClick={(e) => handleButtonClick(e, 'compositionScheme')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="compositionScheme" id="compositionScheme" className="sr-only peer" checked={!!formData.compositionScheme} onChange={handleChange} onFocus={() => handleFocus('compositionScheme')} />
              <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border after:rounded-full after:h-5 after:w-5 transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t dark:border-dark-secondary">
        <button onClick={onBack} className="inline-flex items-center px-4 py-2 border border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-secondary dark:text-dark-secondary bg-primary dark:bg-dark-primary hover:bg-secondary-light dark:hover:bg-dark-secondary-light">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button
          onClick={onNext}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >SAVE & CONTINUE
          <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
