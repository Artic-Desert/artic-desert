import React from 'react';
import { motion } from 'framer-motion';
import './TimelineDot.css';
import { useDispatch } from 'react-redux';
import { setCommitModal } from '../../../redux/commitModal/actions';
export const TimeliineDot: React.FC<{
  indexX: number;
  indexY: number;
  branchProps: { [key: string]: string };
  branchesOrdered: string[];
  commit: string;
  isMerge: boolean;
  height: number;
}> = ({
  indexX,
  indexY,
  branchProps,
  branchesOrdered,
  commit,
  isMerge,
  height,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <motion.circle
        className={isMerge ? 'merge-commit-circle' : 'commit-circle'}
        key={`${indexX}${indexY}`}
        onClick={() => {
          dispatch(setCommitModal(commit));
        }}
        fill={isMerge ? '#0e1117' : branchProps[branchesOrdered[indexY]]}
        stroke={isMerge ? '#3aa945' : branchProps[branchesOrdered[indexY]]}
        strokeWidth={isMerge ? '2' : '1'}
        // stroke-dasharray={isMerge ? '4 9' : '0'}
        // stroke-dasharray={isMerge ? '4' : '0'}
        cx={indexX * 50}
        cy={String(height - indexY * 50)}
        r="15"
      />
    </>
  );
};
