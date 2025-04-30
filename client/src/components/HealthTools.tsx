import { motion } from 'framer-motion';
import { FaCalculator, FaQuestionCircle } from 'react-icons/fa';
import styles from '../styles/HealthTools.module.css';
import BmiCalculator from './BmiCalculator';
import HealthQuiz from './HealthQuiz';

const HealthTools = () => {
  return (
    <section id="tools" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
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
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium tracking-wide">
              Interactive Tools
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Health <span className="gradient-text">Calculators & Assessments</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Gain insights into your health with our interactive tools. Calculate your BMI and 
            take our health knowledge quiz to assess your understanding of key wellness concepts.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-0 left-0 -mt-5 -ml-5">
              <div className="bg-primary/10 rounded-full p-4 text-primary">
                <FaCalculator className="text-2xl" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 rounded-2xl blur-lg opacity-50 -z-10"></div>
              <div className="bg-card rounded-2xl card-shadow overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-primary to-accent"></div>
                <BmiCalculator />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-0 left-0 -mt-5 -ml-5">
              <div className="bg-secondary/10 rounded-full p-4 text-secondary">
                <FaQuestionCircle className="text-2xl" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-accent/10 to-secondary/20 rounded-2xl blur-lg opacity-50 -z-10"></div>
              <div className="bg-card rounded-2xl card-shadow overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-secondary to-accent"></div>
                <HealthQuiz />
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact" 
            className="gradient-btn inline-flex items-center px-8 py-3 rounded-full font-medium shadow-lg"
          >
            Get Personalized Health Plan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthTools;
