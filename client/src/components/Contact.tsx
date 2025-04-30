import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
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
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    { 
      icon: <FaMapMarkerAlt />, 
      title: 'Location',
      details: ['123 Health Avenue, Wellness City, WC 10001']
    },
    { 
      icon: <FaPhoneAlt />, 
      title: 'Phone',
      details: ['(123) 456-7890']
    },
    { 
      icon: <FaEnvelope />, 
      title: 'Email',
      details: ['info@healthwell.com']
    },
    { 
      icon: <FaClock />, 
      title: 'Hours',
      details: [
        'Monday - Friday: 8:00 AM - 7:00 PM',
        'Saturday: 9:00 AM - 5:00 PM',
        'Sunday: Closed'
      ]
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-muted/50 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
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
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Let's <span className="gradient-text">Start a Conversation</span>
          </motion.h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our team is here to help you with any questions regarding our health services, 
            appointments, or general information. We'd love to hear from you!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-2xl p-8 card-shadow h-full">
              <h3 className="text-2xl font-bold mb-6">How Can We Help?</h3>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Background decoration for form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-lg opacity-50 -z-10"></div>
              
              <div className="bg-card p-8 rounded-2xl card-shadow relative">
                {submitSuccess && (
                  <motion.div 
                    className="mb-6 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-green-100 rounded-full p-1 mr-3">
                      <FaCheck className="text-green-600" />
                    </div>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition resize-none"
                      placeholder="Tell us about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full gradient-btn text-white font-medium py-3 px-6 rounded-xl disabled:opacity-70 flex justify-center items-center"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </motion.button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting this form, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a> and consent to being contacted regarding your inquiry.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
