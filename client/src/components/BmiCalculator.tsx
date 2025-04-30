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

  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBMI = () => {
    // Reset error state
    setError(null);
    
    const heightInMeters = Number(height) / 100;
    const weightInKg = Number(weight);
    
    // Validate inputs with specific error messages
    if (height === '' || weight === '') {
      setError('Please enter both height and weight values.');
      return;
    }
    
    if (isNaN(heightInMeters) || heightInMeters <= 0) {
      setError('Please enter a valid height value greater than 0.');
      return;
    }
    
    if (isNaN(weightInKg) || weightInKg <= 0) {
      setError('Please enter a valid weight value greater than 0.');
      return;
    }
    
    // Add limits for realistic values
    if (heightInMeters > 2.5) {
      setError('Please enter a realistic height (maximum 250 cm).');
      return;
    }
    
    if (weightInKg > 300) {
      setError('Please enter a realistic weight (maximum 300 kg).');
      return;
    }
    
    // Show calculating state
    setIsCalculating(true);
    
    // Simulate calculation delay for better user experience
    setTimeout(() => {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      const roundedBMI = parseFloat(bmi.toFixed(1));
      
      // Set BMI value
      setBmiValue(roundedBMI);
      
      // Set category and message
      let category, message;
      
      if (bmi < 18.5) {
        category = 'Underweight';
        message = 'Your BMI indicates that you are underweight. This might indicate malnourishment or other health issues. Consider consulting with a healthcare professional for personalized advice.';
      } else if (bmi < 25) {
        category = 'Normal';
        message = 'Your BMI indicates that you are within the normal weight range for your height. Maintaining a healthy weight reduces your risk of health problems. Keep up the good habits!';
      } else if (bmi < 30) {
        category = 'Overweight';
        message = 'Your BMI indicates that you are overweight. This might increase your risk of health issues. Consider consulting with a healthcare professional about healthy weight management strategies tailored to your needs.';
      } else {
        category = 'Obese';
        message = 'Your BMI indicates obesity. This significantly increases your risk of health problems. We recommend consulting with a healthcare professional for guidance on a sustainable weight management plan that works for you.';
      }
      
      setBmiCategory(category);
      setBmiMessage(message);
      setShowResult(true);
      setIsCalculating(false);
    }, 600);
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
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
            
            <motion.button 
              onClick={calculateBMI}
              className="w-full gradient-btn text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isCalculating}
            >
              {isCalculating ? (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Calculating...</span>
                </motion.div>
              ) : (
                <>
                  <FaCalculator className="mr-2" />
                  Calculate BMI
                </>
              )}
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
              
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  {/* Circular progress indicator */}
                  <div className="w-24 h-24 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#f1f5f9" 
                        strokeWidth="8"
                      />
                      
                      {/* Underweight segment */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8"
                        strokeDasharray="70.7, 282.8" 
                        strokeDashoffset="282.8"
                        transform="rotate(-180, 50, 50)"
                        opacity="0.3"
                      />
                      
                      {/* Normal segment */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="8"
                        strokeDasharray="70.7, 282.8" 
                        strokeDashoffset="212.1"
                        transform="rotate(-180, 50, 50)"
                        opacity="0.3"
                      />
                      
                      {/* Overweight segment */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#eab308" 
                        strokeWidth="8"
                        strokeDasharray="56.6, 282.8" 
                        strokeDashoffset="141.4"
                        transform="rotate(-180, 50, 50)"
                        opacity="0.3"
                      />
                      
                      {/* Obese segment */}
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="8"
                        strokeDasharray="84.9, 282.8" 
                        strokeDashoffset="84.9"
                        transform="rotate(-180, 50, 50)"
                        opacity="0.3"
                      />
                      
                      {/* Active indicator */}
                      <motion.circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke={
                          bmiCategory === 'Underweight' ? '#3b82f6' :
                          bmiCategory === 'Normal' ? '#22c55e' :
                          bmiCategory === 'Overweight' ? '#eab308' :
                          '#ef4444'
                        }
                        strokeWidth="10"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0, 282.8" }}
                        animate={{ 
                          strokeDasharray: `${
                            bmiValue && bmiValue <= 40 
                              ? (bmiValue / 40) * 282.8 
                              : 282.8
                          }, 282.8` 
                        }}
                        strokeDashoffset="282.8"
                        transform="rotate(-180, 50, 50)"
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    
                    {/* BMI value display */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <motion.span 
                        className="text-3xl font-bold text-foreground"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        {bmiValue}
                      </motion.span>
                      <span className="text-xs text-muted-foreground">BMI</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* BMI range indicator */}
              <div className="relative h-5 mb-2">
                <div className="absolute inset-x-0 h-2 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="w-1/4 h-full bg-blue-400"></div>
                  <div className="w-1/4 h-full bg-green-400"></div>
                  <div className="w-1/4 h-full bg-yellow-400"></div>
                  <div className="w-1/4 h-full bg-red-400"></div>
                </div>
                
                {/* Marker for current BMI */}
                <motion.div 
                  className="absolute top-0 w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
                  style={{ 
                    backgroundColor: 
                      bmiCategory === 'Underweight' ? '#3b82f6' :
                      bmiCategory === 'Normal' ? '#22c55e' :
                      bmiCategory === 'Overweight' ? '#eab308' :
                      '#ef4444',
                    left: `calc(${
                      bmiValue && bmiValue >= 16 && bmiValue <= 40 
                        ? ((bmiValue - 16) / 24) * 100 
                        : bmiValue && bmiValue < 16 ? 0 : 100
                    }% - 8px)`
                  }}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>16</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
              
              <div className="flex justify-between text-xs mb-4">
                <span className="text-blue-500 font-medium -ml-1">Underweight</span>
                <span className="text-green-500 font-medium -ml-5">Normal</span>
                <span className="text-yellow-500 font-medium -ml-8">Overweight</span>
                <span className="text-red-500 font-medium -mr-1">Obese</span>
              </div>
              
              {/* Information about your BMI Category */}
              <div className={`mb-6 p-3 rounded-lg border ${
                bmiCategory === 'Underweight' ? 'bg-blue-50 border-blue-200' :
                bmiCategory === 'Normal' ? 'bg-green-50 border-green-200' :
                bmiCategory === 'Overweight' ? 'bg-yellow-50 border-yellow-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    bmiCategory === 'Underweight' ? 'bg-blue-100 text-blue-600' :
                    bmiCategory === 'Normal' ? 'bg-green-100 text-green-600' :
                    bmiCategory === 'Overweight' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {bmiCategory === 'Normal' ? (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h5 className={`font-medium mb-1 ${
                      bmiCategory === 'Underweight' ? 'text-blue-700' :
                      bmiCategory === 'Normal' ? 'text-green-700' :
                      bmiCategory === 'Overweight' ? 'text-yellow-800' :
                      'text-red-700'
                    }`}>
                      {bmiCategory === 'Underweight' && 'You are underweight'}
                      {bmiCategory === 'Normal' && 'You have a healthy weight'}
                      {bmiCategory === 'Overweight' && 'You are overweight'}
                      {bmiCategory === 'Obese' && 'You are in the obese range'}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {bmiMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
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
