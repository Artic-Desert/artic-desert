import React from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';
import { gitTimelineData } from '../../mocks/GitTimeline/gitTimeline';
import { TimeliineDot } from './TimelineDotComponent/TimeliineDot.component';

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCommit, setCurrentCommit] = useState<string | number>('');

  const close = () => setModalOpen(false);

  const branchesOrdered: string[] = gitTimelineData[0];
  const arrays: (number | string)[][] = gitTimelineData[1];

  const colors = ['#56FB08', '#F8C300', '#df1bfd', '#ff8c00'];

  const branchProps: { [key: string]: string } = {};
  branchesOrdered.forEach((branch: string, index: number) => {
    branchProps[branch] = colors[index];
  });
  const x = useMotionValue(0);

  const height = 50 * arrays[0].length;
  const width = 50 * arrays.length;
  return (
    <>
      <motion.div className="svg-cont">
        <motion.svg
          // style={{ x, scale }}
          style={{ x }}
          drag={'x'}
          dragConstraints={{ left: -width, right: 0 }}
          dragElastic={0.001}
          className="the-svg"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width={String(width) + 'px'}
          height={String(height) + 'px'}
          // viewbox must be dynamic and change
          //according to the lenght of git commit history
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet">
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
