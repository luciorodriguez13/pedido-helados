import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { CONTAINER_OPTIONS, WHATSAPP_NUMBER } from '../constants';
import { formatDate } from '../utils/formatDate';
import { Check } from 'lucide-react';

import { db } from "../firebase";
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

    const containerOption = CONTAINER_OPTIONS.find((c) => c.size === containerSize);
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

    // Guardar en Firebase Firestore
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
