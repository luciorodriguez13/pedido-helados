import React from 'react';
import { useOrder } from '../context/OrderContext';
import { CONTAINER_OPTIONS } from '../constants';

const ContainerSelection: React.FC = () => {
  const { containerSize, setContainerSize, setCurrentStep } = useOrder();

  const handleContainerSelect = (size: string) => {
    setContainerSize(size as any);
  };

  const handleContinue = () => {
    if (containerSize) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Selecciona el Tamaño</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {CONTAINER_OPTIONS.map((container) => (
          <div
            key={container.size}
            onClick={() => handleContainerSelect(container.size)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
              containerSize === container.size
                ? 'border-pink-500 bg-pink-50'
                : 'border-gray-200 hover:border-pink-200'
            }`}
          >
            <div className="text-center">
              <div className="text-xl font-bold mb-2">{container.size}</div>
              <div className="text-sm text-gray-600 mb-3">
                Hasta {container.maxFlavors} gustos
              </div>
              <div className="text-lg font-semibold text-pink-600">
                ${container.price.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
        >
          Atrás
        </button>
        <button
          onClick={handleContinue}
          disabled={!containerSize}
          className={`px-6 py-2 rounded-md text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 ${
            containerSize
              ? 'bg-pink-500 hover:bg-pink-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ContainerSelection;