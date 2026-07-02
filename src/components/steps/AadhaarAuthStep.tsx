import React, { useState } from 'react';
import { StepProps } from '../../types/FormData';
import { ShieldCheck, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const aadhaarGuidance = {
  optForAadhaar: {
    voice: "Do you want to use Aadhaar to authenticate the details of promoters and authorized signatories? Choosing 'Yes' can speed up the registration process.",
    text: "Aadhaar authentication is a digital verification process. If you opt-in, an authentication link will be sent to the registered mobile and email of the selected persons."
  },
  partnerSelection: {
    voice: "Please select at least one promoter or partner for Aadhaar authentication. The application reference number, or ARN, will be generated only after they complete the authentication.",
    text: "You must select at least one person from this list for Aadhaar authentication to proceed. Ensure their contact details are correct, as the authentication link will be sent there."
  }
};

const AadhaarAuthStep: React.FC<StepProps> = ({
  updateFormData,
  onNext,
  onBack,
  setActiveField,
  activeField
}) => {
  const [optForAadhaar, setOptForAadhaar] = useState(true);
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'DEVYASH PATEL',
      isCitizen: 'Yes',
      isPromoter: 'Yes',
      isPrimaryAuth: 'No',
      mobile: '********78',
      email: 'devyash@example.com',
      selected: true,
    },
  ]);

  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, aadhaarGuidance);

  const handlePartnerSelect = (id: number) => {
    setPartners(
      partners.map(p =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const handleSaveAndContinue = () => {
    const selectedPartners = partners.filter(p => p.selected);
    updateFormData({ aadhaarAuth: { optForAadhaar, selectedPartners } });
    onNext();
  };

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary" onClick={() => setActiveField && setActiveField(null)}>
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <ShieldCheck className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Aadhaar Authentication</h2>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="flex items-center justify-between">
        <label htmlFor='optForAadhaar' className="block text-sm font-medium text-secondary dark:text-dark-secondary">Do you want to opt for Aadhaar Authentication?
            <button type="button" onClick={() => handleFocus('optForAadhaar')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
        </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id='optForAadhaar'
              type="checkbox"
              className="sr-only peer"
              checked={optForAadhaar}
              onChange={() => setOptForAadhaar(!optForAadhaar)}
              onFocus={() => handleFocus('optForAadhaar')}
            />
            <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border-secondary dark:after:border-dark-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {optForAadhaar && (
        <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
           <div className="bg-indigo-100 border-l-4 border-indigo-500 p-4 mb-6">
            <div className="flex">
                <div className="py-1">
                    <p className="text-sm text-indigo-700">
                    A verification link will be sent to the mobile number and email of the selected promoter/partner and authorized signatory. The Application Reference Number (ARN) will be generated only after the Aadhaar authentication is complete.
                    </p>
                </div>
            </div>
        </div>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-primary dark:bg-dark-primary ">
              <thead className="bg-secondary dark:bg-dark-secondary">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-primary dark:text-dark-primary uppercase tracking-wider">Select
                    <button type="button" onClick={() => handleFocus('partnerSelection')} className="ml-2 text-primary dark:text-dark-primary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-primary dark:text-dark-primary uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-primary dark:text-dark-primary uppercase tracking-wider">Role</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-primary dark:text-dark-primary uppercase tracking-wider">Contact</th>
                </tr>
              </thead>
              <tbody className="bg-primary dark:bg-dark-primary divide-y divide-secondary dark:divide-dark-secondary">
                {partners.map((partner) => (
                  <tr key={partner.id}>
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={partner.selected}
                        onChange={() => handlePartnerSelect(partner.id)}
                        onFocus={() => handleFocus('partnerSelection')}
                        className="h-4 w-4 text-indigo-600 border-secondary dark:border-dark-secondary rounded focus:ring-indigo-500"
                      />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-secondary dark:text-dark-secondary">{partner.name}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-secondary dark:text-dark-secondary">{partner.isPromoter === 'Yes' ? 'Promoter / Partner' : ''}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-secondary dark:text-dark-secondary">{partner.mobile} / {partner.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-2 rounded-lg hover:bg-opacity-80 font-semibold">BACK</button>
        <button
          onClick={handleSaveAndContinue}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >SAVE & CONTINUE
        </button>
      </div>
    </div>
  );
};

export default AadhaarAuthStep;
