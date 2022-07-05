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
}> = ({ indexX, indexY, branchProps, branchesOrdered, commit, isMerge }) => {
  const dispatch = useDispatch();
  console.log('INDEX OF DOT:', indexY);
  return (
    <>
      <motion.circle
        className="commit-circle"
        key={`${indexX}${indexY}`}
        onClick={() => {
          dispatch(setCommitModal(commit));
        }}
        fill={isMerge ? '#ffffff' : branchProps[branchesOrdered[indexY]]}
        cx={indexX * 50}
        cy={String(450 - indexY * 50)}
        r="15"
      />
    </>
  );
};
