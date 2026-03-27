import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
// ── TypedText Component ──────────────────────────────────────────────────
function TypedText({ strings = [] }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (strings.length === 0) return;
    
    const timer = setTimeout(() => {
      const currentString = strings[currentIndex];
      
      if (!isDeleting) {
        if (charIndex < currentString.length) {
          setDisplayedText(currentString.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(currentString.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % strings.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [charIndex, currentIndex, isDeleting, strings]);

  return <span>{displayedText}</span>;
}

// ── Particle Canvas Component ───────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.15,
      color: ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 4)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 0.06;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = "#3b82f6";
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const links = ["home", "about", "skills", "projects", "experience", "contact"];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => scrollTo("home")}>
        Portfolio
      </div>
      <ul className="nav-links">
        {links.map((l) => (
          <li
            key={l}
            className={active === l ? "nav-active" : ""}
            onClick={() => scrollTo(l)}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── Hero Section ───────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="hero-section">
      <ParticleCanvas />
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">
          Mahesh <span className="gradient-text">Adhapureddy</span>
        </h1>
        <h2 className="hero-role">
          <TypedText strings={["Java Full Stack Developer", "AI Training Engineer", "Problem Solver"]} />
        </h2>
        <p className="hero-bio">
          I design and build clean, performant, and visually compelling digital experiences powered by modern web technologies.
        </p>
        <div className="hero-buttons">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Projects
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}

// ── About Section ───────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-image-wrap">
          <div className="about-image-frame">
            <div className="about-image-placeholder">
              <div className="profile-initials">MA</div>
            </div>
          </div>
        </div>
       <div className="about-text">
  <p>
    I’m a passionate <strong>Java Full Stack Developer</strong> based in Hyderabad, India, with over 1 year of hands-on experience in building scalable, responsive, and user-centric web applications.
  </p>

  <p>
    I specialize in <strong>Java, Spring Boot, JavaScript, and modern frontend technologies</strong>, with a strong focus on creating clean architecture, efficient APIs, and seamless user experiences. I enjoy transforming complex problems into simple, elegant solutions.
  </p>

  <p>
    I am continuously learning and upgrading my skills to stay aligned with industry trends. My goal is to build high-performance applications that are not only functional but also visually engaging and user-friendly.
  </p>

  <p>
    I’m currently seeking opportunities where I can contribute, grow as a developer, and make a meaningful impact through technology.
  </p>

  <a 
    href="/resume.pdf" 
    className="btn-primary" 
    style={{ marginTop: "1.5rem", display: "inline-flex" }}
  >
    Download Resume ↓
  </a>
</div>
      </div>
    </section>
  );
}

// ── Skills Section ─────────────────────────────────────────────────────
function Skills() {
  const skillCategories = [
    { name: "Frontend", skills: ["Html", "JavaScript", "TypeScript", "CSS3", "Tailwind CSS", "Next.js"] },
    { name: "Backend", skills: ["Java", "Spring Boot", "JWT Authentication","Spring Security","Spring Data JPA","REST APIs"] },
    { name: "Frameworks", skills: ["Spring Boot", "Express.js","node.js"] },
    { name: "Database", skills: ["MySQL", "PostgreSQL","JDBC"] },
     { name: "Machine Learning & AI", skills: ["Machine Learning", "Large Language Models","Data Visualization"] },
    { name: "Tools & Platforms", skills: ["Git", "GitHub", "VS Code", "Eclips", "Postman", " Maven"] },
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="section-header">
        <h2>Skills & Expertise</h2>
      </div>
      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div key={cat.name} className="skill-category">
            <h3>{cat.name}</h3>
            <div className="skill-items">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Projects Section ───────────────────────────────────────────────────
function Projects() {
  const projects = [
    {
      title: "BSH Accounts Management System",
      description: "Full-stack application for managing accounting records with JavaScript, Node.js, JWT Authentication and MySQL.",
      tags: ["JavaScript", "Node.js", "Html","Tailwind CSS", "MySQL"],
      link: "https://github.com/Mahesh0227/BSH_Accounts",
    },
    {
      title: "Medha XL Admin Portal",
      description: "Developed a responsive, interactive web-based admin portal for managing students, batches, and payments.",
      tags: ["JavaScript", "Java", "Spring Boot", "MySQL", "Html","Tailwind CSS", "JWT Authentication"],
      link: "https://github.com/Mahesh0227/live-project",
    },
    {
      title: "E-commerce Admin Management Portal",
      description: "Developed a comprehensive admin portal for managing products, orders, and customers in an e-commerce environment.",
      tags: ["JavaScript", "Node.js", "React", "MySQL", "Html","Tailwind CSS"],
      link: "https://github.com/mahesh",
    },
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <h2>Featured Projects</h2>
      </div>
      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div key={idx} className="project-card">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div className="project-tags">
              {proj.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="btn-link">
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Experience Section ───────────────────────────────────────────
function Experience() {
  const experiences = [
    {
      role: "AI Training Engineer",
      company: "Tech Tammina LLC",
      duration: "2025[Aug] - Present",
      status: "Currently Working",
    description: `
• Leading end-to-end automation of complex insurance documents using Sensible AI

• Designed LLM-based prompts for 100+ document types with 90–95% accuracy

• Reduced manual processing time from hours to seconds

• Developed expertise in insurance workflows and document intelligence

• Building Java plugins and deploying in Appian for enterprise automation
`,        skills: ["Java", "Spring Boot", "Ai Automation", "Prompt Engineering"],
    },
    {
      role: "Java Full Stack Developer (Intern)",
      company: "Medha XL Project",
      duration: "2025[Feb] - 2025[July]",
      status: "Completed",
      description:
        "Developed a responsive, interactive web-based admin portal for managing students, batches, and payments. Implemented RESTful APIs using Spring Boot for backend services and designed a dynamic frontend with JavaScript and Tailwind CSS. Integrated JWT authentication for secure access control and optimized database interactions with MySQL, resulting in a seamless user experience and efficient data management.",
      skills: ["Java", "Spring Boot", "MySQL", "JWT"],
    },
  ];

  return (
    <section id="experience" className="section experience-section">
      <div className="section-header">
        <h2>Experience</h2>
        <p>My professional journey and real-time work experience</p>
      </div>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <div className="timeline-item">
  
  {/* Year on left side */}
  <div className="timeline-year">
    {exp.duration}
  </div>

  <div className="timeline-dot"></div>

  <div className="timeline-content">
    <h3>{exp.role}</h3>
    <h4>{exp.company}</h4>

    <div className="timeline-meta">
      <span className={`status ${exp.status === "Currently Working" ? "active" : ""}`}>
        {exp.status}
      </span>
    </div>

    <ul className="exp-points">
      {exp.description.trim().split("\n").map((point, i) =>
        point && <li key={i}>{point.replace("•", "").trim()}</li>
      )}
    </ul>

    <div className="exp-skills">
      {exp.skills.map((skill) => (
        <span key={skill} className="tag">{skill}</span>
      ))}
    </div>
  </div>
</div>
        ))}
      </div>
    </section>
  );
}

// ── Contact Section ───────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-header">
        <h2>Let's Connect</h2>
        <p>Feel free to reach out for collaborations or just a friendly hello!</p>
      </div>

      <div className="contact-links">

        <a href="mailto:maheshadhapureddy1216@email.com" className="contact-link email">
          <FaEnvelope className="icon" />
          <div>
            <span>Email</span>
            <small>maheshadhapureddy1216@email.com</small>
          </div>
        </a>

        <a href="https://www.linkedin.com/in/adhapureddymahesh1216/" target="_blank" rel="noopener noreferrer" className="contact-link linkedin">
          <FaLinkedin className="icon" />
          <div>
            <span>LinkedIn</span>
            <small>Connect professionally</small>
          </div>
        </a>

        <a href="https://github.com/Mahesh0227/" target="_blank" rel="noopener noreferrer" className="contact-link github">
          <FaGithub className="icon" />
          <div>
            <span>GitHub</span>
            <small>View my projects</small>
          </div>
        </a>

      </div>
    </section>
  );
}

// ── Footer Component ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 Mahesh Adhapureddy. All rights reserved. | Full Stack Developer</p>
    </footer>
  );
}

// ── Main App Component ─────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  return (
    <div className="App">
      <Nav active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}