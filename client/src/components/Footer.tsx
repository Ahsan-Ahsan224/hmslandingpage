import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from 'react-icons/fa';
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
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' }
  ];

  return (
    <footer className="bg-neutral-darkGray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold font-heading mb-6 flex items-center">
              <FaHeartbeat className="mr-2" />
              <span>HealthWell</span>
            </div>
            <p className="text-neutral-lightGray mb-6">
              Your trusted partner for comprehensive health and wellness services, helping you achieve optimal wellbeing.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.href} 
                  className="bg-white/10 hover:bg-primary transition duration-300 h-10 w-10 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary))' }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a 
                    href={link.href} 
                    className="text-neutral-lightGray hover:text-primary transition duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.a 
                    href={service.href} 
                    className="text-neutral-lightGray hover:text-primary transition duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {service.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-heading mb-6">Newsletter</h4>
            <p className="text-neutral-lightGray mb-4">
              Subscribe to our newsletter to receive the latest health tips and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none text-neutral-darkGray"
              />
              <motion.button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark transition duration-300 px-4 py-2 rounded-r-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-neutral-lightGray">
          <p>&copy; {new Date().getFullYear()} HealthWell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
