import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt className="text-xl" />, 
      title: 'Location',
      details: ['123 Health Avenue, Wellness City, WC 10001']
    },
    { 
      icon: <FaPhoneAlt className="text-xl" />, 
      title: 'Phone',
      details: ['(123) 456-7890']
    },
    { 
      icon: <FaEnvelope className="text-xl" />, 
      title: 'Email',
      details: ['info@healthwell.com']
    },
    { 
      icon: <FaClock className="text-xl" />, 
      title: 'Hours',
      details: [
        'Monday - Friday: 8:00 AM - 7:00 PM',
        'Saturday: 9:00 AM - 5:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span 
            className="text-primary font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mt-2 text-neutral-darkGray"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold font-heading mb-4 text-neutral-darkGray">Have a Question?</h3>
              <p className="text-neutral-darkGray">
                Our team is here to help you with any questions regarding our health services, appointments, or general information. Fill out the form, and we'll get back to you shortly.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full text-primary">
                    {info.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-neutral-darkGray">{info.title}</h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-neutral-darkGray">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-neutral-lightGray p-8 rounded-lg card-shadow"
          >
            {submitSuccess && (
              <motion.div 
                className="mb-4 bg-secondary-light text-primary-dark p-4 rounded-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-neutral-darkGray mb-2 font-medium">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-neutral-darkGray mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-neutral-darkGray mb-2 font-medium">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-neutral-darkGray mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark transition duration-300 text-white font-semibold py-3 px-6 rounded-lg disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
