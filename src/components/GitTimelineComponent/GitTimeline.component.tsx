import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
// import Modal from './ModalComponent/Modal.component';
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
  // const [modalOpen, setModalOpen] = useState(false);
  // const [currentCommit, setCurrentCommit] = useState<string | number>('');
  const [gitTimelineData, setGitTimelineData] = useState<any>([]); //eslint-disable-line
  const [arrays, setArrays] = useState<any>([]);
  const [branchesOrdered, setBranchesOrdered] = useState<string[]>([]);

  // const close = () => setModalOpen(false);
  const dispatch = useDispatch();

  const { repo } = useRepo();
  const { ghpToken } = useGhpToken();

  const getTimeLineData = async () => {
    ApiClientService.getTimelineData(repo, ghpToken).then(data => {
      setGitTimelineData(data), setBranchesOrdered(data[0]), setArrays(data[1]);
    });
  };

  useEffect(() => {
    getTimeLineData();
  }, []);

  useEffect(() => {
    dispatch(setBranches(branchesOrdered ? branchesOrdered : []));
  }, [branchesOrdered]);

  const colors = [
    '#ffab91',
    '#00ffff',
    '#e91e63',
    '#ab47bc',
    '#f48fb1',
    '#ff8400',
    '#6592b7',
    '#57a6ff',
  ];

  const branchProps: { [key: string]: string } = {};
  branchesOrdered &&
    branchesOrdered.forEach((branch: string, index: number) => {
      branchProps[branch] = colors[index];
    });

  // const constraintsRef = useRef(null);

  // const vh = Math.max(
  //   document.documentElement.clientHeight || 0,
  //   window.innerHeight || 0,
  // );

  // const distanceBetweenBranches = vh * 0.001;

  // const height = 50 * (arrays && arrays[0].length);
  const width = 50 * (arrays && arrays.length);
  const dataIsLoaded = gitTimelineData?.length && branchesOrdered && arrays;
  return (
    dataIsLoaded && (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: '10%',
            position: 'fixed',
          }}>
          <h1 style={{ color: 'white', fontSize: 50 }}>GIT COMMIT TIMELINE</h1>
          <h3 style={{ color: 'white' }}>
            White commits are where merges have occurred
          </h3>
          <h4 style={{ color: 'white' }}>
            Some other helpful text goes here...
          </h4>
        </div>
        {/* <div ref={constraintsRef} style={{ width: 'fitContent' }}> */}
        <motion.div className="svg-cont">
          <motion.svg
            // drag={'x'}
            dragConstraints={{ left: -width, right: 0 }}
            // dragConstraints={constraintsRef}
            // ref={constraintsRef}
            dragElastic={0.001}
            className="the-svg"
            xmlns="http://www.w3.org/2000/svg"
            width={String(width) + 'px'}
            // height={`${distanceBetweenBranches}`}
            // viewBox={`0 0 ${width} ${distanceBetweenBranches`}>
            height="500px"
            viewBox={`0 0 ${width} 500px`}>
            {/* <path
              stroke="#ffab91"
              d={`M0 ${10 * (distanceBetweenBranches ^ 8)}, ${width} ${
                10 * (distanceBetweenBranches ^ 8)
              }`}
            />
            <path
              stroke="#00ffff"
              d={`M0 ${10 * (distanceBetweenBranches ^ 7)}, ${width} ${
                10 * (distanceBetweenBranches ^ 7)
              }`}
            />
            <path
              stroke="#e910e63"
              d={`M0 ${10 * (distanceBetweenBranches ^ 6)}, ${width} ${
                10 * (distanceBetweenBranches ^ 6)
              }`}
            />
            <path
              stroke="#ab47bc"
              d={`M0 ${10 * (distanceBetweenBranches ^ 5)}, ${width} ${
                10 * (distanceBetweenBranches ^ 5)
              }`}
            />
            <path
              stroke="#f48fb10"
              d={`M0 ${10 * (distanceBetweenBranches ^ 4)}, ${width} ${
                10 * (distanceBetweenBranches ^ 4)
              }`}
            />
            <path
              stroke="#ff8400"
              d={`M0 ${10 * (distanceBetweenBranches ^ 3)}, ${width} ${
                10 * (distanceBetweenBranches ^ 3)
              }`}
            />
            <path
              stroke="#6592b7"
              d={`M0 ${10 * (distanceBetweenBranches ^ 2)}, ${width} ${
                10 * (distanceBetweenBranches ^ 2)
              }`}
            />
            <path
              stroke="#57a6ff"
              d={`M0 ${10 * (distanceBetweenBranches ^ 1)}, ${width} ${
                10 * (distanceBetweenBranches ^ 1)
              }`}
            /> */}
            <path stroke="#ffab91" d={`M0 450, ${width} 450`} />
            <path stroke="#00ffff" d={`M0 400, ${width} 400`} />
            <path stroke="#e91e63" d={`M0 350, ${width} 350`} />
            <path stroke="#ab47bc" d={`M0 300, ${width} 300`} />
            <path stroke="#f48fb1" d={`M0 250, ${width} 250`} />
            <path stroke="#ff8400" d={`M0 200, ${width} 200`} />
            <path stroke="#6592b7" d={`M0 150, ${width} 150`} />
            <path stroke="#57a6ff" d={`M0 100, ${width} 100`} />
            {/* eslint-disable-next-line */}
            {console.log('HEY THERE IM INSIDE ARRAYS.MAP:', Math.random())};
            {arrays.map((array: any[], indexX: number) => {
              return array.map((commit: any[] | number, indexY: number) => {
                //eslint-disable-next-line
                return (
                  typeof commit !== 'number' && (
                    <TimeliineDot
                      key={`${indexX}${indexY}`}
                      indexX={indexX}
                      indexY={Math.abs(indexY - array.length + 1)}
                      branchProps={branchProps}
                      branchesOrdered={branchesOrdered}
                      commit={commit[0]}
                      isMerge={commit[1]}
                    />
                  )
                );
              });
            })}
          </motion.svg>
        </motion.div>
        {/* </div> */}
        {/* <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}>
          {modalOpen && <Modal commit={currentCommit} handleClose={close} />}
        </AnimatePresence> */}
      </>
    )
  );
};
