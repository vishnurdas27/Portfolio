import { motion } from 'framer-motion';
import './Loader.css';

const LAYERS = 7;

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="loader__scene">
        <span className="loader__ring" />
        <div className="loader__v">
          {Array.from({ length: LAYERS }).map((_, i) => (
            <svg
              key={i}
              className="loader__layer"
              viewBox="0 0 120 120"
              style={{ transform: `translateZ(${(i - LAYERS + 1) * 4}px)` }}
            >
              <path d="M26 28 L60 94 L94 28" />
            </svg>
          ))}
        </div>
      </div>

      <div className="loader__bar">
        <span />
      </div>
      <div className="loader__brand">VISHNU R DAS</div>
    </motion.div>
  );
}
