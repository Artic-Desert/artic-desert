import React from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const arrays = [
    ['main', 'alex', 'andres', '0'],
    ['main', '0', 'andres', 'xavi'],
    ['main', 'alex', 'andres', 'xavi'],
    ['main', 'alex', '0', 'xavi'],
    ['main', 'alex', 'andres', 'xavi'],
    ['main', '0', 'andres', '0'],
  ];

  const branchProps: any = {
    main: ['250', '#56FB08'],
    alex: ['200', '#F8C300'],
    andres: ['150', '#df1bfd'],
    xavi: ['100', '#ff8c00'],
  };
  const branchArray = ['main', 'alex', 'andres', 'xavi'];

  // const ease = [0.6, 0.05, -0.01, 0.99];
  const x = useMotionValue(0);
  // const x = useMotionValue(0, { stiffness: 300, damping: 200, ease: ease });
  // const scale = useTransform(x, [-200, 0], [1.25, 1]);
  return (
    <>
      <motion.div className="svg-cont">
        <motion.svg
          // style={{ x, scale }}
          style={{ x }}
          drag={'x'}
          dragConstraints={{ left: -2500, right: 0 }}
          dragElastic={0.001}
          className="the-svg"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="5000"
          height="500px"
          // viewbox must be dynamic and change
          //according to the lenght of git commit history
          viewBox="0 0 5000 500"
          preserveAspectRatio="xMidYMid meet">
          {branchArray.map(branch => {
            return arrays.map((array, index) => {
              return (
                array.includes(branch) && (
                  <motion.circle
                    key={index}
                    onClick={() => (modalOpen ? close() : open())}
                    fill={branchProps[branch][1]}
                    stroke="#56FB08"
                    cx={index * 50}
                    cy={branchProps[branch][0]}
                    r="10"
                  />
                )
              );
            });
          })}
          {/* <line
            fill="none"
            stroke="#56FB08"
            x1="0"
            y1="250"
            x2="5000"
            y2="250"
          />
          <circle fill="#56FB08" stroke="#56FB08" cx="0" cy="250" r="15" />
          <circle fill="#56FB08" stroke="#56FB08" cx="100" cy="250" r="15" />
          <circle fill="#56FB08" stroke="#56FB08" cx="200" cy="250" r="15" />
          <line
            fill="none"
            stroke="#56FB08"
            x1="200"
            y1="180"
            x2="200"
            y2="250"
          />
          <motion.circle
            onClick={() => (modalOpen ? close() : open())}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            fill="#df1bfd"
            stroke="#56FB08"
            cx="350"
            cy="250"
            r="15"
          />
          <circle fill="#56FB08" stroke="#56FB08" cx="500" cy="250" r="15" />
          <circle fill="#ff8c00" stroke="#56FB08" cx="800" cy="250" r="15" />
          <line
            fill="none"
            stroke="#df1bfd"
            x1="200"
            y1="180"
            x2="350"
            y2="180"
          />
          <circle fill="#df1bfd" stroke="#df1bfd" cx="200" cy="180" r="15" />
          <circle fill="#df1bfd" stroke="#df1bfd" cx="250" cy="180" r="15" />
          <circle fill="#df1bfd" stroke="#df1bfd" cx="350" cy="180" r="15" />
          <line
            fill="none"
            stroke="#df1bfd"
            x1="350"
            y1="180"
            x2="350"
            y2="250"
          />
          <line
            fill="none"
            stroke="#56FB08"
            x1="500"
            y1="100"
            x2="500"
            y2="250"
          />
          <line
            fill="none"
            stroke="#ff8c00"
            x1="500"
            y1="110"
            x2="800"
            y2="110"
          />
          <circle fill="#ff8c00" stroke="#ff8c00" cx="500" cy="110" r="15" />
          <circle fill="#ff8c00" stroke="#ff8c00" cx="700" cy="110" r="15" />
          <circle fill="#ff8c00" stroke="#ff8c00" cx="800" cy="110" r="15" />
          <line
            fill="none"
            stroke="#ff8c00"
            x1="800"
            y1="110"
            x2="800"
            y2="250"
          /> */}
        </motion.svg>
      </motion.div>
      {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};
