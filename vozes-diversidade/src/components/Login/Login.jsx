import { useState } from "react"
import {Lock, User, Eye, EyeOff, AlertCircle, Shield} from 'lucide-react'
import './Login.css'

const Login = ({onLoginSuccess}) => {

    const [formData, setFormData] = useState({
        username: '',
        password:''
    });

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // exemplo de credencial - em produção (VALIDAR NO BACKEND)
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'  // nunca fazer em produção
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // simular delay de rede
        setTimeout(() => {
            // Validação local (EM PRODUÇÃO, FAZER NO BACKEND)
            if(
                formData.username === ADMIN_CREDENTIALS.username &&
                formData.password === ADMIN_CREDENTIALS.password
            ){
                // Login bem sucedido
                localStorage.setItem('isAdminAuthenticated', 'true')
                localStorage.setItem('adminUser', formData.username)
                onLoginSuccess()
            }else{
                setError('Usuario ou senha incorretos')
                setLoading(false)
            }
        }, 1000)
    }

    const handleChange = (e) => {
        setFormData ({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('') //Limpa erro ao digitar
    }

    

  return (
   <div className="login-container">
    <div className="login-background">
        <div className="login-overlay"></div>
    </div>

    <div className="login-card">
        <div className="login-header">
            <div className="login-icon">
                <Shield size={30} />
            </div>
            <h1>Painel Administrativo</h1>
            <p>Vozes da Diversidade - Area Restrita</p>
        </div>


        <form onSubmit={handleSubmit} className="login-form">
            {error && (
                <div className="error-message">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="form-group">
                <label htmlFor="username">
                    <User size={18} />
                    Usuario
                </label>
                <input type="text" id="username" name="username"  value={formData.username}
                onChange={handleChange} placeholder="Digite seu usuario" required autoComplete="username"/>
            </div>

            <div className="form-group">
                <label htmlFor="password">
                    <Lock size={18} />
                    Senha
                </label>
                <div className="password-input-wrapper">
                    <input type={!showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" required autoComplete="current-password" />
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
                Area Protegida - Acesso Restrito a administradores
            </p>
            <p className="demo-credentials">
                <strong>Demo:</strong> usuario: admin | senha: admin123
            </p>
        </div>
    </div>
   </div>
  )
}

export default Login
