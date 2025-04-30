import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClipboardCheck, FaChevronLeft, FaChevronRight, FaCheck, FaMedal, FaArrowRight } from 'react-icons/fa';
import styles from '../styles/HealthQuiz.module.css';
import { quizQuestions } from '../data/quizQuestions';

const HealthQuiz = () => {
  const [quizState, setQuizState] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizQuestions.length).fill(''));
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuizState('questions');
    setCurrentQuestion(0);
    setAnswers(Array(quizQuestions.length).fill(''));
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = quizQuestions[currentQuestion].options[answerIndex].value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      const question = quizQuestions[index];
      const selectedOption = question.options.find(option => option.value === answer);
      if (selectedOption) {
        totalScore += selectedOption.points;
      }
    });
    
    // Calculate percentage score (out of 100)
    const maxPossibleScore = quizQuestions.length * 4; // Assuming max points per question is 4
    const percentage = Math.round((totalScore / maxPossibleScore) * 100);
    setScore(percentage);
    setQuizState('results');
  };

  const retakeQuiz = () => {
    setQuizState('intro');
    setCurrentQuestion(0);
    setAnswers(Array(quizQuestions.length).fill(''));
    setScore(0);
  };

  const getHealthMessage = () => {
    if (score < 40) {
      return "Your health assessment indicates several areas for improvement. Focus on increasing physical activity, improving your diet, and establishing better sleep patterns.";
    } else if (score < 70) {
      return "You're doing well in some areas of your health! Consider focusing on improving your sleep habits and increasing your daily water intake.";
    } else {
      return "Great job! You're maintaining excellent health habits. Keep up the good work and consider adding more variety to your exercise routine to continue challenging yourself.";
    }
  };

  // Get health assessment category based on score
  const getScoreBadge = () => {
    if (score < 40) {
      return "Needs Improvement";
    } else if (score < 70) {
      return "Good";
    } else if (score < 90) {
      return "Very Good";
    } else {
      return "Excellent";
    }
  };

  // Get color scheme based on score category
  const getScoreBadgeColor = () => {
    if (score < 40) {
      return "bg-red-50 text-red-600 border-red-200";
    } else if (score < 70) {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    } else if (score < 90) {
      return "bg-green-50 text-green-600 border-green-200";
    } else {
      return "bg-purple-50 text-purple-600 border-purple-200";
    }
  };
  
  // Get icon based on score
  const getScoreIcon = () => {
    if (score < 40) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (score < 70) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    } else if (score < 90) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    }
  };
  
  // Get more detailed health recommendations based on score
  const getDetailedRecommendations = () => {
    if (score < 40) {
      return [
        "Increase physical activity to at least 30 minutes daily",
        "Add more fruits and vegetables to your diet",
        "Develop a consistent sleep schedule",
        "Practice stress management techniques like meditation",
        "Gradually increase your water intake"
      ];
    } else if (score < 70) {
      return [
        "Aim for 150 minutes of moderate exercise per week",
        "Incorporate a variety of colorful vegetables in meals",
        "Limit screen time before bed for better sleep",
        "Try breathing exercises when feeling stressed",
        "Replace sugary drinks with water"
      ];
    } else {
      return [
        "Consider adding strength training to your exercise routine",
        "Experiment with new healthy recipes to maintain variety",
        "Create a relaxing bedtime routine to optimize sleep",
        "Balance work and personal life for stress management",
        "Maintain your healthy habits and be a wellness example"
      ];
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">Health Assessment Quiz</h3>
      
      <AnimatePresence mode="wait">
        {quizState === 'intro' && (
          <motion.div 
            key="quizIntro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="quizIntro"
          >
            <p className="text-muted-foreground mb-8">
              Take our quick health assessment to get personalized recommendations for improving your overall wellbeing.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-secondary/10 text-secondary p-2 rounded-full mr-3">
                  <FaClipboardCheck />
                </div>
                <div>
                  <h4 className="font-medium">5 Simple Questions</h4>
                  <p className="text-sm text-muted-foreground">Quick assessment of your health habits</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/10 text-secondary p-2 rounded-full mr-3">
                  <FaCheck />
                </div>
                <div>
                  <h4 className="font-medium">Instant Results</h4>
                  <p className="text-sm text-muted-foreground">Get feedback right away</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-secondary/10 text-secondary p-2 rounded-full mr-3">
                  <FaMedal />
                </div>
                <div>
                  <h4 className="font-medium">Personalized Insights</h4>
                  <p className="text-sm text-muted-foreground">Tailored recommendations for your health</p>
                </div>
              </div>
            </div>
            
            <motion.button 
              onClick={startQuiz}
              className="w-full gradient-btn text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Assessment
            </motion.button>
          </motion.div>
        )}
        
        {quizState === 'questions' && (
          <motion.div 
            key="quizQuestions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="quiz-question"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <div className="h-1.5 bg-gray-100 rounded-full flex-grow mx-4 overflow-hidden">
                <div 
                  className="h-full bg-secondary"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full opacity-50 -z-10"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -left-10 w-16 h-16 bg-secondary/5 rounded-full opacity-50 -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
              
              {/* Question number indicator */}
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-sm mr-3">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
              </div>
              
              {/* Question text with enhanced styling */}
              <h4 className="text-xl font-bold mb-6 leading-relaxed">
                {quizQuestions[currentQuestion].text}
              </h4>
            
              {/* Options with enhanced styling and animations */}
              <div className="space-y-3 mb-8">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.label 
                    key={index} 
                    className={`flex items-center p-4 bg-white rounded-xl cursor-pointer border transition-all hover:shadow-md ${
                      answers[currentQuestion] === option.value 
                        ? 'bg-secondary/5 border-secondary shadow-sm' 
                        : 'border-border hover:border-secondary/30'
                    }`}
                    whileHover={{ y: -3, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {/* Custom radio button */}
                    <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-3 transition-all ${
                      answers[currentQuestion] === option.value 
                        ? 'border-secondary bg-secondary scale-110' 
                        : 'border-muted-foreground'
                    }`}>
                      {answers[currentQuestion] === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          <FaCheck className="text-white text-xs" />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hidden native input */}
                    <input 
                      type="radio" 
                      name={`q${currentQuestion}`} 
                      value={option.value}
                      checked={answers[currentQuestion] === option.value}
                      onChange={() => handleAnswer(index)}
                      className="sr-only"
                    />
                    
                    {/* Option text with point value indicator */}
                    <div className="flex-grow flex justify-between items-center">
                      <span className="text-base">{option.text}</span>
                      {answers[currentQuestion] === option.value && (
                        <motion.div 
                          className="bg-secondary/10 text-secondary text-xs font-medium py-1 px-2 rounded-full"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {option.points} {option.points === 1 ? 'point' : 'points'}
                        </motion.div>
                      )}
                    </div>
                  </motion.label>
                ))}
              </div>
            </motion.div>
            
            <div className="mt-8 border-t border-border pt-5">
              <div className="flex justify-between items-center">
                {/* Previous button with enhanced styling and animation */}
                <motion.button 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className={`relative flex items-center px-5 py-2.5 rounded-xl font-medium overflow-hidden ${
                    currentQuestion === 0 
                      ? 'text-muted-foreground bg-muted cursor-not-allowed opacity-50' 
                      : 'text-foreground bg-white border border-border hover:border-secondary hover:text-secondary'
                  }`}
                  whileHover={currentQuestion === 0 ? {} : { 
                    y: -2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                  }}
                  whileTap={currentQuestion === 0 ? {} : { scale: 0.98 }}
                >
                  {/* Animated hover effect */}
                  {currentQuestion !== 0 && (
                    <motion.span 
                      className="absolute inset-0 bg-secondary/5 z-0"
                      initial={{ opacity: 0, x: '100%' }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <FaChevronLeft className="mr-2 text-xs relative z-10" />
                  <span className="relative z-10">Previous</span>
                </motion.button>
                
                {/* Progress indicator */}
                <div className="flex items-center space-x-1">
                  {quizQuestions.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index < currentQuestion 
                          ? 'bg-primary' 
                          : index === currentQuestion 
                            ? 'bg-secondary w-4' 
                            : answers[index] 
                              ? 'bg-primary/30' 
                              : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Next/Calculate button with enhanced styling */}
                {currentQuestion < quizQuestions.length - 1 ? (
                  <motion.button 
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion]}
                    className={`relative group flex items-center px-5 py-2.5 rounded-xl font-medium overflow-hidden ${
                      !answers[currentQuestion]
                        ? 'text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                        : 'gradient-btn text-white shadow-md'
                    }`}
                    whileHover={!answers[currentQuestion] ? {} : { 
                      y: -2,
                      boxShadow: "0 8px 20px rgba(var(--primary), 0.3)"
                    }}
                    whileTap={!answers[currentQuestion] ? {} : { scale: 0.98 }}
                  >
                    {/* Button content with animated arrow */}
                    <span className="relative z-10">Next</span>
                    <motion.span
                      className="relative z-10 flex items-center ml-2"
                      animate={!answers[currentQuestion] ? {} : {
                        x: [0, 4, 0],
                        transition: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 1.5,
                          repeatDelay: 0.5
                        }
                      }}
                    >
                      <FaChevronRight className="text-xs" />
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.button 
                    onClick={calculateResults}
                    disabled={!answers[currentQuestion]}
                    className={`relative group flex items-center px-5 py-2.5 rounded-xl font-medium overflow-hidden ${
                      !answers[currentQuestion]
                        ? 'text-muted-foreground bg-muted cursor-not-allowed opacity-50'
                        : 'gradient-btn text-white shadow-md'
                    }`}
                    whileHover={!answers[currentQuestion] ? {} : { 
                      y: -2,
                      boxShadow: "0 8px 20px rgba(var(--primary), 0.3)"
                    }}
                    whileTap={!answers[currentQuestion] ? {} : { scale: 0.98 }}
                  >
                    {/* Animated glow effect */}
                    {answers[currentQuestion] && (
                      <motion.span 
                        className="absolute inset-0 bg-white/20 z-0"
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ 
                          x: ['100%', '-100%'],
                          opacity: [0, 0.3, 0]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 2,
                          repeatDelay: 1
                        }}
                      />
                    )}
                    
                    {/* Button content */}
                    <span className="relative z-10">Get Results</span>
                    <motion.span
                      className="relative z-10 ml-2"
                      animate={!answers[currentQuestion] ? {} : {
                        x: [0, 4, 0],
                        transition: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 1.5,
                          repeatDelay: 0.5
                        }
                      }}
                    >
                      <FaArrowRight className="text-xs" />
                    </motion.span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {quizState === 'results' && (
          <motion.div 
            key="quizResults"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              {/* Header with score badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {getScoreIcon()}
                  <h4 className="text-lg font-bold ml-2">Your Health Score</h4>
                </div>
                <span className={`${getScoreBadgeColor()} text-sm font-semibold px-3 py-1 rounded-full border`}>
                  {getScoreBadge()}
                </span>
              </div>
              
              {/* Score visualization */}
              <div className="flex justify-center mb-8">
                <div className="w-40 h-40 relative">
                  {/* Background circles for different score ranges */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#f1f5f9" 
                      strokeWidth="10"
                    />
                    
                    {/* Poor range (0-40) */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#fee2e2" 
                      strokeWidth="10"
                      strokeDasharray="115.2, 282.8" 
                      strokeDashoffset="282.8"
                      transform="rotate(-180, 50, 50)"
                    />
                    
                    {/* Good range (40-70) */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#fef3c7" 
                      strokeWidth="10"
                      strokeDasharray="84.8, 282.8" 
                      strokeDashoffset="167.6"
                      transform="rotate(-180, 50, 50)"
                    />
                    
                    {/* Very good range (70-90) */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#dcfce7" 
                      strokeWidth="10"
                      strokeDasharray="56.6, 282.8" 
                      strokeDashoffset="82.8"
                      transform="rotate(-180, 50, 50)"
                    />
                    
                    {/* Excellent range (90-100) */}
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke="#f3e8ff" 
                      strokeWidth="10"
                      strokeDasharray="26.8, 282.8" 
                      strokeDashoffset="26.8"
                      transform="rotate(-180, 50, 50)"
                    />
                    
                    {/* Active indicator */}
                    <motion.circle 
                      cx="50" cy="50" r="45" 
                      fill="none" 
                      stroke={
                        score < 40 ? '#ef4444' :
                        score < 70 ? '#eab308' :
                        score < 90 ? '#22c55e' :
                        '#a855f7'
                      }
                      strokeWidth="10"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0, 282.8" }}
                      animate={{ 
                        strokeDasharray: `${(score / 100) * 282.8}, 282.8` 
                      }}
                      strokeDashoffset="282.8"
                      transform="rotate(-180, 50, 50)"
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  
                  {/* Score display */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-4xl font-bold text-foreground">{score}</span>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center">
                        <span>Score</span>
                        <span className="mx-1">•</span>
                        <span>{getScoreBadge()}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Overall summary */}
              <div className={`mb-6 p-4 rounded-lg border ${
                score < 40 ? 'bg-red-50 border-red-200' :
                score < 70 ? 'bg-yellow-50 border-yellow-200' :
                score < 90 ? 'bg-green-50 border-green-200' :
                'bg-purple-50 border-purple-200'
              }`}>
                <div className="flex">
                  <p className="text-muted-foreground">
                    {getHealthMessage()}
                  </p>
                </div>
              </div>
              
              {/* Personalized recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mb-8"
              >
                <h5 className="font-semibold mb-3 text-foreground flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Personalized Recommendations
                </h5>
                
                <div className="space-y-2">
                  {getDetailedRecommendations().map((recommendation, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start p-3 bg-primary/5 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1), duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-primary flex-shrink-0 mr-3 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{recommendation}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <motion.button 
                  onClick={retakeQuiz}
                  className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
                  whileHover={{ x: -3 }}
                >
                  <svg className="w-4 h-4 mr-1 rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                  </svg>
                  Retake Quiz
                </motion.button>
                
                <a 
                  href="#contact"
                  className="gradient-btn px-4 py-2 rounded-full text-white font-medium hover:text-white shadow-md transition flex items-center"
                >
                  Get a Personalized Plan
                  <FaArrowRight className="ml-2 w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthQuiz;
