import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'wouter';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Our Experts', href: '#experts' },
    { name: 'Health Articles', href: '#articles' },
    { name: 'Health Tools', href: '#tools' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 glass' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <FaHeartbeat className="text-3xl mr-2 text-primary" />
            <div className="font-heading">
              <span className="gradient-text text-2xl font-bold tracking-tight">HealthWell</span>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                className="text-foreground hover:text-primary font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Contact Button (desktop) */}
          <a 
            href="#contact" 
            className="hidden md:flex gradient-btn px-6 py-2 rounded-full font-medium shadow-lg"
          >
            Get Started
          </a>
          
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-foreground hover:text-primary transition duration-300"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass md:hidden absolute w-full overflow-hidden z-50"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col space-y-5">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-foreground hover:text-primary font-medium transition duration-300 py-2 border-b border-border"
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="gradient-btn px-6 py-3 rounded-full font-medium text-center shadow-lg"
                onClick={closeMobileMenu}
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
