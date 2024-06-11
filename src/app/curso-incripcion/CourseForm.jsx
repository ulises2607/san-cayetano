import Image from "next/image";
import { TiArrowForwardOutline } from "react-icons/ti";

const CourseForm = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="bg-[#297e93] p-6 rounded-t-lg">
        <div className="flex justify-center items-center text-center w-full space-x-4">
          <Image src="/LogoNav.png" alt="Logo" width={50} height={50} />

          <h2 className="text-[#ebf5f6] font-bold w[90%] tracking-wider">
            INSTITUTO SAN CAYETANO N° 8092
          </h2>
        </div>
        <h1 className="text-[#ebf5f6] text-center text-3xl font-bold mt-4 tracking-wider">
          II CONGRESO DE TECNICOS EN LABORATORIO
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-b-lg shadow-lg">
        <h3 className="text-[#297e93] font-bold mb-4">FICHA DE INSCRIPCION</h3>
        <form>
          {[
            "Nombre y Apellido",
            "Fecha de Nacimiento",
            "D.N.I.",
            "Domicilio",
            "Telefono",
            "Email",
            "Profesion",
            "Estudiante",
          ].map((label) => (
            <div key={label} className="mb-4 flex text-center items-center">
              <label className="flex justify-end  pr-2 font-bold text-gray-700 min-w-[25%]">
                {label} <span className="ml-3">:</span>
              </label>
              <input
                type="text"
                className="mt-1 block bg-[#f4f4f4] w-full border border-none rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-teal-600 focus:border-transparent"
              />
            </div>
          ))}
          {/* Separador */}
          <div className="border-b-2 border-gray-400 pb-5"></div>
          {/* Fin Separador */}
          {/*  */}
          {/* Tipo de asistente */}
          <div className="mb-4 p-10 flex justify-between">
            <div className="flex gap-3">
              <label className="block text-gray-700">Asistente:</label>
              <input
                id="asistente"
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-950 checked:bg-teal-600  checked:before:bg-teal-600  hover:before:opacity-10"
              />
            </div>
            <div className="flex gap-3">
              <label className="block text-gray-700">Disertante:</label>
              <input
                id="disertante"
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-950 checked:bg-teal-600  checked:before:bg-teal-600  hover:before:opacity-10"
              />
            </div>
            <div className="flex gap-3">
              <label className="block text-gray-700">Público en Gral.:</label>
              <input
                id="gral-public"
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-600  checked:bg-teal-600  checked:before:bg-teal-600  hover:before:opacity-10"
              />
            </div>
          </div>

          {/* Separador */}
          <div className="border-b-2 border-gray-400"></div>
          {/* Fin Separador */}

          <div className="mt-6">
            <div className="flex gap-2 items-center">
              <TiArrowForwardOutline className="size-5 text-white bg-[#297e93] rounded-full heartbeat" />
              <h4 className="text-black font-bold text-xl">Inversión:</h4>
            </div>
            <p className="text-gray-700">Alumnos: $10.000</p>
            <p className="text-gray-700">Profesionales Técnicos: $18.000</p>
            <p className="text-gray-700">Publico en Gral.: $1.000</p>
            <p className="text-black font-bold mt-4">
              Pago por Transferencia: ALIAS: MENTA.SEPIA.MARZO
            </p>
            <p className="text-black font-bold">FUNDACION EDUCATIVA SALTA</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
