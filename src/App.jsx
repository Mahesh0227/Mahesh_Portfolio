import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  FaEnvelope, FaLinkedin, FaGithub, FaBars, FaTimes, FaArrowRight, FaDownload,
  FaMapMarkerAlt, FaGraduationCap, FaCertificate, FaPaperPlane, FaJava, FaAws,
  FaCss3Alt, FaRupeeSign, FaServer, FaRobot, FaCode, FaPlug, FaBriefcase,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdPayments, MdOutlineAutoAwesome } from "react-icons/md";
import {
  SiSpringboot, SiSpringsecurity, SiPython, SiFastapi, SiNodedotjs, SiExpress,
  SiApachemaven, SiJsonwebtokens, SiOpenai, SiSelenium, SiHtml5, SiJavascript,
  SiReact, SiTailwindcss, SiVite, SiMysql, SiDocker, SiGit, SiGithub, SiPostman,
  SiAppian, SiWhatsapp, SiGmail, SiNpm,
} from "react-icons/si";

// ── Data ────────────────────────────────────────────────────────────────────
const NAV = [
  ["home", "Home"], ["about", "About"], ["services", "Services"], ["skills", "Skills"],
  ["projects", "Work"], ["experience", "Experience"], ["contact", "Contact"],
];

const TECH = [
  {
    group: "Backend",
    items: [
      { name: "Java", Icon: FaJava, color: "#ED8B00" },
      { name: "Spring Boot", Icon: SiSpringboot, color: "#6DB33F" },
      { name: "Spring Security", Icon: SiSpringsecurity, color: "#6DB33F" },
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", Icon: SiExpress, color: "#222222" },
      { name: "Maven", Icon: SiApachemaven, color: "#C71A36" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#D63AFF" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#F0C400" },
      { name: "React", Icon: SiReact, color: "#00B7DB" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Vite", Icon: SiVite, color: "#646CFF" },
    ],
  },
  {
    group: "AI & Automation",
    items: [
      { name: "OpenAI API", Icon: SiOpenai, color: "#10A37F" },
      { name: "Selenium", Icon: SiSelenium, color: "#43B02A" },
      { name: "LLMs", Icon: FaRobot, color: "#8B6CF0" },
      { name: "Sensible AI", Icon: MdOutlineAutoAwesome, color: "#F59E0B" },
    ],
  },
  {
    group: "Database, Cloud & Tools",
    items: [
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "AWS", Icon: FaAws, color: "#FF9900" },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#181717" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
      { name: "Appian", Icon: SiAppian, color: "#2322F0" },
      { name: "npm", Icon: SiNpm, color: "#CB3837" },
    ],
  },
  {
    group: "Integrations",
    items: [
      { name: "Cashfree", Icon: MdPayments, color: "#00A67E" },
      { name: "SabPaisa", Icon: FaRupeeSign, color: "#E8602C" },
      { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
      { name: "Email", Icon: SiGmail, color: "#EA4335" },
    ],
  },
];

const CONCEPTS = ["OOP", "Multithreading", "RBAC", "MVC Architecture", "REST APIs", "JDBC", "Prompt Engineering", "SenseML"];

const SERVICES = [
  { Icon: FaServer, color: "#F59E0B", title: "Backend Development", text: "Secure, scalable REST APIs and services with Java, Spring Boot, Python and FastAPI." },
  { Icon: FaRobot, color: "#8B6CF0", title: "AI Document Automation", text: "LLM prompts and SenseML queries that extract data from 100+ document types at 90–95% accuracy." },
  { Icon: FaCode, color: "#4F8DF7", title: "Full-Stack Web Apps", text: "Booking sites, admin portals and dashboards with React, Node.js, Spring Boot and MySQL." },
  { Icon: FaPlug, color: "#10B3A3", title: "Payments & Integrations", text: "Cashfree and SabPaisa payments, WhatsApp and email automation, deployed and monitored." },
];

const PROJECTS = [
  {
    title: "NRK Travels", kind: "Booking Website", grad: ["#dfe8ff", "#c9b8ff"], Icons: [SiReact, SiVite, SiTailwindcss],
    description: "Booking website with SabPaisa payments, plus SEO and mobile performance improvements. Built end to end as a freelance project.",
    tags: ["React", "Vite", "Tailwind CSS", "SabPaisa"],
    slug: "nrk-travels", preview: "https://www.nrktravels.in/",
    links: [{ label: "Visit Site", url: "https://www.nrktravels.in/" }],
  },
  {
    title: "BSH Taxi Services", kind: "Booking Website", grad: ["#ffe3d6", "#e3c9ff"], Icons: [SiReact, SiWhatsapp, SiGmail],
    description: "Booking website with Cashfree payments and automated WhatsApp and email notifications for trip assignment, start and cancellation.",
    tags: ["React", "Cashfree", "WhatsApp", "Email Automation"],
    slug: "bsh-taxi", preview: "https://www.bshtaxiservices.com/",
    links: [{ label: "Visit Site", url: "https://www.bshtaxiservices.com/" }],
  },
  {
    title: "BSH Accounts", kind: "Expense & Income Management", grad: ["#d6f3e6", "#c7d9ff"], Icons: [SiNodedotjs, SiExpress, SiMysql],
    description: "Full-stack income and expense tracker with role-based access, JWT authentication, file uploads and monthly/yearly reports.",
    tags: ["Node.js", "Express", "MySQL", "JWT"],
    slug: "bsh-accounts", preview: "https://exp.bshtaxiservices.com/",
    links: [
      { label: "Live", url: "https://exp.bshtaxiservices.com/" },
      { label: "GitHub", url: "https://github.com/Mahesh0227/BSH_Accounts" },
    ],
  },
  {
    title: "NRK Fleet Management", kind: "Fleet & Trip Management", grad: ["#d9e6ff", "#d6f3e6"], Icons: [SiReact, SiNodedotjs, SiMysql],
    description: "Professional fleet and trip management system for NRK Travels to manage vehicles, trips and day-to-day accounts in one place.",
    tags: ["Fleet Management", "Trips", "Accounts", "Dashboard"],
    slug: "nrk-fleet", preview: "https://nrktravelsaccounts.com/",
    links: [{ label: "Live", url: "https://nrktravelsaccounts.com/" }],
  },
  {
    title: "Medha XL Admin Portal", kind: "Admin Dashboard", grad: ["#e0f0d4", "#bfe0ff"], Icons: [SiSpringboot, SiTailwindcss, SiJavascript],
    description: "Admin portal with a dashboard for student registration, fee tracking, batch scheduling and payment reports, with search and filtering.",
    tags: ["Spring Boot", "Tailwind CSS", "HTML", "JavaScript"],
    slug: "medha-xl", preview: "https://www.medhatest.com/",
    links: [
      { label: "Live", url: "https://www.medhatest.com/" },
      { label: "GitHub", url: "https://github.com/Mahesh0227/live-project" },
    ],
  },
  {
    title: "HTML to Excel Converter", kind: "Appian Plugin", grad: ["#ffeccc", "#d9d2ff"], Icons: [FaJava, SiSpringboot, SiAppian],
    description: "Full-stack plugin that converts HTML tables with merged and nested cells into .xlsx and .csv files for Appian reporting.",
    tags: ["Java", "Spring Boot", "SheetJS", "Appian"],
    links: [],
  },
  {
    title: "LinkedIn AI Agent", kind: "AI Automation", grad: ["#d9e6ff", "#f0d2ff"], Icons: [SiPython, SiSelenium, SiOpenai],
    description: "AI agent that browses LinkedIn profiles and automates connection requests and LLM-generated personalized messages, with session management and rate limiting.",
    tags: ["Python", "Selenium", "OpenAI API", "LLMs"],
    links: [],
  },
];

const STEPS = [
  ["Understand", "Clarify the problem, users and constraints before writing code."],
  ["Design", "Plan the data model, APIs and architecture."],
  ["Build", "Write clean, tested code with Java, Python and React."],
  ["Test", "Debug, test and review with real-world scenarios."],
  ["Deploy", "Ship with Docker and AWS, then monitor and improve."],
];

const EXPERIENCES = [
  {
    role: "Junior Software Engineer", company: "Tech Tammina LLC — Hyderabad, India", duration: "Aug 2025 – Present", current: true,
    groups: [
      { heading: "AI Document Automation (Sensible AI)", points: ["Automated insurance document extraction (policy renewals, ACORD forms) with Sensible AI, LLM prompts and SenseML queries across 100+ document types at 90–95% accuracy, reducing processing time from hours to seconds."] },
      { heading: "HTML to Excel Converter Plugin (Nov 2025 – Jan 2026)", points: ["Developed a full-stack plugin (Java, Spring Boot, SheetJS) that converts HTML tables with merged and nested cells into .xlsx and .csv files for Appian reporting."] },
      { heading: "Agency Management System (AMS) & Fleet Management System (Feb 2026 – Present)", points: ["Worked on backend modules, support and debugging in Python (FastAPI) for AMS and the role-based Fleet Management System in production, containerized with Docker and deployed on AWS; fixed authentication/token and payment-flow issues."] },
    ],
    skills: ["Java", "Spring Boot", "Python", "FastAPI", "Sensible AI", "SenseML", "Docker", "AWS", "Appian"],
  },
  {
    role: "Freelance Developer (Part-time)", company: "NRK Travels and BSH Taxi Services", duration: "2026 – Present", current: true,
    groups: [
      { heading: "", points: [
        "NRK Travels (nrktravels.in, nrktravelsaccounts.com): booking website with React, Vite and Tailwind CSS; SabPaisa payments; SEO and mobile performance improvements.",
        "BSH Taxi Services (bshtaxiservices.com, bshaccounts.in): booking website with Cashfree payments and automated WhatsApp and email notifications for trip assignment, start and cancellation.",
        "Responsibilities across both: frontend, backend, database, deployment, debugging and testing.",
      ] },
    ],
    skills: ["React", "Vite", "Tailwind CSS", "SabPaisa", "Cashfree", "WhatsApp API"],
  },
];

const EDUCATION = [
  { title: "B.Tech in Mechanical Engineering", school: "Sir C.R. Reddy College of Engineering, Eluru (JNTUK)", meta: "2022 – 2025 · CGPA 8.02" },
  { title: "Diploma in Mechanical Engineering", school: "Government Polytechnic College, Vijayawada (SBTET)", meta: "2018 – 2021 · 67.04%" },
];
const CERTS = [
  { name: "Java Full Stack", issuer: "SDI NSDC", year: "2025" },
  { name: "Java Programming", issuer: "Internz Learn", year: "2025" },
  { name: "Python Programming", issuer: "Udemy", year: "2024" },
  { name: "Machine Learning using Python", issuer: "Inspire Softech Solutions", year: "2024" },
];

const EMAIL = "maheshadhapureddy1216@gmail.com";
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ── Helpers ─────────────────────────────────────────────────────────────────
function TypedText({ strings }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = strings[i];
    let delay = del ? 40 : 90;
    if (!del && text === full) delay = 1800;
    const t = setTimeout(() => {
      if (!del && text === full) setDel(true);
      else if (del && text === "") { setDel(false); setI((i + 1) % strings.length); }
      else setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, del, i, strings]);

  return <span>{text}</span>;
}

function Reveal({ children, className = "", as: Tag = "div", delay = 0, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Head({ eyebrow, title, sub, action }) {
  return (
    <div className="head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {sub && <p className="head-sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const click = (id) => { setOpen(false); go(id); };
  return (
    <nav className="nav">
      <div className="brand" onClick={() => click("home")}>
        <span className="brand-mark">M</span>
        <span className="brand-text"><strong>Mahesh Adhapureddy</strong><small>Junior Software Engineer</small></span>
      </div>
      <ul className="nav-links">
        {NAV.map(([id, label]) => (
          <li key={id} className={active === id ? "on" : ""} onClick={() => click(id)}>{label}</li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => click("contact")}>Let's Talk <FaArrowRight /></button>
      <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? <FaTimes /> : <FaBars />}</button>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {NAV.map(([id, label]) => (
          <div key={id} className={`mobile-link ${active === id ? "on" : ""}`} onClick={() => click(id)}>{label}</div>
        ))}
      </div>
    </nav>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="hero panel">
      <div className="hero-copy">
        <span className="eyebrow">Hello, I'm</span>
        <h1>Mahesh<br />Adhapureddy</h1>
        <h2 className="hero-role grad-text">
          <TypedText strings={["Junior Software Engineer", "Java Developer", "Python Developer", "Spring Boot · FastAPI · REST APIs"]} />
          <i className="caret" />
        </h2>
        <p className="lead">
          I build backend-driven web applications and AI-powered automation, from insurance
          document extraction to booking platforms with payments, in production.
        </p>
        <div className="btn-row">
          <button className="btn dark" onClick={() => go("projects")}>View My Work <FaArrowRight /></button>
          <a className="btn glass" href="/Mahesh_Adhapureddy_Resume.pdf" download>Download CV <FaDownload /></a>
        </div>
        <div className="trusted">
          <small>Worked with</small>
          <div>
            <span>Tech Tammina</span><span>NRK Travels</span><span>BSH Taxi</span><span>Medha XL</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="photo-frame"><img src="/mahesh-photo.jpg" alt="Mahesh Adhapureddy" /></div>
        <div className="orb-badge"><MdOutlineAutoAwesome /></div>
        <div className="float-card exp-card"><strong>1+</strong><span>Years of<br />Experience</span></div>
        <div className="float-card impact-card">
          <small>Doc extraction accuracy</small>
          <strong>90–95%</strong>
          <svg viewBox="0 0 120 34" aria-hidden="true">
            <defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stopColor="#a58bff" /><stop offset="1" stopColor="#6aa6ff" /></linearGradient></defs>
            <path d="M2 28 C16 26 22 18 36 20 S58 10 72 13 98 5 118 4" fill="none" stroke="url(#sg)" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const stats = [["1+", "Year Experience"], ["7", "Projects Delivered"], ["5", "Live in Production"], ["100+", "Document Types"]];
  return (
    <section id="about" className="panel about">
      <Reveal>
        <span className="eyebrow">About me</span>
        <h2>Building reliable backends,<br />shipping with purpose</h2>
        <div className="stat-row">
          {stats.map(([v, l]) => (<div key={l} className="stat"><strong>{v}</strong><span>{l}</span></div>))}
        </div>
      </Reveal>
      <Reveal delay={120} className="about-text">
        <p>I’m a <strong>Junior Software Engineer</strong> and <strong>Java / Python developer</strong> (Spring Boot, FastAPI) with 1+ year of experience and 7 projects delivered, 5 of them live in production.</p>
        <p>At <strong>Tech Tammina LLC</strong>, I automate insurance document extraction with Sensible AI, LLM prompts and SenseML queries across 100+ document types at 90–95% accuracy, cutting processing time from hours to seconds. I also work on backend modules for the Agency Management System and the role-based Fleet Management System (Python, FastAPI, Docker, AWS).</p>
        <p>Outside work, I freelance as a full-stack developer for NRK Travels and BSH Taxi Services, handling frontend, backend, database, payments (SabPaisa, Cashfree), deployment, debugging and testing.</p>
        <a className="btn glass" href="/Mahesh_Adhapureddy_Resume.pdf" target="_blank" rel="noopener noreferrer">View Resume <FaArrowRight /></a>
      </Reveal>
    </section>
  );
}

// ── Services ────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="panel">
      <Head eyebrow="What I do" title="Services I Offer" />
      <div className="grid-4">
        {SERVICES.map(({ Icon, color, title, text }, n) => (
          <Reveal key={title} delay={n * 80} className="card service" style={{ "--c": color }}>
            <span className="svc-ico"><Icon /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Technologies ────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" className="panel">
      <Head eyebrow="Tools & skills" title="Technologies I Use" />
      <div className="tech-groups">
        {TECH.map((g) => (
          <Reveal key={g.group} className="tech-group">
            <h3>{g.group}</h3>
            <div className="tech-grid">
              {g.items.map(({ name, Icon, color }) => (
                <div key={name} className="tech-tile" style={{ "--c": color }} title={name}>
                  <span className="tech-ico"><Icon /></span>
                  <span className="tech-name">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
        <Reveal className="tech-group">
          <h3>Core Concepts</h3>
          <div className="chips">{CONCEPTS.map((c) => <span key={c} className="chip">{c}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Live interface preview ──────────────────────────────────────────────────
// Image order: 1) your own screenshot in /public/projects/<slug>.png (best quality)
//              2) auto screenshot of the live site  3) fallback mock-up
const shotUrl = (url, w = 900) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${Math.round(w * 0.625)}`;
const hostOf = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Shot({ p, w = 900, className = "" }) {
  const [src, setSrc] = useState(`/projects/${p.slug}.png`);
  const [stage, setStage] = useState(0);
  const onError = () => {
    if (stage === 0) { setStage(1); setSrc(shotUrl(p.preview, w)); }
    else setStage(2);
  };
  if (stage === 2) return null;
  return <img className={`shot ${className}`} src={src} alt={`${p.title} interface`} loading="lazy" onError={onError} />;
}

function BrowserFrame({ p, children }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="addr">{hostOf(p.preview)}</span>
      </div>
      <div className="browser-view">{children}</div>
    </div>
  );
}

function PreviewModal({ p, onClose }) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${p.title} preview`}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div><h3>{p.title}</h3><small>{p.kind}</small></div>
          <div className="modal-actions">
            <button className={`btn glass sm${live ? " on" : ""}`} onClick={() => setLive(!live)}>{live ? "Screenshot" : "Live preview"}</button>
            <a className="btn dark sm" href={p.preview} target="_blank" rel="noopener noreferrer">Open site <FaExternalLinkAlt /></a>
            <button className="round-btn" onClick={onClose} aria-label="Close"><FaTimes /></button>
          </div>
        </div>
        <BrowserFrame p={p}>
          {live ? (
            <>
              <iframe className="live-frame" src={p.preview} title={`${p.title} live`} loading="lazy" />
              <p className="frame-note">Blank-ga kanipisthe site embedding allow cheyaledu — “Open site” click cheyyandi.</p>
            </>
          ) : (
            <Shot p={p} w={1400} className="shot-lg" />
          )}
        </BrowserFrame>
      </div>
    </div>
  );
}

// ── Projects ────────────────────────────────────────────────────────────────
function Projects() {
  const [open, setOpen] = useState(null);
  return (
    <section id="projects" className="panel">
      <Head
        eyebrow="Featured projects" title="Selected Work"
        action={<a className="btn glass sm" href="https://github.com/Mahesh0227/" target="_blank" rel="noopener noreferrer">All on GitHub <FaArrowRight /></a>}
      />
      <div className="grid-3">
        {PROJECTS.map((p, n) => (
          <Reveal key={p.title} delay={(n % 3) * 80} className="card project">
            {p.preview ? (
              <button type="button" className="thumb has-shot" onClick={() => setOpen(p)} aria-label={`Preview ${p.title}`}
                style={{ background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}>
                <BrowserFrame p={p}>
                  <div className="mock-body fallback">
                    <div className="mock-icons">{p.Icons.map((I, k) => <I key={k} />)}</div>
                    <b /><b className="s" />
                  </div>
                  <Shot p={p} />
                </BrowserFrame>
                <span className="view-badge">View interface</span>
              </button>
            ) : (
              <div className="thumb" style={{ background: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}>
                <div className="mock">
                  <div className="mock-bar"><i /><i /><i /></div>
                  <div className="mock-body">
                    <div className="mock-icons">{p.Icons.map((I, k) => <I key={k} />)}</div>
                    <b /><b className="s" />
                  </div>
                </div>
              </div>
            )}
            <div className="project-body">
            <div className="project-top">
              <div><h3>{p.title}</h3><small>{p.kind}</small></div>
              {p.links[0] && (
                <a className="round-btn" href={p.links[0].url} target="_blank" rel="noopener noreferrer" aria-label={p.links[0].label}><FaExternalLinkAlt /></a>
              )}
            </div>
            <p>{p.description}</p>
            <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            {p.links.length > 0 && (
              <div className="plinks">
                {p.links.map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} <FaArrowRight /></a>
                ))}
              </div>
            )}
          </div>
          </Reveal>
        ))}
      </div>
      {open && <PreviewModal p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

// ── Process ─────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section id="process" className="panel">
      <Head eyebrow="How I work" title="My Development Process" />
      <div className="steps">
        {STEPS.map(([t, d], n) => (
          <Reveal key={t} delay={n * 70} className="card step">
            <span className="step-no">0{n + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Experience ──────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="panel">
      <Head eyebrow="Career" title="Experience" sub="My professional journey and real-world work." />
      <div className="timeline">
        {EXPERIENCES.map((e) => (
          <Reveal key={e.role} className="tl-item">
            <span className="tl-dot"><FaBriefcase /></span>
            <div className="card tl-card">
              <div className="tl-top">
                <div><h3>{e.role}</h3><h4>{e.company}</h4></div>
                <div className="tl-badges">
                  <span className="pill">{e.duration}</span>
                  {e.current && <span className="pill live"><i /> Currently working</span>}
                </div>
              </div>
              {e.groups.map((g, gi) => (
                <div key={gi} className="tl-group">
                  {g.heading && <h5>{g.heading}</h5>}
                  <ul>{g.points.map((p, i) => <li key={i}>{p}</li>)}</ul>
                </div>
              ))}
              <div className="chips">{e.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Education ───────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="panel">
      <Head eyebrow="Learning" title="Education & Certifications" />
      <div className="grid-2">
        <div>
          <h3 className="sub-h">Education</h3>
          {EDUCATION.map((e) => (
            <Reveal key={e.title} className="card edu">
              <span className="edu-ico"><FaGraduationCap /></span>
              <div><h4>{e.title}</h4><p>{e.school}</p><small>{e.meta}</small></div>
            </Reveal>
          ))}
        </div>
        <div>
          <h3 className="sub-h">Certifications</h3>
          {CERTS.map((c) => (
            <Reveal key={c.name} className="card edu">
              <span className="edu-ico cert"><FaCertificate /></span>
              <div><h4>{c.name}</h4><p>{c.issuer}</p><small>{c.year}</small></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  const [f, setF] = useState({ name: "", email: "", project: "Web Application", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${f.project} enquiry from ${f.name}`);
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="panel contact">
      <div className="contact-info">
        <span className="eyebrow">Let's connect</span>
        <h2>Have a project in mind?<br />Let's build something great together.</h2>
        <a className="c-row" href={`mailto:${EMAIL}`}><span><FaEnvelope /></span>{EMAIL}</a>
        <a className="c-row" href="https://www.linkedin.com/in/adhapureddymahesh1216/" target="_blank" rel="noopener noreferrer"><span><FaLinkedin /></span>LinkedIn</a>
        <a className="c-row" href="https://github.com/Mahesh0227/" target="_blank" rel="noopener noreferrer"><span><FaGithub /></span>GitHub</a>
        <div className="c-row static"><span><FaMapMarkerAlt /></span>Hyderabad, India</div>
        <div className="orb" aria-hidden="true" />
      </div>
      <form className="form card" onSubmit={submit}>
        <div className="f-row">
          <input required placeholder="Your name" value={f.name} onChange={set("name")} />
          <input required type="email" placeholder="Your email" value={f.email} onChange={set("email")} />
        </div>
        <select value={f.project} onChange={set("project")}>
          <option>Web Application</option><option>Backend / API</option><option>AI Automation</option>
          <option>Payments Integration</option><option>Other</option>
        </select>
        <textarea required rows={5} placeholder="Your message" value={f.message} onChange={set("message")} />
        <button className="btn dark wide" type="submit">Send Message <FaPaperPlane /></button>
      </form>
    </section>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const map = { process: "projects", education: "experience" };
    const ids = ["home", "about", "services", "skills", "projects", "process", "experience", "education", "contact"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(map[e.target.id] || e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="App">
      <div className="bg-orb o1" /><div className="bg-orb o2" /><div className="bg-orb o3" />
      <Nav active={active} />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Process />
        <Experience />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Mahesh Adhapureddy · Junior Software Engineer</p>
        <button onClick={() => go("home")}>Back to top ↑</button>
      </footer>
    </div>
  );
}
