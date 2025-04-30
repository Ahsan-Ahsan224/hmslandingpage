import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import styles from '../styles/Articles.module.css';
import { articles } from '../data/articles';

const Articles = () => {
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
    <section id="articles" className="py-24 bg-background relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium tracking-wide">
              Knowledge Hub
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Latest <span className="gradient-text">Health Articles</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Stay updated with the latest research, trends, and insights in the health and wellness industry. 
            Our articles are written by experts to help you make informed decisions.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {articles.map((article, index) => (
            <motion.article 
              key={index} 
              className="bg-card rounded-2xl overflow-hidden card-shadow group h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <FaCalendarAlt className="mr-2" />
                  <time dateTime={article.date}>{article.date}</time>
                </div>
                
                <h3 className="text-xl font-bold mb-3 flex-grow">
                  <a href="#" className="hover:text-primary transition-colors">
                    {article.title}
                  </a>
                </h3>
                
                <p className="text-muted-foreground mb-5">
                  {article.description}
                </p>
                
                <motion.a 
                  href="#" 
                  className="mt-auto inline-flex items-center font-medium text-primary group/link"
                  whileHover={{ x: 3 }}
                >
                  Read More 
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 ml-2">
                    <FaArrowRight />
                  </span>
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="#" 
            className="gradient-btn inline-flex items-center px-8 py-3 rounded-full font-medium shadow-lg"
          >
            View All Articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles;
