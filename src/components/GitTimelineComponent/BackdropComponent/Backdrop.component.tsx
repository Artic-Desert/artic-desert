import React from 'react';
import { motion } from 'framer-motion';
import './Backdrop.css';

const Backdrop: React.FC<{ children: any; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

export default Backdrop;
