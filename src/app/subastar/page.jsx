//src\app\subastar\page.jsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaUpload, FaImage, FaMoneyBillWave, FaCalendarAlt, FaGavel, FaTimes } from 'react-icons/fa'

export default function SubastarPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    precioInicial: '',
    duracion: '7',
    imagenes: []
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Lógica para enviar los datos al backend
    console.log('Datos de la subasta:', formData)
    alert('¡Subasta creada exitosamente!')
    router.push('/')
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + formData.imagenes.length > 5) {
      alert('Máximo 5 imágenes permitidas')
      return
    }
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, ...files]
    })
  }

  const removeImage = (index) => {
    const newImages = [...formData.imagenes]
    newImages.splice(index, 1)
    setFormData({ ...formData, imagenes: newImages })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-amber-700 to-amber-600 p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <FaGavel className="text-amber-200" />
              Subastar un objeto
            </h1>
            <p className="text-amber-100 mt-1">Completa todos los campos para publicar tu subasta</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Sección de información básica */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Información básica
              </h2>
              
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Título de la subasta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Ej: Reloj antiguo Patek Philippe 1950"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    required
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Descripción detallada <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[150px] transition-all"
                    placeholder="Describe el objeto en detalle (estado, características, historia, etc.)"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Mínimo 50 caracteres</p>
                </div>
              </div>
            </div>

            {/* Sección de detalles */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Detalles de la subasta
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categoría */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="arte">Arte y Antigüedades</option>
                    <option value="joyas">Joyas y Relojes</option>
                    <option value="coleccionables">Coleccionables</option>
                    <option value="electronica">Electrónica</option>
                    <option value="moda">Moda y Accesorios</option>
                    <option value="hogar">Hogar y Jardín</option>
                  </select>
                </div>

                {/* Precio inicial */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Precio inicial <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={formData.precioInicial}
                      onChange={(e) => setFormData({...formData, precioInicial: e.target.value})}
                      required
                    />
                  </div>
                </div>

                {/* Duración */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-2">
                    Duración de la subasta
                  </label>
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-gray-500 text-lg" />
                    <select
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      value={formData.duracion}
                      onChange={(e) => setFormData({...formData, duracion: e.target.value})}
                    >
                      <option value="1">1 día</option>
                      <option value="3">3 días</option>
                      <option value="7">7 días</option>
                      <option value="14">14 días</option>
                      <option value="30">30 días</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de imágenes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Imágenes del objeto <span className="text-red-500">*</span>
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {formData.imagenes.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200">
                        <img 
                          src={URL.createObjectURL(img)} 
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.imagenes.length < 5 && (
                    <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-all">
                      <div className="text-center p-4">
                        <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">Agregar imagen</span>
                        <span className="block text-xs text-gray-400 mt-1">
                          ({5 - formData.imagenes.length} restantes)
                        </span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FaImage className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <p>
                    Sube entre 1 y 5 imágenes de alta calidad (JPEG, PNG). La primera imagen será la principal.
                    Tamaño máximo por imagen: 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2"
                disabled={formData.imagenes.length === 0}
              >
                <FaGavel /> Publicar subasta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}