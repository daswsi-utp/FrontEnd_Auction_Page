'use client';

import React from 'react';

export default function FAQPage() {
  const faqs = [
    {
      question: '¿Cómo puedo crear una cuenta?',
      answer: 'Haz clic en "Registrarse" en la parte superior derecha y completa el formulario con tus datos personales.',
    },
    {
      question: '¿Cómo puedo participar en una subasta?',
      answer: 'Primero debes iniciar sesión. Luego, elige una subasta activa y haz clic en "Ofertar". Ingresa tu monto y confirma.',
    },
    {
      question: '¿Qué tipos de artículos se subastan?',
      answer: 'Subastamos una gran variedad de artículos, incluyendo tecnología, arte, vehículos, inmuebles y más.',
    },
    {
      question: '¿Hay algún costo por participar?',
      answer: 'Registrarse es gratuito. Solo se aplica una comisión si resultas ganador de una subasta.',
    },
    {
      question: '¿Cómo sabré si gané una subasta?',
      answer: 'Recibirás una notificación por correo electrónico y también podrás verlo en tu panel de usuario.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias.',
    },
    {
      question: '¿Qué pasa si no pago después de ganar una subasta?',
      answer: 'Tu cuenta podría ser suspendida y podrías estar sujeto a cargos según nuestros términos y condiciones.',
    },
    {
      question: '¿Cuánto tiempo tengo para pagar?',
      answer: 'Tienes un plazo de 48 horas desde que ganes la subasta para completar el pago.',
    },
    {
      question: '¿Cómo se realiza la entrega del producto?',
      answer: 'La entrega puede ser presencial o por envío, dependiendo del tipo de artículo y tu ubicación.',
    },
    {
      question: '¿Qué garantías tengo como comprador?',
      answer: 'Los productos incluyen garantía solo si el vendedor así lo especifica. Revisa la descripción antes de ofertar.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Preguntas Frecuentes</h2>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
