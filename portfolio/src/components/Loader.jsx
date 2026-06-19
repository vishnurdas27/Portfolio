import { motion } from 'framer-motion';
import './Loader.css';

const DEPTH = 16;
const V_PATH = 'M12 14 L50 92 L88 14 L70 14 L50 58 L30 14 Z';

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="loader__scene">
        <span className="loader__glow" />
        <span className="loader__ring loader__ring--1" />
        <span className="loader__ring loader__ring--2" />
        <div className="loader__orbit">
          <span className="loader__orbit-dot" />
        </div>

        <div className="loader__v">
          {/* extruded body */}
          {Array.from({ length: DEPTH }).map((_, i) => (
            <svg
              key={i}
              className="loader__side"
              viewBox="0 0 100 100"
              style={{ transform: `translateZ(${-(i + 1) * 1.7}px)` }}
            >
              <path d={V_PATH} />
            </svg>
          ))}

          {/* glossy front face */}
          <svg className="loader__face" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="vGrad" x1="0" y1="0" x2="0.85" y2="1">
                <stop offset="0" stopColor="#bdecff" />
                <stop offset="0.45" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#1e40af" />
              </linearGradient>
            </defs>
            <path d={V_PATH} fill="url(#vGrad)" />
          </svg>

          {/* sweeping gloss highlight, clipped to the V */}
          <span className="loader__shine" />
        </div>
      </div>

      <div className="loader__bar">
        <span />
      </div>
      <div className="loader__brand">VISHNU R DAS</div>
    </motion.div>
  );
}
