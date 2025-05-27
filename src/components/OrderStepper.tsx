import React from 'react';
import { useOrder } from '../context/OrderContext';
import { User, IceCream, Coffee, ClipboardCheck } from 'lucide-react';

const OrderStepper: React.FC = () => {
  const { currentStep } = useOrder();

  const steps = [
    { number: 1, label: 'Datos', icon: User },
    { number: 2, label: 'Tamaño', icon: IceCream },
    { number: 3, label: 'Gustos', icon: Coffee },
    { number: 4, label: 'Confirmar', icon: ClipboardCheck },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between w-full">
            {steps.map((step, i) => (
              <React.Fragment key={step.number}>
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                      currentStep >= step.number
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      currentStep >= step.number ? 'text-pink-600' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-500 ${
                      currentStep > step.number ? 'bg-pink-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStepper;