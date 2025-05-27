export interface Customer {
  name: string;
  phone: string;
  deliveryType: 'pickup' | 'delivery';
  address?: string;
}

export interface Flavor {
  id: string;
  name: string;
}

export type ContainerSize = '1/4' | '1/2' | '1kg';

export interface ContainerOption {
  size: ContainerSize;
  maxFlavors: number;
  price: number;
}

export interface Order {
  customer: Customer;
  containerSize: ContainerSize;
  flavors: Flavor[];
  date: Date;
  price: number;
}