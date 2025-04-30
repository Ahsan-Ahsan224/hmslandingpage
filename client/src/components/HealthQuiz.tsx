import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  return (
    <div className="bg-neutral-lightGray p-8 rounded-lg card-shadow">
      <h3 className="text-2xl font-bold font-heading mb-6 text-neutral-darkGray">Health Assessment Quiz</h3>
      
      <AnimatePresence mode="wait">
        {quizState === 'intro' && (
          <motion.div 
            key="quizIntro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="quizIntro"
          >
            <p className="text-neutral-darkGray mb-4">
              Take our quick health assessment to get personalized recommendations for improving your overall wellbeing.
            </p>
            <motion.button 
              onClick={startQuiz}
              className="w-full bg-primary hover:bg-primary-dark transition duration-300 text-white font-semibold py-3 px-6 rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Assessment
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
            <h4 className="text-lg font-semibold mb-3 text-neutral-darkGray">
              {currentQuestion + 1}. {quizQuestions[currentQuestion].text}
            </h4>
            <div className="space-y-2 mb-6">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <label 
                  key={index} 
                  className={`flex items-center p-3 bg-white rounded-lg cursor-pointer hover:bg-neutral-gray/20 transition ${
                    answers[currentQuestion] === option.value ? 'bg-primary/10 border border-primary' : ''
                  }`}
                >
                  <input 
                    type="radio" 
                    name={`q${currentQuestion}`} 
                    value={option.value}
                    checked={answers[currentQuestion] === option.value}
                    onChange={() => handleAnswer(index)}
                    className="mr-2"
                  />
                  <span>{option.text}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between">
              <motion.button 
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="bg-neutral-gray hover:bg-neutral-gray/80 transition text-neutral-darkGray font-semibold py-2 px-5 rounded-lg disabled:opacity-50"
                whileHover={{ scale: currentQuestion === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentQuestion === 0 ? 1 : 0.95 }}
              >
                Previous
              </motion.button>
              
              {currentQuestion < quizQuestions.length - 1 ? (
                <motion.button 
                  onClick={nextQuestion}
                  className="bg-primary hover:bg-primary-dark transition text-white font-semibold py-2 px-5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button 
                  onClick={calculateResults}
                  className="bg-primary hover:bg-primary-dark transition text-white font-semibold py-2 px-5 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!answers.every(answer => answer !== '')}
                >
                  Get Results
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
          >
            <div className="bg-white p-6 rounded-lg border-l-4 border-primary">
              <h4 className="text-lg font-bold mb-2 text-neutral-darkGray">Your Health Assessment</h4>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-neutral-darkGray">Overall Score:</span>
                  <span className="font-bold text-primary">{score}/100</span>
                </div>
                <div className="h-3 bg-neutral-gray rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              <p className="text-neutral-darkGray mb-4">
                {getHealthMessage()}
              </p>
              <div className="mt-4">
                <motion.button 
                  onClick={retakeQuiz}
                  className="text-primary font-semibold hover:text-primary-dark transition"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Retake Assessment
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthQuiz;
