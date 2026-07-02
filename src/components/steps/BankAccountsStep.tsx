import React from 'react';
import { StepProps } from '../../types/FormData';
import { Banknote, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const bankAccountsGuidance = {
  accountNumber: {
    voice: "Please enter the bank account number of the business.",
    text: "This is the account number of the business, which will be used for all GST-related transactions. It must be a valid bank account."
  },
  accountType: {
    voice: "Select the type of bank account, such as savings or current.",
    text: "Choose the type of account from the list. This helps in identifying the nature of the account."
  },
  ifscCode: {
    voice: "Enter the IFSC code of the bank branch.",
    text: "The IFSC code is a unique 11-digit code that identifies the bank branch. It is required for all online fund transfers."
  },
  supportingDocument: {
    voice: "Please upload a supporting document, such as a bank passbook or statement.",
    text: "You need to upload a document that serves as proof of the bank account. The first page of the passbook or a recent bank statement is acceptable."
  }
};

const BankAccountsStep: React.FC<StepProps> = ({ onNext, onBack, setActiveField, activeField }) => {
  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, bankAccountsGuidance);

  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  return (
    <div className="space-y-6">
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-3 rounded-full">
          <Banknote className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Bank Accounts</h2>
      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Bank Account Number
                <button type="button" onClick={(e) => handleButtonClick(e, 'accountNumber')} className="ml-2 text-gray-400 hover:text-blue-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              onFocus={() => handleFocus('accountNumber')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Type of Account
                <button type="button" onClick={(e) => handleButtonClick(e, 'accountType')} className="ml-2 text-gray-400 hover:text-blue-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <select
              id="accountType"
              name="accountType"
              onFocus={() => handleFocus('accountType')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option>Select Account Type</option>
              <option>Savings</option>
              <option>Current</option>
              <option>Cash Credit</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code
                <button type="button" onClick={(e) => handleButtonClick(e, 'ifscCode')} className="ml-2 text-gray-400 hover:text-blue-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              onFocus={() => handleFocus('ifscCode')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="supportingDocument" className="block text-sm font-medium text-gray-700">Supporting Document
                <button type="button" onClick={(e) => handleButtonClick(e, 'supportingDocument')} className="ml-2 text-gray-400 hover:text-blue-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="file"
              id="supportingDocument"
              name="supportingDocument"
              onFocus={() => handleFocus('supportingDocument')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 cursor-pointer"
            />
             <p className="text-xs text-gray-500 mt-1">Upload the first page of the bank passbook or a bank statement.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 font-semibold">BACK</button>
        <button onClick={onNext} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">SAVE & CONTINUE</button>
      </div>
    </div>
  );
};

export default BankAccountsStep;
