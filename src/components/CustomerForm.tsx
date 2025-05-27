import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';

const CustomerForm: React.FC = () => {
  const { customer, setCustomer, setCurrentStep } = useOrder();
  const [errors, setErrors] = useState({ name: '', phone: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors = { name: '', phone: '', address: '' };
    let isValid = true;

    if (!customer.name.trim()) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
      isValid = false;
    } else if (!/^\d{10}$/.test(customer.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Ingrese un número de teléfono válido (10 dígitos)';
      isValid = false;
    }

    if (customer.deliveryType === 'delivery' && !customer.address?.trim()) {
      newErrors.address = 'La dirección es requerida para delivery';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información del Cliente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingrese su nombre"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono (WhatsApp)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ej: 3447491620"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="deliveryType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Entrega
          </label>
          <select
            id="deliveryType"
            name="deliveryType"
            value={customer.deliveryType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all"
          >
            <option value="pickup">Retiro por el local</option>
            <option value="delivery">Delivery (+$500)</option>
          </select>
        </div>

        {customer.deliveryType === 'delivery' && (
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de Entrega
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ingrese su dirección completa"
            />
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-4 rounded-md hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;