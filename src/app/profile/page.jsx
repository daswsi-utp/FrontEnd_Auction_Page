'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    dni: '',
    birthDate: '',
    address: '',
    district: '',
    province: '',
    department: '',
    role: '',
    avatar: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData(parsed);
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    setUser(formData);
    closeModal();
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <p className="text-center text-gray-600 mt-20">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        <div className={styles.profileCard}>
          <div className={styles.avatarSection}>
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="Avatar"
              className={styles.avatar}
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name} {user.lastName}
            </h2>
            <p className={styles.role}>Rol: {user.role || 'Usuario'}</p>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email:</span>
              <span>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Teléfono:</span>
              <span>{user.phone || 'No registrado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>DNI:</span>
              <span>{user.dni || 'No registrado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Fecha de nacimiento:</span>
              <span>{user.birthDate || 'No registrado'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Dirección:</span>
              <span>
                {user.address
                  ? `${user.address}, ${user.district}, ${user.province}, ${user.department}`
                  : 'No registrada'}
              </span>
            </div>
          </div>

          <button onClick={openModal} className={styles.button} aria-label="Editar perfil">
            Editar Perfil
          </button>

          <button onClick={handleBack} className={`${styles.button} ${styles.backButton}`} aria-label="Volver atrás">
            ← Volver
          </button>
        </div>

        <div className={styles.dashboard}>
          <div className={styles.bidsSection}>
            <h3>Mis Pujas Recientes</h3>
            <ul className={styles.bidList}>
              <li className="text-gray-500 italic">No hay pujas registradas aún.</li>
            </ul>
          </div>

          <div className={styles.historySection}>
            <h3>Historial de Compras</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 italic">
                    No hay compras registradas aún.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal} role="dialog" aria-modal="true">
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-blue-600">Editar Perfil</h3>

            {[
              ['name', 'Nombre'],
              ['lastName', 'Apellido'],
              ['email', 'Email'],
              ['phone', 'Teléfono'],
              ['dni', 'DNI'],
              ['birthDate', 'Fecha de nacimiento'],
              ['address', 'Dirección'],
              ['district', 'Distrito'],
              ['province', 'Provincia'],
              ['department', 'Departamento'],
            ].map(([field, label]) => (
              <div key={field} className={styles.inputGroup}>
                <label>{label}:</label>
                <input
                  type={field === 'birthDate' ? 'date' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={label}
                />
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className={`${styles.button} ${styles.modalButton}`}
              >
                Guardar Cambios
              </button>
              <button
                onClick={closeModal}
                className={`${styles.button} ${styles.modalCancelButton}`}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
