'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './index.module.css'
import { usePathname } from 'next/navigation'
import { CiLogin, CiLogout } from "react-icons/ci";
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'; 

interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode; 
}


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Lógica do Scroll (deve rodar apenas uma vez)
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Verificação inicial do Login (Correção: A verificação principal deve estar no outro useEffect com [pathname])
    const token = Cookies.get('auth-token');
    setIsLoggedIn(!!token); 
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Lógica de Autenticação (Roda em cada navegação)
    const token = Cookies.get('auth-token');
    setIsLoggedIn(!!token); 
    // Guarda de rota
    if (!token && pathname.startsWith('/rh/dashboard')) {
        router.push('/rh/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    Cookies.remove('auth-token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/rh/login');
  };


  const loginLink: NavItem = isLoggedIn ? 
    {
      name: 'Logout', 
      href: '/rh/login', // Redireciona para o login após a ação de logout
      icon: <CiLogout size={20} 
      color='#dc3545'
      title='Sair'
      className={styles.loginIcon} />
    } :
    { 
      name: 'Login', 
      href: '/rh/dashboard', 
      icon: <CiLogin size={20} 
      color='#007bff'
      title='Login'
      className={styles.loginIcon} /> 
    };
    

    // AQUI: Usando o spread operator, retorna um array com o item OU um array vazio.
    const loginDashboard = isLoggedIn ?
    [{
      name: 'Dashboard',
      href: '/rh/dashboard',
    }] : [];


  // CORREÇÃO: Usando o spread operator para incluir loginDashboard APENAS se não for vazio.
  const navigation: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Trabalhe Conosco', href: '/vagas' },
    { name: 'Contato', href: '/contato' },
    ...loginDashboard,
    loginLink,
  ]
  
  const renderLinkContent = (item: NavItem): string | React.ReactNode => {
    return item.icon || item.name;
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerInner}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={`${styles.logoLink} ${isScrolled ? styles.logoLinkScrolled : ''}`}>
              <img src="/logo_francal/logo_francal01.png" alt="Francal Distribuidora" className={styles.logoImage} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.navigation}>
            {navigation.map((item) => { 
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              
              const isLogoutLink = item.name === 'Logout';
              
              return(
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    ${styles.navLink}
                    ${isScrolled ? styles.navLinkScrolled : ''} 
                    ${isActive ? styles.activeLink : ''}
                  `}

                  onClick={isLogoutLink ? handleLogout : undefined}
                >
                  {renderLinkContent(item)}
                </Link>)
            })}
          </nav>


        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              {navigation.map((item) => { 
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const isLogoutLink = item.name === 'Logout';
                
                return(
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                    // Ações no mobile
                    onClick={() => {
                        setIsMenuOpen(false);
                        if (isLogoutLink) {
                            handleLogout();
                        }
                    }}
                  >
                    {renderLinkContent(item)}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}