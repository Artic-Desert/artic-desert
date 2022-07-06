import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import './GitTimeline.css';
import { TimeliineDot } from './TimelineDotComponent/TimeliineDot.component';
import { useRepo } from '../../hooks/use-repo';
import { useDispatch } from 'react-redux';
import { setBranches } from '../../redux/branches/actions';
import { ApiClientService } from '../../services/ApiClientService';
import { useGhpToken } from '../../hooks/use-ghpToken';

export const GitTimeline: React.FC = () => {
  const [gitTimelineData, setGitTimelineData] = useState<any>([]); //eslint-disable-line
  const [arrays, setArrays] = useState<any>([]);
  const [branchesOrdered, setBranchesOrdered] = useState<string[]>([]);
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

  useEffect(() => {
    console.log('Arrays inside gittimeline:', arrays[0]);
  }, [arrays?.length]);
  const height = 50 * (arrays && arrays[0]?.length);
  const width = 50 * (arrays && arrays?.length);
  const dataIsLoaded = gitTimelineData?.length && branchesOrdered && arrays;
  return (
    dataIsLoaded && (
      <>
        <motion.div className="svg-cont">
          <motion.svg
            dragConstraints={{ left: -width, right: 0 }}
            // dragConstraints={constraintsRef}
            // ref={constraintsRef}
            dragElastic={0.001}
            className="the-svg"
            xmlns="http://www.w3.org/2000/svg"
            width={String(width + 25) + 'px'}
            height={`${height + 25}px`}
            viewBox={`0 0 ${width}px ${height}px`}>
            {arrays?.length &&
              arrays[0].map((color: any, index: number) => {
                return (
                  <path
                    key={color}
                    stroke={colors[index]}
                    d={`M10 ${height - 50 * index}, ${width} ${
                      height - 50 * index
                    }`}
                  />
                );
              })}

            {/* {console.log('HEY THERE IM INSIDE ARRAYS.MAP:', Math.random())}; */}
            {/* eslint-disable-next-line */}
            {arrays.map((array: any[], indexX: number) => {
              return array.map((commit: any[] | number, indexY: number) => {
                return (
                  typeof commit !== 'number' && (
                    <TimeliineDot
                      key={`${indexX}${indexY}`}
                      indexX={indexX + 0.5}
                      indexY={Math.abs(indexY - array.length + 1)}
                      branchProps={branchProps}
                      branchesOrdered={branchesOrdered}
                      commit={commit[0]}
                      isMerge={commit[1]}
                      height={height}
                    />
                  )
                );
              });
            })}
          </motion.svg>
        </motion.div>
      </>
    )
  );
};
