import { useState } from 'react';
import './Header.css'
import {Menu, X} from 'lucide-react';

const Header = ({onNavigate, currentPage}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigation = (page) => {
        onNavigate(page);
        setMenuOpen(false); // Fecha o menu ao navegar
    }
    

  return (
    <header className="header">
        <div className="header-container">
            <div className="logo" onClick={() => handleNavigation('home')}>
                <span>Vozes da Diversidade</span>
            </div>

            <nav className="nav-desktop">
                <span className={`nav-links ${currentPage === 'home' ? 'active' : ''}`} onClick={() => handleNavigation('home')}>Inicio</span>
                <span className={`nav-links ${currentPage === 'about' ? 'active' : ''}`} onClick={() => handleNavigation('about')}>Sobre</span>
                <span className={`nav-links ${currentPage === 'support' ? 'active' : ''}`} onClick={() => handleNavigation('support')}>Rede de Apoio</span>
                <span className={`nav-links ${currentPage === 'report' ? 'active' : ''}`} onClick={() => handleNavigation('report')}>Fazer Denúncia</span>
                <span className={`nav-links ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('dashboard')}>Admin</span>
            </nav>

            <button className="menu-button" onClick={() => setMenuOpen(true)}>
                <Menu size={28} />
            </button>
        </div>

        <div className={`nav-mobile ${menuOpen ? 'open' : ''} `}>
            <button className="close-button" onClick={() => setMenuOpen(false)}>
                <X size={28} />
            </button>

            <div className="nav-mobile-links">
                <span className='nav-link' onClick={() => handleNavigation('home')}>Inicio</span>
                <span className='nav-link' onClick={() => handleNavigation('about')}>Sobre</span>
                <span className='nav-link' onClick={() => handleNavigation('support')}>Rede de Apoio</span>
                <span className='nav-link' onClick={() => handleNavigation('report')}>Fazer denuncia</span>
            </div>
        </div>
    </header>
  )
}

export default Header
