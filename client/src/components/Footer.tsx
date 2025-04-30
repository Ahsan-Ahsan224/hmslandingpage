import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
    <footer className="relative pt-20 pb-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 to-primary/95 -z-10"></div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-background" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Footer top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-white">
          <div className="md:col-span-4">
            <div className="mb-6">
              <div className="flex items-center text-2xl font-bold mb-4">
                <FaHeartbeat className="text-white mr-2" />
                <span className="text-white">Health<span className="text-secondary">Well</span></span>
              </div>
              <p className="text-white/80 mb-6">
                Your trusted partner for comprehensive health and wellness services, helping you achieve optimal wellbeing and living your best life.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-secondary mr-3 mt-1">{item.icon}</div>
                  <p className="text-white/80">
                    <span className="sr-only">{item.label}:</span>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-white/80 hover:text-white transition duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-1.5 w-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.a 
                    href={service.href} 
                    className="text-white/80 hover:text-white transition duration-300 flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-1.5 w-1.5 bg-secondary rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="text-xl font-bold mb-6">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter to receive the latest health tips and updates directly in your inbox.
            </p>
            <form className="flex mb-6">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-foreground border-2 border-white/10 bg-white/10 placeholder:text-white/50"
              />
              <motion.button 
                type="submit" 
                className="gradient-btn px-5 py-3 rounded-r-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
            
            <div>
              <h5 className="font-medium mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.href} 
                    aria-label={link.label}
                    className="bg-white/10 hover:bg-white/20 transition duration-300 h-10 w-10 rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)' 
                    }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>
        
        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/70 text-sm">
          <div>
            <p>&copy; {new Date().getFullYear()} HealthWell. All rights reserved.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
