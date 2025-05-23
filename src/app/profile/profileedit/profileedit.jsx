// src/app/profile/profileedit/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaSave, FaTimes, FaCamera, FaLock } from 'react-icons/fa';
import Image from 'next/image';
import axiosUsuario from '../../lib/axiosUsuario';
import { removeToken } from '../../utils/auth';

export default function ProfileEditPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    avatar: null,
    previewAvatar: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosUsuario.get('/auth/user-info');
        setUser(res.data);
        setFormData({
          nombre: res.data.nombre || '',
          email: res.data.email || '',
          telefono: res.data.telefono || '',
          direccion: res.data.direcciones[0]?.calle || '',
          avatar: null,
          previewAvatar: ''
        });
        setIsLoading(false);
      } catch (error) {
        removeToken();
        router.push('/auth/login');
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        previewAvatar: URL.createObjectURL(file)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (activeTab === 'profile') {
      if (!formData.nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email no válido';
      }
    } else {
      if (!passwordData.currentPassword) {
        newErrors.currentPassword = 'La contraseña actual es requerida';
      }
      if (!passwordData.newPassword) {
        newErrors.newPassword = 'La nueva contraseña es requerida';
      } else if (passwordData.newPassword.length < 6) {
        newErrors.newPassword = 'Mínimo 6 caracteres';
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const updateData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        direcciones: [{
          calle: formData.direccion,
          pais: "PE",
          departamento: "Lima",
          provincia: "Lima",
          distrito: "Miraflores",
          codigoPostal: "15074"
        }]
      };

      await axiosUsuario.put('/auth/update-profile', updateData);
      router.push('/profile');
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Error al actualizar perfil.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await axiosUsuario.put('/auth/change-password', passwordData);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Error al cambiar contraseña.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Editar Perfil
        </h1>
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
        >
          <FaTimes /> Cancelar
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Menú lateral */}
        <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4 h-fit sticky top-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'profile' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaUser className="flex-shrink-0" />
              <span>Información personal</span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-left ${
                activeTab === 'password' 
                  ? 'bg-amber-50 text-amber-800 font-medium border-l-4 border-amber-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaLock className="flex-shrink-0" />
              <span>Cambiar contraseña</span>
            </button>
          </nav>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden p-6">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <div className="relative mx-auto w-40 h-40 rounded-full border-4 border-white bg-gray-200 shadow-lg overflow-hidden">
                    {formData.previewAvatar ? (
                      <Image
                        src={formData.previewAvatar}
                        alt="Preview"
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="text-5xl text-gray-500" />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-amber-600 text-white p-2 rounded-full cursor-pointer hover:bg-amber-700 transition-colors">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Haz clic en la cámara para cambiar tu foto
                  </p>
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Nombre completo</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                        errors.nombre ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Dirección</label>
                    <textarea
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : (
                    <>
                      <FaSave /> Guardar cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="max-w-lg mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Contraseña actual</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Nueva contraseña</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Confirmar nueva contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : (
                    <>
                      <FaLock /> Cambiar contraseña
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}