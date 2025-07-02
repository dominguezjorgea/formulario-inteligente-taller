from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Cargar variables de entorno (API KEY)
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configurar Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.5-flash-preview-04-17")
else:
    model = None

# FastAPI app
app = FastAPI()

# Permitir CORS para desarrollo local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos esperado
class ContactRequest(BaseModel):
    nombre: str
    email: str
    mensaje: str
    timestamp: str = None
    id: str = None

@app.post("/api/contact")
async def contact_endpoint(data: ContactRequest):
    if not model:
        return {"success": False, "error": "Gemini API key not configured."}
    # Construir prompt para Gemini
    prompt = (
        f"Un usuario llamado {data.nombre} ({data.email}) envió el siguiente mensaje:\n"
        f"\"{data.mensaje}\"\n"
        "Por favor, responde de manera cordial y profesional a su solicitud."
    )
    # Llamar a Gemini
    response = model.generate_content(prompt)
    respuesta_ia = response.text

    return {
        "success": True,
        "respuesta_gemini": respuesta_ia,
        "original": data.dict()
    } 