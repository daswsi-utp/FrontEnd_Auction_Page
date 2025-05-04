'use client';

import { useState } from 'react';

export default function CreateAuction() {
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 4) {
      alert('Puedes subir un máximo de 4 fotos');
      return;
    }

    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 py-10 px-6">
      <div className="bg-white shadow-xl rounded-2xl max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">Crear una nueva subasta</h1>

        <form className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Título de la subasta</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Ingresa el título de la subasta"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              placeholder="Describe el producto de la subasta"
              rows="5"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startPrice" className="block text-lg font-medium text-gray-700 mb-2">Precio de inicio</label>
              <input
                type="number"
                id="startPrice"
                name="startPrice"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="S/. 100.00"
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-lg font-medium text-gray-700 mb-2">Tiempo de finalización</label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="images" className="block text-lg font-medium text-gray-700 mb-2">Sube hasta 4 imágenes</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-dashed border-gray-400 rounded-xl bg-gray-50 text-gray-600 cursor-pointer hover:border-blue-500 transition"
            />
            <div className="flex flex-wrap gap-4 mt-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md border">
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Crear subasta
          </button>
        </form>
      </div>
    </div>
  );
}
