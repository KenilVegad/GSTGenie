
import React, { useState, useEffect } from 'react';
import AIPoweredGuidance from './AIPoweredGuidance';
import { useAIGuidance } from '../hooks/useAIGuidance';
import { Volume2 } from 'lucide-react';
import Footer from './Footer';

interface NewRegistrationPageProps {
  onTrnLogin: () => void;
  onProceed: () => void;
}

const registrationGuidance = {
  userType: {
    voice: "Please select the type of user you are. This will determine the type of registration you need.",
    text: "Select the type of user you are from the dropdown menu. This will help us to determine the type of registration you need.",
  },
  state: {
    voice: "Please select the state where your business is located.",
    text: "Select the state where your business is located from the dropdown menu. This will help us to determine the correct tax jurisdiction for your business.",
  },
  district: {
    voice: "Please enter the district where your business is located.",
    text: "Enter the district where your business is located. This will help us to determine the correct tax jurisdiction for your business.",
  },
  pinCode: {
    voice: "Please enter your 6-digit PIN code.",
    text: "Enter the 6-digit PIN code for your principal place of business. This helps in auto-populating state and district.",
  },
  businessName: {
    voice: "Please enter the legal name of your business as it appears on your PAN card.",
    text: "Enter the legal name of your business as it appears on your PAN card. This is important for verification purposes.",
  },
  pan: {
    voice: "Please enter your Permanent Account Number (PAN).",
    text: "Enter your 10-digit Permanent Account Number (PAN). This is a mandatory field for GST registration.",
  },
  email: {
    voice: "Please enter your email address.",
    text: "Enter your email address. We will send all future correspondence to this email address.",
  },
  mobile: {
    voice: "Please enter your mobile number.",
    text: "Enter your mobile number. We will send all future correspondence to this mobile number.",
  },
  proceed: {
    voice: "Click here to proceed to the next step.",
    text: "Click the 'Proceed' button to continue to the next step of the registration process.",
  },
};

const NewRegistrationPage: React.FC<NewRegistrationPageProps> = ({ onTrnLogin, onProceed }) => {
  const [registrationType, setRegistrationType] = useState('new');
  const [userType, setUserType] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [pan, setPan] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [activeField, setActiveField] = useState<string | null>(null);

  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, registrationGuidance);

  useEffect(() => {
    if (registrationType === 'trn') {
      onTrnLogin();
    }
  }, [registrationType, onTrnLogin]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/01994edff66f7dd784cd68a4ba9eecf5bf09/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const userTypes = [
    'Taxpayer',
    'Tax Deductor',
    'Tax Collector (e-Commerce)',
    'GST Practitioner',
    'United Nation Body',
    'Consulate or Embassy of Foreign Country',
    'Other Notified Person',
    'Non-Resident Online Services Provider and/or Non-Resident Online Money Gaming Supplier',
  ];

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceed();
  };

  const inputClasses = "w-full px-4 py-2 border border-secondary dark:border-dark-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-secondary dark:bg-dark-secondary flex items-center justify-center p-4" onClick={() => setActiveField(null)}>
        <div className="bg-primary dark:bg-dark-primary rounded-2xl shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          
          {/* Left side: Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-2 text-secondary dark:text-dark-secondary">GST Registration</h2>
            <p className="text-secondary dark:text-dark-secondary mb-8">
              {registrationType === 'new' ? 'Part A: New Registration' : 'Temporary Reference Number (TRN)'}
            </p>

            <div className="flex items-center mb-8">
              <label className="flex items-center cursor-pointer mr-6">
                <input
                  type="radio"
                  name="registrationType"
                  value="new"
                  checked={registrationType === 'new'}
                  onChange={(e) => setRegistrationType(e.target.value)}
                  className="hidden"
                />
                <span className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${registrationType === 'new' ? 'bg-blue-600 text-white shadow-md' : 'bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary'}`}>
                  New Registration
                </span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="registrationType"
                  value="trn"
                  checked={registrationType === 'trn'}
                  onChange={(e) => setRegistrationType(e.target.value)}
                  className="hidden"
                />
                <span className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${registrationType === 'trn' ? 'bg-blue-600 text-white shadow-md' : 'bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary'}`}>
                  TRN Login
                </span>
              </label>
            </div>

            {registrationType === 'new' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">I am a...
                      <button type="button" onClick={(e) => handleButtonClick(e, 'userType')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <select
                      id="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      onFocus={() => handleFocus('userType')}
                      className={inputClasses}
                      required
                    >
                      <option value="">Select</option>
                      {userTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                   <div>
                    <label htmlFor="state" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">State/UT
                      <button type="button" onClick={(e) => handleButtonClick(e, 'state')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <select
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      onFocus={() => handleFocus('state')}
                      className={inputClasses}
                      required>
                      <option value="">Select State</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">District
                      <button type="button" onClick={(e) => handleButtonClick(e, 'district')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <input
                      type="text"
                      id="district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      onFocus={() => handleFocus('district')}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="pinCode" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">PIN Code
                      <button type="button" onClick={(e) => handleButtonClick(e, 'pinCode')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <input
                      type="text"
                      id="pinCode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      onFocus={() => handleFocus('pinCode')}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Legal Name of the Business (As per PAN)
                    <button type="button" onClick={(e) => handleButtonClick(e, 'businessName')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    onFocus={() => handleFocus('businessName')}
                    className={inputClasses}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Permanent Account Number (PAN)
                    <button type="button" onClick={(e) => handleButtonClick(e, 'pan')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </label>
                  <input
                    type="text"
                    id="pan"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    onFocus={() => handleFocus('pan')}
                    className={inputClasses}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Email Address
                      <button type="button" onClick={(e) => handleButtonClick(e, 'email')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => handleFocus('email')}
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Mobile Number
                      <button type="button" onClick={(e) => handleButtonClick(e, 'mobile')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-blue-600 align-middle">
                          <Volume2 size={16}/>
                      </button>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      onFocus={() => handleFocus('mobile')}
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                   <button 
                    type="submit"
                    onFocus={() => handleFocus('proceed')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Proceed
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right side: AI Guidance */}
          <div className="hidden md:flex flex-col justify-center items-center p-12 bg-secondary dark:bg-dark-secondary">
            <div className="w-full">
              <div className="text-center text-primary dark:text-dark-primary mb-8">
                <h3 className="text-3xl font-bold mb-4">AI-Assisted Registration</h3>
                <p>Click on any field in the form to get instant, AI-powered guidance. I'm here to help you avoid common mistakes and make this process as smooth as possible.</p>
              </div>
              {currentGuidance && (
                <AIPoweredGuidance show={true} guidance={currentGuidance} />
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewRegistrationPage;
