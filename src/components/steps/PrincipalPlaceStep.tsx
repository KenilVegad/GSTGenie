import React, { useState, useMemo } from 'react';
import { StepProps } from '../../types/FormData';
import { MapPin, Mail, Phone, Volume2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const placeGuidance = {
  pinCode: {
    voice: "Please enter the 6-digit PIN code of your principal place of business.",
    text: "Entering the PIN code will auto-fill the State for you. It is essential for determining your tax jurisdiction."
  },
  district: {
    voice: "Enter the district where your business is located.",
    text: "Please provide the name of the district for your principal place of business. This is a mandatory field."
  },
  city: {
    voice: "Now, enter the city, town, or village of your business location.",
    text: "Provide the specific city, town, or village to complete the address details."
  },
  buildingNo: {
    voice: "Please enter the building number, flat number, or door number of your premises.",
    text: "This is a mandatory field. Provide the exact number of your business premises for accurate location identification."
  },
  wardCircle: {
    voice: "Select your state jurisdiction from the available options.",
    text: "Your state tax jurisdiction is determined by your business location. Select the appropriate ward, circle, or sector from the list."
  },
  commissionerate: {
    voice: "Now, select your central tax jurisdiction, starting with the Commissionerate.",
    text: "Refer to the provided link to find your correct central jurisdiction details, and then select the Commissionerate."
  },
  division: {
    voice: "Please select the Division under your selected Commissionerate.",
    text: "After selecting the Commissionerate, choose the correct Division from the list."
  },
  range: {
    voice: "Finally, select the Range within your Division.",
    text: "Complete your central jurisdiction details by selecting the appropriate Range."
  },
  officialEmail: {
    voice: "Please provide an official email address for your business.",
    text: "This email will be used for all official communication from the GST department regarding your business."
  },
  mobileNumber: {
    voice: "Enter a valid mobile number for the business premises.",
    text: "This mobile number can be used for verification and communication related to your principal place of business."
  },
  possessionNature: {
    voice: "What is the nature of your possession of the premises? Please select from the list.",
    text: "Indicate whether the premises are owned, rented, leased, or shared. You will need to provide a supporting document for this."
  },
  proofOfPlaceFile: {
    voice: "Please upload a document as proof of your principal place of business.",
    text: "Upload a valid document like a rent agreement, electricity bill, or property tax receipt. The file must be in PDF or JPEG format and under 1MB."
  },
  businessActivity: {
    voice: "Please select all business activities that will be conducted at this location.",
    text: "Check all applicable options, such as retail, wholesale, manufacturing, or services. This helps in understanding the nature of your business."
  },
  hasAdditionalPlace: {
    voice: "Do you have any other places of business in this state? If yes, please enable this option.",
    text: "If you operate from more than one location within the state, you must declare them as additional places of business."
  }
};


const PrincipalPlaceStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, setActiveField, activeField }) => {
    const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, placeGuidance);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        updateFormData({ [name]: inputValue });
    };

    const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
        e.stopPropagation();
        handleFocus(fieldName);
    };

  const [position, setPosition] = useState<L.LatLngExpression>([26.9124, 75.7873]);

  const DraggableMarker = () => {
    const [markerPosition, setMarkerPosition] = useState(position);
    const map = useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        updateFormData({ latitude: e.latlng.lat.toString(), longitude: e.latlng.lng.toString() });
      },
    });
    
    const eventHandlers = useMemo(
      () => ({
        dragend(e: L.DragEndEvent) {
          const marker = e.target;
          const latlng = marker.getLatLng();
          setMarkerPosition(latlng);
          updateFormData({ latitude: latlng.lat.toString(), longitude: latlng.lng.toString() });
        },
      }),
      [],
    )

    return <Marker draggable={true} eventHandlers={eventHandlers} position={markerPosition}></Marker>
  }

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";
  const businessActivities = [
    "Bonded Warehouse", "EOU / STP / EHTP", "Export", "Factory / Manufacturing", "Import",
    "Office / Sale Office", "Supplier of Services", "Leasing Business", "Warehouse / Depot",
    "Recipient of Goods or Services", "Retail Business", "Works Contract", "Wholesale Business", "Others (Please Specify)"
  ];

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary">
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <MapPin className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Principal Place of Business</h2>
      </div>

      {/* Leaflet Map */}
      <div className='border rounded-xl p-2 bg-primary dark:bg-dark-primary shadow-sm h-64 border-secondary dark:border-dark-secondary'>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <DraggableMarker />
        </MapContainer>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="pinCode" className="block text-sm font-medium text-secondary dark:text-dark-secondary">PIN Code <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'pinCode')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="pinCode" name="pinCode" placeholder='Enter PIN Code' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('pinCode')} />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-secondary dark:text-dark-secondary">State</label>
            <input type="text" id="state" name="state" placeholder='Rajasthan' className={inputStyle} readOnly />
          </div>
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-secondary dark:text-dark-secondary">District <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'district')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="district" name="district" placeholder='Enter District Name' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('district')}/>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-secondary dark:text-dark-secondary">City / Town / Village <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'city')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="city" name="city" placeholder='Enter City / Town / Village' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('city')} />
          </div>
          <div>
            <label htmlFor="locality" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Locality/Sub Locality</label>
            <input type="text" id="locality" name="locality" placeholder='Enter Locality / Sublocality' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('locality')} />
          </div>
          <div>
            <label htmlFor="road" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Road / Street</label>
            <input type="text" id="road" name="road" placeholder='Enter Road / Street / Lane' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('road')} />
          </div>
          <div>
            <label htmlFor="premisesName" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Name of the Premises / Building</label>
            <input type="text" id="premisesName" name="premisesName" placeholder='Enter Name of Premises / Building' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('premisesName')} />
          </div>
          <div>
            <label htmlFor="buildingNo" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Building No. / Flat No. <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'buildingNo')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="text" id="buildingNo" name="buildingNo" placeholder='Enter Building No. / Flat No. / Door No.' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('buildingNo')} />
          </div>
          <div>
            <label htmlFor="floorNo" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Floor No.</label>
            <input type="text" id="floorNo" name="floorNo" placeholder='Enter Floor No.' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('floorNo')} />
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Nearby Landmark</label>
                <input type="text" id="landmark" name="landmark" placeholder='Enter Nearby Landmark' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('landmark')} />
            </div>
            <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Latitude</label>
                <input type="text" id="latitude" name="latitude" placeholder='Enter Latitude' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('latitude')} value={formData.latitude || ''} />
            </div>
            <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Longitude</label>
                <input type="text" id="longitude" name="longitude" placeholder='Enter Longitude' className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('longitude')} value={formData.longitude || ''} />
            </div>
          </div>
          <div className="md:col-span-3 text-center">
            <button className='bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-2 rounded-lg hover:bg-opacity-80 font-semibold'>RESET ADDRESS</button>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-4">Jurisdiction</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-secondary dark:text-dark-secondary">State Jurisdiction</label>
                <p className='mt-1 text-sm text-secondary dark:text-dark-secondary'>ward</p>
            </div>
            <div>
                <label htmlFor="wardCircle" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Sector / Circle / Ward /Charge / Unit <span className='text-red-500'>*</span>
                    <button type="button" onClick={(e) => handleButtonClick(e, 'wardCircle')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                </label>
                <select id="wardCircle" name="wardCircle" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('wardCircle')}>
                    <option>Select</option>
                </select>
            </div>
        </div>
        <div className="mt-6 pt-6 border-t border-secondary dark:border-dark-secondary">
            <p className="text-sm font-medium text-secondary dark:text-dark-secondary">Center Jurisdiction (<a href="#" className='text-indigo-600 hover:underline'>Refer the link for Center Jurisdiction</a>)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                    <label htmlFor="commissionerate" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Commissionerate <span className='text-red-500'>*</span>
                        <button type="button" onClick={(e) => handleButtonClick(e, 'commissionerate')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                            <Volume2 size={16}/>
                        </button>
                    </label>
                    <select id="commissionerate" name="commissionerate" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('commissionerate')}>
                        <option>JAIPUR</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="division" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Division <span className='text-red-500'>*</span>
                        <button type="button" onClick={(e) => handleButtonClick(e, 'division')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                            <Volume2 size={16}/>
                        </button>
                    </label>
                    <select id="division" name="division" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('division')}>
                        <option>GST DIVISION-F JAIPUR</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="range" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Range <span className='text-red-500'>*</span>
                        <button type="button" onClick={(e) => handleButtonClick(e, 'range')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                            <Volume2 size={16}/>
                        </button>
                    </label>
                    <select id="range" name="range" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('range')}>
                        <option>GST RANGE-XXVI</option>
                    </select>
                </div>
            </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="officialEmail" className="block text-sm font-medium text-secondary dark:text-dark-secondary"><Mail className="inline-block h-4 w-4 mr-1"/>Office Email Address <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'officialEmail')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="email" id="officialEmail" name="officialEmail" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('officialEmail')} />
          </div>
          <div>
            <label htmlFor="officialTelephone" className="block text-sm font-medium text-secondary dark:text-dark-secondary"><Phone className="inline-block h-4 w-4 mr-1"/>Office Telephone Number (with STD Code)</label>
            <div className='flex items-center mt-1'>
                <input type="text" name="stdCode" placeholder='STD' className='w-20 px-3 py-2 border border-secondary dark:border-dark-secondary rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary'/>
                <input type="tel" id="officialTelephone" name="officialTelephone" className={'block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-r-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary'} onChange={handleChange} onFocus={() => handleFocus('officialTelephone')} />
            </div>
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Mobile Number <span className='text-red-500'>*</span>
                <button type="button" onClick={(e) => handleButtonClick(e, 'mobileNumber')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input type="tel" id="mobileNumber" name="mobileNumber" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('mobileNumber')} />
          </div>
          <div>
            <label htmlFor="faxNumber" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Office FAX Number (with STD Code)</label>
            <div className='flex items-center mt-1'>
                <input type="text" name="faxStdCode" placeholder='STD' className='w-20 px-3 py-2 border border-secondary dark:border-dark-secondary rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary'/>
                <input type="tel" id="faxNumber" name="faxNumber" className={'block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-r-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary'} onChange={handleChange} onFocus={() => handleFocus('faxNumber')} />
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="possessionNature" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Nature of possession of premises <span className='text-red-500'>*</span>
                    <button type="button" onClick={(e) => handleButtonClick(e, 'possessionNature')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                </label>
                <select id="possessionNature" name="possessionNature" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('possessionNature')}>
                    <option>Please Select</option>
                    <option>Consent</option>
                    <option>Leased</option>
                    <option>Others</option>
                    <option>Own</option>
                    <option>Rented</option>
                    <option>Shared</option>
                </select>
            </div>
            <div>
                <label htmlFor="proofOfPlace" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Document Upload <span className='text-red-500'>*</span>
                    <button type="button" onClick={(e) => handleButtonClick(e, 'proofOfPlaceFile')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                        <Volume2 size={16}/>
                    </button>
                </label>
                <select id="proofOfPlace" name="proofOfPlace" className={inputStyle} onChange={handleChange} onFocus={() => handleFocus('proofOfPlaceFile')}>
                  <option>Select</option>
                  <option>Electricity Bill</option>
                  <option>Legal ownership document</option>
                  <option>Municipal Khata Copy</option>
                  <option>Property Tax Receipt</option>
                  <option>Rent / Lease agreement</option>
                  <option>Rent receipt with NOC</option>
                </select>
                <div className='mt-2'>
                    <input type="file" id="proofOfPlaceFile" name="proofOfPlaceFile" className="text-sm text-secondary dark:text-dark-secondary" onChange={handleChange} onFocus={() => handleFocus('proofOfPlaceFile')} />
                    <p className='text-xs text-secondary dark:text-dark-secondary mt-1'>File with PDF or JPEG format is only allowed. Maximum file size for upload is 1 MB</p>
                </div>
            </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <label className="block text-sm font-medium text-secondary dark:text-dark-secondary">Nature of Business Activity being carried out at above mentioned premises <span className='text-red-500'>*</span>
            <button type="button" onClick={(e) => handleButtonClick(e, 'businessActivity')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
        </label>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {businessActivities.map(activity => (
             <label key={activity} className="inline-flex items-center">
                <input type="checkbox" name="businessActivity" value={activity} className="form-checkbox h-5 w-5 text-indigo-600 bg-primary dark:bg-dark-primary border-secondary dark:border-dark-secondary focus:ring-indigo-500" onChange={handleChange} onFocus={() => handleFocus('businessActivity')} />
                <span className="ml-2 text-sm text-secondary dark:text-dark-secondary">{activity}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="flex items-center justify-between">
          <label htmlFor="hasAdditionalPlace" className="block text-sm font-medium text-secondary dark:text-dark-secondary">Have Additional Place of Business
            <button type="button" onClick={(e) => handleButtonClick(e, 'hasAdditionalPlace')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="hasAdditionalPlace"
              name="hasAdditionalPlace"
              className="sr-only peer"
              checked={!!formData.hasAdditionalPlace}
              onChange={handleChange}
              onFocus={() => handleFocus('hasAdditionalPlace')}
            />
            <div className="w-11 h-6 bg-secondary dark:bg-dark-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-primary dark:after:bg-dark-primary after:border-secondary dark:after:border-dark-secondary after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
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

export default PrincipalPlaceStep;
