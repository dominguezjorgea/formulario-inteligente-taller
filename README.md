# Formulario Inteligente de Contacto

Aplicación fullstack que integra un formulario de contacto moderno (React) con un backend en FastAPI y Gemini AI para respuestas automáticas y personalizadas.

---

## 🗂️ Estructura del Proyecto

```
actividad/
├── frontend/   # Aplicación React (UI)
├── backend/    # API FastAPI + Gemini
└── README.md   # Este archivo
```

---

## 🚀 ¿Qué hace este proyecto?

- **Frontend (React):** Formulario de contacto con validación en tiempo real, diseño moderno y experiencia de usuario profesional.
- **Backend (FastAPI):** Recibe los datos del formulario, los envía a Gemini (Google AI) y responde automáticamente al usuario con un mensaje generado por IA.
- **Integración Gemini:** Utiliza la API de Gemini para generar respuestas personalizadas y profesionales a cada mensaje recibido.

---

## ⚡ Cómo ejecutar el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2. Configura las variables de entorno

#### Backend (`backend/.env`)

```
GEMINI_API_KEY=tu_api_key_de_gemini
```

#### Frontend (`frontend/.env`)

```
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 3. Instala y ejecuta el backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 4. Instala y ejecuta el frontend

```bash
cd ../frontend
npm install
npm start
```

### 5. Abre la aplicación

- Ve a [http://localhost:3000](http://localhost:3000) en tu navegador.
- Envía un mensaje y verás la respuesta generada por Gemini en la interfaz.

---

## 🧩 Tecnologías utilizadas

- **Frontend:** React, CSS moderno
- **Backend:** FastAPI, Python, google-generativeai
- **IA:** Gemini (Google AI)

---

## 📦 Buenas prácticas

- Separación clara entre frontend y backend
- Uso de variables de entorno para claves y URLs
- Código limpio y documentado
- `.gitignore` para evitar subir archivos sensibles o innecesarios

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

¡Disfruta y siéntete libre de contribuir o adaptar este proyecto a tus necesidades! 🚀
# formulario-inteligente-taller
