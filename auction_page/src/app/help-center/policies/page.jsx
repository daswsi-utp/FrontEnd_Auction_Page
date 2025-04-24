'use client';

export default function PoliciesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Políticas de la Página</h2>
      <div className="space-y-6">

        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Política de Privacidad</h3>
          <p className="text-gray-600">
            Nos comprometemos a proteger tu información personal. Recopilamos datos únicamente para mejorar tu experiencia
            en la plataforma y no compartimos tu información con terceros sin tu consentimiento.
            Puedes consultar y modificar tus datos personales desde tu perfil.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Términos y Condiciones</h3>
          <p className="text-gray-600">
            Al usar nuestra plataforma aceptas los términos de uso. Está prohibido ofertar sin intención de compra,
            publicar productos ilegales o falsificados, y manipular los resultados de las subastas. Nos reservamos el derecho
            de suspender cuentas que infrinjan estas reglas.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Política de Pagos</h3>
          <p className="text-gray-600">
            Los ganadores de una subasta tienen 48 horas para realizar el pago. Si no se efectúa el pago dentro del plazo,
            el producto podrá ser reasignado y la cuenta podría recibir una sanción. Todos los pagos son procesados
            de forma segura a través de nuestros socios de confianza.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Política de Reembolsos</h3>
          <p className="text-gray-600">
            Debido a la naturaleza de las subastas, no se aceptan reembolsos una vez que el producto ha sido adjudicado.
            En caso de fraude comprobado o incumplimiento por parte del vendedor, podrás iniciar un reclamo con nuestro equipo de soporte.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Seguridad y Protección</h3>
          <p className="text-gray-600">
            Utilizamos cifrado SSL y medidas de seguridad avanzadas para proteger tu información y transacciones.
            Nunca compartas tu contraseña y asegúrate de cerrar sesión después de usar dispositivos públicos.
          </p>
        </div>

      </div>
    </div>
  );
}
