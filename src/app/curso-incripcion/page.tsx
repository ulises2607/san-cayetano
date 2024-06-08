import React from "react";

const InputField = ({ label, type, name, id, pattern, required }) => (
  <div className="relative z-0 w-full mb-6 group">
    <input
      type={type}
      name={name}
      id={id}
      pattern={pattern}
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      placeholder=" "
      required={required}
      aria-label={label}
    />
    <label
      htmlFor={id}
      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const RegistrationForm = () => {
  return (
    <div className="h-screen flex flex-col p-12 justify-start items-start">
      <form className="max-w-md mx-auto w-full">
        <h1 className="text-2xl font-semibold mb-5">Formulario de Registro</h1>
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          id="floating_email"
          required
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="Nombres"
            type="text"
            name="first_name"
            id="floating_first_name"
            required
          />
          <InputField
            label="Apellidos"
            type="text"
            name="last_name"
            id="floating_last_name"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label="Teléfono"
            type="tel"
            name="phone"
            id="floating_phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <InputField
            label="Carrera"
            type="text"
            name="company"
            id="floating_company"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
