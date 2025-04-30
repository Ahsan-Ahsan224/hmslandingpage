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
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'py-2 bg-background/90 backdrop-blur-lg border-b border-border/20 shadow-sm' 
          : 'py-3 sm:py-4 bg-transparent'
      }`}
    >
      {/* Simple gradient border at top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary"></div>
      
      {/* Fixed background when scrolled */}
      {scrolled && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-lg border-b border-border/20 shadow-sm -z-10"></div>
      )}
      
      {/* Main navbar content - with reduced width */}
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <nav className="flex justify-between items-center">
          {/* Logo - Simplified */}
          <Link href="/">
            <div className="flex items-center py-1 group">
              <div className="relative mr-1">
                <FaHeartbeat className="text-2xl text-primary" />
              </div>
              
              <div className="font-heading">
                <span className="gradient-text text-xl font-bold tracking-tight">
                  HealthWell
                </span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Nav - Tighter spacing */}
          <div className="hidden md:flex space-x-0 items-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={index} 
                  href={link.href} 
                  className={`text-sm relative px-2.5 py-2 transition-colors duration-200 ${
                    isActive 
                      ? 'text-primary font-semibold' 
                      : 'text-foreground font-medium hover:text-primary/90'
                  }`}
                >
                  {/* Link text */}
                  {link.name}
                  
                  {/* Simple underline indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>
          
          {/* Contact Button (desktop) - more compact */}
          <a 
            href="#contact" 
            className="hidden md:flex items-center justify-center gradient-btn text-sm px-4 py-1.5 rounded-full font-medium shadow-sm hover:shadow-md transition-shadow duration-300 text-white ml-3"
          >
            Get Started
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3.5 w-3.5 ml-1.5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* Mobile Menu Button - Simplified */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground hover:text-primary focus:outline-none transition-colors relative"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Panel - Simplified */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background z-50 md:hidden shadow-lg overflow-y-auto border-l border-border/20"
          >
            <div className="p-5 flex flex-col h-full">
              {/* Header with logo and close button */}
              <div className="flex justify-between items-center mb-6">
                <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                  <FaHeartbeat className="text-xl mr-2 text-primary" />
                  <span className="gradient-text text-lg font-bold">HealthWell</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground"
                  aria-label="Close menu"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              
              {/* Simple divider */}
              <div className="h-px bg-border/60 w-full mb-4"></div>
              
              {/* Menu links - simplified */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className={`py-2.5 px-3 rounded-md transition-colors ${
                        isActive 
                          ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary' 
                          : 'text-foreground hover:bg-muted'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>
              
              {/* Call-to-action */}
              <div className="mt-auto pt-6">
                <a 
                  href="#contact" 
                  className="w-full gradient-btn py-3 px-4 rounded-lg font-medium text-center text-white block"
                  onClick={closeMobileMenu}
                >
                  Get Started
                </a>
                
                <div className="mt-8 pt-5 border-t border-border/40">
                  <p className="text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} HealthWell. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
