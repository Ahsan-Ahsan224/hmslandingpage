import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Function to handle scroll event
  const handleScroll = () => {
    // Calculate how far down the page the user has scrolled
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Ensure progress is between 0 and 1
    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    
    setScrollProgress(progress);
    
    // Show button when page is scrolled down more than 300px
    setIsVisible(scrollTop > 300);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add scroll event listener with throttling for better performance
  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    
    // Initial check
    handleScroll();
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Calculate the circumference of the circle
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full bg-background shadow-xl border-2 border-border/40 flex items-center justify-center group overflow-hidden"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
          }}
          aria-label="Scroll to top"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background to-background/80"></div>
          
          {/* Circle loader animation */}
          <svg 
            className="absolute w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              className="text-border/40"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            
            {/* Progress indicator */}
            <motion.circle
              className="text-primary"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset: circumference - (scrollProgress * circumference)
              }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
            />
          </svg>
          
          {/* Inner circle with subtle gradient */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-b from-background to-background/90"></div>
          
          {/* Arrow icon with animation */}
          <motion.div
            className="text-primary relative z-10 font-bold"
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 1.8, 
              repeat: Infinity, 
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <FiArrowUp className="text-2xl stroke-[3]" />
          </motion.div>
          
          {/* Hover effects */}
          <motion.div 
            className="absolute inset-0 bg-primary/10 rounded-full opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full scale-0 opacity-0"
            whileTap={{ 
              scale: 1.5, 
              opacity: 0,
              transition: { duration: 0.5 } 
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;