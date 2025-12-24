const projects = [
    {
        title: "E-Ticaret Platformu",
        description: "React ve Node.js kullanılarak geliştirilmiş tam kapsamlı e-ticaret uygulaması. Kullanıcı yönetimi, ürün katalogu ve ödeme sistemi içerir.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    },
    {
        title: "Hava Durumu Uygulaması",
        description: "OpenWeather API entegrasyonu ile gerçek zamanlı hava durumu bilgisi sağlayan responsive web uygulaması.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        technologies: ["JavaScript", "API", "CSS3", "HTML5"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    },
    {
        title: "Görev Yönetim Sistemi",
        description: "Kullanıcıların görevlerini organize etmesini sağlayan, local storage ile veri saklayan modern todo uygulaması.",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
        technologies: ["JavaScript", "LocalStorage", "CSS3"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    },
    {
        title: "Portfolio Website",
        description: "Kişisel portfolio sitesi. Modern tasarım ve animasyonlar ile responsive yapı.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        technologies: ["HTML5", "CSS3", "JavaScript", "Vite"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    },
    {
        title: "Blog Platformu",
        description: "Kullanıcıların blog yazıları paylaşabileceği, yorum yapabileceği sosyal blog platformu.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
        technologies: ["React", "Firebase", "Tailwind"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    },
    {
        title: "Chat Uygulaması",
        description: "Gerçek zamanlı mesajlaşma özellikli chat uygulaması. WebSocket teknolojisi kullanılmıştır.",
        image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
        technologies: ["Socket.io", "Node.js", "Express"],
        github: "https://github.com/saidoztrk",
        demo: "#"
    }
];

function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    if (!projectsGrid) return;

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech =>
            `<span class="tech-tag">${tech}</span>`
        ).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <a href="${project.demo}" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);