import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'framer-motion';
import { 
  Mail, ExternalLink, Moon, Sun,
  Menu, X, ChevronRight, FileText, Code, Database, BrainCircuit, User, ArrowUp,
  Copy, Check, Search, Send, Sparkles, Filter, Download, ZoomIn, ZoomOut
} from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { 
  professionalInfo, metrics, impactHighlights, focusAreas, experience, skills,
  projects, concepts, education, certifications 
} from './data/portfolioData';
import TechFrame from './components/TechFrame';
import ProfessionalPhotoFrame from './components/ProfessionalPhotoFrame';

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-slate-900 dark:text-slate-100 border-b pb-4 border-slate-200 dark:border-slate-800 flex items-center justify-between"
        >
          <span>{title}</span>
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [cvZoom, setCvZoom] = useState(100);
  const [cvViewMode, setCvViewMode] = useState('doc'); // 'doc' or 'pdf'

  const resumeUrl = `${import.meta.env.BASE_URL}assets/CV of Riduan Aziz.pdf`;
  const cvPages = [
    `${import.meta.env.BASE_URL}assets/cv-page-1.png`,
    `${import.meta.env.BASE_URL}assets/cv-page-2.png`,
    `${import.meta.env.BASE_URL}assets/cv-page-3.png`
  ];
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        setResumeModalOpen(false);
      }
    };
    if (resumeModalOpen) {
      window.addEventListener('keydown', handleKeyDown, true);
      document.addEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = 'unset';
    };
  }, [resumeModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['about', 'value', 'experience', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(professionalInfo.contacts.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(contactForm.subject || `Message from ${contactForm.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`);
    window.location.href = `mailto:${professionalInfo.contacts.email}?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const experienceTags = [
    ["KoboCollect", "Field Assessments", "Data QA", "PSEA Safeguarding", "Documentation"],
    ["Household Surveys", "Field Verification", "Socio-Economic Data", "Data Integrity"],
    ["Database Management", "Data Cleaning", "Cross-Validation", "Spreadsheets"]
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = 
      projectFilter === 'All' ? true :
      projectFilter === 'AI/ML' ? (project.category === 'AI/ML' || project.category === 'Research') :
      projectFilter === 'Software' ? project.category === 'Software' :
      projectFilter === 'Data' ? (project.category === 'Data' || project.category === 'Research') : true;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tech.some(t => t.toLowerCase().includes(q)) ||
      project.category.toLowerCase().includes(q)
    );

    return matchesCategory && matchesSearch;
  });

  const navLinks = ['About', 'Value', 'Experience', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <div className="min-h-screen font-sans selection:bg-accent selection:text-white">
      <div className="page-tech-background" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-graphics">
          <motion.div className="hero-orbit hero-orbit-one" animate={reduceMotion ? undefined : { x: [0, 28, 0], y: [0, -18, 0], rotate: [0, 8, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="hero-orbit hero-orbit-two" animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, 26, 0], rotate: [0, -12, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.span className="hero-node hero-node-one" animate={reduceMotion ? undefined : { y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.span className="hero-node hero-node-two" animate={reduceMotion ? undefined : { y: [0, 18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
          <span className="hero-scan-line" />
        </div>
      </div>
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-300 z-[60] origin-left shadow-[0_0_12px_rgba(110,231,249,0.8)]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-xl tracking-tight flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse group-hover:scale-125 transition-transform" />
            <span className="bg-gradient-to-r from-slate-900 via-accent to-sky-400 dark:from-white dark:via-sky-200 dark:to-cyan-400 bg-clip-text text-transparent">
              Riduan Aziz
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  className={`relative py-1 transition-colors ${
                    isActive 
                      ? 'text-accent font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent'
                  }`}
                >
                  {link}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full shadow-[0_0_8px_rgba(79,140,255,0.8)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <button 
              onClick={() => setResumeModalOpen(true)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200/60 dark:border-slate-700/60 font-medium text-sm text-slate-800 dark:text-slate-100"
            >
              <FileText size={16}/> Resume
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-accent/50 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-700" />}
            </button>
          </div>

          <button 
            className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 pb-6 shadow-xl border-b border-slate-200 dark:border-slate-800 absolute w-full overflow-hidden"
            >
              <div className="py-2 space-y-1">
                {navLinks.map(link => {
                  const isActive = activeSection === link.toLowerCase();
                  return (
                    <a 
                      key={link} 
                      href={`#${link.toLowerCase()}`} 
                      onClick={() => setMenuOpen(false)} 
                      className={`block py-2.5 px-3 rounded-md transition-colors ${
                        isActive 
                          ? 'bg-accent/10 text-accent font-semibold' 
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {link}
                    </a>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button 
                  onClick={() => { setMenuOpen(false); setResumeModalOpen(true); }}
                  className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-md bg-slate-100 dark:bg-slate-800"
                >
                  <FileText size={16}/> View Resume
                </button>
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="flex items-center gap-2 text-sm font-medium py-2 px-3 rounded-md bg-slate-100 dark:bg-slate-800"
                >
                  {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />} 
                  <span>{darkMode ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-12 items-center min-h-[60vh]">
          <motion.div 
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-accent/10 border border-accent/30 text-accent mb-6 backdrop-blur-sm shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Software Engineering & Applied AI Roles</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              {professionalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-accent font-medium mb-6">
              {professionalInfo.headline}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
              {professionalInfo.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="orange-gradient-button electric-border bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-md font-medium transition">
                Explore My Work
              </a>
              <button 
                onClick={() => setResumeModalOpen(true)}
                className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200"
              >
                <FileText size={18} className="text-accent" /> Resume
              </button>
              <a href={professionalInfo.contacts.github} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaGithub size={18} aria-hidden="true" /> GitHub
              </a>
              <a href={professionalInfo.contacts.linkedin} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaLinkedinIn size={18} aria-hidden="true" /> LinkedIn
              </a>
              <button 
                onClick={copyToClipboard} 
                className="electric-border flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition relative min-w-[135px] whitespace-nowrap"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-500 shrink-0" /> : <Copy size={18} className="shrink-0" />}
                <span className="whitespace-nowrap">{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
              <a href={`mailto:${professionalInfo.contacts.email}`} className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Mail size={18} /> Gmail
              </a>
              <a href={professionalInfo.contacts.whatsapp} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-5 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Professional Interactive Photo Frame Beside Hero Section */}
          <div className="md:col-span-5 flex justify-center items-center">
            <ProfessionalPhotoFrame professionalInfo={professionalInfo} />
          </div>
        </div>
      </section>

      {/* Impact strip inspired by the reference's business-value snapshot */}
      <section className="impact-section px-6 md:px-12 lg:px-24 pb-12">
        <div className="impact-grid max-w-6xl mx-auto">
          {impactHighlights.map((item, index) => (
            <motion.article key={item.title} className="impact-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <span className="impact-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Professional Snapshot */}
      <section className="px-6 md:px-12 lg:px-24 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} 
              className="card-border-effect p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{metric.value}</h3>
              <p className="font-medium text-slate-700 dark:text-slate-300">{metric.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">{metric.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
              {professionalInfo.about}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="card-border-effect p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-start gap-4">
              <Code className="text-accent mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Software Engineering</h4>
                <p className="text-sm text-slate-500">Android, Web, Backend APIs, Cloud Infrastructure.</p>
              </div>
            </div>
            <div className="card-border-effect p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-start gap-4">
              <Database className="text-accent mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">Data & Information Management</h4>
                <p className="text-sm text-slate-500">Field data collection, quality assurance, verification, analytics.</p>
              </div>
            </div>
            <div className="card-border-effect p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-start gap-4">
              <BrainCircuit className="text-accent mt-1" />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">AI & Machine Learning</h4>
                <p className="text-sm text-slate-500">Computer Vision, Speech Recognition, Predictive Modeling.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="value" title="How I Add Value" className="value-section">
        <p className="section-intro">My direction connects computer science, practical data work, software delivery, and applied AI. Each area supports the next.</p>
        <div className="focus-grid">
          {focusAreas.map((area, index) => (
            <motion.article key={area.title} className="focus-card" whileHover={{ y: -4 }}>
              <span className="focus-index">0{index + 1}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </motion.article>
          ))}
        </div>
        <div className="value-flow" aria-label="Professional development path">
          <span>Data collection</span><ChevronRight aria-hidden="true" /><span>Data quality</span><ChevronRight aria-hidden="true" /><span>Analytics</span><ChevronRight aria-hidden="true" /><span>Software</span><ChevronRight aria-hidden="true" /><span>AI/ML</span>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Professional Experience" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0">
          {experience.map((exp, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="mb-12 pl-8 md:pl-10 relative"
            >
              <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 border-4 border-white dark:border-slate-900 shadow-[0_0_8px_rgba(79,140,255,0.6)]"></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">{exp.company}</p>
              <p className="text-sm text-slate-500 mb-3">{exp.period}</p>
              
              {/* Role Skills / Tools Tags */}
              {experienceTags[index] && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {experienceTags[index].map((t) => (
                    <span key={t} className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Responsibilities</h4>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                  {exp.responsibilities.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">Achievements</h4>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                  {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trajectory Card */}
        <div className="card-border-effect mt-12 p-8 rounded-xl text-center border border-slate-200 dark:border-slate-700/80">
          <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">From Field Data to Intelligent Systems</h3>
          <p className="text-slate-600 dark:text-slate-300 md:text-lg font-medium flex flex-wrap items-center justify-center gap-2">
            <span>Data Collection</span>
            <span className="text-accent font-bold">→</span>
            <span>Data Quality</span>
            <span className="text-accent font-bold">→</span>
            <span>Database Management</span>
            <span className="text-accent font-bold">→</span>
            <span>Analytics</span>
            <span className="text-accent font-bold">→</span>
            <span>Software Development</span>
            <span className="text-accent font-bold">→</span>
            <span>AI/ML</span>
          </p>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Technical Skills">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-border-effect p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Primary Foundation</h3>
            <div className="flex flex-wrap gap-2">
              {skills.primary.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 text-sm font-medium rounded border border-slate-200 dark:border-slate-600">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="card-border-effect p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Working Knowledge</h3>
            <div className="flex flex-wrap gap-2">
              {skills.workingKnowledge.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white dark:bg-slate-700 text-sm font-medium rounded border border-slate-200 dark:border-slate-600">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="card-border-effect p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Currently Exploring</h3>
            <div className="flex flex-wrap gap-2">
              {skills.exploring.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-200 dark:bg-slate-900 text-sm font-medium rounded">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        
        <TechFrame />
      </Section>

      {/* Featured Projects */}
      <Section id="projects" title="Featured Projects" className="bg-slate-50 dark:bg-slate-900/50">
        {/* Interactive Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'All', label: 'All Projects', count: projects.length },
              { id: 'AI/ML', label: 'AI & ML', count: projects.filter(p => p.category === 'AI/ML' || p.category === 'Research').length },
              { id: 'Software', label: 'Software', count: projects.filter(p => p.category === 'Software').length },
              { id: 'Data', label: 'Data & Research', count: projects.filter(p => p.category === 'Data' || p.category === 'Research').length }
            ].map((tab) => {
              const isSelected = projectFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProjectFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-accent text-white shadow-md shadow-accent/25 ring-2 ring-accent/30'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech or project..."
              className="w-full pl-9 pr-8 py-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 mb-16">
            <p className="text-slate-500 dark:text-slate-400 mb-4">No projects match your current filter or search criteria.</p>
            <button 
              onClick={() => { setProjectFilter('All'); setSearchQuery(''); }}
              className="px-4 py-2 text-xs font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div 
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="card-border-effect bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow group flex flex-col h-full"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold tracking-wider text-accent uppercase">{project.category}</span>
                      <span className="text-xs py-1 px-2.5 bg-slate-100 dark:bg-slate-900/80 text-slate-500 rounded-full font-medium border border-slate-200 dark:border-slate-700/60">{project.status}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map(t => (
                        <button
                          key={t}
                          onClick={() => setSearchQuery(t)}
                          title={`Filter by ${t}`}
                          className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-600/50 hover:border-accent hover:text-accent transition"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 border-t border-slate-100 dark:border-slate-700/70 bg-slate-50/70 dark:bg-slate-900/50 mt-auto">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition group/btn"
                    >
                      <FaGithub size={16} aria-hidden="true" className="group-hover/btn:scale-110 transition-transform" /> 
                      <span>View Repository</span>
                      <ExternalLink size={14} className="opacity-0 group-hover/btn:opacity-100 transition-opacity ml-auto" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Other Projects / Concepts */}
        <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Other Projects & Research Concepts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {concepts.map((concept, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="card-border-effect p-5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">{concept.title}</h4>
                </div>
                <span className="text-[10px] uppercase font-bold text-accent block mb-3">{concept.label}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-auto pt-2">
                {concept.tech.map(t => (
                  <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Education & Certifications */}
      <Section id="education" title="Education & Certifications">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
              Academic Background
            </h3>
            <div className="space-y-8">
              {education.map((edu, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700"
                >
                  <div className="absolute w-3 h-3 bg-accent rounded-full -left-[7px] top-2 ring-4 ring-white dark:ring-slate-900"></div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-accent font-medium text-sm mb-1">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.details}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Grid */}
          <div>
             <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">
              Certifications & Training
            </h3>
            <div className="grid gap-4">
              {certifications.map((cert, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="card-border-effect p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-all"
                >
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{cert.title}</h4>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{cert.issuer}</span>
                    <span className="font-medium text-accent">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-slate-900 text-white dark:bg-black">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-accent text-sm font-semibold tracking-wider uppercase">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">Let's Connect & Collaborate</h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Interested in software development, data-driven solutions, AI/ML applications, or tech projects? Feel free to reach out directly through any channel or send a message.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap gap-3">
                <a 
                  href={`mailto:${professionalInfo.contacts.email}`} 
                  className="orange-gradient-button electric-border flex-1 min-w-[200px] flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-white px-6 py-3.5 rounded-lg font-medium transition shadow-lg shadow-accent/20"
                >
                  <Mail size={18} /> Send Email Directly
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="electric-border flex-1 min-w-[140px] flex items-center justify-center gap-2 border border-slate-700 hover:bg-slate-800 text-white px-5 py-3.5 rounded-lg font-medium transition whitespace-nowrap"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check size={18} className="text-emerald-400 shrink-0" /> : <Copy size={18} className="shrink-0" />}
                  <span className="whitespace-nowrap">{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={professionalInfo.contacts.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="electric-border flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700/90 text-white px-4 py-3 rounded-lg font-medium transition border border-slate-700"
                >
                  <FaLinkedinIn size={18} aria-hidden="true" /> LinkedIn
                </a>
                <a 
                  href={professionalInfo.contacts.whatsapp} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="electric-border flex items-center justify-center gap-2 bg-emerald-600/90 hover:bg-emerald-500/90 text-white px-4 py-3 rounded-lg font-medium transition border border-emerald-500/30"
                >
                  <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Response time: usually within 24 hours
              </span>
              <span>•</span>
              <span>Cox's Bazar, Bangladesh (GMT+6)</span>
            </div>
          </div>

          {/* Right Column: Quick Interactive Message Form */}
          <div className="lg:col-span-6">
            <div className="p-6 md:p-8 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/70 shadow-xl">
              <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
                <Send size={18} className="text-accent" /> Send a Quick Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">Leave your details and your message will be forwarded directly.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      required
                      placeholder="e.g. John Doe" 
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/60 transition"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">Your Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/60 transition"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300 mb-1.5">Subject</label>
                  <input 
                    id="contact-subject"
                    type="text" 
                    placeholder="Project Inquiry / Job Opportunity" 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/60 transition"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">Message</label>
                  <textarea 
                    id="contact-message"
                    rows="3" 
                    required
                    placeholder="Hi Riduan, I'd like to discuss..." 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/60 transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="orange-gradient-button electric-border w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white transition shadow-md"
                >
                  <Send size={16} /> 
                  <span>{formSent ? 'Opening Mail Client...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Scroll to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-accent/90 hover:bg-accent text-white shadow-lg shadow-accent/25 backdrop-blur-sm border border-cyan-400/40 hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a href={professionalInfo.contacts.github} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent transition-colors" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href={professionalInfo.contacts.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent transition-colors" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
            <a href={`mailto:${professionalInfo.contacts.email}`} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={professionalInfo.contacts.whatsapp} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-accent transition-colors" aria-label="WhatsApp">
              <FaWhatsapp size={18} />
            </a>
          </div>
          <p className="font-medium text-slate-900 dark:text-slate-300">{professionalInfo.name} — {professionalInfo.headline}</p>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Riduan Aziz. All rights reserved.</p>
        </div>
      </footer>

      {/* Interactive Resume Viewer Modal */}
      <AnimatePresence>
        {resumeModalOpen && (
          <div 
            onClick={() => setResumeModalOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden cursor-default focus:outline-none"
            >
              {/* Modal Header */}
              <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      Curriculum Vitae — Riduan Aziz
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      3 Pages • Computer Science & Applied AI
                    </p>
                  </div>
                </div>

                {/* Header Controls */}
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="hidden md:flex items-center p-1 bg-slate-200/60 dark:bg-slate-700/60 rounded-lg text-xs font-medium">
                    <button
                      onClick={() => setCvViewMode('doc')}
                      className={`px-2.5 py-1 rounded-md transition ${cvViewMode === 'doc' ? 'bg-white dark:bg-slate-900 text-accent font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Document
                    </button>
                    <button
                      onClick={() => setCvViewMode('pdf')}
                      className={`px-2.5 py-1 rounded-md transition ${cvViewMode === 'pdf' ? 'bg-white dark:bg-slate-900 text-accent font-semibold shadow-sm' : 'text-slate-600 dark:text-slate-300'}`}
                    >
                      Browser PDF
                    </button>
                  </div>

                  {/* Zoom Controls */}
                  {cvViewMode === 'doc' && (
                    <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                      <button 
                        onClick={() => setCvZoom(Math.max(60, cvZoom - 15))}
                        className="p-1 hover:text-accent transition"
                        title="Zoom out"
                      >
                        <ZoomOut size={14} />
                      </button>
                      <span className="w-10 text-center text-[11px] font-mono">{cvZoom}%</span>
                      <button 
                        onClick={() => setCvZoom(Math.min(150, cvZoom + 15))}
                        className="p-1 hover:text-accent transition"
                        title="Zoom in"
                      >
                        <ZoomIn size={14} />
                      </button>
                    </div>
                  )}

                  <a
                    href={resumeUrl}
                    download="CV of Riduan Aziz.pdf"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent-hover transition shadow-sm"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </a>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                  >
                    <span>New Tab</span>
                    <ExternalLink size={12} />
                  </a>

                  <button
                    onClick={() => setResumeModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition ml-1"
                    aria-label="Close resume preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 relative overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
                {cvViewMode === 'doc' ? (
                  <div className="flex flex-col items-center gap-6 w-full" style={{ maxWidth: `${Math.min(100, Math.max(60, cvZoom)) * 8.5}px` }}>
                    {cvPages.map((pageImg, idx) => (
                      <div key={idx} className="w-full flex flex-col items-center group">
                        <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 px-1">
                          <span className="font-semibold text-accent">Page {idx + 1} of {cvPages.length}</span>
                          <span className="text-[10px] opacity-75">CV of Riduan Aziz</span>
                        </div>
                        <img
                          src={pageImg}
                          alt={`CV of Riduan Aziz - Page ${idx + 1}`}
                          className="w-full rounded-lg shadow-2xl border border-slate-200 dark:border-slate-800 bg-white"
                          loading={idx === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <object
                      data={`${import.meta.env.BASE_URL}assets/cv.pdf#toolbar=1`}
                      type="application/pdf"
                      className="w-full h-full rounded-lg bg-white shadow-xl"
                    >
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white dark:bg-slate-900 rounded-lg max-w-md mx-auto">
                        <FileText size={44} className="text-accent mb-3" />
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">Browser Inline PDF Blocked</h4>
                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                          Your browser is set to download PDFs directly rather than embedding them inline. Switch to <strong>Document View</strong> to see all 3 rendered pages immediately, or download the original file.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <button
                            onClick={() => setCvViewMode('doc')}
                            className="px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent-hover transition shadow-sm"
                          >
                            View All 3 Pages (Document View)
                          </button>
                          <a
                            href={resumeUrl}
                            download="CV of Riduan Aziz.pdf"
                            className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-800 dark:text-slate-200"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </object>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 shrink-0">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified Document — 3 Pages</span>
                </span>
                <div className="flex items-center gap-4">
                  <a href={resumeUrl} download="CV of Riduan Aziz.pdf" className="text-accent font-semibold flex items-center gap-1 hover:underline">
                    <Download size={13} />
                    <span>Download Original PDF</span>
                  </a>
                  <button 
                    onClick={() => setResumeModalOpen(false)} 
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Close (Esc)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

