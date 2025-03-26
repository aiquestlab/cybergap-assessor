
import React from 'react';
import LevelSelector from '@/components/LevelSelector';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.01,
      },
    },
  };
  
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  return (
    <motion.span
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ marginRight: '0.25em', display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-xl bg-cyber-blue flex items-center justify-center text-white font-bold text-xl">
            CG
          </div>
          <div className="ml-3">
            <div className="font-semibold text-lg">CyberGap</div>
            <div className="text-xs text-gray-500">CMMC Assessment Tool</div>
          </div>
        </div>
      </header>
      
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block mb-2 px-3 py-1 bg-cyber-blue/10 text-cyber-blue rounded-full text-sm font-medium"
          >
            CMMC Gap Assessment
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-br from-cyber-navy to-cyber-blue bg-clip-text text-transparent">
            <AnimatedText text="Evaluate Your Cybersecurity Maturity" />
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
          >
            Assess your organization against CMMC requirements, identify gaps, and generate compliance reports with SPRS scores.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-6">Select your assessment level:</h2>
            <LevelSelector />
          </motion.div>
        </div>
      </div>
      
      <footer className="py-4 px-8 text-center text-gray-500 text-sm">
        <p>CyberGap CMMC Assessment Tool &copy; {new Date().getFullYear()}</p>
      </footer>
    </motion.div>
  );
};

export default Index;
