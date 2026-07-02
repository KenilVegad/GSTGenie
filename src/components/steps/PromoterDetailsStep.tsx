import React from 'react';
import { StepProps } from '../../types/FormData';
import { Camera, User, Users, Building, Mail, Phone, Calendar, Info, RefreshCw, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const promoterGuidance = {
  firstName: {
    voice: "Please enter the proprietor's first name as it appears on their PAN card.",
    text: "Enter the given name of the proprietor exactly as it is mentioned on their PAN card. Avoid using any initials or nicknames."
  },
  middleName: {
    voice: "Now, if they have a middle name, please enter it here.",
    text: "If the proprietor has a middle name on their official documents, enter it here. Otherwise, you can leave this field empty."
  },
  lastName: {
    voice: "Please provide the proprietor's last name, also as per their PAN card.",
    text: "Enter the surname or family name of the proprietor. This must match their PAN card precisely to ensure successful verification."
  },
  fatherFirstName: {
    voice: "Next, enter the first name of the proprietor's father.",
    text: "Please provide the first name of the proprietor's father as mentioned on official government documents."
  },
  fatherMiddleName: {
    voice: "If the father has a middle name, please enter it now.",
    text: "Enter the middle name of the proprietor's father, if applicable. If there is no middle name, leave this field blank."
  },
  fatherLastName: {
    voice: "Now, enter the last name of the proprietor's father.",
    text: "Enter the surname or family name of the proprietor's father to complete this section."
  },
  dob: {
    voice: "Please select the proprietor's date of birth from the calendar.",
    text: "Select the proprietor's date of birth. This must be the same as the one on their PAN card for verification."
  },
  mobileNumber: {
    voice: "Please enter a valid 10-digit mobile number for OTP verification.",
    text: "This 10-digit mobile number is crucial as it will be used for sending a one-time password (OTP) for all future verifications."
  },
  email: {
    voice: "Provide an active email address for all official communications.",
    text: "All official communication from the GST portal, including notifications and updates, will be sent to this email address."
  },
  gender: {
    voice: "Please select the proprietor's gender from the available options.",
    text: "Select the appropriate gender for the proprietor from the given options: Male, Female, or Others."
  },
  telephone: {
    voice: "If you have a landline number, you can enter it here.",
    text: "This is an optional field. If you have a landline, please provide the number including the STD code."
  },
  designation: {
    voice: "The designation is pre-filled as 'Proprietor', which you can confirm.",
    text: "As this is a proprietorship firm, the designation is automatically set to 'Proprietor'. You may change it if needed."
  },
  din: {
    voice: "If you have a Director Identification Number, please enter it now.",
    text: "A Director Identification Number (DIN) is usually for company directors and is optional for proprietors. If you have one, enter it here."
  },
  isCitizen: {
    voice: "Please confirm if the proprietor is a citizen of India.",
    text: "Toggle the switch to 'Yes' if the proprietor is a citizen of India. This is a mandatory confirmation."
  },
  aadhaar: {
    voice: "Please enter the proprietor's 12-digit Aadhaar number for identity verification.",
    text: "The Aadhaar number is used for identity verification. Ensure it is entered correctly and is linked to the mobile number for e-KYC."
  },
  pinCode: {
    voice: "Enter the 6-digit PIN code of the residential address to begin.",
    text: "Your PIN code is essential. Entering it here will help auto-fill your State and District, ensuring accuracy."
  },
  state: {
      voice: "Please verify the auto-filled state or enter it manually.",
      text: "Your state will be auto-populated based on the PIN code. Please verify that it is correct."
  },
  district: {
      voice: "Please verify the auto-filled district or enter it manually.",
      text: "Your district will be auto-populated based on the PIN code. Please verify that it is correct."
  },
   city: {
    voice: "Now, enter the city, town, or village where you live.",
    text: "Please provide the full name of your city, town, or village. For example, 'Mumbai' or 'Gopalpur'."
  },
  buildingNo: {
    voice: "Please enter your house number, building number, or flat number.",
    text: "Enter the specific number of your residence, such as Door No., Flat No., or Building No. This is a mandatory field for a complete address."
  },
  photo: {
    voice: "Please upload a recent, clear, passport-sized photograph of the proprietor.",
    text: "The photo must be in JPEG format and under 100 KB. You can either upload a file or use your device camera to take a new picture."
  },
  alsoAuthSignatory: {
    voice: "Will the proprietor also be the authorized signatory? Please confirm.",
    text: "Toggle this on if the proprietor is the one who will sign all GST-related documents. For most proprietorships, this will be 'Yes'."
  }
};


const FormField: React.FC<{
    label: string;
    name: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onFocus: (name: string) => void;
    placeholder?: string;
    type?: string;
    info?: boolean;
    prefix?: string;
    guidanceName?: string;
    handleButtonClick: (e: React.MouseEvent, fieldName: string) => void;
}> = ({ label, name, value, onChange, onFocus, placeholder, type = 'text', info, prefix, guidanceName, handleButtonClick }) => (
    <div className="w-full">
         <div className="flex items-center mb-1">
            <label htmlFor={name} className="block text-sm font-medium text-secondary dark:text-dark-secondary">
                {label}
            </label>
            {info && <Info size={12} className="ml-1 text-secondary dark:text-dark-secondary" />}
            {guidanceName && (
                 <button type="button" onClick={(e) => handleButtonClick(e, guidanceName)} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600">
                    <Volume2 size={16}/>
                 </button>
            )}
        </div>
        <div className="relative">
             {prefix && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-secondary dark:text-dark-secondary sm:text-sm">{prefix}</span></div>}
            <input
                type={type}
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary ${prefix ? 'pl-10' : ''}`}
                onFocus={() => onFocus(guidanceName || name)}
            />
        </div>
    </div>
);

const PromoterDetailsStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, setActiveField, activeField }) => {
    const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, promoterGuidance);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        updateFormData({ [name]: inputValue });
    };
  
    const handleAddressChange = (field: string, value: string) => {
        updateFormData({ promoterAddress: { ...(formData.promoterAddress || {}), [field]: value } });
    };

    const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
        e.stopPropagation();
        handleFocus(fieldName);
    };

  return (
    <div className="space-y-8 bg-primary dark:bg-dark-primary p-8 text-primary dark:text-dark-primary">
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />

      <h1 className="text-2xl font-bold text-secondary dark:text-dark-secondary">Details of Proprietor</h1>

      {/* Personal Information */}
      <div className="p-6 border border-secondary dark:border-dark-secondary rounded-lg space-y-6 bg-primary dark:bg-dark-primary">
        <h2 className="text-lg font-semibold text-secondary dark:text-dark-secondary flex items-center"><User className="mr-2 text-indigo-600" />Personal Information</h2>
        
        <div className='space-y-2'>
            <p className="text-sm font-medium text-secondary dark:text-dark-secondary">Name of Person</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="First Name *" name="firstName" value={formData.firstName} onChange={handleChange} onFocus={handleFocus} placeholder="DEYYASH" guidanceName="firstName" handleButtonClick={handleButtonClick} />
              <FormField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Middle Name" guidanceName="middleName" handleButtonClick={handleButtonClick} />
              <FormField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} onFocus={handleFocus} placeholder="PATEL" guidanceName="lastName" handleButtonClick={handleButtonClick} />
            </div>
        </div>

        <div className='space-y-2'>
            <p className="text-sm font-medium text-secondary dark:text-dark-secondary">Name of Father</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="First Name *" name="fatherFirstName" value={formData.fatherFirstName} onChange={handleChange} onFocus={handleFocus} placeholder="Enter First Name" guidanceName="fatherFirstName" handleButtonClick={handleButtonClick} />
              <FormField label="Middle Name" name="fatherMiddleName" value={formData.fatherMiddleName} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Middle Name" guidanceName="fatherMiddleName" handleButtonClick={handleButtonClick} />
              <FormField label="Last Name" name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Last Name" guidanceName="fatherLastName" handleButtonClick={handleButtonClick} />
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <FormField label="Date of Birth *" name="dob" type="date" value={formData.dob} onChange={handleChange} onFocus={handleFocus} guidanceName="dob" handleButtonClick={handleButtonClick} />
            <FormField label="Mobile Number *" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Mobile Number" prefix="+91" guidanceName="mobileNumber" handleButtonClick={handleButtonClick} />
            <FormField label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Email Address" guidanceName="email" handleButtonClick={handleButtonClick} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div onFocus={() => handleFocus('gender')}>
                <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-2">Gender * 
                    <button type="button" onClick={(e) => handleButtonClick(e, 'gender')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                </label>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {['Male', 'Female', 'Others'].map(gender => (
                        <label key={gender} className="flex items-center text-sm text-secondary dark:text-dark-secondary cursor-pointer">
                            <input type="radio" name="gender" value={gender.toLowerCase()} checked={formData.gender === gender.toLowerCase()} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-secondary dark:border-dark-secondary focus:ring-indigo-500 mr-2"/>
                            <User size={16} className="mr-1 text-secondary dark:text-dark-secondary" /> {gender}
                        </label>
                    ))}
                </div>
            </div>
            <div onFocus={() => handleFocus('telephone')}>
                 <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Telephone Number (with STD Code)
                    <button type="button" onClick={(e) => handleButtonClick(e, 'telephone')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                 </label>
                 <div className="flex space-x-2">
                    <input name="stdCode" value={formData.stdCode || ''} onChange={handleChange} placeholder="STD" className="w-1/4 p-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm bg-primary dark:bg-dark-primary"/>
                    <input name="telephone" value={formData.telephone || ''} onChange={handleChange} placeholder="Enter Telephone Number" className="w-3/4 p-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm bg-primary dark:bg-dark-primary"/>
                 </div>
            </div>
        </div>

      </div>

      {/* Identity Information */}
      <div className="p-6 border border-secondary dark:border-dark-secondary rounded-lg space-y-6 bg-primary dark:bg-dark-primary">
          <h2 className="text-lg font-semibold text-secondary dark:text-dark-secondary flex items-center"><Users className="mr-2 text-indigo-600" />Identity Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <FormField label="Designation / Status *" name="designation" value={formData.designation || 'Proprietor'} onChange={handleChange} onFocus={handleFocus} guidanceName="designation" handleButtonClick={handleButtonClick} />
              <FormField label="Director Identification Number" name="din" value={formData.din} onChange={handleChange} onFocus={handleFocus} placeholder="Enter DIN Number" info guidanceName="din" handleButtonClick={handleButtonClick} />
              <div onFocus={() => handleFocus('isCitizen')}>
                  <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Are you a citizen of India?
                    <button type="button" onClick={(e) => handleButtonClick(e, 'isCitizen')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="isCitizen" checked={!!formData.isCitizen} onChange={handleChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-primary dark:after:bg-dark-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Aadhaar Number" name="aadhaar" value={formData.aadhaar} onChange={handleChange} onFocus={handleFocus} placeholder="Enter Aadhaar Number" info guidanceName="aadhaar" handleButtonClick={handleButtonClick} />
          </div>
      </div>
      
      {/* Residential Address */}
      <div className="p-6 border border-secondary dark:border-dark-secondary rounded-lg space-y-6 bg-primary dark:bg-dark-primary">
          <h2 className="text-lg font-semibold text-secondary dark:text-dark-secondary flex items-center"><Building className="mr-2 text-indigo-600" />Residential Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Country *" name="country" value={formData.promoterAddress?.country || 'India'} onChange={(e) => handleAddressChange('country', e.target.value)} onFocus={handleFocus} guidanceName="country" handleButtonClick={handleButtonClick} />
            <FormField label="PIN Code *" name="pinCode" value={formData.promoterAddress?.pinCode} onChange={(e) => handleAddressChange('pinCode', e.target.value)} onFocus={handleFocus} placeholder="Enter PIN Code" info guidanceName="pinCode" handleButtonClick={handleButtonClick} />
            <FormField label="State *" name="state" value={formData.promoterAddress?.state} onChange={(e) => handleAddressChange('state', e.target.value)} onFocus={handleFocus} placeholder="Enter State Name" info guidanceName="state" handleButtonClick={handleButtonClick} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="District *" name="district" value={formData.promoterAddress?.district} onChange={(e) => handleAddressChange('district', e.target.value)} onFocus={handleFocus} placeholder="Enter District Name" info guidanceName="district" handleButtonClick={handleButtonClick} />
            <FormField label="City / Town / Village *" name="city" value={formData.promoterAddress?.city} onChange={(e) => handleAddressChange('city', e.target.value)} onFocus={handleFocus} placeholder="Enter City / Town / Village" info guidanceName="city" handleButtonClick={handleButtonClick} />
            <FormField label="Locality/Sub Locality" name="locality" value={formData.promoterAddress?.locality} onChange={(e) => handleAddressChange('locality', e.target.value)} onFocus={handleFocus} placeholder="Enter Locality / Sublocality" info handleButtonClick={handleButtonClick} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Road / Street *" name="road" value={formData.promoterAddress?.road} onChange={(e) => handleAddressChange('road', e.target.value)} onFocus={handleFocus} placeholder="Enter Road / Street / Lane" info handleButtonClick={handleButtonClick} />
            <FormField label="Name of the Premises / Building" name="premises" value={formData.promoterAddress?.premises} onChange={(e) => handleAddressChange('premises', e.target.value)} onFocus={handleFocus} placeholder="Enter Name of Premises / Building" info handleButtonClick={handleButtonClick} />
            <FormField label="Building No. / Flat No. *" name="buildingNo" value={formData.promoterAddress?.buildingNo} onChange={(e) => handleAddressChange('buildingNo', e.target.value)} onFocus={handleFocus} placeholder="Enter Building No. / Flat No. / Door No." info guidanceName="buildingNo" handleButtonClick={handleButtonClick} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-1"><FormField label="Floor No." name="floorNo" value={formData.promoterAddress?.floorNo} onChange={(e) => handleAddressChange('floorNo', e.target.value)} onFocus={handleFocus} placeholder="Enter Floor No." info handleButtonClick={handleButtonClick} /></div>
             <div className="md:col-span-1"><FormField label="Nearby Landmark" name="landmark" value={formData.promoterAddress?.landmark} onChange={(e) => handleAddressChange('landmark', e.target.value)} onFocus={handleFocus} placeholder="Enter Nearby Landmark" info handleButtonClick={handleButtonClick} /></div>
          </div>

          <div className="mt-6 flex justify-end">
              <button type="button" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-opacity-80 text-sm font-semibold">
                <RefreshCw size={16} className="mr-2"/> RESET ADDRESS
              </button>
          </div>
      </div>

      {/* Document Upload */}
      <div className="p-6 border border-secondary dark:border-dark-secondary rounded-lg space-y-4 bg-primary dark:bg-dark-primary">
          <h2 className="text-lg font-semibold text-secondary dark:text-dark-secondary flex items-center"><Camera className="mr-2 text-indigo-600" />Document Upload</h2>
          <label className="block text-sm font-medium text-secondary dark:text-dark-secondary">Upload Photograph (of person whose information has been given above) *
            <button type="button" onClick={(e) => handleButtonClick(e, 'photo')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center" onFocus={() => handleFocus('photo')}>
              <div>
                  <div className="p-2 bg-indigo-100 text-indigo-800 rounded-md text-xs space-y-1 mb-2">
                      <p><Info size={12} className="inline mr-1"/>Only JPEG file format is allowed</p>
                      <p><Info size={12} className="inline mr-1"/>Maximum file size for upload is 100 KB</p>
                  </div>
                  <input type="file" name="photo" onChange={handleChange} className="mt-2 block w-full text-sm text-secondary dark:text-dark-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-secondary dark:file:bg-dark-secondary hover:file:bg-secondary/80 dark:hover:file:bg-dark-secondary/80 cursor-pointer"/>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-secondary dark:text-dark-secondary mb-2 font-semibold">OR</span>
                  <button type="button" className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                      <Camera className="mr-2 h-5 w-5"/>TAKE PICTURE
                  </button>
                  <p className="text-xs text-secondary dark:text-dark-secondary mt-2"><Info size={12} className="inline mr-1"/>You can use your device camera to take selfie photograph.</p>
              </div>
          </div>
      </div>

      {/* Other Information */}
      <div className="p-6 border border-secondary dark:border-dark-secondary rounded-lg space-y-4 bg-primary dark:bg-dark-primary">
          <h2 className="text-lg font-semibold text-secondary dark:text-dark-secondary flex items-center">Other Information</h2>
           <div onFocus={() => handleFocus('alsoAuthSignatory')}>
              <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-1">Also Authorized Signatory
                <button type="button" onClick={(e) => handleButtonClick(e, 'alsoAuthSignatory')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="alsoAuthSignatory" checked={!!formData.alsoAuthSignatory} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-primary dark:after:bg-dark-primary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                   <span className="ml-3 text-sm font-medium text-secondary dark:text-dark-secondary">{formData.alsoAuthSignatory ? 'Yes' : 'No'}</span>
              </label>
          </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="inline-flex items-center px-4 py-2 border border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-primary dark:text-dark-primary bg-primary dark:bg-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary">BACK</button>
        <div>
          <button className="inline-flex items-center px-4 py-2 border border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-primary dark:text-dark-primary bg-primary dark:bg-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary ml-2">SHOW LIST</button>
          <button className="inline-flex items-center px-4 py-2 border border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-primary dark:text-dark-primary bg-primary dark:bg-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary ml-2">ADD NEW</button>
          <button
            onClick={onNext}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >SAVE & CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoterDetailsStep;
