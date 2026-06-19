import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import './tilt.css';

const MotionLink = motion.create(Link);

// A 3D tilt card: tracks the pointer and rotates the card in perspective space,
// with a moving glare highlight. Renders as a Link when `to` is provided.
export default function TiltCard({ to, className = '', children, max = 9, ...rest }) {
  const ref = useRef(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [max, -max]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-max, max]), {
    stiffness: 150,
    damping: 15,
  });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mvX.set(px - 0.5);
    mvY.set(py - 0.5);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const props = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `tilt ${className}`,
    style: { rotateX, rotateY, transformStyle: 'preserve-3d' },
    ...rest,
  };

  const body = (
    <>
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </>
  );

  return to ? (
    <MotionLink to={to} {...props}>
      {body}
    </MotionLink>
  ) : (
    <motion.article {...props}>{body}</motion.article>
  );
}
