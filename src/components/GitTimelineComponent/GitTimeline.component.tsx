import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import Modal from './ModalComponent/Modal.component';
// import { gitTimelineData } from '../../mocks/GitTimeline/gitTimeline';
import { TimeliineDot } from './TimelineDotComponent/TimeliineDot.component';
import { useRepo } from '../../hooks/use-repo';
// import { BranchLine } from './BranchLineComponent/BranchLine.component';
import { useDispatch } from 'react-redux';
import { setBranches } from '../../redux/branches/actions';
import { ApiClientService } from '../../services/ApiClientService';
import { useGhpToken } from '../../hooks/use-ghpToken';

// const pathVariants = {
//   hidden: {
//     opacity: 0,
//     pathLength: 0,
//   },
//   visible: {
//     opacity: 1,
//     pathLength: 1,
//     transition: {
//       duration: 3,
//       ease: 'easeInOut',
//     },
//   },
// };

export const GitTimeline: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCommit, setCurrentCommit] = useState<string | number>('');
  const [gitTimelineData, setGitTimelineData] = useState<any>([]); //eslint-disable-line

  const close = () => setModalOpen(false);
  const dispatch = useDispatch();

  const { repo } = useRepo();
  const { ghpToken } = useGhpToken();

  const getTimeLineData = async () => {
    ApiClientService.getTimelineData(repo, ghpToken).then(data =>
      setGitTimelineData(data),
    );
  };

  useEffect(() => {
    getTimeLineData();
  }, []);

  const branchesOrdered: string[] = gitTimelineData?.length
    ? gitTimelineData[0]
    : null;

  const arrays: (number | string)[][] = gitTimelineData?.length
    ? gitTimelineData[1]
    : null;

  useEffect(() => {
    dispatch(setBranches(branchesOrdered ? branchesOrdered : []));
  }, [branchesOrdered]);

  const colors = [
    '#56FB08',
    '#00ffff',
    '#df1bfd',
    '#ff0000',
    '#ffff00',
    '#ff8400',
  ];

  const branchProps: { [key: string]: string } = {};
  branchesOrdered &&
    branchesOrdered.forEach((branch: string, index: number) => {
      branchProps[branch] = colors[index];
    });

  const constraintsRef = useRef(null);

  // const height = 50 * (arrays && arrays[0].length);
  const width = 50 * (arrays && arrays.length);
  return (
    gitTimelineData?.length && (
      <>
        <div ref={constraintsRef} style={{ width: 'fitContent' }}>
          <motion.div className="svg-cont">
            <motion.svg
              drag={'x'}
              dragConstraints={{ left: -width, right: 0 }}
              // dragConstraints={constraintsRef}
              // ref={constraintsRef}
              dragElastic={0.001}
              className="the-svg"
              xmlns="http://www.w3.org/2000/svg"
              width={String(width) + 'px'}
              height="500px"
              viewBox={`0 0 ${width + 1000} 500`}>
              <path stroke="#ff0000" d={`M0 300, ${width} 300`} />
              <path stroke="#df1bfd" d={`M0 350, ${width} 350`} />
              <path stroke="#00ffff" d={`M0 400, ${width} 400`} />
              <path stroke="#56FB08" d={`M0 450, ${width} 450`} />
              <path stroke="#ffff00" d={`M0 250, ${width} 250`} />
              <path stroke="#ff8400" d={`M0 200, ${width} 200`} />
              {/* {arrays.map(array => {
              return array.map((commit: string | number, indexY: number) => {
                return (
                  <BranchLine
                    key={colors[indexY] + indexY}
                    color={colors[indexY]}
                    width={width}
                    height={height - 50 * indexY}
                    pathVariants={pathVariants}
                  />
                );
              });
            })} */}

              {/* eslint-disable-next-line */}
              {arrays.map((array: any[], indexX: number) => {
                return (
                  array
                    .reverse()
                    //eslint-disable-next-line
                    .map((commit: any[] | number, indexY: number) => {
                      return (
                        typeof commit !== 'number' && (
                          <TimeliineDot
                            key={`${indexX}${indexY}`}
                            indexX={indexX}
                            indexY={indexY}
                            branchProps={branchProps}
                            branchesOrdered={branchesOrdered}
                            commit={commit[0]}
                            isMerge={commit[1]}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            setCurrentCommit={setCurrentCommit}
                          />
                        )
                      );
                    })
                );
              })}
            </motion.svg>
          </motion.div>
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}>
          {modalOpen && <Modal commit={currentCommit} handleClose={close} />}
        </AnimatePresence>
      </>
    )
  );
};
