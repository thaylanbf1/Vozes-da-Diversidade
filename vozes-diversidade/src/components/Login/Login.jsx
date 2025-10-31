import { useState } from "react";
import api from "../../../backend/src/services/api";
import {Lock, User, Eye, EyeOff, AlertCircle, Shield, ArrowLeft } from 'lucide-react'
import './Login.css'

const Login = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminUser", username);
      onLoginSuccess();
    } catch (err) {
      setError("Usuário ou senha incorretos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"><div className="login-overlay"></div>
      </div>

      <button className="btn-voltar" onClick={onBack}><ArrowLeft size={20} />Voltar</button>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon"><Shield size={30} /></div> {}
          <h1>Painel do Administrador</h1>
          <p>Vozes da Diversidade - Área Restrita</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username"><User size={18} />Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required autoComplete="username"
            />
          </div>

          <div className="form-group password-input-wrapper">
            <label htmlFor="password"><Lock size={18} />Senha</label>
            <div className="password-input-wrapper">
                <input
                  type={!showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required autoComplete="current-password"
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Entrando...
                    </>
                ): (
                    <>
                        <Lock size={20}/>
                        Entrar no Painel
                    </>
                )}
            </button>
        </form>

        <div className="login-footer">
            <p className="securuty-notice">
                <Lock size={16} />
                Área Protegida - Acesso Restrito a administradores
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
