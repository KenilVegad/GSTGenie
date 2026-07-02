
import React from 'react';
import { StepProps } from '../../types/FormData';
import { UserCheck, Upload, FileText, Camera, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const signatoryGuidance = {
  primarySignatory: {
    voice: "If the Primary Promoter is also the Authorized Signatory, you can enable this option to auto-fill their details.",
    text: "Enable this toggle if the person you designated as the primary promoter will also act as the authorized signatory. This will save you time."
  },
  firstName: {
    voice: "Please enter the first name of the authorized signatory as it appears on their PAN card.",
    text: "The first name of the authorized signatory must match their PAN card. Avoid any discrepancies."
  },
  lastName: {
    voice: "Now, enter the last name of the authorized signatory as per their PAN card.",
    text: "The last name or surname must be exactly as it appears on the PAN card."
  },
  dob: {
    voice: "Please select the authorized signatory's date of birth.",
    text: "The date of birth must match the one on their PAN card for verification purposes."
  },
  mobileNumber: {
    voice: "Enter a valid 10-digit mobile number for the authorized signatory.",
    text: "This mobile number will receive a one-time password (OTP) for all verifications related to the authorized signatory."
  },
  email: {
    voice: "Provide an active email address for all official communications.",
    text: "All official GST-related communication will be sent to this email address."
  },
  designation: {
    voice: "Enter the designation of the authorized signatory, such as 'Manager' or 'Director'.",
    text: "Provide the official job title or designation of the person being appointed as the authorized signatory for GST purposes."
  },
  pan: {
    voice: "Enter the 10-digit Permanent Account Number, or PAN, of the authorized signatory.",
    text: "The PAN is mandatory for identity verification. Ensure it matches the name and date of birth provided."
  },
  aadhaar: {
    voice: "If available, enter the 12-digit Aadhaar number of the authorized signatory.",
    text: "Providing the Aadhaar number is optional but can be useful for e-KYC and faster processing."
  },
  pinCode: {
    voice: "Enter the 6-digit PIN code of the signatory's residential address.",
    text: "Entering the PIN code will help auto-fill the State and District for the address."
  },
  photo: {
    voice: "Please upload a clear, passport-sized photograph of the authorized signatory.",
    text: "The photograph is mandatory. It must be a recent photo in JPEG format and under 100 KB in size."
  },
  proofOfAppointment: {
    voice: "Upload proof of appointment, such as a Letter of Authorization or a board resolution.",
    text: "You must upload a document that legally authorizes this person to act as a signatory. Accepted formats are PDF or JPEG, with a maximum size of 1 MB."
  }
};

const AuthorizedSignatoryStep: React.FC<StepProps> = ({ onNext, onBack, setActiveField, activeField }) => {
  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, signatoryGuidance);
  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary" onClick={() => setActiveField && setActiveField(null)}>
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <UserCheck className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Details of Authorized Signatory</h2>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="flex items-center justify-between">
          <label htmlFor="primarySignatory" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Primary Promoter is also Authorized Signatory
            <button type="button" onClick={() => handleFocus('primarySignatory')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="primarySignatory" className="sr-only peer" onFocus={() => handleFocus('primarySignatory')} />
            <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border-secondary dark:after:border-dark-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-6">Personal & Identity Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-secondary dark:text-dark-secondary">First Name*
                <button type="button" onClick={() => handleFocus('firstName')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="firstName" name="firstName" className={inputStyle} onFocus={() => handleFocus('firstName')} placeholder="Enter First Name" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Last Name*
                <button type="button" onClick={() => handleFocus('lastName')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="lastName" name="lastName" className={inputStyle} onFocus={() => handleFocus('lastName')} placeholder="Enter Last Name" />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Date of Birth*
                <button type="button" onClick={() => handleFocus('dob')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="date" id="dob" name="dob" className={inputStyle} onFocus={() => handleFocus('dob')} />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Mobile Number*
                <button type="button" onClick={() => handleFocus('mobileNumber')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="tel" id="mobileNumber" name="mobileNumber" className={inputStyle} onFocus={() => handleFocus('mobileNumber')} placeholder="+91 1234567890" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Email Address*
                <button type="button" onClick={() => handleFocus('email')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="email" id="email" name="email" className={inputStyle} onFocus={() => handleFocus('email')} placeholder="example@domain.com" />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Designation / Status*
                <button type="button" onClick={() => handleFocus('designation')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="designation" name="designation" className={inputStyle} onFocus={() => handleFocus('designation')} placeholder="e.g., Director, Partner" />
          </div>
          <div>
            <label htmlFor="pan" className="block text-sm font-medium text-secondary dark:text-dark-secondary">PAN*
                <button type="button" onClick={() => handleFocus('pan')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="pan" name="pan" className={inputStyle} onFocus={() => handleFocus('pan')} placeholder="10-digit PAN" />
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-6">Residential Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-secondary dark:text-dark-secondary">PIN Code*
                <button type="button" onClick={() => handleFocus('pinCode')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="pinCode" name="pinCode" className={inputStyle} onFocus={() => handleFocus('pinCode')} placeholder="6-digit PIN" />
          </div>
          {/* Other address fields can be added here, they will also get the voice assistant feature */}
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-6">Document Upload</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary dark:text-dark-secondary">Photograph*
                <button type="button" onClick={() => handleFocus('photo')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <div className="mt-2 flex items-center justify-center w-full p-6 border-2 border-secondary dark:border-dark-secondary border-dashed rounded-md" onFocus={() => handleFocus('photo')}>
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-secondary dark:text-dark-secondary" />
                <p className="mt-2 text-sm text-secondary dark:text-dark-secondary">JPEG format, max 100KB</p>
                <button type="button" className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">Upload a file</button>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary dark:text-dark-secondary">Proof of Appointment*
                <button type="button" onClick={() => handleFocus('proofOfAppointment')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <div className="mt-2 flex items-center justify-center w-full p-6 border-2 border-secondary dark:border-dark-secondary border-dashed rounded-md" onFocus={() => handleFocus('proofOfAppointment')}>
              <div className="text-center">
                <FileText className="mx-auto h-12 w-12 text-secondary dark:text-dark-secondary" />
                <p className="mt-2 text-sm text-secondary dark:text-dark-secondary">PDF/JPEG, max 1MB (e.g. Letter of Authorization)</p>
                <button type="button" className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">Upload a file</button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default AuthorizedSignatoryStep;
