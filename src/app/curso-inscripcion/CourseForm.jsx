"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CourseForm = () => {
  const router = useRouter();
  const [dataForm, setDataForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setDataForm(data);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Email sent successfully", result);
        setShowSuccess(true);
        setIsLoading(false);
        // Resetear el formulario
        e.target.reset();
      } else {
        const error = await response.json();
        console.error("Error sending email", error);
        setIsLoading(false);
        alert("Error al enviar la inscripción. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error sending email", error);
      setIsLoading(false);
      alert("Error al enviar la inscripción. Por favor, inténtalo de nuevo.");
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/LogoNav.png"
                alt="Logo Instituto San Cayetano"
                width={40}
                height={40}
                className="rounded"
              />
              <h1 className="text-lg font-semibold text-gray-900">Instituto San Cayetano</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="https://institutosancayetanosalta.com/landing/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Inicio
                </a>
                <a href="https://institutosancayetanosalta.com/landing/#carreras" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Carreras
                </a>
                <a href="https://institutosancayetanosalta.com/landing/#sobre-nosotros" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Nosotros
                </a>
                <a href="https://institutosancayetanosalta.com/landing/#contacto" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Contacto
                </a>
                <a
                  href="http://campovirtual.institutosancayetanosalta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Campus Virtual
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Formulario de Inscripción */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header del formulario */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Image
                src="/LogoNav.png"
                alt="Logo"
                width={60}
                height={60}
                className="mr-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">INSTITUTO SAN CAYETANO N° 8092</h2>
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              III CONGRESO DE TÉCNICOS EN LABORATORIO
            </h1>
            <p className="text-xl text-gray-600 italic">
              "Detrás del diagnóstico, adelante en la ciencia"
            </p>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
              <h3 className="text-xl font-bold text-white">FICHA DE INSCRIPCIÓN</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullname" className="block text-sm font-semibold text-gray-700">
                    Nombre y Apellido:
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su nombre completo"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bornDate" className="block text-sm font-semibold text-gray-700">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    id="bornDate"
                    name="bornDate"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="dni" className="block text-sm font-semibold text-gray-700">
                    D.N.I.:
                  </label>
                  <input
                    type="number"
                    id="dni"
                    name="D.N.I."
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su DNI"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="domicilio" className="block text-sm font-semibold text-gray-700">
                    Domicilio:
                  </label>
                  <input
                    type="text"
                    id="domicilio"
                    name="Domicilio"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su domicilio"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700">
                    Teléfono:
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="Telefono"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su teléfono"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="profesion" className="block text-sm font-semibold text-gray-700">
                    Profesión:
                  </label>
                  <input
                    type="text"
                    id="profesion"
                    name="Profesion"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Ingrese su profesión"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="estudiante" className="block text-sm font-semibold text-gray-700">
                    Estudiante:
                  </label>
                  <input
                    type="text"
                    id="estudiante"
                    name="Estudiante"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="¿Es estudiante? Especifique"
                  />
                </div>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Tipo de asistente */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Tipo de participación:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id="asistente"
                      name="Tipo de Asistente"
                      value="Asistente"
                      required
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="asistente" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Asistente
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id="disertante"
                      name="Tipo de Asistente"
                      value="Disertante"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="disertante" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Disertante
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      id="poster"
                      name="Tipo de Asistente"
                      value="Presentación de poster"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="poster" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Presentación de poster
                    </label>
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`
                    px-8 py-4 rounded-lg font-semibold text-white text-lg
                    transition-all duration-300 transform
                    ${isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:scale-105 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 32 32">
                        <path
                          clipRule="evenodd"
                          d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Inscribirme'
                  )}
                </button>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Información de pago */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 mr-3" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12c0 1.2-.8 2.3-2 2.7-.9.2-2 .2-3 .2H8c-1 0-2.1 0-3-.2-1.2-.4-2-1.5-2-2.7s.8-2.3 2-2.7c.9-.2 2-.2 3-.2h8c1 0 2.1 0 3 .2 1.2.4 2 1.5 2 2.7z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <h4 className="text-xl font-bold text-blue-900">Inversión:</h4>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-lg"><strong>Alumnos:</strong> $15.000</p>
                  <p className="text-lg"><strong>Profesionales Técnicos:</strong> $18.000</p>
                  <p className="text-lg"><strong>Público en General:</strong> $20.000</p>
                  <p className="text-sm mt-4 p-4 bg-green-100 rounded-lg border-l-4 border-green-500">
                    <strong>Enviar comprobante por WhatsApp al número:</strong><br />
                    +54 9 3874734054
                  </p>
                  <div className="mt-4 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900">Pago por Transferencia:</p>
                    <p className="text-lg font-bold text-blue-800">ALIAS: OLEO.CANTO.JINETE</p>
                    <p className="font-semibold text-blue-900">FUNDACIÓN EDUCATIVA SALTA</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¡Inscripción Exitosa!</h3>
              <p className="text-gray-600 mb-4">
                Hemos recibido tu inscripción al III Congreso de Técnicos en Laboratorio.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>¡IMPORTANTE!</strong> No olvides enviar el comprobante de pago por WhatsApp al <strong>+54 9 3874734054</strong> para confirmar tu inscripción.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">Te contactaremos pronto con más detalles.</p>
              <button
                onClick={closeSuccessMessage}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Instituto San Cayetano</h3>
              <p className="text-gray-300">
                Formando profesionales comprometidos con el desarrollo de la sociedad.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="https://institutosancayetanosalta.com/landing/#carreras" className="text-gray-300 hover:text-white">Carreras</a></li>
                <li><a href="https://institutosancayetanosalta.com/landing/#sobre-nosotros" className="text-gray-300 hover:text-white">Nosotros</a></li>
                <li>
                  <a
                    href="http://campovirtual.institutosancayetanosalta.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    Campus Virtual
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-300">Salta, Argentina</p>
              <p className="text-gray-300">tecnico@institutosancayetanosalta.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 Instituto San Cayetano. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CourseForm;
