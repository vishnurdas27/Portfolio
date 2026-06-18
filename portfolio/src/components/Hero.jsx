import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import heroPhoto from '../assets/IMG_4481.PNG';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Pulled these out of the JSX to keep the markup clean
  const navItems = ['About Me', 'Skills', 'Projects', 'Contact Me'];
  const socialIcons = [FaGithub, FaLinkedin, FaTwitter, MessageSquare];

  return (
    <div className="hero-container">
      
      <nav className="navbar">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="logo"
        >
          <div className="logo-icon" />
          PORTFOLIO
        </motion.div>
        
        <ul className="nav-links">
          {navItems.map((item, i) => (
            <motion.li 
              key={item} 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#10B981' }}
          whileTap={{ scale: 0.95 }}
          className="resume-btn"
        >
          Resume <span style={{ fontSize: '1.25rem' }}>↓</span>
        </motion.button>
      </nav>

      <main className="main-content">
        
        <motion.div 
          className="left-column"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="headline">
            Hello, I'm <span className="text-navy">Vishnu R Das.</span>
            <br />
            <span className="gradient-text">Fullstack</span> Developer
          </motion.h1>

          <motion.p variants={itemVariants} className="description">
            I build robust, scalable web applications using React, Node.js, and MongoDB. Passionate about transforming complex business processes into clean, interactive digital experiences.
          </motion.p>

          <motion.div variants={itemVariants} className="social-links">
            {socialIcons.map((Icon, idx) => (
              <motion.a 
                key={idx}
                href="#"
                whileHover={{ scale: 1.1, y: -5, boxShadow: "0px 10px 15px -3px rgba(16, 185, 129, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                className="social-btn"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <div className="right-column">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="geo-circle geo-circle-1"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="geo-circle geo-circle-2"
          />

          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="image-frame"
          >
            <div className="image-inner">
              <img src={heroPhoto} alt="Vishnu R Das" className="hero-photo" />
              <div className="image-overlay" />
            </div>
          </motion.div>
        </div>
      </main>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="bottom-line"
      />
    </div>
  );
};

export default Hero;