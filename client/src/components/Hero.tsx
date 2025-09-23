import { motion } from 'framer-motion';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  // Smoother animation variants with custom easing
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1.0] } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1.1, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      } 
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };
  
  // Enhanced floating animation with subtle rotation
  const floatAnimation = {
    y: [0, -8, 0],
    rotate: [0, -0.5, 0, 0.5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <>
      {/* Background Elements */}
      <div className="fixed top-0 left-0 right-0 h-[50vh] -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-20vw] w-[90vw] h-[90vh] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[5vh] right-[-20vw] w-[80vw] h-[80vh] bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[10vh] left-[20vw] w-[60vw] h-[60vh] bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 md:pt-14">
        {/* Enhanced background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMTExMTEiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>
        
        {/* Enhanced background shapes with gradient motions */}
        <motion.div 
          className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full opacity-40 blur-3xl z-0"
          animate={{
            opacity: [0.3, 0.4, 0.3],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-secondary/20 to-transparent rounded-tr-full opacity-40 blur-3xl z-0"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="max-w-6xl mx-auto px-4 py-0 relative z-10 -mt-10 md:-mt-14">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              {/* Badge with improved styling */}
              <motion.div variants={item}>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium tracking-wider mb-6 inline-block border border-primary/20 shadow-sm">
                  Your Wellness Partner
                </span>
              </motion.div>
              
              {/* Improved heading with better typography */}
              <motion.h1 
                variants={item} 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                Future Of
                <span className="block gradient-text mt-1 relative">
                  Hospital Management
                  <motion.span 
                    className="absolute bottom-1.5 left-0 right-0 h-[6px] bg-gradient-to-r from-primary/20 to-accent/10 rounded-full -z-10"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
                <span className="block"></span>
              </motion.h1>
              
              {/* Enhanced paragraph with slightly better line height */}
              <motion.p 
                variants={item} 
                className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
              >
                We provide comprehensive health solutions tailored to your unique needs. 
                Discover our expert-led services and take control of your wellbeing today.
              </motion.p>
              
              {/* Improved button group with enhanced hover effects */}
              <motion.div 
                variants={item}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a 
                  href="#services" 
                  className="gradient-btn text-white py-3 px-8 rounded-full font-medium text-center shadow-lg group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(var(--primary), 0.3), 0 4px 6px -4px rgba(var(--primary), 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Our Services</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/20 -z-5"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.a>
                <motion.a 
                  href="#contact" 
                  className="bg-transparent hover:bg-primary/5 border-2 border-primary text-foreground font-medium py-3 px-8 rounded-full text-center transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Us
                </motion.a>
              </motion.div>
              
              {/* Enhanced trust indicators with subtle shadow and animation */}
              <motion.div 
                variants={item}
                className="flex items-center mt-10 p-4 bg-card/80 backdrop-blur-sm rounded-xl shadow-md border border-border/50 hover:border-border/80 transition-colors duration-500"
                whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex -space-x-4 mr-4">
                  {[1, 2, 3].map((_, index) => (
                    <motion.div 
                      key={index} 
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm"
                      whileHover={{ y: -2, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <span className="text-xs font-bold text-primary">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">Trusted by <span className="text-primary font-bold">2,500+</span> clients</p>
                  <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <motion.svg 
                        key={index} 
                        className="w-4 h-4 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </motion.svg>
                    ))}
                    <span className="text-xs ml-1 text-muted-foreground">4.9/5</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Enhanced image section with improved responsive adjustments */}
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              animate="visible"
              variants={slideUp}
            >
              <motion.div 
                className="relative"
                animate={floatAnimation}
              >
                {/* Enhanced gradient background for image */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 rounded-2xl blur-xl opacity-70"
                  animate={{
                    opacity: [0.6, 0.7, 0.6],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main image with enhanced styling */}
                <img 
                   src="/hmsicon3.jpg" 
                   alt="Hospital Management System" 
                  className="rounded-2xl shadow-2xl mx-auto max-w-full h-auto relative z-10 border border-white/30"
                  loading="eager"
                />

                
                {/* First floating card with enhanced animation */}
                
                
                {/* Second floating card with enhanced animation */}
            
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced wave divider with animation */}
        <div className="absolute bottom-0 left-0 right-0 h-16 z-10 overflow-hidden">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
              <path 
                fill="currentColor" 
                fillOpacity="1" 
                className="text-background" 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;