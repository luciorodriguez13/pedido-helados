import React from 'react';
import { useOrder } from '../context/OrderContext';
import { FLAVORS } from '../constants';
import { Flavor } from '../types/types';
import { Check } from 'lucide-react';

const FlavorSelection: React.FC = () => {
  const { 
    selectedFlavors, 
    addFlavor, 
    removeFlavor, 
    maxFlavors,
    setCurrentStep 
  } = useOrder();

  const isSelected = (flavor: Flavor): boolean => {
    return selectedFlavors.some((selected) => selected.id === flavor.id);
  };

  const isMaxFlavorsReached = selectedFlavors.length >= maxFlavors;

  const handleFlavorSelect = (flavor: Flavor) => {
    if (isSelected(flavor)) {
      removeFlavor(flavor.id);
    } else if (!isMaxFlavorsReached) {
      addFlavor(flavor);
    }
  };

  const handleContinue = () => {
    if (selectedFlavors.length > 0) {
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selecciona los Gustos</h2>
      <p className="text-gray-600 mb-6">
        Selecciona hasta {maxFlavors} gustos diferentes ({selectedFlavors.length}/{maxFlavors})
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gusto
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seleccionar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {FLAVORS.map((flavor) => (
              <tr
                key={flavor.id}
                onClick={() => !isMaxFlavorsReached || isSelected(flavor) ? handleFlavorSelect(flavor) : null}
                className={`cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                  isMaxFlavorsReached && !isSelected(flavor) ? 'opacity-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {flavor.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isSelected(flavor) ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-500 rounded-full">
                      <Check className="h-4 w-4 text-white" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 border-2 border-gray-300 rounded-full">
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedFlavors.length > 0 && (
        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Gustos seleccionados:</h3>
          <div className="space-y-1">
            {selectedFlavors.map((flavor) => (
              <div
                key={flavor.id}
                className="flex items-center justify-between text-sm"
              >
                <span>{flavor.name}</span>
                <button
                  onClick={() => removeFlavor(flavor.id)}
                  className="text-pink-600 hover:text-pink-800"
                >
                  <span className="sr-only">Eliminar</span>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
        >
          Atrás
        </button>
        <button
          onClick={handleContinue}
          disabled={selectedFlavors.length === 0}
          className={`px-6 py-2 rounded-md text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 ${
            selectedFlavors.length > 0
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

export default FlavorSelection;