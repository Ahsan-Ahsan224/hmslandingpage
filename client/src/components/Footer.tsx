import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Services', href: '#services' },
    { name: 'Our Experts', href: '#experts' },
    { name: 'Health Articles', href: '#articles' },
    { name: 'Health Tools', href: '#tools' },
    { name: 'Contact Us', href: '#contact' }
  ];

  const services = [
    { name: 'Preventive Care', href: '#' },
    { name: 'Specialized Consultations', href: '#' },
    { name: 'Fitness Programs', href: '#' },
    { name: 'Nutrition Counseling', href: '#' },
    { name: 'Mental Wellness', href: '#' },
    { name: 'Telehealth Services', href: '#' }
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: '123 Wellness Ave, Health City, HC 10001', label: 'Address' },
    { icon: <FaPhone />, text: '+1 (555) 123-4567', label: 'Phone' },
    { icon: <FaEnvelope />, text: 'contact@healthwell.com', label: 'Email' }
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-muted">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-background" 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-80 bg-gradient-to-t from-primary/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-4">
            <div className="mb-8">
              <Link href="/" className="flex items-center mb-4">
                <FaHeartbeat className="text-3xl mr-2 text-primary" />
                <div className="font-heading">
                  <span className="gradient-text text-2xl font-bold tracking-tight">HealthWell</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6">
                Your trusted partner for comprehensive health and wellness services, helping you achieve optimal wellbeing and living your best life.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center group hover:translate-x-1 transition-transform"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <p className="text-foreground">
                    <span className="sr-only">{item.label}:</span>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 sm:col-span-6">
            <h4 className="text-lg font-bold mb-4 border-b border-border pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group py-1"
                    whileHover={{ x: 3 }}
                  >
                    <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2 sm:col-span-6">
            <h4 className="text-lg font-bold mb-4 border-b border-border pb-2">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.a 
                    href={service.href} 
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center group py-1"
                    whileHover={{ x: 3 }}
                  >
                    <span className="h-1.5 w-1.5 bg-primary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <div className="bg-card p-6 rounded-2xl card-shadow relative">
              {/* Background gradient for card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-50 -z-10"></div>
              
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter to receive the latest health tips and updates.
              </p>
              
              <form className="mb-6">
                <div className="flex flex-col space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                  />
                  <motion.button 
                    type="submit" 
                    className="gradient-btn text-white font-medium py-2.5 px-6 rounded-xl flex justify-center items-center"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe <FaPaperPlane className="ml-2" />
                  </motion.button>
                </div>
              </form>
              
              <div>
                <h5 className="font-medium mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((link, index) => (
                    <motion.a 
                      key={index}
                      href={link.href} 
                      aria-label={link.label}
                      className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-border my-10"></div>
        
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <div>
            <p>&copy; {new Date().getFullYear()} HealthWell. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6">
              <li><a href="#" className="hover:text-primary transition-colors py-1">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors py-1">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors py-1">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
