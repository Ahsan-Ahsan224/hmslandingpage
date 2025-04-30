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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0"></div>
      
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full opacity-40 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full opacity-40 blur-3xl z-0"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={item}>
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium tracking-wide mb-6 inline-block">
                Your Wellness Partner
              </span>
            </motion.div>
            
            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Journey To
              <span className="block gradient-text mt-1">Better Health</span>
              <span className="block">Starts Here</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-lg text-muted-foreground mb-8 max-w-xl">
              We provide comprehensive health solutions tailored to your unique needs. 
              Discover our expert-led services and take control of your wellbeing today.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a 
                href="#services" 
                className="gradient-btn text-white py-3 px-8 rounded-full font-medium text-center shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
              </motion.a>
              <motion.a 
                href="#contact" 
                className="bg-transparent hover:bg-primary/5 border-2 border-primary text-foreground font-medium py-3 px-8 rounded-full text-center transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.a>
            </motion.div>
            
            <motion.div 
              variants={item}
              className="flex items-center mt-10 p-4 bg-card rounded-xl shadow-sm border"
            >
              <div className="flex -space-x-4 mr-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className={`w-10 h-10 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center overflow-hidden`}>
                    <span className="text-xs font-bold text-primary">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium">Trusted by <span className="text-primary font-bold">2,500+</span> clients</p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <svg key={index} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                  <span className="text-xs ml-1 text-muted-foreground">4.9/5</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-2xl blur-xl opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Health and wellness lifestyle" 
                className="rounded-2xl shadow-2xl mx-auto max-w-full h-auto relative z-10 border border-white/20"
              />
              <div className="absolute top-4 -right-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg z-20 border max-w-[220px]">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Personalized Plans</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tailored health programs designed for your unique needs
                </p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg z-20 border max-w-[220px]">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="font-medium">Expert Guidance</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Professional healthcare specialists available 24/7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-12 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path fill="currentColor" fillOpacity="1" className="text-background" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
