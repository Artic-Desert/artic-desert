import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../BackdropComponent/Backdrop.component';
import './Modal.css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.2,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

const Modal: React.FC<{
  handleClose: () => void;
  text?: string;
  modalOpen: boolean;
  //eslint-disable-next-line
}> = ({ handleClose, text, modalOpen }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={dropIn}
        className="modal background"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}></motion.div>
    </Backdrop>
  );
};

export default Modal;
