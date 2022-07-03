import React, { useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';
import { gitTimelineData } from '../../mocks/GitTimeline/gitTimeline';

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log('GitTimeLine', gitTimelineData);
  }, []);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  // const arrays = [
  //   ['main', 'alex', 'andres', '0'],
  //   ['main', '0', 'andres', 'xavi'],
  //   ['main', 'alex', 'andres', 'xavi'],
  //   ['main', 'alex', '0', 'xavi'],
  //   ['main', 'alex', 'andres', 'xavi'],
  //   ['main', '0', 'andres', '0'],
  // ];

  const branchesOrdered: string[] = gitTimelineData[0];
  const arrays: (string | number)[][] = gitTimelineData[1];

  const colors = ['#56FB08', '#F8C300', '#df1bfd', '#ff8c00'];

  const branchProps: any = {};
  branchesOrdered.forEach((branch: string, index: number) => {
    branchProps[branch] = [String(250 - index * 50), colors[index]];
  });

  // const branchProps: any = {
  //   main: ['250', '#56FB08'],
  //   alex: ['200', '#F8C300'],
  //   andres: ['150', '#df1bfd'],
  //   xavi: ['100', '#ff8c00'],
  // };
  // const branchArray = ['main', 'alex', 'andres', 'xavi'];

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
          width="10000"
          height="500px"
          // viewbox must be dynamic and change
          //according to the lenght of git commit history
          viewBox="0 0 10000 500"
          preserveAspectRatio="xMidYMid meet">
          {arrays.map((array, indexX) => {
            return array.map((commit: string, indexY: number) => {
              console.log(commit);
              return (
                commit && (
                  <motion.circle
                    key={`${indexX}${indexY}`}
                    onClick={() => (modalOpen ? close() : open())}
                    fill={branchProps[branchesOrdered.toString()][1]}
                    stroke="#56FB08"
                    cx={indexX * 50}
                    cy={String(250 - indexY * 50)}
                    r="10"
                  />
                )
              );
            });
          })}
          {/* {branchesOrdered.map((branch) => {
            return arrays.map(array => {
              return (
                array[index] != 0 && (
                  <motion.circle
                    key={index}
                    onClick={() => (modalOpen ? close() : open())}
                    fill={branchProps[branch.toString()][1]}
                    stroke="#56FB08"
                    cx={index * 50}
                    cy={branchProps[branch.toString()][0]}
                    r="10"
                  />
                )
              );
            });
          })} */}
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
