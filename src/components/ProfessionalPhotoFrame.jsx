import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { User, Sparkles, Code, Cpu, Award } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function ProfessionalPhotoFrame({ professionalInfo }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // 3D Perspective interactive tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center py-6"
      style={{ perspective: 1200 }}
    >
      {/* Background Decorative Tech Hexagon / Aura Gradients */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/25 via-cyan-400/20 to-indigo-600/20 rounded-[3rem] blur-2xl opacity-60 dark:opacity-80 pointer-events-none animate-pulse"></div>
      
      {/* Interactive 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[300px] sm:w-[340px] select-none cursor-pointer"
      >
        {/* Main Photo Card Frame */}
        <div className="card-border-effect relative p-4 rounded-[2rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
          
          {/* Top Tech Status Bar Header */}
          <div className="flex items-center justify-between px-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 text-[11px] font-mono tracking-wider text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR HIRE
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300 font-sans font-medium">
              CSE / AI
            </span>
          </div>

          {/* Photo Canvas Container */}
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center justify-center group">
            
            {/* Hologram Corner Tech Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500/70 z-20 pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70 z-20 pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500/70 z-20 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70 z-20 pointer-events-none"></div>

            {/* Specular Glare Reflection on Hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translateX(-20%) translateY(-20%) scale(1.5)',
              }}
            />

            {/* Image */}
            {professionalInfo?.photo && !imgError ? (
              <img 
                src={professionalInfo.photo} 
                alt={professionalInfo.name} 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400 dark:text-slate-500">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center mb-3 text-blue-500 dark:text-cyan-400">
                  <User size={40} />
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{professionalInfo.name}</span>
                <span className="text-xs text-slate-400 mt-1">Profile Avatar</span>
              </div>
            )}

            {/* Quick Profile Social Overlay on Hover */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent z-20 flex items-center justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-left text-white">
                <p className="text-xs font-bold leading-tight drop-shadow">{professionalInfo.name}</p>
                <p className="text-[10px] text-cyan-300 font-mono">Software & AI Engineer</p>
              </div>
              <div className="flex items-center gap-2">
                {professionalInfo.contacts?.github && (
                  <a 
                    href={professionalInfo.contacts.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition"
                    title="GitHub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub size={13} />
                  </a>
                )}
                {professionalInfo.contacts?.linkedin && (
                  <a 
                    href={professionalInfo.contacts.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition"
                    title="LinkedIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedinIn size={13} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Card Identity Strip */}
          <div className="mt-3.5 flex items-center justify-between px-1">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                {professionalInfo.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                CBIU • CGPA 3.795
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
              <Sparkles size={13} className="text-blue-500 dark:text-cyan-400 animate-spin-slow" />
              <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Floating Interactive Badge 1: AI/ML Focus */}
        <motion.div 
          className="absolute -top-3 -right-3 z-30 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            transform: 'translateZ(40px)',
          }}
        >
          <Cpu size={14} className="text-blue-500 dark:text-cyan-400" />
          <span className="text-[11px]">Applied AI</span>
        </motion.div>

        {/* Floating Interactive Badge 2: Software Dev */}
        <motion.div 
          className="absolute -bottom-3 -left-3 z-30 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            transform: 'translateZ(40px)',
          }}
        >
          <Code size={14} className="text-blue-500 dark:text-cyan-400" />
          <span className="text-[11px]">Clean Code</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

