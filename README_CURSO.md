# Taller: Creación de Aplicaciones con IA

**Curso:** Creación de aplicaciones con IA: diseño y personalización de asistentes  
**Universidad de los Andes**

---

## Objetivo

Aprender a crear una aplicación web fullstack con arquitectura profesional (frontend y backend separados), integrando un modelo de IA (Gemini) para responder solicitudes de contacto de manera automática y personalizada.

---

## Prompts y requerimientos utilizados

### 🎯 Prompt inicial

> Cursor, quiero que me ayudes a crear una aplicación web desde cero utilizando **HTML, CSS y JavaScript**.  
> La aplicación se llamará **Formulario Inteligente de Contacto** y debe incluir los siguientes elementos:
>
> - Un formulario con campos para nombre completo, correo electrónico y mensaje.
> - Al hacer clic en **"Enviar"**, debe validar que todos los campos estén completos y que el correo electrónico sea válido.
> - Si la validación es exitosa, debe mostrarse un mensaje de **“Enviado con éxito”**.
> - Si hay errores, deben mostrarse mensajes claros debajo de cada campo.
>
> El diseño debe ser moderno, limpio y adaptable a dispositivos móviles.  
> Crea todos los archivos necesarios y explícame cómo probar la aplicación localmente.

---

### 🔗 Prompt para integración de backend

> Ayúdame a crear un backend en **Python** utilizando **FastAPI**.  
> Este backend debe exponer un endpoint que reciba un JSON, lo envíe a la API de **Gemini**, y devuelva al usuario una respuesta basada en su solicitud.

---

### 🧱 Prompt para estructura de arquitectura

> Crea una carpeta llamada `frontend` para ubicar la interfaz de usuario, y conéctala con el backend.  
> Migra el formulario actual a una aplicación **React** dentro de esa carpeta.

---

### 🔐 Prompt para variables de entorno

> Dame las instrucciones para crear las variables de entorno necesarias.  
> Ya tengo la **API Key de Gemini**.

---

### 🚀 Prompt para despliegue y control de versiones

> Voy a crear un repositorio en **GitHub**.  
> Indícame los pasos recomendados para organizar el proyecto y preparar el despliegue.

---

## Arquitectura del Proyecto

```
actividad/
├── frontend/   # Aplicación React (UI)
├── backend/    # API FastAPI + Gemini
└── README_CURSO.md   # Este archivo
```

---

## 1. Creación del Frontend (React)

### a) Crear la app React

```bash
npx create-react-app frontend --template cra-template-pwa
cd frontend
npm install
```

### b) Migrar la UI y lógica al frontend

- Copia el formulario, validaciones y estilos a `frontend/src/App.js` y `frontend/src/App.css`.
- Usa variables de entorno para la URL del backend:
  - Crea un archivo `.env` en `frontend/`:
    ```
    REACT_APP_BACKEND_URL=http://localhost:8000
    ```

---

## 2. Creación del Backend (FastAPI + Gemini)

### a) Estructura y dependencias

```bash
mkdir backend
cd backend
python3 -m venv venv
source venv/bin/activate
```

Crea un archivo `requirements.txt` con:

```
fastapi
uvicorn
google-generativeai
python-dotenv
```

Instala las dependencias:

```bash
pip install -r requirements.txt
```

### b) Variables de entorno

Crea un archivo `.env` en `backend/`:

```
GEMINI_API_KEY=tu_api_key_de_gemini
```

### c) Código base de FastAPI (`main.py`)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")  # Usa el modelo que tengas habilitado

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactRequest(BaseModel):
    nombre: str
    email: str
    mensaje: str
    timestamp: str = None
    id: str = None

@app.post("/api/contact")
async def contact_endpoint(data: ContactRequest):
    prompt = (
        f"Un usuario llamado {data.nombre} ({data.email}) envió el siguiente mensaje:\n"
        f"\"{data.mensaje}\"\n"
        "Por favor, responde de manera cordial y profesional a su solicitud."
    )
    response = model.generate_content(prompt)
    respuesta_ia = response.text
    return {
        "success": True,
        "respuesta_gemini": respuesta_ia,
        "original": data.dict()
    }
```

---

## 3. Comandos de ejecución

### Backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm start
```

---

## 4. Subida a GitHub

### a) Crea un archivo `.gitignore` en la raíz:

```
# Node
frontend/node_modules/
frontend/build/
frontend/.env

# Python
backend/venv/
backend/__pycache__/
backend/.env

# General
.DS_Store
*.pyc
.env
```

### b) Inicializa el repositorio y sube a GitHub

```bash
git init
git add .
git commit -m "Proyecto: Formulario Inteligente de Contacto (React + FastAPI + Gemini)"
git remote add origin https://github.com/tu_usuario/tu_repositorio.git
git branch -M main
git push -u origin main
```

---

## 5. Recomendaciones para estudiantes

- Usa siempre entornos virtuales para Python.
- No subas archivos `.env` ni carpetas `node_modules` o `venv` a GitHub.
- Personaliza el prompt para Gemini según el caso de uso.
- Consulta la documentación oficial de [Gemini](https://ai.google.dev/) para modelos y ejemplos actualizados.
- Si tienes errores de dependencias, revisa la versión de Python y Node.js.

---

## 6. Créditos y licencia

Este taller fue para el curso **Creación de aplicaciones con IA: diseño y personalización de asistentes** de la **Universidad de los Andes**.

¡Éxitos creando tus propios asistentes inteligentes! 🚀
