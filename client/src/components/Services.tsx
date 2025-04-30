import { motion } from 'framer-motion';
import { FaHeartbeat, FaStethoscope, FaDumbbell, FaAppleAlt, FaBrain, FaMedkit } from 'react-icons/fa';
import styles from '../styles/Services.module.css';
import { services } from '../data/services';

const serviceIcons = {
  'heartbeat': FaHeartbeat,
  'stethoscope': FaStethoscope,
  'dumbbell': FaDumbbell,
  'apple-alt': FaAppleAlt,
  'brain': FaBrain,
  'medkit': FaMedkit,
};

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium tracking-wide">
              What We Offer
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our <span className="gradient-text">Health Services</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            We provide comprehensive health and wellness services designed to help you achieve 
            optimal health and maintain a balanced lifestyle.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.icon as keyof typeof serviceIcons];
            
            return (
              <motion.div 
                key={index} 
                className="bg-card rounded-2xl p-8 card-shadow group"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-primary-light text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#contact" className="gradient-btn inline-flex items-center px-8 py-3 rounded-full font-medium shadow-lg">
            Book A Consultation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
