import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaJava, FaAndroid, FaAws, FaGithub, FaReact } from 'react-icons/fa';
import { Database, BrainCircuit, Terminal, RotateCcw, Sparkles } from 'lucide-react';

const initialIcons = [
  { id: 'python', Icon: FaPython, color: '#3776AB', label: 'Python', role: 'Data Science & AI' },
  { id: 'java', Icon: FaJava, color: '#007396', label: 'Java', role: 'Software Engineering' },
  { id: 'android', Icon: FaAndroid, color: '#3DDC84', label: 'Android', role: 'Mobile Applications' },
  { id: 'ml', Icon: BrainCircuit, color: '#4f8cff', label: 'AI/ML', role: 'Computer Vision & Deep Learning' },
  { id: 'sql', Icon: Database, color: '#336791', label: 'SQL', role: 'Data & Database Mgmt' },
  { id: 'git', Icon: FaGithub, color: '#181717', label: 'GitHub', role: 'Version Control & CI/CD' },
  { id: 'terminal', Icon: Terminal, color: '#64748b', label: 'CLI/Shell', role: 'Scripting & Pipelines' },
  { id: 'aws', Icon: FaAws, color: '#6ee7f9', label: 'AWS', role: 'Cloud Foundations' }
];

export default function TechFrame() {
  const constraintsRef = useRef(null);
  const [resetKey, setResetKey] = useState(0);
  const [activeTech, setActiveTech] = useState(null);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setActiveTech(null);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-16">
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-cyan-400 text-xs font-semibold mb-3 border border-blue-500/20">
          <Sparkles size={12} />
          Interactive Canvas
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Interactive Tech Board
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Grab, fling, and explore the core technologies powering my projects.
        </p>
      </div>
      
      {/* Frame Box */}
      <div className="relative w-full max-w-4xl group">
        {/* Ambient background aura glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/15 via-cyan-400/15 to-indigo-500/15 rounded-[2.5rem] blur-xl opacity-60 dark:opacity-80 pointer-events-none"></div>

        <div 
          ref={constraintsRef}
          key={resetKey}
          className="card-border-effect relative w-full h-[420px] bg-slate-50/90 dark:bg-slate-900/90 
                     p-6 rounded-[2rem] shadow-2xl overflow-hidden flex flex-wrap gap-5 justify-center items-center backdrop-blur-md"
        >
          {/* Subtle blueprint grid matrix inside frame */}
          <div 
            className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', 
              backgroundSize: '28px 28px' 
            }}
          />

          {/* Top Control Bar inside canvas */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-0">
            <span className="text-[11px] font-mono tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              PHYSICS_ENGINE: ACTIVE
            </span>

            <button
              onClick={handleReset}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm transition"
              title="Reset positions"
            >
              <RotateCcw size={12} />
              Reset Board
            </button>
          </div>

          {/* Draggable Tech Tiles */}
          {initialIcons.map(({ id, Icon, color, label, role }) => (
            <motion.div
              key={id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.25}
              whileHover={{ scale: 1.12, y: -4 }}
              whileDrag={{ 
                scale: 1.22, 
                zIndex: 50, 
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.3)' 
              }}
              onHoverStart={() => setActiveTech({ label, role })}
              onHoverEnd={() => setActiveTech(null)}
              className="flex flex-col items-center justify-center w-24 h-24 sm:w-26 sm:h-26 bg-white dark:bg-slate-800/95 
                         rounded-2xl shadow-md hover:shadow-xl cursor-grab active:cursor-grabbing border border-slate-200 dark:border-slate-700/80
                         relative z-10 transition-colors"
              style={{ touchAction: 'none' }}
            >
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 mb-1 pointer-events-none">
                <Icon size={30} color={color} />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 select-none pointer-events-none">
                {label}
              </span>
            </motion.div>
          ))}

          {/* Bottom Dynamic Status Pill */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-20">
            <div className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-md text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
              {activeTech ? (
                <>
                  <span className="font-bold text-blue-600 dark:text-cyan-400">{activeTech.label}:</span>
                  <span>{activeTech.role}</span>
                </>
              ) : (
                <span>Hover or drag icons to inspect application domains</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
