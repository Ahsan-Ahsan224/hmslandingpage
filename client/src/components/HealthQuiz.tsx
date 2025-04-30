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
            >
              <h4 className="text-lg font-bold mb-6">
                {quizQuestions[currentQuestion].text}
              </h4>
            
              <div className="space-y-3 mb-8">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.label 
                    key={index} 
                    className={`flex items-center p-4 bg-white rounded-xl cursor-pointer border transition-all hover:border-secondary/50 ${
                      answers[currentQuestion] === option.value 
                        ? 'bg-secondary/5 border-secondary shadow-sm' 
                        : 'border-border'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 ${
                      answers[currentQuestion] === option.value 
                        ? 'border-secondary bg-secondary' 
                        : 'border-muted-foreground'
                    }`}>
                      {answers[currentQuestion] === option.value && (
                        <FaCheck className="text-white text-xs" />
                      )}
                    </div>
                    <input 
                      type="radio" 
                      name={`q${currentQuestion}`} 
                      value={option.value}
                      checked={answers[currentQuestion] === option.value}
                      onChange={() => handleAnswer(index)}
                      className="sr-only"
                    />
                    <span>{option.text}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
            
            <div className="mt-8 flex justify-between">
              <motion.button 
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium ${
                  currentQuestion === 0 
                    ? 'text-muted-foreground bg-muted cursor-not-allowed' 
                    : 'text-foreground bg-white border border-border hover:border-secondary hover:text-secondary'
                }`}
                whileHover={currentQuestion === 0 ? {} : { y: -2 }}
              >
                <FaChevronLeft className="mr-2 text-xs" />
                Previous
              </motion.button>
              
              {currentQuestion < quizQuestions.length - 1 ? (
                <motion.button 
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion]}
                  className={`flex items-center px-5 py-2.5 rounded-xl font-medium ${
                    !answers[currentQuestion]
                      ? 'text-muted-foreground bg-muted cursor-not-allowed'
                      : 'gradient-btn text-white'
                  }`}
                  whileHover={!answers[currentQuestion] ? {} : { y: -2 }}
                >
                  Next
                  <FaChevronRight className="ml-2 text-xs" />
                </motion.button>
              ) : (
                <motion.button 
                  onClick={calculateResults}
                  disabled={!answers[currentQuestion]}
                  className={`flex items-center px-5 py-2.5 rounded-xl font-medium ${
                    !answers[currentQuestion]
                      ? 'text-muted-foreground bg-muted cursor-not-allowed'
                      : 'gradient-btn text-white'
                  }`}
                  whileHover={!answers[currentQuestion] ? {} : { y: -2 }}
                >
                  Get Results
                  <FaArrowRight className="ml-2 text-xs" />
                </motion.button>
              )}
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
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold">Your Health Score</h4>
                <span className={`${getScoreBadgeColor()} text-sm font-semibold px-3 py-1 rounded-full border`}>
                  {getScoreBadge()}
                </span>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                  <svg className="absolute inset-0 transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                    <motion.circle
                      cx="50" cy="50" r="46" 
                      stroke="currentColor" 
                      strokeWidth="8"
                      fill="none"
                      className="text-secondary" 
                      strokeDasharray={`${score * 2.89}, 1000`}
                      initial={{ strokeDasharray: "0, 1000" }}
                      animate={{ strokeDasharray: `${score * 2.89}, 1000` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div>
                      <span className="text-3xl font-bold block">{score}</span>
                      <span className="text-xs text-muted-foreground">out of 100</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
                <p className="text-muted-foreground">
                  {getHealthMessage()}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
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
                  className="text-primary font-medium hover:text-primary-dark transition-colors flex items-center"
                >
                  Get a health plan
                  <FaArrowRight className="ml-1 w-3 h-3" />
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
