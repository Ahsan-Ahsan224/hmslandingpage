import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';
import styles from '../styles/Experts.module.css';
import { experts } from '../data/experts';

const Experts = () => {
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
    <section id="experts" className="py-24 bg-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-40 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-2xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-sm font-medium tracking-wide">
              Our Team
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet Our <span className="gradient-text">Health Experts</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our team of certified health professionals are here to provide you with the highest level of care 
            and support on your wellness journey.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {experts.map((expert, index) => (
            <motion.div 
              key={index} 
              className="bg-card rounded-2xl overflow-hidden card-shadow group relative"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={expert.image} 
                  alt={expert.name} 
                  className="w-full h-80 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex justify-center space-x-3 mb-3">
                    <a href="#" className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <FaLinkedin />
                    </a>
                    {expert.social === 'twitter' ? (
                      <a href="#" className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                        <FaTwitter />
                      </a>
                    ) : (
                      <a href="#" className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                        <FaInstagram />
                      </a>
                    )}
                    <a href="#" className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                      <FaEnvelope />
                    </a>
                  </div>
                  <a 
                    href="#contact" 
                    className="gradient-btn block text-center text-white py-2 px-4 rounded-lg w-full font-medium"
                  >
                    Book Appointment
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{expert.name}</h3>
                <p className="text-primary font-medium mb-3">{expert.role}</p>
                <p className="text-muted-foreground">
                  {expert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a href="#contact" className="gradient-btn inline-flex items-center px-8 py-3 rounded-full font-medium shadow-lg">
            Join Our Team
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experts;
