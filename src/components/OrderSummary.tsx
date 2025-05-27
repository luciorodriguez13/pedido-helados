import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import {  WHATSAPP_NUMBER } from '../constants';
import { formatDate } from '../utils/formatDate';
import { Check } from 'lucide-react';

import { db } from "../firebase.ts";
import { collection, addDoc } from "firebase/firestore";

const OrderSummary = () => {
  const {
    customer,
    containerSize,
    selectedFlavors,
    createOrder,
    resetOrder,
    setCurrentStep,
  } = useOrder();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const order = createOrder();

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);

    //const containerOption = CONTAINER_OPTIONS.find((c) => c.size === containerSize);
    const flavorsText = selectedFlavors.map((f) => f.name).join(', ');
    const deliveryInfo =
      customer.deliveryType === 'delivery'
        ? `\n*Dirección de entrega:* ${customer.address}`
        : '\n*Retiro por el local*';

    const message = `
*Nuevo Pedido de Helado*
-------------------
*Cliente:* ${customer.name}
*Teléfono:* ${customer.phone}
*Fecha:* ${formatDate(order.date)}
-------------------
*Tamaño:* ${containerSize}
*Gustos:* ${flavorsText}
*Tipo de entrega:* ${customer.deliveryType === 'delivery' ? 'Delivery' : 'Retiro'}${deliveryInfo}
*Precio Total:* $${order.price}
-------------------
    `;

    try {
      await addDoc(collection(db, "pedidos"), {
        nombre: customer.name,
        telefono: customer.phone,
        fecha: order.date,
        entrega: customer.deliveryType,
        direccion: customer.deliveryType === 'delivery' ? customer.address : '',
        tamaño: containerSize,
        gustos: selectedFlavors.map((f) => f.name),
        total: order.price,
      });
      console.log("Pedido guardado en Firebase");
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    setIsOrderPlaced(true);
    setIsSubmitting(false);
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  const handleNewOrder = () => {
    resetOrder();
    setIsOrderPlaced(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {!isOrderPlaced ? (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Resumen del Pedido
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Información del Cliente</h3>
              <p><span className="font-medium">Nombre:</span> {customer.name}</p>
              <p><span className="font-medium">Teléfono:</span> {customer.phone}</p>
              <p><span className="font-medium">Fecha:</span> {formatDate(order.date)}</p>
              <p><span className="font-medium">Tipo de entrega:</span> {customer.deliveryType === 'delivery' ? 'Delivery' : 'Retiro por local'}</p>
              {customer.deliveryType === 'delivery' && (
                <p><span className="font-medium">Dirección:</span> {customer.address}</p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Detalles del Pedido</h3>
              <p><span className="font-medium">Tamaño del Helado:</span> {containerSize}</p>
              <div className="mt-2">
                <p className="font-medium">Gustos Seleccionados:</p>
                <ul className="list-disc list-inside mt-1 ml-2">
                  {selectedFlavors.map((flavor) => (
                    <li key={flavor.id}>{flavor.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-pink-50 p-4 rounded-md border border-pink-200">
              <h3 className="text-lg font-medium text-pink-800 mb-2">Total a Pagar</h3>
              <p className="text-2xl font-bold text-pink-600">
                ${order.price.toLocaleString()}
              </p>
              {customer.deliveryType === 'delivery' && (
                <p className="text-sm text-pink-600 mt-1">Incluye cargo por delivery: $500</p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Atrás
            </button>
            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">¡Pedido Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Tu pedido ha sido enviado por WhatsApp y guardado correctamente.
          </p>
          <button
            onClick={handleNewOrder}
            className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            Realizar Nuevo Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
