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
    <section id="services" className="py-20 bg-neutral-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What We Offer
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mt-2 text-neutral-darkGray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Health Services
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
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
                className="bg-white rounded-lg p-8 card-shadow"
                variants={cardVariants}
              >
                <div className="text-primary text-4xl mb-4">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-neutral-darkGray">{service.title}</h3>
                <p className="text-neutral-darkGray mb-4">
                  {service.description}
                </p>
                <a href="#" className="text-primary font-semibold inline-flex items-center hover:text-primary-dark transition">
                  Learn More <span className="ml-2">→</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
