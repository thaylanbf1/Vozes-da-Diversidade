import './App.css'
import { useState , useEffect} from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero';
import Support from './components/RedeSuporte/Support';
import Sobre from './components/Sobre/Sobre';
import Form from './components/Form/Form';
import Footer from './components/Footer/Footer';
import Infos from './components/Infos/Infos';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Protection from './components/DashboardProtected/Protection';
import Login from './components/Login/Login';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated')
    setIsAuthenticated(authStatus === 'true')
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAdminAuthenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAdminAuthenticated')
    localStorage.removeItem('adminUser')
    setCurrentPage('home')
  }

  const renderPage = () => {

    if(currentPage === 'dashboard' && !isAuthenticated){
      return <Login onLoginSuccess={handleLoginSuccess} />
    }

    if(currentPage === 'dashboard' && isAuthenticated){
      return <Protection onLogout={handleLogout} />
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Sobre />
            <Support />
            <Infos />
            <HowItWorks />

          </>
        );
      case 'about':
        return (
          <Sobre />
        );
      case 'support':
        return (
          <>
            <Support />
            <Infos />
            <HowItWorks />
          </>
        );
        case 'report':
          return (
            <Form />
          )
        default:
          return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Sobre />
            <Support />
            <Infos />
            <HowItWorks />
          </>
        );
    }
  }
  return (
    <div className="App">
      {/* so mostra a heeder e footer se não estiver na tela de login/dashvoard */}
      {!(currentPage === 'dashboard') && (
        <Header onNavigate={setCurrentPage} currentPage={currentPage}/>
      )}
      <main className='main-content'>
        {renderPage()}
      </main>
      {!(currentPage === 'dashboard') && <Footer />} 
    </div>
  )
}

export default App
