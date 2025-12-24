import React from 'react'

function Skills() {
    return (
        <section id="skills" className="skills">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Core Competencies</span>
                    <h2 className="section-title">My Skills & Expertise</h2>
                </div>
                <div className="skills-grid">
                    <div className="skill-card">
                        <div className="skill-icon">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <h3>Product Vision & Design</h3>
                        <p>Creating revolutionary products that people don't know they need yet</p>
                        <ul className="skill-list">
                            <li><i className="fas fa-check"></i> Product Design Philosophy</li>
                            <li><i className="fas fa-check"></i> User Experience Excellence</li>
                            <li><i className="fas fa-check"></i> Industrial Design</li>
                            <li><i className="fas fa-check"></i> Innovation Strategy</li>
                        </ul>
                    </div>

                    <div className="skill-card">
                        <div className="skill-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3>Leadership & Management</h3>
                        <p>Building world-class teams and creating exceptional company culture</p>
                        <ul className="skill-list">
                            <li><i className="fas fa-check"></i> Strategic Vision</li>
                            <li><i className="fas fa-check"></i> Team Building</li>
                            <li><i className="fas fa-check"></i> Company Culture Creation</li>
                            <li><i className="fas fa-check"></i> Executive Leadership</li>
                        </ul>
                    </div>

                    <div className="skill-card">
                        <div className="skill-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <h3>Business Strategy</h3>
                        <p>Transforming industries through breakthrough innovation</p>
                        <ul className="skill-list">
                            <li><i className="fas fa-check"></i> Market Disruption</li>
                            <li><i className="fas fa-check"></i> Brand Building</li>
                            <li><i className="fas fa-check"></i> Strategic Partnerships</li>
                            <li><i className="fas fa-check"></i> Global Market Expansion</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills