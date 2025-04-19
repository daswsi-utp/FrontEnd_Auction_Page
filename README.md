# 🧭 Proyecto Scrum - Plataforma de Subastas Web

Plataforma web de subastas desarrollada con **Next.js** (frontend), **Java Web** (backend) y base de datos **MySQL**, organizada bajo una arquitectura de **microservicios** y gestionada con la metodología ágil **Scrum**.

---

## 👥 Equipo de Trabajo y Roles Scrum

| Nombre   | Responsabilidad técnica           | Rol Scrum      |
|----------|------------------------------------|----------------|
| Leydi    | Coordinación general / integración | Scrum Master   |
| Luis     | Login de usuarios                  | Product Owner  |
| Jeferson | Página de subastas                 | Developer      |
| Javier   | Registro de usuarios               | Developer      |
| Dayana   | Registro de cuenta bancaria        | Developer      |
| Kevin    | Página del usuario (perfil)        | Developer      |

---

## 📋 Requerimientos

### ✅ Requerimientos Funcionales

- **RF1:** Registro de usuarios  
- **RF2:** Inicio de sesión  
- **RF3:** Visualización de subastas activas  
- **RF4:** Creación de subastas  
- **RF5:** Participar en subastas (pujar)  
- **RF6:** Registro y edición de cuenta bancaria  
- **RF7:** Gestión del perfil de usuario  

### 🔐 Requerimientos No Funcionales

- **RNF1:** El sistema debe tener una respuesta inferior a 2 segundos  
- **RNF2:** Soporte para múltiples usuarios en simultáneos  
- **RNF3:** Seguridad en la informacion y cuentas bancarias de los usuarios.
- **RNF4:** Debe ser compatible con diferentes dispositivos
- **RNF5:** Debe de tener una disponibilidad constante.

---

## ⭐ Atributos de Calidad del Software

| Atributo       | Descripción                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Rendimiento    | Carga rápida de páginas y respuestas a las acciones del usuario             |
| Seguridad      | Protección de datos mediante autenticación, tokens y encriptación           |
| Escalabilidad  | Capacidad de crecimiento horizontal con microservicios                      |
| Usabilidad     | Interfaz clara y simple para cualquier usuario                              |
| Mantenibilidad | Código modular, documentado y separado por responsabilidades                |

---

## 🗂️ Historias de Usuario (Product Backlog)

1. **US01:** Como usuario quiero registrarme para poder participar en subastas. *(Javier)*  
2. **US02:** Como usuario quiero iniciar sesión para acceder a mi cuenta. *(Luis)*  
3. **US03:** Como usuario quiero ver una lista de subastas disponibles. *(Jeferson)*  
4. **US04:** Como usuario quiero pujar por un artículo para intentar ganarlo. *(Jeferson)*  
5. **US05:** Como usuario quiero registrar mi cuenta bancaria para recibir pagos. *(Dayana)*  
6. **US06:** Como usuario quiero editar mi perfil personal. *(Kevin)*  
7. **US07:** Como administrador quiero eliminar subastas inapropiadas. *(Leydi)*  
8. **US08:** Como usuario quiero recibir notificaciones si fui superado en una puja. *(Kevin)*  

---

## 🏃 Sprint 1 - Planificación

**Objetivo del Sprint:** Implementar el flujo básico de registro, login, cuenta bancaria y visualización de subastas.

| ID    | Historia                          | Responsable |
|-------|-----------------------------------|-------------|
| US01 | Registro de usuario                | Javier      |
| US02 | Login de usuario                   | Luis        |
| US03 | Visualizar subastas activas        | Jeferson    |
| US05 | Registro de cuenta bancaria        | Dayana      |
| US06 | Perfil de usuario                  | Kevin       |

---

## 🧰 Tecnologías Utilizadas

- **Frontend:** Next.js  
- **Backend:** Java Web  
- **Base de Datos:** Por decidir 
- **Arquitectura:** Microservicios-  
- **Control de versiones:** Git + GitHub  

---

## 📦 Instalación del Proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/usuario/repositorio-subastas.git
