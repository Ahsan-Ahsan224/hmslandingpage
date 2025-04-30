import { motion } from 'framer-motion';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="home" className="relative bg-primary min-h-[85vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 text-white mb-10 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              Your Journey To Better Health Starts Here
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              We provide comprehensive health solutions tailored to your unique needs. 
              Discover our expert-led services and take control of your wellbeing today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a 
                href="#services" 
                className="bg-white text-primary hover:bg-neutral-gray transition duration-300 font-bold py-3 px-6 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Services
              </motion.a>
              <motion.a 
                href="#contact" 
                className="bg-transparent hover:bg-white/10 transition duration-300 border-2 border-white text-white font-bold py-3 px-6 rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Health and wellness lifestyle" 
              className="rounded-lg shadow-2xl mx-auto max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-lightGray to-transparent"></div>
    </section>
  );
};

export default Hero;
