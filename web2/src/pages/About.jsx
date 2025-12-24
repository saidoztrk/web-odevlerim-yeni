import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">About Me</span>
                    <h2 className="section-title">Who Am I & What I Do?</h2>
                </div>
                <div className="about-content">
                    <div className="about-image">
                        <div className="about-img-wrapper">
                            <img src="/src/assets/images/indir2.jpg" alt="Steve Jobs" />
                            <div className="experience-badge">
                                <span className="badge-number">40+</span>
                                <span className="badge-text">Years<br />Experience</span>
                            </div>
                        </div>
                    </div>
                    <div className="about-text">
                        <h3>Entrepreneur, Visionary & Technology Pioneer</h3>
                        <p>
                            I co-founded Apple Computer in 1976 with Steve Wozniak in my parents' garage.
                            Our vision was simple but revolutionary: make computers accessible to everyone.
                            The Apple II became one of the first successful mass-produced personal computers.
                        </p>
                        <p>
                            After leaving Apple in 1985, I founded NeXT Computer and acquired
                            The Graphics Group, which later became Pixar Animation Studios.
                            At Pixar, we revolutionized the animation industry with Toy Story, the first
                            fully computer-animated feature film.
                        </p>
                        <p>
                            I returned to Apple in 1997 when the company was near bankruptcy. We turned it around
                            and created products that changed the world: iMac, iPod, iPhone, and iPad.
                            My philosophy has always been about creating insanely great products at the intersection
                            of technology and liberal arts.
                        </p>

                        <div className="about-info">
                            <div className="info-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <span className="info-label">Email</span>
                                    <span className="info-value">sjobs@apple.com</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-building"></i>
                                <div>
                                    <span className="info-label">Company</span>
                                    <span className="info-value">Apple Inc. (Co-founder & CEO)</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <span className="info-label">Location</span>
                                    <span className="info-value">Cupertino, California</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/contact" className="btn btn-primary mt-20">
                            <i className="fas fa-download"></i> Download Resume
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About