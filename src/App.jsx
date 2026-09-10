import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Mail, ExternalLink, Moon, Sun,
  Menu, X, ChevronRight, FileText, Code, Database, BrainCircuit
} from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { 
  professionalInfo, metrics, impactHighlights, focusAreas, experience, skills,
  projects, concepts, education, certifications 
} from './data/portfolioData';

const Section = ({ id, title, children, className = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-slate-900 dark:text-slate-100 border-b pb-4 border-slate-200 dark:border-slate-800"
        >
          {title}
        </motion.h2>
      )}
      {children}
    </div>
  </section>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

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
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-xl tracking-tight">RA.</a>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-accent transition-colors">{link}</a>
            ))}
            <a href="/assets/CV%20of%20Riduan%20Aziz.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              <FileText size={16}/> Resume
            </a>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 px-6 pb-6 shadow-xl border-b border-slate-800 absolute w-full">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-3 border-b border-slate-100 dark:border-slate-800">
                {link}
              </a>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className="mt-4 flex items-center gap-2">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />} Toggle Theme
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-1 gap-10 items-center min-h-[60vh]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
              <a href={professionalInfo.contacts.github} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaGithub size={18} aria-hidden="true" /> GitHub
              </a>
              <a href={professionalInfo.contacts.linkedin} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaLinkedinIn size={18} aria-hidden="true" /> LinkedIn
              </a>
              <a href={`mailto:${professionalInfo.contacts.email}`} className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <Mail size={18} /> Gmail
              </a>
              <a href={professionalInfo.contacts.whatsapp} target="_blank" rel="noreferrer" className="electric-border flex items-center gap-2 border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                <FaWhatsapp size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
          </motion.div>
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
            <div key={index} className="mb-12 pl-8 md:pl-10 relative">
              <div className="absolute w-4 h-4 bg-accent rounded-full -left-[9px] top-1 border-4 border-white dark:border-slate-900"></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">{exp.company}</p>
              <p className="text-sm text-slate-500 mb-4">{exp.period}</p>
              
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
            </div>
          ))}
        </div>
        
        {/* Trajectory Card */}
        <div className="card-border-effect mt-12 p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">From Field Data to Intelligent Systems</h3>
          <p className="text-slate-300 md:text-lg">
            Data Collection → Data Quality → Database Management → Analytics → Software Development → AI/ML
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
      </Section>

      {/* Featured Projects */}
      <Section id="projects" title="Featured Projects" className="bg-slate-50 dark:bg-slate-900/50">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="card-border-effect bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow group flex flex-col h-full">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold tracking-wider text-accent uppercase">{project.category}</span>
                  <span className="text-xs py-1 px-2 bg-slate-100 dark:bg-slate-900 text-slate-500 rounded">{project.status}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => <span key={t} className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{t}</span>)}
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 mt-auto">
                <a href={project.github} target="_blank" rel="noreferrer" className="text-sm font-medium flex items-center gap-2 hover:text-accent transition">
                  <FaGithub size={16} aria-hidden="true" /> View Repository
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects / Concepts */}
        <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Other Projects & Research Concepts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {concepts.map((concept, idx) => (
            <div key={idx} className="card-border-effect p-5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm leading-tight">{concept.title}</h4>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-3">{concept.label}</span>
              <div className="flex flex-wrap gap-1 mt-auto">
                {concept.tech.map(t => <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500">{t}</span>)}
              </div>
            </div>
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
                <div key={idx} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700">
                  <div className="absolute w-3 h-3 bg-slate-400 rounded-full -left-[7px] top-2"></div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-accent font-medium text-sm mb-1">{edu.institution}</p>
                  <p className="text-slate-500 text-sm">{edu.details}</p>
                </div>
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
                <div key={idx} className="card-border-effect p-4 bg-slate-50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{cert.title}</h4>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{cert.issuer}</span>
                    <span className="font-medium">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-slate-900 text-white dark:bg-black">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Interested in software development, data-driven solutions, AI/ML applications, or technology projects? Feel free to connect.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a href={`mailto:${professionalInfo.contacts.email}`} className="orange-gradient-button electric-border w-full md:w-auto flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-md font-medium transition">
              <Mail size={20} /> Send Email
            </a>
            <a href={professionalInfo.contacts.linkedin} target="_blank" rel="noreferrer" className="electric-border w-full md:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-md font-medium transition">
              <FaLinkedinIn size={20} aria-hidden="true" />LinkedIn Profile
            </a>
            <a href={professionalInfo.contacts.whatsapp} target="_blank" rel="noreferrer" className="electric-border w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-medium transition">
              <FaWhatsapp size={20} aria-hidden="true" /> WhatsApp
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <p className="font-medium text-slate-900 dark:text-slate-300 mb-2">{professionalInfo.name} — {professionalInfo.headline}</p>
        <p>© {new Date().getFullYear()} Riduan Aziz. All rights reserved.</p>
      </footer>
    </div>
  );
}

