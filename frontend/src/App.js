import React, { useState } from 'react';
import './App.css';

const initialState = {
  fullName: '',
  email: '',
  message: '',
};

const initialErrors = {
  fullName: '',
  email: '',
  message: '',
};

function validateFullName(name) {
  if (!name.trim()) return 'El nombre completo es obligatorio';
  if (name.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim())) return 'El nombre solo puede contener letras y espacios';
  return '';
}

function validateEmail(email) {
  if (!email.trim()) return 'El correo electrónico es obligatorio';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Ingresa un correo electrónico válido';
  return '';
}

function validateMessage(message) {
  if (!message.trim()) return 'El mensaje es obligatorio';
  if (message.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
  if (message.trim().length > 500) return 'El mensaje no puede exceder 500 caracteres';
  return '';
}

function App() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setGeminiResponse('');
    try {
      const payload = {
        nombre: form.fullName,
        email: form.email,
        mensaje: form.message,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      };
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setGeminiResponse(data.respuesta_gemini);
      } else {
        setGeminiResponse('Error: ' + (data.error || 'No se pudo obtener respuesta de Gemini.'));
      }
    } catch (err) {
      setGeminiResponse('Error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors(initialErrors);
    setSuccess(false);
    setGeminiResponse('');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Formulario Inteligente de Contacto</h1>
        <p className="subtitle">Completa el formulario y nos pondremos en contacto contigo</p>
        {!success ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className={`form-group${errors.fullName ? ' error' : ''}`}>
              <label htmlFor="fullName">Nombre Completo *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Ingresa tu nombre completo"
                value={form.fullName}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
              />
              <span className="error-message">{errors.fullName}</span>
            </div>
            <div className={`form-group${errors.email ? ' error' : ''}`}>
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="off"
              />
              <span className="error-message">{errors.email}</span>
            </div>
            <div className={`form-group${errors.message ? ' error' : ''}`}>
              <label htmlFor="message">Mensaje *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="error-message">{errors.message}</span>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {!loading ? (
                <span className="btn-text">Enviar Mensaje</span>
              ) : (
                <span className="btn-loading">
                  <div className="spinner"></div>
                  Enviando...
                </span>
              )}
            </button>
          </form>
        ) : (
          <div id="successMessage" className="success-message">
            <div className="success-icon">✓</div>
            <h3>¡Mensaje Enviado con Éxito!</h3>
            <p>Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
            {geminiResponse && (
              <div className="gemini-response">
                <h4>Respuesta de Gemini:</h4>
                <div className="gemini-text">{geminiResponse}</div>
              </div>
            )}
            <button onClick={handleReset} className="reset-btn">Enviar Otro Mensaje</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
