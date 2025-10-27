import { useState, useEffect } from "react"
import {User, LogOut} from 'lucide-react'
import './Protetction.css'
import DashBoard from "../PainelAdmin/DashBoard"

const Protection = ({onLogout}) => {

    const [adminUser, setAdminUser] = useState('')

    useEffect(() => {
        const user  = localStorage.getItem('adminUser')
        setAdminUser(user || 'Admin')
    }, [])

    const handleLogout = () =>{
        if(window.confirm('Tem certeza que deseja sair do painel administrativo?')){
            localStorage.removeItem('isAdminAuthenticated')
            localStorage.removeItem('adminUser')
            onLogout()
        }
    }

  return (
   
      <div className="protected-dashboard-wrapper">
        {/* barra superior com a info do admin */}
        <div className="admin-topbar">
            <div className="admin-info">
                <div className="admin-avatar">
                    <User size={20} />
                </div>

                <div className="admin-details">
                    <span className="admin-name">{adminUser}</span>
                    <span className="admin-role">Administrador</span>
                </div>
            </div>

            <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={18} />
                Sair
            </button>
        </div>
        <DashBoard />

      </div>
    
  )
}

export default Protection
