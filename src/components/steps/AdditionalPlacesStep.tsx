import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

interface StepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  activeField: string | null;
  setActiveField: (field: string | null) => void;
}

interface AdditionalPlace {
  type: string;
  address: string;
}

const additionalPlaceGuidance = {
    addPlace: {
      voice: "If you have other business locations like warehouses or branch offices, you can add them here.",
      text: "This section is for any additional places of business you operate from, other than your principal place. You can add multiple locations."
    },
    placeType: {
      voice: "Select the type of business location, for example, a branch office or a warehouse.",
      text: "Choose the category that best describes this additional business location."
    },
    address: {
      voice: "Please provide the complete address for this additional business location, including the PIN code.",
      text: "Enter the full address to ensure it can be correctly located. Make sure to include the PIN code."
    }
  };

const AdditionalPlacesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  isFirstStep,
  activeField,
  setActiveField,
}) => {
  const [places, setPlaces] = useState<AdditionalPlace[]>(
    formData.additionalPlaces || []
  );
  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, additionalPlaceGuidance);

  const placeTypes = [
    'Branch Office',
    'Warehouse',
    'Factory/Manufacturing Unit',
    'Sales Office',
    'Godown',
    'Service Center'
  ];

  const addPlace = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaces([...places, { type: '', address: '' }]);
    handleFocus('addPlace');
  };

  const removePlace = (index: number) => {
    setPlaces(places.filter((_, i) => i !== index));
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

  const handleButtonClick = (e: React.MouseEvent, field: string) => {
      e.stopPropagation();
      handleFocus(field);
  }

  return (
    <div className="bg-primary dark:bg-dark-primary rounded-xl shadow-lg p-8 text-primary dark:text-dark-primary" onClick={() => setActiveField && setActiveField(null)}>
        <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-8 w-8 text-accent mr-3" />
          <h2 className="text-2xl font-bold text-secondary dark:text-dark-secondary">Additional Places of Business</h2>
            <button type="button" onClick={(e) => handleButtonClick(e, 'addPlace')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-accent">
                <Volume2 size={20}/>
            </button>
        </div>
        <p className="text-secondary dark:text-dark-secondary">
          Add any additional business locations like branch offices, warehouses, or manufacturing units.
        </p>
      </div>

      {places.length === 0 ? (
        <div className="text-center py-12 bg-primary-light dark:bg-dark-primary-light rounded-xl">
          <MapPin className="h-12 w-12 text-secondary dark:text-dark-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary dark:text-dark-secondary mb-2">No Additional Places Added</h3>
          <p className="text-secondary dark:text-dark-secondary mb-4">
            Add branch offices, warehouses, or other business locations if applicable.
          </p>
          <button
            onClick={addPlace}
            className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Place
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {places.map((place, index) => (
            <div key={index} className="border border-secondary dark:border-dark-secondary rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-secondary dark:text-dark-secondary">
                  Additional Place {index + 1}
                </h3>
                <button
                  onClick={() => removePlace(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-2">
                    Place Type *
                    <button type="button" onClick={(e) => handleButtonClick(e, 'placeType')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-accent align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </label>
                  <select
                    value={place.type}
                    onChange={(e) => updatePlace(index, 'type', e.target.value)}
                    onFocus={() => handleFocus('placeType')}
                    className="w-full px-4 py-3 border border-secondary dark:border-dark-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
                  >
                    <option value="">Select type</option>
                    {placeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary dark:text-dark-secondary mb-2">
                    Complete Address *
                    <button type="button" onClick={(e) => handleButtonClick(e, 'address')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-accent align-middle">
                        <Volume2 size={16}/>
                    </button>
                  </label>
                  <textarea
                    value={place.address}
                    onChange={(e) => updatePlace(index, 'address', e.target.value)}
                    onFocus={() => handleFocus('address')}
                    placeholder="Enter complete address with pincode"
                    rows={3}
                    className="w-full px-4 py-3 border border-secondary dark:border-dark-secondary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none bg-primary dark:bg-dark-primary text-secondary dark:text-dark-secondary"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={addPlace}
              className="inline-flex items-center px-6 py-3 border-2 border-dashed border-accent text-accent rounded-lg hover:border-accent-dark hover:bg-accent/10"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Another Place
            </button>
          </div>
        </div>
      )}

      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-6">
        <h4 className="font-medium text-accent-dark mb-2">Note</h4>
        <p className="text-sm text-accent">
          You can skip this step if you don't have additional business places. 
          These can be added later through GST portal amendments if needed.
        </p>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className="px-6 py-3 border border-secondary dark:border-dark-secondary rounded-lg text-secondary dark:text-dark-secondary hover:bg-secondary-light dark:hover:bg-dark-secondary-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalPlacesStep;
