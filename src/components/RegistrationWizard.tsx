import { useState } from 'react';
import BusinessDetailsStep from './steps/BusinessDetailsStep';
import PromoterDetailsStep from './steps/PromoterDetailsStep';
import AuthorizedSignatoryStep from './steps/AuthorizedSignatoryStep';
import AuthorizedRepresentativeStep from './steps/AuthorizedRepresentativeStep';
import PrincipalPlaceStep from './steps/PrincipalPlaceStep';
import AdditionalPlaceStep from './steps/AdditionalPlaceStep';
import GoodsAndServicesStep from './steps/GoodsAndServicesStep';
import StateSpecificInformationStep from './steps/StateSpecificInformationStep';
import AadhaarAuthStep from './steps/AadhaarAuthStep';
import VerificationSubmitStep from './steps/VerificationSubmitStep';
import { FormData } from '../types/FormData';
import AITipsSidebar from './AITipsSidebar';
import { ChevronLeft } from 'lucide-react';
import NewRegistrationPage from './NewRegistrationPage';
import TrnLoginPage from './TrnLoginPage';
import OTPVerificationPage from './OTPVerificationPage';
import TrnDisplayPage from './TrnDisplayPage';
import ChatbotPage from './ChatbotPage';

interface RegistrationWizardProps {
  onBackToHome: () => void;
}

type View = 'new' | 'trn' | 'otp' | 'trn-display' | 'wizard';

const RegistrationWizard = ({ onBackToHome }: RegistrationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('new');
  const [trn, setTrn] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentView('new');
    }
    window.scrollTo(0, 0);
  };
  
  const handleStartWizard = () => {
    setCurrentView('wizard');
  };

  const handleShowTrnLogin = () => {
    setCurrentView('trn');
  };

  const handleShowOtp = () => {
    setCurrentView('otp');
  };

  const handleOtpVerified = () => {
    const generatedTrn = `TRN${Date.now()}`.substring(0, 15);
    setTrn(generatedTrn);
    setCurrentView('trn-display');
  };

  const handleShowChatbot = () => {
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const steps = [
    <BusinessDetailsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} setActiveField={setActiveField} onBack={handleBack} />,
    <PromoterDetailsStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <AuthorizedSignatoryStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <AuthorizedRepresentativeStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <PrincipalPlaceStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <AdditionalPlaceStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <GoodsAndServicesStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <StateSpecificInformationStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <AadhaarAuthStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />,
    <VerificationSubmitStep formData={formData} updateFormData={updateFormData} onNext={handleNext} onBack={handleBack} setActiveField={setActiveField} />
  ];

  const stepNames = [
    "Business Details",
    "Promoter/Partner Details",
    "Authorized Signatory",
    "Authorized Representative",
    "Principal Place of Business",
    "Additional Places of Business",
    "Goods and Services",
    "State Specific Information",
    "Aadhaar Authentication",
    "Verification",
  ];
  
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (currentView === 'new') {
    return <NewRegistrationPage onTrnLogin={handleShowTrnLogin} onProceed={handleShowOtp} />;
  }

  if (currentView === 'trn') {
    return <TrnLoginPage onLogin={handleStartWizard} onBack={() => setCurrentView('new')} />;
  }

  if (currentView === 'otp') {
    return <OTPVerificationPage onVerify={handleOtpVerified} onBack={() => setCurrentView('new')} />;
  }

  if (currentView === 'trn-display') {
    return <TrnDisplayPage trn={trn} onContinue={handleStartWizard} />;
  }

  return (
      <div className="min-h-screen bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="sticky top-16 z-10 bg-secondary dark:bg-dark-secondary pt-6 pb-4 border-b border-primary dark:border-dark-primary">
            <div className="relative mb-4">
              <button onClick={onBackToHome} className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-sm font-medium text-secondary dark:text-dark-secondary hover:text-primary dark:hover:text-dark-primary">
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Home
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary dark:text-dark-primary">GST Registration</h1>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-accent dark:text-accent">Step {currentStep + 1} of {steps.length}: {stepNames[currentStep]}</span>
                <span className="text-sm font-medium text-accent dark:text-accent">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-primary dark:bg-dark-primary rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 py-8">
            <nav className="w-full lg:w-1/4">
              <div className="lg:sticky lg:top-48 self-start space-y-1 h-[calc(100vh-13rem)] overflow-y-auto pr-4">
                {stepNames.map((name, index) => (
                  <a
                    key={name}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (index < currentStep) setCurrentStep(index);
                    }}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${ 
                      index === currentStep
                        ? 'bg-accent/10 text-accent dark:bg-accent/20 dark:text-white shadow-md'
                        : index < currentStep
                          ? 'text-green-600 dark:text-green-400 hover:bg-secondary dark:hover:bg-dark-secondary'
                          : 'text-secondary dark:text-dark-secondary bg-secondary dark:bg-dark-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${  
                      index === currentStep
                        ? 'bg-accent text-white'
                        : index < currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-primary dark:bg-dark-primary'
                    }`}>
                      {index < currentStep ? '✔' : index + 1}
                    </div>
                    <span className="truncate">{name}</span>
                  </a>
                ))}
              </div>
            </nav>

            <main className="w-full lg:w-1/2 min-h-[calc(100vh-13rem)]">
              <div className="bg-primary dark:bg-dark-primary rounded-xl shadow-lg p-6 sm:p-8">
                {steps[currentStep]}
              </div>
            </main>

            <aside className="w-full lg:w-1/4">
              <div className="lg:sticky lg:top-48 self-start h-[calc(100vh-13rem)] overflow-y-auto">
                <AITipsSidebar onChatClick={handleShowChatbot} activeField={activeField} currentStep={currentStep} />
              </div>
            </aside>
          </div>
        </div>
        {showChatbot && <ChatbotPage onClose={handleCloseChatbot} />}
      </div>
  );
};

export default RegistrationWizard;
