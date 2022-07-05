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
  modalOpen?: boolean;
  setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCommit?: React.Dispatch<React.SetStateAction<string | number>>;
}> = ({
  indexX,
  indexY,
  branchProps,
  branchesOrdered,
  commit,
  isMerge,
  modalOpen,
  setModalOpen,
  setCurrentCommit,
}) => {
  const close = () => {
    setCurrentCommit && setCurrentCommit('');
    setModalOpen && setModalOpen(false);
  };
  const open = () => {
    setCurrentCommit && setCurrentCommit(commit);
    setModalOpen && setModalOpen(true);
  };

  const dispatch = useDispatch();
  return (
    <>
      {/* <div className="commit-circle"> */}
      {/* <motion.svg > */}
      <motion.circle
        className="commit-circle"
        key={`${indexX}${indexY}`}
        onClick={() => {
          // modalOpen ? close() : open();
          dispatch(setCommitModal(commit));
        }}
        fill={isMerge ? '#ffffff' : branchProps[branchesOrdered[indexY]]}
        // stroke="#56FB08"+
        cx={indexX * 50}
        cy={String(450 - indexY * 50)}
        r="10"
      />
      {/* </motion.svg> */}
      {/* </div> */}
    </>
  );
};
