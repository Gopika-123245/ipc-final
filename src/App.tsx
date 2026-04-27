/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Instagram, 
  Image as ImageIcon, 
  MessageSquare, 
  ShieldAlert, 
  Layers, 
  Globe, 
  CheckCircle2, 
  CircleDot,
  Cpu
} from 'lucide-react';

// --- Components ---

const ParticleBackground = () => {
  const [particles, setParticles] = useState<any[]>([]);
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#c77dff', '#00cec9'];

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const ProcBox = ({ icon: Icon, name, role, colorClass, active = true }: any) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`p-4 rounded-xl text-center min-w-[120px] backdrop-blur-md border border-white/10 ${colorClass} ${active ? 'opacity-100' : 'opacity-40'}`}
  >
    <Icon className="w-8 h-8 mx-auto mb-2" />
    <div className="text-xs font-bold tracking-wider uppercase">{name}</div>
    {role && <div className="text-[10px] opacity-70 mt-1">{role}</div>}
  </motion.div>
);

const Connector = ({ label, sub, color, animate = true }: any) => (
  <div className="flex-1 max-w-[160px] min-w-[60px] px-4 flex flex-col items-center gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-60 mb-1">{label}</span>
    <div className="w-full h-1.5 rounded-full bg-white/5 relative overflow-hidden border border-white/5">
      {animate && (
        <>
          <motion.div 
            className="absolute top-0 bottom-0 w-2 rounded-full" 
            style={{ backgroundColor: color }}
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-0 bottom-0 w-2 rounded-full" 
            style={{ backgroundColor: color }}
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </>
      )}
    </div>
    {sub && <span className="text-[9px] opacity-40 text-center">{sub}</span>}
  </div>
);

// --- Scenes ---

const RaceScene = () => (
  <div className="space-y-8 py-6">
    <div className="flex flex-wrap justify-center items-center gap-6">
      <ProcBox icon={Camera} name="Camera" role="IT'S MINE!" colorClass="bg-red-500/10 border-red-500/40 text-red-500" />
      
      <motion.div 
        animate={{ x: [-2, 2], rotate: [-0.5, 0.5] }}
        transition={{ repeat: Infinity, duration: 0.1, repeatType: "mirror" }}
        className="px-6 py-4 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-center"
      >
        <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-red-500" />
        <div className="text-sm font-black text-red-500 tracking-tighter">RACE CONDITION</div>
        <div className="text-[10px] opacity-60 mt-1">Resource conflict detected</div>
      </motion.div>

      <ProcBox icon={Instagram} name="Instagram" role="IT'S MINE!" colorClass="bg-red-500/10 border-red-500/40 text-red-500" />
    </div>
    <div className="flex justify-center">
      <ProcBox icon={ImageIcon} name="Gallery" role="IT'S MINE!" colorClass="bg-red-500/10 border-red-500/40 text-red-500" />
    </div>
  </div>
);

const PipeScene = () => (
  <div className="flex flex-wrap items-center justify-center gap-2 py-8">
    <ProcBox icon={Camera} name="Sensors" role="Producer" colorClass="bg-blue-500/10 border-blue-500/40 text-blue-500" />
    <Connector label="Pipe" sub="Frame Stream" color="#3b82f6" />
    <ProcBox icon={Instagram} name="Preview" role="Consumer" colorClass="bg-blue-500/10 border-blue-500/40 text-blue-500" />
  </div>
);

const QueueScene = () => (
  <div className="flex flex-wrap items-center justify-center gap-8 py-6">
    <ProcBox icon={Instagram} name="App" role="Sender" colorClass="bg-purple-500/10 border-purple-500/40 text-purple-500" />
    
    <div className="flex-1 min-w-[200px] bg-purple-500/5 border border-purple-500/30 rounded-2xl p-4 space-y-2">
      <div className="text-[10px] font-black text-center text-purple-400 mb-2 tracking-widest uppercase">Message Queue</div>
      {['Apply Filter: Clarendon', 'Brightness +15%', 'Enable HDR'].map((msg, i) => (
        <motion.div 
          key={msg}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
          className="p-2 px-3 rounded-lg bg-purple-500/20 text-[11px] font-medium text-purple-200 border border-purple-500/20"
        >
          📨 {msg}
        </motion.div>
      ))}
    </div>

    <ProcBox icon={Camera} name="Hardware" role="Receiver" colorClass="bg-purple-500/10 border-purple-500/40 text-purple-500" />
  </div>
);

