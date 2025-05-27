import React, { createContext, useContext, useState } from 'react';
import { ContainerSize, Customer, Flavor, Order } from '../types/types';
import { CONTAINER_OPTIONS } from '../constants';

interface OrderContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  customer: Customer;
  setCustomer: (customer: Customer) => void;
  containerSize: ContainerSize | null;
  setContainerSize: (size: ContainerSize) => void;
  selectedFlavors: Flavor[];
  addFlavor: (flavor: Flavor) => void;
  removeFlavor: (flavorId: string) => void;
  maxFlavors: number;
  createOrder: () => Order;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    deliveryType: 'pickup',
    address: ''
  });
  const [containerSize, setContainerSize] = useState<ContainerSize | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<Flavor[]>([]);

  const getMaxFlavors = (): number => {
    if (!containerSize) return 0;
    const container = CONTAINER_OPTIONS.find(option => option.size === containerSize);
    return container ? container.maxFlavors : 0;
  };

  const addFlavor = (flavor: Flavor) => {
    if (selectedFlavors.length < getMaxFlavors()) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const removeFlavor = (flavorId: string) => {
    setSelectedFlavors(selectedFlavors.filter(flavor => flavor.id !== flavorId));
  };

  const calculatePrice = (): number => {
    if (!containerSize) return 0;
    const container = CONTAINER_OPTIONS.find(option => option.size === containerSize);
    const basePrice = container ? container.price : 0;
    const deliveryFee = customer.deliveryType === 'delivery' ? 500 : 0;
    return basePrice + deliveryFee;
  };

  const createOrder = (): Order => {
    return {
      customer,
      containerSize: containerSize as ContainerSize,
      flavors: selectedFlavors,
      date: new Date(),
      price: calculatePrice(),
    };
  };

  const resetOrder = () => {
    setCurrentStep(1);
    setCustomer({ name: '', phone: '', deliveryType: 'pickup', address: '' });
    setContainerSize(null);
    setSelectedFlavors([]);
  };

  return (
    <OrderContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        customer,
        setCustomer,
        containerSize,
        setContainerSize,
        selectedFlavors,
        addFlavor,
        removeFlavor,
        maxFlavors: getMaxFlavors(),
        createOrder,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};