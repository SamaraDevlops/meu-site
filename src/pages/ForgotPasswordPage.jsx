// src/pages/ForgotPasswordPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Página de Recuperar Senha</h1>
        <p className="mb-6">Esta funcionalidade ainda será construída.</p>
        <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Voltar para Login
        </Link>
      </div>
    </div>
  );
}