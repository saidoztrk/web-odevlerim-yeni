import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

function Layout() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [location.pathname])

    const isActive = (path) => location.pathname === path

    return (
        <>
            <header id="header">
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <div className="container">
                        <Link to="/" className="logo">
                            Steve<span>Jobs</span>
                        </Link>

                        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                            <li>
                                <Link to="/" className={isActive('/') ? 'active' : ''}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/skills" className={isActive('/skills') ? 'active' : ''}>
                                    Skills
                                </Link>
                            </li>
                            <li>
                                <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        <button
                            className={`hamburger ${isOpen ? 'active' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-left">
                            <h3>Steve<span>Jobs</span></h3>
                            <p>Entrepreneur, Visionary & Co-founder of Apple</p>
                        </div>
                        <div className="footer-social">
                            <a href="https://github.com/apple" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/apple/" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:sjobs@apple.com">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 Steve Jobs. Think Different.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Layout