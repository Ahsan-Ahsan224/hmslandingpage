import { motion } from 'framer-motion';
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
    <section id="articles" className="py-20 bg-neutral-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Knowledge Hub
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mt-2 text-neutral-darkGray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Latest Health Articles
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
          {articles.map((article, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden card-shadow"
              variants={cardVariants}
            >
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-secondary-light text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-neutral-darkGray ml-auto">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold font-heading mb-3 text-neutral-darkGray">{article.title}</h3>
                <p className="text-neutral-darkGray mb-4">
                  {article.description}
                </p>
                <motion.a 
                  href="#" 
                  className="text-primary font-semibold inline-flex items-center hover:text-primary-dark transition"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Read More <span className="ml-2">→</span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.a 
            href="#" 
            className="inline-block bg-primary hover:bg-primary-dark transition duration-300 text-white font-semibold py-3 px-8 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Articles;
