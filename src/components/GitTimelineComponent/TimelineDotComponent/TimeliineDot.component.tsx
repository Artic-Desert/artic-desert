import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../ModalComponent/Modal.component';

export const TimeliineDot: React.FC<{
  indexX: number;
  indexY: number;
  branchProps: any;
  branchesOrdered: any;
  commit: any;
  modalOpen: any;
  setModalOpen: any;
  setCurrentCommit: any;
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
  // const [modalOpen, setModalOpen] = useState(false);
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
        stroke="#56FB08"
        cx={indexX * 50}
        cy={String(550 - indexY * 50)}
        r="10"
      />
    </>
  );
};
