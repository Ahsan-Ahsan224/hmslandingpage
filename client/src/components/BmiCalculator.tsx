import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/BmiCalculator.module.css';

const BmiCalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiValue, setBmiValue] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = () => {
    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      alert('Please enter valid values for height and weight.');
      return;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(bmi.toFixed(1));
    
    // Set BMI value
    setBmiValue(roundedBMI);
    
    // Set category and message
    let category, message, categoryClass;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      message = 'Your BMI indicates that you are underweight. This might indicate malnourishment or other health issues. Consider consulting with a healthcare professional.';
      categoryClass = 'bg-accent-light text-accent-dark';
    } else if (bmi < 25) {
      category = 'Normal';
      message = 'Your BMI indicates that you are within the normal weight range for your height. Maintaining a healthy weight reduces your risk of health problems.';
      categoryClass = 'bg-secondary-light text-primary-dark';
    } else if (bmi < 30) {
      category = 'Overweight';
      message = 'Your BMI indicates that you are overweight. This might increase your risk of health issues. Consider consulting with a healthcare professional about healthy weight management.';
      categoryClass = 'bg-yellow-100 text-yellow-800';
    } else {
      category = 'Obese';
      message = 'Your BMI indicates obesity. This significantly increases your risk of health problems. We recommend consulting with a healthcare professional for guidance.';
      categoryClass = 'bg-red-100 text-red-800';
    }
    
    setBmiCategory(category);
    setBmiMessage(message);
    setShowResult(true);
  };

  const recalculate = () => {
    setShowResult(false);
    setBmiValue(null);
    setBmiCategory('');
    setBmiMessage('');
  };

  return (
    <div className="bg-neutral-lightGray p-8 rounded-lg card-shadow">
      <h3 className="text-2xl font-bold font-heading mb-6 text-neutral-darkGray">BMI Calculator</h3>
      
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key="bmiForm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="height" className="block text-neutral-darkGray mb-2 font-medium">Height (cm)</label>
                <input 
                  type="number" 
                  id="height" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-neutral-darkGray mb-2 font-medium">Weight (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-gray focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none transition"
                />
              </div>
            </div>
            <motion.button 
              onClick={calculateBMI}
              className="w-full bg-primary hover:bg-primary-dark transition duration-300 text-white font-semibold py-3 px-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Calculate BMI
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="bmiResult"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-lg border-l-4 border-primary"
          >
            <h4 className="text-lg font-bold mb-2 text-neutral-darkGray">Your BMI Result</h4>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-primary mr-3">{bmiValue}</span>
              <span className={`${bmiCategory === 'Normal' ? 'bg-secondary-light text-primary-dark' : 
                bmiCategory === 'Underweight' ? 'bg-accent-light text-accent-dark' : 
                bmiCategory === 'Overweight' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'} text-sm font-semibold px-3 py-1 rounded-full`}>
                {bmiCategory}
              </span>
            </div>
            <p className="text-neutral-darkGray">
              {bmiMessage}
            </p>
            <div className="mt-4">
              <motion.button 
                onClick={recalculate}
                className="text-primary font-semibold hover:text-primary-dark transition"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Recalculate
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BmiCalculator;
