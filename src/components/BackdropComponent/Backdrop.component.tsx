import React from 'react';
import { motion } from 'framer-motion';
import './Backdrop.css';

//eslint-disable-next-line
const Backdrop: React.FC<{ children: any; onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick && onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.94 }}
      exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

export default Backdrop;
