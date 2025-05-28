// src/app/auth/register/page.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axiosUsuario from '../../../lib/axiosUsuario';

const countries = [
  { code: 'PE', name: 'Perú' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'MX', name: 'México' },
  { code: 'ES', name: 'España' },
  { code: 'US', name: 'Estados Unidos' }
];

const peruLocations = {
  departments: [
    { name: 'Lima', provinces: [
      { name: 'Lima', districts: ['Miraflores', 'San Isidro', 'Barranco', 'Surco', 'La Molina'] },
      { name: 'Huaura', districts: ['Huacho', 'Hualmay', 'Caleta de Carquín'] }
    ]},
    { name: 'Arequipa', provinces: [
      { name: 'Arequipa', districts: ['Yanahuara', 'Cayma', 'Cerro Colorado'] }
    ]},
    { name: 'Cusco', provinces: [
      { name: 'Cusco', districts: ['Cusco', 'San Blas', 'Santiago'] }
    ]}
  ]
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dni: '',
    address: {
      street: '',
      country: 'PE',
      department: '',
      province: '',
      district: '',
      postalCode: ''
    }
  });

  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (formData.address.country === 'PE') {
      setDepartments(peruLocations.departments);
    } else {
      setDepartments([]);
    }
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        department: '',
        province: '',
        district: ''
      }
    }));
  }, [formData.address.country]);

  useEffect(() => {
    if (formData.address.department) {
      const selectedDept = departments.find(d => d.name === formData.address.department);
      setProvinces(selectedDept?.provinces || []);
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          province: '',
          district: ''
        }
      }));
    }
  }, [formData.address.department, departments]);

  useEffect(() => {
    if (formData.address.province && formData.address.department) {
      const selectedDept = departments.find(d => d.name === formData.address.department);
      const selectedProv = selectedDept?.provinces.find(p => p.name === formData.address.province);
      setDistricts(selectedProv?.districts || []);
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          district: ''
        }
      }));
    }
  }, [formData.address.province, formData.address.department, departments]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre completo es requerido';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!/^\d{8}$/.test(formData.dni) && formData.address.country === 'PE') newErrors.dni = 'DNI debe tener 8 dígitos';
    if (formData.phone && !/^\d{9,15}$/.test(formData.phone)) newErrors.phone = 'Teléfono inválido';
    if (!formData.address.street.trim()) newErrors.street = 'Dirección es requerida';
    if (!formData.address.department) newErrors.department = 'Departamento es requerido';
    if (!formData.address.province) newErrors.province = 'Provincia es requerida';
    if (!formData.address.district) newErrors.district = 'Distrito es requerido';
    if (!formData.address.postalCode.trim()) newErrors.postalCode = 'Código postal es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const userData = {
        nombre: formData.name,
        email: formData.email,
        passwordHash: formData.password,
        dni: formData.dni,
        telefono: formData.phone,
        direcciones: [{
          calle: formData.address.street,
          pais: formData.address.country,
          departamento: formData.address.department,
          provincia: formData.address.province,
          distrito: formData.address.district,
          codigoPostal: formData.address.postalCode
        }]
      };
      const response = await axiosUsuario.post('/auth/register', userData);
      if (response.status === 201 || response.status === 200) {
        router.push('/auth/login?registered=true');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Error al registrar. Intente nuevamente.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Crear Cuenta
          </h2>
        </div>
        <div className="p-6">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos de formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI / Documento</label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder={formData.address.country === 'PE' ? '12345678' : 'Número de documento'}
                  maxLength={formData.address.country === 'PE' ? 8 : undefined}
                  className={`w-full px-4 py-2 border rounded-lg ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dni && <p className="mt-1 text-sm text-red-600">{errors.dni}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="912345678"
                  className={`w-full px-4 py-2 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección de Envío</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección (Calle y número)</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="Av. Ejemplo 123"
                    className={`w-full px-4 py-2 border rounded-lg ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                  <select
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg border-gray-300"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  <select
                    name="address.department"
                    value={formData.address.department}
                    onChange={handleChange}
                    disabled={!departments.length}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Seleccione...</option>
                    {departments.map(dept => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                  <select
                    name="address.province"
                    value={formData.address.province}
                    onChange={handleChange}
                    disabled={!provinces.length}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Seleccione...</option>
                    {provinces.map(prov => (
                      <option key={prov.name} value={prov.name}>{prov.name}</option>
                    ))}
                  </select>
                  {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distrito</label>
                  <select
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    disabled={!districts.length}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Seleccione...</option>
                    {districts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                  <input
                    type="text"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    placeholder="15001"
                    className={`w-full px-4 py-2 border rounded-lg ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? 'Registrando...' : 'Registrar'}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}