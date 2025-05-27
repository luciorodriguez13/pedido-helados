import React from 'react';
import { useOrder } from '../context/OrderContext';
import CustomerForm from '../components/CustomerForm';
import ContainerSelection from '../components/ContainerSelection';
import FlavorSelection from '../components/FlavorSelection';
import OrderSummary from '../components/OrderSummary';
import OrderStepper from '../components/OrderStepper';

const OrderView: React.FC = () => {
  const { currentStep } = useOrder();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CustomerForm />;
      case 2:
        return <ContainerSelection />;
      case 3:
        return <FlavorSelection />;
      case 4:
        return <OrderSummary />;
      default:
        return <CustomerForm />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Pedido de Helado
      </h1>
      <OrderStepper />
      <div className="mt-6 animate-fadeIn">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default OrderView;