import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'wouter';
import { useIsMobile } from '../hooks/use-mobile';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentActiveSection = 'home';

      sections.forEach(section => {
        const sectionElement = section as HTMLElement;
        const sectionTop = sectionElement.offsetTop - 100;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentActiveSection = sectionId;
        }
      });

      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Experts', href: '#experts' },
    { name: 'Health Articles', href: '#articles' },
    { name: 'Health Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' }
  ];

  // Animation for hover effect
  const hoverAnimation = {
    initial: { width: '0%' },
    hover: { width: '100%' }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 w-full ${
        scrolled 
          ? 'py-2 bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-sm' 
          : 'py-3 sm:py-4 bg-transparent'
      }`}
    >
      {/* Decorative animated gradient border at top */}
      <div className="absolute inset-x-0 top-0 h-[3px] z-10 overflow-hidden">
        <motion.div 
          className="absolute inset-x-0 h-full bg-gradient-to-r from-primary via-accent to-secondary"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
        <motion.div 
          className="absolute inset-y-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary to-transparent"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 5
          }}
        />
      </div>
      
      {/* Glassmorphism background for scroll state */}
      <motion.div 
        className="absolute inset-0 bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main navbar content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex justify-between items-center py-1">
          {/* Logo with enhanced effects */}
          <Link href="/">
            <motion.div 
              className="flex items-center py-1 z-10 group relative"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="relative">
                {/* Pulsating background effect */}
                <motion.div
                  className="absolute -inset-1.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-300"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                {/* Subtle particle effects around logo on hover */}
                <motion.div
                  className="absolute -inset-3 opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial="hidden"
                  whileHover="visible"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-primary/30 w-1 h-1"
                      initial={{ 
                        x: 0, 
                        y: 0,
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        x: Math.random() * 30 - 15,
                        y: Math.random() * 30 - 15,
                        opacity: [0, 0.8, 0],
                        scale: [0, Math.random() * 0.8 + 0.5, 0]
                      }}
                      transition={{
                        duration: 1.5 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.2,
                        repeatDelay: Math.random() * 0.5
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Main logo icon with 3D effect */}
                <div className="relative">
                  <FaHeartbeat className="text-2xl sm:text-3xl relative mr-1.5 sm:mr-2 text-primary drop-shadow-lg" />
                  <motion.div 
                    className="absolute inset-0 text-2xl sm:text-3xl text-accent/30 blur-[1px]"
                    animate={{ 
                      x: [1, 0, 1],
                      y: [1, 0, 1]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <FaHeartbeat className="mr-1.5 sm:mr-2" />
                  </motion.div>
                </div>
              </div>
              
              {/* Logo text with animated gradient */}
              <div className="font-heading overflow-hidden">
                <motion.span 
                  className="gradient-text text-xl sm:text-2xl font-bold tracking-tight relative inline-block"
                  initial={{ backgroundPosition: '0% 50%' }}
                  whileHover={{ backgroundPosition: '100% 50%' }}
                  transition={{ duration: 0.8 }}
                  style={{
                    backgroundSize: '200% auto'
                  }}
                >
                  HealthWell
                  
                  {/* Text shine effect */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      repeatDelay: 5
                    }}
                    style={{ backgroundSize: '50% 100%' }}
                  />
                </motion.span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Nav with 3D hover effects */}
          <div className="hidden md:flex space-x-1 lg:space-x-6 items-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.a 
                  key={index} 
                  href={link.href} 
                  className={`text-sm lg:text-base ${isActive ? 'text-primary font-semibold' : 'text-foreground font-medium'} 
                    px-3 py-2 relative group overflow-hidden rounded-lg`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Hover glow effect */}
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 rounded-lg z-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Text content */}
                  <span className="relative z-10 transition-colors duration-300">
                    {link.name}
                  </span>
                  
                  {/* Animated underline with gradient */}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent z-0"
                    initial={{ width: isActive ? '100%' : '0%', left: isActive ? '0%' : '50%' }}
                    animate={isActive ? { width: '100%', left: '0%' } : {}}
                    whileHover={{ width: '100%', left: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Dot indicator for active state */}
                  {isActive && (
                    <motion.span
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>
          
          {/* Contact Button (desktop) with enhanced effects */}
          <motion.a 
            href="#contact" 
            className="hidden md:flex items-center justify-center gradient-btn text-sm lg:text-base px-4 lg:px-6 py-2 rounded-full font-medium shadow-md"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.4), 0 8px 10px -6px rgba(var(--primary), 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Inner glow */}
            <motion.span 
              className="absolute inset-0 rounded-full bg-white/10 z-0"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Text content */}
            <span className="relative z-10 flex items-center">
              Get Started
              
              {/* Arrow icon with animation */}
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </span>
          </motion.a>
          
          {/* Mobile Menu Button with enhanced effects */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden z-10 w-10 h-10 flex items-center justify-center text-foreground hover:text-primary focus:outline-none transition-colors relative"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {/* Button background glow */}
            <motion.span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 z-0 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Animated hamburger/close icon */}
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay with blur effect */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Panel - Enhanced with animations and styling */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background/95 backdrop-blur-xl z-50 md:hidden shadow-2xl overflow-y-auto border-l border-border/30"
          >
            <div className="p-6 flex flex-col h-full">
              {/* Header with logo and close button */}
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                  <div className="relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-sm"></div>
                    <FaHeartbeat className="text-2xl mr-2 text-primary relative" />
                  </div>
                  <span className="gradient-text text-xl font-bold tracking-tight">HealthWell</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeMobileMenu}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary"
                  aria-label="Close menu"
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              {/* Menu links with staggered animation */}
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.07, 
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                      }}
                      className={`relative overflow-hidden ${
                        isActive 
                          ? 'text-primary font-semibold bg-primary/10' 
                          : 'text-foreground font-medium hover:bg-primary/5'
                      } py-3 px-4 rounded-lg transition-all duration-300`}
                      onClick={closeMobileMenu}
                    >
                      {/* Link text */}
                      <span className="relative z-10">{link.name}</span>
                      
                      {/* Animated indicator for active link */}
                      {isActive && (
                        <motion.span 
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ duration: 0.3, delay: index * 0.07 + 0.3 }}
                        />
                      )}
                    </motion.a>
                  );
                })}
              </div>
              
              {/* Call-to-action and footer */}
              <div className="mt-auto pt-6">
                <motion.a 
                  href="#contact" 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: navLinks.length * 0.07 + 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 24
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(var(--primary), 0.3), 0 8px 10px -6px rgba(var(--primary), 0.2)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full gradient-btn px-6 py-3 rounded-xl font-medium text-center shadow-lg flex items-center justify-center"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </motion.a>
                
                <motion.div 
                  className="mt-8 pt-6 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.07 + 0.4 }}
                >
                  <p className="text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} HealthWell. All rights reserved.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
