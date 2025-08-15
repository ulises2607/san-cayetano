"use client";
import Link from "next/link";
import Image from "next/image";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Image
              src="/LogoNav.png"
              alt="Logo Instituto San Cayetano"
              width={60}
              height={60}
              className="mr-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">INSTITUTO SAN CAYETANO N° 8092</h1>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header verde */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-full p-3">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">¡Inscripción Exitosa!</h2>
            <p className="text-green-100 text-lg">Tu registro ha sido procesado correctamente</p>
          </div>

          {/* Contenido */}
          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                III CONGRESO DE TÉCNICOS EN LABORATORIO
              </h3>
              <p className="text-xl text-gray-600 italic mb-6">
                &ldquo;Detrás del diagnóstico, adelante en la ciencia&rdquo;
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Hemos recibido tu inscripción al congreso. Te contactaremos pronto con más detalles sobre el evento, ubicación y cronograma de actividades.
                </p>
              </div>
            </div>

            {/* Información importante */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-yellow-400 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-2">¡IMPORTANTE! - Proceso de Pago</h4>
                  <div className="text-yellow-700 space-y-2">
                    <p><strong>No olvides completar tu pago:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Alumnos:</strong> $15.000</li>
                      <li><strong>Profesionales Técnicos:</strong> $18.000</li>
                      <li><strong>Público en General:</strong> $20.000</li>
                    </ul>
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <p className="font-semibold text-gray-900">Enviar comprobante por WhatsApp:</p>
                      <p className="text-xl font-bold text-green-600">+54 9 3874734054</p>
                    </div>
                    <div className="mt-2 p-4 bg-white rounded-lg border">
                      <p className="font-semibold text-gray-900">Pago por Transferencia:</p>
                      <p className="text-lg font-bold text-blue-600">ALIAS: OLEO.CANTO.JINETE</p>
                      <p className="text-sm text-gray-600">FUNDACIÓN EDUCATIVA SALTA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/curso-inscripcion" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Inscripción
              </Link>
              
              <Link 
                href="https://institutosancayetanosalta.com/landing/" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Volver al Sitio
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-gray-600">
          <p>Instituto San Cayetano - Salta, Argentina</p>
          <p>tecnico@institutosancayetanosalta.com</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
