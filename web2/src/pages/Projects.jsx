import React from 'react'

const projectsData = [
    {
        title: "Apple Macintosh (1984)",
        description: "Revolutionary personal computer with graphical user interface that brought computing to the masses and changed the industry forever.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        technologies: ["Hardware Design", "Software", "GUI", "Innovation"],
        github: "https://github.com/apple",
        demo: "https://www.apple.com"
    },
    {
        title: "iPhone (2007)",
        description: "The smartphone that revolutionized mobile computing, combining phone, iPod, and internet communicator into one device.",
        image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
        technologies: ["iOS", "Multi-touch", "Mobile Computing", "Design"],
        github: "https://github.com/apple",
        demo: "https://www.apple.com"
    },
    {
        title: "iPod & iTunes (2001)",
        description: "Changed how the world listens to music. '1,000 songs in your pocket' revolutionized the music industry.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        technologies: ["Music Platform", "Digital Media", "Ecosystem"],
        github: "https://github.com/apple",
        demo: "https://www.apple.com"
    },
    {
        title: "Pixar Animation Studios",
        description: "Created Toy Story (1995), the first fully computer-animated feature film, revolutionizing the animation industry.",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
        technologies: ["CGI Animation", "Film Production", "Technology", "Art"],
        github: "https://github.com/pixar",
        demo: "https://www.pixar.com"
    },
    {
        title: "iPad (2010)",
        description: "Created an entirely new category of devices, bringing post-PC era computing to consumers worldwide.",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
        technologies: ["Tablet Computing", "iOS", "Design", "Innovation"],
        github: "https://github.com/apple",
        demo: "https://www.apple.com"
    },
    {
        title: "Apple Store Retail",
        description: "Revolutionized retail experience with innovative store design, Genius Bar, and unparalleled customer service.",
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&q=80",
        technologies: ["Retail Innovation", "Experience Design", "Customer Service"],
        github: "https://github.com/apple",
        demo: "https://www.apple.com/retail/"
    }
]

function Projects() {
    return (
        <section id="projects" className="projects">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">My Work</span>
                    <h2 className="section-title">Revolutionary Products</h2>
                </div>
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div key={index} className="project-card">
                            <img src={project.image} alt={project.title} className="project-image" />
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                                        Learn More
                                    </a>
                                    <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                                        Visit Site
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects