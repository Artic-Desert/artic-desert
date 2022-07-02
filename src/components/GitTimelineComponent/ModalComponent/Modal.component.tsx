import React from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../BackdropComponent/Backdrop.component';
import './Modal.css';
import { GithubRepo } from '../../../types/Types';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
};

const Modal: React.FC<{
  handleClose: () => void;
  text?: string;
  repo?: GithubRepo;
  modalOpen: boolean;
  //eslint-disable-next-line
}> = ({ handleClose, text, modalOpen, repo }) => {
  return repo ? (
    <>
      <Backdrop onClick={handleClose}>
        <motion.div
          variants={dropIn}
          className="modal background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <div className="wrapper">
            <h1>{repo.name}</h1>
          </div>
        </motion.div>
      </Backdrop>
    </>
  ) : (
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
