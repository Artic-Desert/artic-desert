import React from 'react';
import { motion } from 'framer-motion';

export const TimeliineDot: React.FC<{
  indexX: number;
  indexY: number;
  branchProps: any;
  branchesOrdered: any;
}> = ({ indexX, indexY, branchProps, branchesOrdered }) => {
  return (
    <motion.circle
      key={`${indexX}${indexY}`}
      // onClick={() => (modalOpen ? close() : open())}
      fill={branchProps[branchesOrdered[indexY]]}
      stroke="#56FB08"
      cx={indexX * 50}
      cy={String(550 - indexY * 50)}
      r="10"
    />
  );
};
