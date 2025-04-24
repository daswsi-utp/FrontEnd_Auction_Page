'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    lastName: '',
    birthDate: '',
    department: '',
    province: '',
    district: '',
    address: '',
    phone: '',
    dni: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name,
        email: parsed.email,
        role: parsed.role,
        lastName: parsed.lastName,
        birthDate: parsed.birthDate,
        department: parsed.department,
        province: parsed.province,
        district: parsed.district,
        address: parsed.address,
        phone: parsed.phone,
        dni: parsed.dni,
      });
    } 
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/profile');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-sky-100 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Editar Perfil</h2>

      <button
        onClick={handleGoBack}
        className="mb-6 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Regresar
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Nombre:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Apellido:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Fecha de nacimiento:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Departamento:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="department"
            value={user.department}
            onChange={handleChange}
            placeholder="Ingresa tu departamento"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Provincia:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="province"
            value={user.province}
            onChange={handleChange}
            placeholder="Ingresa tu provincia"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Distrito:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="district"
            value={user.district}
            onChange={handleChange}
            placeholder="Ingresa tu distrito"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">Dirección:</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Ingresa tu dirección"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Teléfono:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Ingresa tu teléfono"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Email:</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Ingresa tu email"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">DNI:</label>
        <input
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="text"
          name="dni"
          value={user.dni}
          onChange={handleChange}
          placeholder="Ingresa tu DNI"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-8 w-full p-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default EditProfile;
