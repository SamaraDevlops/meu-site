import React, { useState } from 'react';

// Este componente recebe duas "funções" do componente pai:
// 1. onClose: para avisar que o modal deve ser fechado.
// 2. onLoginSuccess: para avisar que o login foi bem-sucedido.
export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Lógica de login simulada
    if (email === 'admin@email.com' && password === '1234') {
      setError('');
      onLoginSuccess(); // Avisa o App.js que deu certo!
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  // O 'modal-overlay' é o fundo escuro. Clicar nele fecha o modal.
  // O e.stopPropagation() impede que o clique no formulário feche o modal.
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>X</button>
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="1234"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
}