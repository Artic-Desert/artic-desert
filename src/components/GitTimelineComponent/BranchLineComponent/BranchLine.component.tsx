import React from 'react';
import { motion } from 'framer-motion';

export const BranchLine: React.FC<{
  width: number;
  height: number;
  //eslint-disable-next-line
  pathVariants: any;
  color: string;
}> = ({ width, pathVariants, height, color }) => {
  return (
    <>
      <motion.path
        stroke={color}
        d={`M0 ${height - 50}, ${width} ${height - 50}`}
        variants={pathVariants}
      />
    </>
  );
};
