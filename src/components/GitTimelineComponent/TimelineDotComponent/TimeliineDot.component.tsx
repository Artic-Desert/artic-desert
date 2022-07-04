import React from 'react';
import { motion } from 'framer-motion';

export const TimeliineDot: React.FC<{
  indexX: number;
  indexY: number;
  branchProps: { [key: string]: string };
  branchesOrdered: string[];
  commit: string | number;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentCommit: React.Dispatch<React.SetStateAction<string | number>>;
}> = ({
  indexX,
  indexY,
  branchProps,
  branchesOrdered,
  commit,
  modalOpen,
  setModalOpen,
  setCurrentCommit,
}) => {
  const close = () => {
    setCurrentCommit('');
    setModalOpen(false);
  };
  const open = () => {
    setCurrentCommit(commit);
    setModalOpen(true);
  };
  return (
    <>
      <motion.circle
        key={`${indexX}${indexY}`}
        onClick={() => {
          modalOpen ? close() : open();
        }}
        fill={branchProps[branchesOrdered[indexY]]}
        // stroke="#56FB08"+
        cx={indexX * 50}
        cy={String(400 - indexY * 50)}
        r="10"
      />
    </>
  );
};
