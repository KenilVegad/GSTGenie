import React from 'react';
import { StepProps } from '../../types/FormData';
import { ShoppingCart, Volume2 } from 'lucide-react';
import AIPoweredGuidance from '../AIPoweredGuidance';
import { useAIGuidance } from '../../hooks/useAIGuidance';

const goodsServicesGuidance = {
  goodsServicesTabs: {
    voice: "Select whether you are providing goods or services. You need to provide HSN codes for goods or SAC codes for services.",
    text: "Choose 'Goods' if you sell products and need to enter HSN (Harmonized System of Nomenclature) codes. Choose 'Services' if you provide services and need to enter SAC (Services Accounting Code) codes."
  },
  specifyTop5: {
    voice: "Please specify the top 5 goods or services that your business provides.",
    text: "You are required to list at least the top five goods or services you supply. This helps in identifying the primary nature of your business."
  },
  search: {
    voice: "You can search for your goods or services by name or by their HSN or SAC code.",
    text: "Use the search bar to find the correct HSN code for your goods or SAC code for your services. You can type the name of the item or its code to get suggestions."
  }
};

const GoodsAndServicesStep: React.FC<StepProps> = ({ onNext, onBack, setActiveField, activeField }) => {
  const [activeTab, setActiveTab] = React.useState<'goods' | 'services'>('goods');
  const { handleFocus, currentGuidance } = useAIGuidance(activeField, setActiveField, goodsServicesGuidance);

  const handleButtonClick = (e: React.MouseEvent, fieldName: string) => {
    e.stopPropagation();
    handleFocus(fieldName);
  };

  return (
    <div className="space-y-6 bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary">
      <AIPoweredGuidance show={!!activeField} guidance={currentGuidance} />
      <div className="flex items-center space-x-3">
        <div className="bg-indigo-100 p-3 rounded-full">
          <ShoppingCart className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-semibold text-secondary dark:text-dark-secondary">Goods and Services</h2>
      </div>

      <div className="border rounded-xl bg-primary dark:bg-dark-primary shadow-sm border-secondary dark:border-dark-secondary">
        <div className="flex border-b border-secondary dark:border-dark-secondary">
          <button
            onClick={() => setActiveTab('goods')}
            onFocus={() => handleFocus('goodsServicesTabs')}
            className={`flex-1 p-4 text-center font-semibold ${
              activeTab === 'goods' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-secondary dark:text-dark-secondary'
            }`}
          >
            Goods (HSN)
            <button type="button" onClick={(e) => handleButtonClick(e, 'goodsServicesTabs')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            onFocus={() => handleFocus('goodsServicesTabs')}
            className={`flex-1 p-4 text-center font-semibold ${
              activeTab === 'services' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-secondary dark:text-dark-secondary'
            }`}
          >
            Services (SAC)
            <button type="button" onClick={(e) => handleButtonClick(e, 'goodsServicesTabs')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-secondary dark:text-dark-secondary mb-4" onFocus={() => handleFocus('specifyTop5')}>
            Please specify the top 5 {activeTab === 'goods' ? 'goods' : 'services'} your business deals with.
            <button type="button" onClick={(e) => handleButtonClick(e, 'specifyTop5')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                <Volume2 size={16}/>
            </button>
          </p>

          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-secondary dark:text-dark-secondary sr-only">Search
                <button type="button" onClick={(e) => handleButtonClick(e, 'search')} className="ml-2 text-secondary dark:text-dark-secondary hover:text-indigo-600 align-middle">
                    <Volume2 size={16}/>
                </button>
            </label>
            <input
              type="text"
              id="search"
              name="search"
              onFocus={() => handleFocus('search')}
              placeholder={`Search by ${activeTab === 'goods' ? 'HSN Code or Name' : 'SAC Code or Name'}`}
              className="mt-1 block w-full px-3 py-2 border border-secondary dark:border-dark-secondary rounded-md shadow-sm placeholder-secondary dark:placeholder-dark-secondary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-primary dark:bg-dark-primary text-primary dark:text-dark-primary"
            />
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

export default GoodsAndServicesStep;
