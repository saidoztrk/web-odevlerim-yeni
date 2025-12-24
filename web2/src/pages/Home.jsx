import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <section id="home" className="hero">
            <div className="hero-bg"></div>
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="hero-greeting">Hello, I'm</span>
                        <h1 className="hero-title">Steve Jobs</h1>
                        <p className="hero-subtitle">
                            <span className="typing-text">Visionary Entrepreneur</span>
                        </p>
                        <p className="hero-description">
                            Co-founder of Apple Inc., Pixar Animation Studios, and NeXT.
                            Passionate about creating products at the intersection of technology
                            and liberal arts. "Innovation distinguishes between a leader and a follower."
                        </p>
                        <div className="hero-buttons">
                            <Link to="/projects" className="btn btn-primary">
                                <i className="fas fa-briefcase"></i> View My Work
                            </Link>
                            <Link to="/contact" className="btn btn-secondary">
                                <i className="fas fa-envelope"></i> Get in Touch
                            </Link>
                        </div>
                        <div className="hero-social">
                            <a href="https://github.com/apple" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/company/apple/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:sjobs@apple.com" className="social-icon">
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="image-wrapper">
                            <img src="/src/assets/images/indir2.jpg" alt="Steve Jobs" />
                            <div className="image-border"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-down">
                <Link to="/about">
                    <i className="fas fa-chevron-down"></i>
                </Link>
            </div>
        </section>
    )
}

export default Home