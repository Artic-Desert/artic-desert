import React, { useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';
import { gitTimelineData } from '../../mocks/GitTimeline/gitTimeline';

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
  const arrays: any = gitTimelineData[1];
  useEffect(() => {
    console.log('GitTimeLine', arrays);
  }, []);

  const colors = ['#56FB08', '#F8C300', '#df1bfd', '#ff8c00'];

  const branchProps: any = {};
  branchesOrdered.forEach((branch: string, index: number) => {
    branchProps[branch] = colors[index];
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
          {arrays.map((array: any, indexX: number) => {
            return array.map((commit: string, indexY: number) => {
              // console.log(commit);
              return (
                commit && (
                  <>
                    <motion.circle
                      key={`${indexX}${indexY}`}
                      onClick={() => (modalOpen ? close() : open())}
                      fill={branchProps[branchesOrdered[indexY]]}
                      stroke="#56FB08"
                      cx={indexX * 50}
                      cy={String(550 - indexY * 50)}
                      r="10"
                    />
                    {modalOpen && (
                      <Modal
                        commit={commit}
                        modalOpen={modalOpen}
                        handleClose={close}
                      />
                    )}
                  </>
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
      {/* {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />} */}
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};
