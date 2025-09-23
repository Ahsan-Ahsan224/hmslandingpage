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
    { name: 'Pricing ', href: '#pricing' },
   
    { name: 'Contact', href: '#contact' }
  ];

  // Animation for hover effect
  const hoverAnimation = {
    initial: { width: '0%' },
    hover: { width: '100%' }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'py-3 md:py-4 bg-background/90 backdrop-blur-lg border-b border-border/20 shadow-sm' 
          : 'py-4 md:py-5 bg-transparent'
      }`}
    >
      {/* Simple gradient border at top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary"></div>
      
      {/* Fixed background when scrolled */}
      {scrolled && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-lg border-b border-border/20 shadow-sm -z-10"></div>
      )}
      
      {/* Main navbar content - with reduced width */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex justify-between items-center">
          {/* Logo - Enhanced */}
          <Link href="/">
            <div className="flex items-center py-1 group">
              <div className="relative mr-2">
                <FaHeartbeat className="text-2xl md:text-3xl text-primary transition-all duration-300" />
                <div className="absolute -inset-1 bg-primary/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              <div className="font-heading">
                <span className="gradient-text text-xl md:text-2xl font-bold tracking-tight">
                  HMS
                </span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Nav - Slightly increased spacing */}
          <div className="hidden md:flex space-x-1 items-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={index} 
                  href={link.href} 
                  className={`text-sm md:text-base relative px-3 py-2.5 transition-all duration-300 ${
                    isActive 
                      ? 'text-primary font-semibold' 
                      : 'text-foreground font-medium hover:text-primary/90'
                  }`}
                >
                  {/* Link text */}
                  {link.name}
                  
                  {/* Improved underline indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform origin-left transition-transform duration-500 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>
          
          {/* Contact Button (desktop) - improved */}
          <a 
            href="#contact" 
            className="hidden md:flex items-center justify-center gradient-btn text-sm md:text-base px-5 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 text-white ml-3 group"
          >
            Get Started
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* Mobile Menu Button - Enhanced */}
          <motion.button
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground hover:text-primary focus:outline-none transition-all duration-300 relative"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: mobileMenuOpen ? 45 : -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: mobileMenuOpen ? -45 : 45 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {mobileMenuOpen ? (
                    <FaTimes className="text-xl" />
                  ) : (
                    <FaBars className="text-xl" />
                  )}
                </motion.div>
              </AnimatePresence>
              <motion.div 
                className="absolute inset-0 bg-primary/10 rounded-full -z-10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay - improved */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Panel - Enhanced */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 250,
              duration: 0.3
            }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background/95 backdrop-blur-md z-50 md:hidden shadow-lg overflow-y-auto border-l border-border/20"
          >
            <div className="p-5 flex flex-col h-full">
              {/* Header with logo and close button */}
              <div className="flex justify-between items-center mb-6">
                <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                  <div className="relative mr-2">
                    <FaHeartbeat className="text-xl text-primary" />
                    <div className="absolute -inset-1 bg-primary/10 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="gradient-text text-lg font-bold">HMS</span>
                </Link>
                <motion.button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ backgroundColor: "rgba(var(--primary), 0.15)" }}
                  transition={{ duration: 0.2 }}
                  aria-label="Close menu"
                >
                  <FaTimes className="text-sm" />
                </motion.button>
              </div>
              
              {/* Gradient divider */}
              <div className="h-px w-full mb-5 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20"></div>
              
              {/* Menu links - enhanced with staggered animation */}
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      className={`py-3 px-4 rounded-md transition-all duration-300 ${
                        isActive 
                          ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary' 
                          : 'text-foreground hover:bg-primary/5 hover:border-l-2 hover:border-primary/40'
                      }`}
                      onClick={closeMobileMenu}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.05, 
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.a>
                  );
                })}
              </nav>
              
              {/* Call-to-action - enhanced */}
              <div className="mt-auto pt-6">
                <motion.a 
                  href="#contact" 
                  className="w-full gradient-btn py-3 px-4 rounded-lg font-medium text-center text-white block"
                  onClick={closeMobileMenu}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: navLinks.length * 0.05 + 0.1,
                    duration: 0.4
                  }}
                  whileHover={{ 
                    y: -2,
                    boxShadow: "0 10px 15px -3px rgba(var(--primary), 0.3), 0 4px 6px -4px rgba(var(--primary), 0.2)"
                  }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  Get Started
                </motion.a>
                
                <motion.div 
                  className="mt-8 pt-5 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.3 }}
                >
                  <p className="text-center text-xs text-muted-foreground">
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
