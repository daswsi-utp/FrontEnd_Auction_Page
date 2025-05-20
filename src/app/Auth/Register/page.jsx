'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUserPlus, FaIdCard, FaPhone, FaEnvelope, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import axiosUsuario from '../../lib/axiosUsuario';

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
      
      if (response.status === 200) {
        router.push('/auth/login?registered=true');
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.error || 'Error al registrar. Intente nuevamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaUserPlus />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaUserPlus className="text-indigo-600" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Ej: Juan Pérez"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-indigo-600" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaLock className="text-indigo-600" />
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaLock className="text-indigo-600" />
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaIdCard className="text-indigo-600" />
                  {formData.address.country === 'PE' ? 'DNI' : 'Documento de Identidad'}
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={formData.address.country === 'PE' ? '12345678' : 'Número de documento'}
                  maxLength={formData.address.country === 'PE' ? 8 : undefined}
                />
                {errors.dni && <p className="mt-1 text-sm text-red-600">{errors.dni}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaPhone className="text-indigo-600" />
                  Teléfono (Opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="912345678"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-4">
                <FaMapMarkerAlt className="text-indigo-600" />
                Dirección de Envío
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección (Calle y número)
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Av. Ejemplo 123"
                  />
                  {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    País
                  </label>
                  <select
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>{country.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departamento/Estado
                  </label>
                  <select
                    name="address.department"
                    value={formData.address.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!departments.length}
                  >
                    <option value="">Seleccione...</option>
                    {departments.map(dept => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Provincia/Región
                  </label>
                  <select
                    name="address.province"
                    value={formData.address.province}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.province ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!provinces.length}
                  >
                    <option value="">Seleccione...</option>
                    {provinces.map(prov => (
                      <option key={prov.name} value={prov.name}>{prov.name}</option>
                    ))}
                  </select>
                  {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Distrito/Ciudad
                  </label>
                  <select
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!districts.length}
                  >
                    <option value="">Seleccione...</option>
                    {districts.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    name="address.postalCode"
                    value={formData.address.postalCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="15001"
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registrando...
                  </span>
                ) : 'Registrarse'}
              </button>
            </div>
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