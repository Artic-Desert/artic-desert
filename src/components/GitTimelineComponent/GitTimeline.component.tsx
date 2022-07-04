import React, { useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';
import { gitTimelineData } from '../../mocks/GitTimeline/gitTimeline';
import { TimeliineDot } from './TimelineDotComponent/TimeliineDot.component';
// import { BranchLine } from './BranchLineComponent/BranchLine.component';

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 3,
      ease: 'easeInOut',
    },
  },
};

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCommit, setCurrentCommit] = useState<string | number>('');

  const close = () => setModalOpen(false);

  const branchesOrdered: string[] = gitTimelineData[0];
  const arrays: (number | string)[][] = gitTimelineData[1];

  const colors = [
    '#56FB08',
    '#00ffff',
    '#df1bfd',
    '#ff0000',
    '#ffff00',
    '#ff8400',
  ];

  const branchProps: { [key: string]: string } = {};
  branchesOrdered.forEach((branch: string, index: number) => {
    branchProps[branch] = colors[index];
  });

  const constraintsRef = useRef(null);

  const height = 50 * arrays[0].length;
  const width = 50 * arrays.length;
  return (
    <>
      <motion.div className="svg-cont" ref={constraintsRef}>
        <motion.svg
          variants={pathVariants}
          drag={'x'}
          dragConstraints={{ left: -width, right: 0 }}
          // dragConstraints={constraintsRef}
          dragElastic={0.001}
          className="the-svg"
          xmlns="http://www.w3.org/2000/svg"
          width={String(width) + 'px'}
          height={String(height) + 'px'}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          initial="hidden"
          animate="visible">
          <motion.path
            stroke="#ff0000"
            d={`M0 400, ${width} 400`}
            variants={pathVariants}
          />
          <motion.path
            stroke="#df1bfd"
            d={`M0 450, ${width} 450`}
            variants={pathVariants}
          />
          <motion.path
            stroke="#00ffff"
            d={`M0 500, ${width} 500`}
            variants={pathVariants}
          />
          <motion.path
            stroke="#56FB08"
            d={`M0 550, ${width} 550`}
            variants={pathVariants}
          />
          <motion.path
            stroke="#ffff00"
            d={`M0 350, ${width} 350`}
            variants={pathVariants}
          />
          <motion.path
            stroke="#ff8400"
            d={`M0 300, ${width} 300`}
            variants={pathVariants}
          />
          {/* <BranchLine /> */}
          {arrays.map((array: (string | number)[], indexX: number) => {
            return array.map((commit: string | number, indexY: number) => {
              return (
                commit && (
                  <TimeliineDot
                    key={`${indexX}${indexY}`}
                    indexX={indexX}
                    indexY={indexY}
                    branchProps={branchProps}
                    branchesOrdered={branchesOrdered}
                    commit={commit}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setCurrentCommit={setCurrentCommit}
                  />
                )
              );
            });
          })}
        </motion.svg>
      </motion.div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            commit={currentCommit}
            modalOpen={modalOpen}
            handleClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
};