const SharedScene = () => (
  <div className="flex flex-wrap items-center justify-center gap-6 py-8">
    <ProcBox icon={Camera} name="Writer" colorClass="bg-green-500/10 border-green-500/40 text-green-500" />
    
    <div className="relative p-6 rounded-2xl border-2 border-dashed border-green-500/30 bg-green-500/5 min-w-[180px] text-center">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 bg-[#1a1a2e] text-[9px] font-black text-green-400 uppercase tracking-widest">Shared Memory</div>
      <ImageIcon className="w-10 h-10 mx-auto mb-2 text-green-500 opacity-80" />
      <div className="text-xs font-bold text-green-500">12 MB Raw Image</div>
      <div className="text-[9px] opacity-40 mt-1 uppercase tracking-tighter">Multiple processes access</div>
    </div>

    <div className="flex flex-col gap-3">
      <ProcBox icon={Instagram} name="Reader A" colorClass="bg-green-500/10 border-green-500/40 text-green-500" />
      <ProcBox icon={ImageIcon} name="Reader B" colorClass="bg-green-500/10 border-green-500/40 text-green-500" />
    </div>
  </div>
);

const SemaphoreScene = () => {
  const [locked, setLocked] = useState(true);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-6">
      <ProcBox icon={Camera} name="Writer" role={locked ? "Writing..." : "Idle"} active={locked} colorClass="bg-amber-500/10 border-amber-500/40 text-amber-500" />
      
      <div className="flex flex-col items-center gap-4">
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 px-6 flex flex-col gap-2 items-center">
          <div className={`w-10 h-10 rounded-full border-4 border-white/5 transition-all duration-300 ${locked ? 'bg-red-500 shadow-[0_0_20px_#ef4444]' : 'bg-gray-800'}`} />
          <div className="text-[9px] font-bold text-white/30 uppercase">Wait</div>
          <div className={`w-10 h-10 rounded-full border-4 border-white/5 transition-all duration-300 ${!locked ? 'bg-green-500 shadow-[0_0_20px_#22c55e]' : 'bg-gray-800'}`} />
          <div className="text-[9px] font-bold text-white/30 uppercase">Signal</div>
        </div>
        <button 
          onClick={() => setLocked(!locked)}
          className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${locked ? 'bg-amber-400 text-amber-950' : 'bg-blue-500 text-white'} hover:scale-105 active:scale-95`}
        >
          {locked ? "Release Resource" : "Reset Demo"}
        </button>
      </div>

      <div className="space-y-3">
        <ProcBox icon={Instagram} name="Reader" role={locked ? "Paused" : "Accessing"} active={!locked} colorClass="bg-amber-500/10 border-amber-500/40 text-amber-500" />
      </div>
    </div>
  );
};

const SocketScene = () => {
  const [step, setStep] = useState(0);
  const steps = [
    'Initiating Handshake...',
    'Synchronizing Sequence...',
    'Uploading Fragment x402...',
    'Acknowledged by Server',
    'Post Published!'
  ];

  useEffect(() => {
    const timer = setInterval(() => setStep(s => (s + 1) % steps.length), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4">
      <ProcBox icon={CircleDot} name="Client" colorClass="bg-teal-500/10 border-teal-500/40 text-teal-500" />
      <div className="flex-1 max-w-[240px] flex flex-col items-center">
        <div className="text-[10px] font-black text-teal-400 mb-2 uppercase tracking-widest">Socket Connection</div>
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent animate-pulse rounded-full" />
        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[11px] font-bold text-teal-300 mt-3 text-center min-h-[1.5rem]"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>
      <ProcBox icon={Globe} name="Server" colorClass="bg-teal-500/10 border-teal-500/40 text-teal-500" />
    </div>
  );
};

// --- Main Application ---

const SCENES = [
  { id: 'race', label: 'Race Condition', icon: ShieldAlert, color: 'from-red-500 to-orange-500', component: RaceScene, desc: "Process conflicts happen when rules aren't set." },
  { id: 'pipe', label: 'Pipe', icon: Layers, color: 'from-blue-500 to-cyan-500', component: PipeScene, desc: "One-way data stream from producer to consumer." },
  { id: 'queue', label: 'Message Queue', icon: MessageSquare, color: 'from-purple-500 to-pink-500', component: QueueScene, desc: "Asynchronous messaging without waiting." },
  { id: 'shared', label: 'Shared Memory', icon: Cpu, color: 'from-green-500 to-emerald-500', component: SharedScene, desc: "Fastest IPC where everyone shares the same memory space." },
  { id: 'sem', label: 'Semaphore', icon: CircleDot, color: 'from-amber-500 to-yellow-500', component: SemaphoreScene, desc: "Traffic control to prevent memory corruption." },
  { id: 'socket', label: 'Socket', icon: Globe, color: 'from-teal-500 to-blue-500', component: SocketScene, desc: "Communication over networks between machines." },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('race');

  const activeScene = SCENES.find(s => s.id === activeTab) || SCENES[0];

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white relative flex flex-col items-center selection:bg-purple-500/30 overflow-x-hidden">
      <ParticleBackground />

      {/* Header */}
      <header className="relative z-10 text-center py-12 px-6">
        <motion.h1 
          className="text-7xl md:text-9xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b6b] via-[#4d96ff] to-[#c77dff] animate-shimmer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          IPC
        </motion.h1>
        <motion.p 
          className="text-white/40 text-xs md:text-sm font-medium tracking-[0.3em] uppercase mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The Hidden Magic of Instagram Stories
        </motion.p>
      </header>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-wrap justify-center gap-2 px-6 mb-12">
        {SCENES.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setActiveTab(scene.id)}
            className={`
              px-4 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-md
              ${activeTab === scene.id 
                ? `bg-gradient-to-r ${scene.color} text-white shadow-lg ring-2 ring-white/20` 
                : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {scene.label}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <main className="relative z-10 w-full max-w-4xl px-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            <div className={`p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl`}>
              {/* Decorator */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${activeScene.color}`} />
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <activeScene.icon className="w-6 h-6 opacity-80" />
                  {activeScene.label}
                </h2>
                <p className="text-white/50 text-sm mt-1 max-w-xl line-clamp-2">
                  {activeScene.desc}
                </p>
              </div>

              {/* Rendering logic */}
              <activeScene.component />

              {/* Success state footer */}
              {activeTab === 'socket' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 flex flex-col items-center text-center p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
                  <h3 className="text-emerald-400 font-bold">Photo Posted!</h3>
                  <p className="text-emerald-400/60 text-[11px] tracking-wide mt-1">Every IPC mechanism worked in perfect harmony.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Utility */}
      <footer className="fixed bottom-6 z-20 md:flex hidden">
        <div className="px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-4 text-[10px] font-bold text-white/40 tracking-widest uppercase">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Status: Nominal
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span>Interactive Protocol Visualizer v1.2</span>
        </div>
      </footer>
    </div>
  );
}
