import React, { useState } from 'react';
import { StepProps } from '../../types/FormData';
import { MapPin, Plus, Trash2, Volume2 } from 'lucide-react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

interface AdditionalPlace {
  country: string;
  pinCode: string;
  state: string;
  district: string;
  city: string;
  locality: string;
  road: string;
  premises: string;
  buildingNo: string;
  floor: string;
  landmark: string;
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const placeGuidance = {
    pinCode: {
      voice: "Please enter the 6-digit PIN code of your additional place of business.",
      text: "Entering the PIN code will auto-fill the State for you. It is essential for determining your tax jurisdiction."
    }
  };

const AdditionalPlaceStep: React.FC<StepProps> = ({ formData, updateFormData, onNext, onBack, setActiveField, activeField }) => {
  const [places, setPlaces] = useState<AdditionalPlace[]>(formData.additionalPlaces || [
    { country: 'India', pinCode: '', state: '', district: '', city: '', locality: '', road: '', premises: '', buildingNo: '', floor: '', landmark: '' }
  ]);

  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, placeGuidance);

  const addPlace = () => {
    setPlaces([...places, { country: 'India', pinCode: '', state: '', district: '', city: '', locality: '', road: '', premises: '', buildingNo: '', floor: '', landmark: '' }]);
  };

  const removePlace = (index: number) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  const updatePlace = (index: number, field: keyof AdditionalPlace, value: string) => {
    const updatedPlaces = places.map((place, i) =>
      i === index ? { ...place, [field]: value } : place
    );
    setPlaces(updatedPlaces);
  };

  const handleNext = () => {
    updateFormData({ additionalPlaces: places });
    onNext();
  };
  
  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  const inputStyle = "mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary";

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary" onClick={() => setActiveField && setActiveField(null)}>
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-start space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <MapPin className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Additional Places of Business</h2>
          <p className="text-sm text-secondary dark:text-dark-secondary mt-1">
            Use this section to declare any locations you operate from besides your main address, such as branch offices or warehouses.
          </p>
        </div>
      </div>

      <div className='border rounded-xl p-2 bg-primary dark:bg-dark-primary shadow-sm h-64 border-secondary dark:border-dark-secondary'>
        <MapContainer center={[26.9124, 75.7873]} zoom={4} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>

      {places.map((place, index) => (
        <div key={index} className="border rounded-xl p-6 bg-primary dark:bg-dark-primary shadow-sm relative border-secondary dark:border-dark-secondary" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary mb-4">Location {index + 1}</h3>
            {places.length > 1 && (
              <button
                onClick={() => removePlace(index)}
                className="text-secondary dark:text-dark-secondary hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor={`country-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Country</label>
              <input type="text" id={`country-${index}`} value={place.country} disabled className={`${inputStyle} bg-secondary dark:bg-dark-secondary`} />
            </div>
            <div>
              <label htmlFor={`pinCode-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">PIN Code
                <button type="button" onClick={(e) => handleButtonClick(e, 'pinCode')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
              </label>
              <input type="text" id={`pinCode-${index}`} value={place.pinCode} onChange={(e) => updatePlace(index, 'pinCode', e.target.value)} className={inputStyle} onFocus={() => handleFocus('pinCode')} />
            </div>
            <div>
              <label htmlFor={`state-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">State</label>
              <input type="text" id={`state-${index}`} value={place.state} onChange={(e) => updatePlace(index, 'state', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`district-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">District</label>
              <input type="text" id={`district-${index}`} value={place.district} onChange={(e) => updatePlace(index, 'district', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`city-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">City / Town / Village</label>
              <input type="text" id={`city-${index}`} value={place.city} onChange={(e) => updatePlace(index, 'city', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`locality-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Locality / Sub Locality</label>
              <input type="text" id={`locality-${index}`} value={place.locality} onChange={(e) => updatePlace(index, 'locality', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`road-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Road / Street</label>
              <input type="text" id={`road-${index}`} value={place.road} onChange={(e) => updatePlace(index, 'road', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`premises-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Name of the Premises / Building</label>
              <input type="text" id={`premises-${index}`} value={place.premises} onChange={(e) => updatePlace(index, 'premises', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`buildingNo-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Building No. / Flat No.</label>
              <input type="text" id={`buildingNo-${index}`} value={place.buildingNo} onChange={(e) => updatePlace(index, 'buildingNo', e.target.value)} className={inputStyle} />
            </div>
            <div>
              <label htmlFor={`floor-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Floor No.</label>
              <input type="text" id={`floor-${index}`} value={place.floor} onChange={(e) => updatePlace(index, 'floor', e.target.value)} className={inputStyle} />
            </div>
            <div className="md:col-span-1">
              <label htmlFor={`landmark-${index}`} className="block text-sm font-medium text-secondary dark:text-dark-secondary">Nearby Landmark</label>
              <input type="text" id={`landmark-${index}`} value={place.landmark} onChange={(e) => updatePlace(index, 'landmark', e.target.value)} className={inputStyle} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addPlace}
        className="w-full flex justify-center items-center px-4 py-2 border border-dashed border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-secondary dark:text-dark-secondary bg-primary dark:bg-dark-primary hover:bg-secondary dark:hover:bg-dark-secondary"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Another Place
      </button>

      <div className="flex justify-between mt-8">
        <button onClick={onBack} className="bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary px-6 py-2 rounded-lg hover:bg-opacity-80 font-semibold">BACK</button>
        <button onClick={handleNext} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">SAVE & CONTINUE</button>
      </div>
    </div>
  );
};

export default AdditionalPlaceStep;