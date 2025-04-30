import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWeight, FaRuler, FaCalculator, FaArrowRight } from 'react-icons/fa';
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
    let category, message;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      message = 'Your BMI indicates that you are underweight. This might indicate malnourishment or other health issues. Consider consulting with a healthcare professional.';
    } else if (bmi < 25) {
      category = 'Normal';
      message = 'Your BMI indicates that you are within the normal weight range for your height. Maintaining a healthy weight reduces your risk of health problems.';
    } else if (bmi < 30) {
      category = 'Overweight';
      message = 'Your BMI indicates that you are overweight. This might increase your risk of health issues. Consider consulting with a healthcare professional about healthy weight management.';
    } else {
      category = 'Obese';
      message = 'Your BMI indicates obesity. This significantly increases your risk of health problems. We recommend consulting with a healthcare professional for guidance.';
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

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Normal':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'Underweight':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Overweight':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Obese':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">BMI Calculator</h3>
      <p className="text-muted-foreground mb-8">
        Quickly calculate your Body Mass Index (BMI) to assess if your weight is in a healthy range for your height.
      </p>
      
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div 
            key="bmiForm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label htmlFor="height" className="block mb-2 font-medium flex items-center">
                  <FaRuler className="text-primary mr-2" />
                  Height (cm)
                </label>
                <input 
                  type="number" 
                  id="height" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block mb-2 font-medium flex items-center">
                  <FaWeight className="text-primary mr-2" />
                  Weight (kg)
                </label>
                <input 
                  type="number" 
                  id="weight" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition"
                />
              </div>
            </div>
            <motion.button 
              onClick={calculateBMI}
              className="w-full gradient-btn text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaCalculator className="mr-2" />
              Calculate BMI
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="bmiResult"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-border"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold">Your BMI Result</h4>
                <span className={`${getCategoryColor(bmiCategory)} text-sm font-semibold px-3 py-1 rounded-full border`}>
                  {bmiCategory}
                </span>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-primary">{bmiValue}</span>
                </div>
                <div className="h-2 flex-grow bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full ${
                      bmiCategory === 'Underweight' ? 'bg-blue-500' :
                      bmiCategory === 'Normal' ? 'bg-green-500' :
                      bmiCategory === 'Overweight' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${
                        bmiValue && bmiValue <= 40 ? (bmiValue / 40) * 100 : 100
                      }%` 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mb-4">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mb-6">
                <span className="text-blue-500 font-medium">Underweight</span>
                <span className="text-green-500 font-medium pl-6">Normal</span>
                <span className="text-yellow-500 font-medium">Overweight</span>
                <span className="text-red-500 font-medium">Obese</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              {bmiMessage}
            </p>
            
            <div className="flex justify-between items-center">
              <motion.button 
                onClick={recalculate}
                className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
                whileHover={{ x: -5 }}
              >
                <svg className="w-4 h-4 mr-1 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                </svg>
                Recalculate
              </motion.button>
              
              <a 
                href="#contact"
                className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
              >
                Get advice
                <FaArrowRight className="ml-1 w-3 h-3" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BmiCalculator;
