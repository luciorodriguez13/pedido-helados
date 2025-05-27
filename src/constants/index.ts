import { ContainerOption, Flavor } from '../types/types';

export const CONTAINER_OPTIONS: ContainerOption[] = [
  { size: '1/4', maxFlavors: 2, price: 1000 },
  { size: '1/2', maxFlavors: 3, price: 1800 },
  { size: '1kg', maxFlavors: 4, price: 3200 },
];

export const FLAVORS: Flavor[] = [
  { id: '1', name: 'Chocolate' },
  { id: '2', name: 'Vainilla' },
  { id: '3', name: 'Frutilla' },
  { id: '4', name: 'Dulce de Leche' },
  { id: '5', name: 'Limón' },
  { id: '6', name: 'Menta Granizada' },
  { id: '7', name: 'Banana Split' },
  { id: '8', name: 'Tramontana' },
];

export const WHATSAPP_NUMBER = '3447491620';