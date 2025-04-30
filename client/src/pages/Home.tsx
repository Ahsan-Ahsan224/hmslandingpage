import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Experts from '../components/Experts';
import Articles from '../components/Articles';
import HealthTools from '../components/HealthTools';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  useEffect(() => {
    // Update document title
    document.title = "HealthWell - Your Partner in Health & Wellness";
    
    // Add meta description
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'HealthWell provides comprehensive health solutions tailored to your unique needs. Discover our expert-led services and take control of your wellbeing today.';
    document.head.appendChild(metaDescription);
    
    return () => {
      // Clean up on unmount
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experts />
        <Articles />
        <HealthTools />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
