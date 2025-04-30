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
    <section id="experts" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mt-2 text-neutral-darkGray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet Our Health Experts
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
          {experts.map((expert, index) => (
            <motion.div 
              key={index} 
              className="bg-neutral-lightGray rounded-lg overflow-hidden card-shadow"
              variants={cardVariants}
            >
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading mb-1 text-neutral-darkGray">{expert.name}</h3>
                <p className="text-primary font-medium mb-3">{expert.role}</p>
                <p className="text-neutral-darkGray mb-4">
                  {expert.description}
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-neutral-darkGray hover:text-primary transition">
                    <FaLinkedin className="text-lg" />
                  </a>
                  {expert.social === 'twitter' ? (
                    <a href="#" className="text-neutral-darkGray hover:text-primary transition">
                      <FaTwitter className="text-lg" />
                    </a>
                  ) : (
                    <a href="#" className="text-neutral-darkGray hover:text-primary transition">
                      <FaInstagram className="text-lg" />
                    </a>
                  )}
                  <a href="#" className="text-neutral-darkGray hover:text-primary transition">
                    <FaEnvelope className="text-lg" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experts;
