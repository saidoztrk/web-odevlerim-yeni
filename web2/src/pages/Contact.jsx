import React, { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('✅ Thank you for your message! I will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Get In Touch</span>
                    <h2 className="section-title">Let's Connect</h2>
                </div>
                <div className="contact-content">
                    <div className="contact-info-cards">
                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <h3>Email</h3>
                            <p>sjobs@apple.com</p>
                            <a href="mailto:sjobs@apple.com" className="contact-link">Send Email</a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fab fa-github"></i>
                            </div>
                            <h3>GitHub</h3>
                            <p>@apple</p>
                            <a href="https://github.com/apple" target="_blank" rel="noopener noreferrer" className="contact-link">
                                View Repository
                            </a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <h3>LinkedIn</h3>
                            <p>Apple Inc.</p>
                            <a href="https://www.linkedin.com/company/apple/" target="_blank" rel="noopener noreferrer" className="contact-link">
                                Connect on LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Project Inquiry"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or idea..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                                <i className="fas fa-paper-plane"></i> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact