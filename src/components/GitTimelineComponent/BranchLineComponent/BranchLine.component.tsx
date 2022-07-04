import React from 'react';
import { motion } from 'framer-motion';

export const BranchLine: React.FC<{
  width: number;
  height: number;
  pathVariants: any;
  color: string;
}> = ({ width, pathVariants, height, color }) => {
  return (
    <>
      <motion.path
        stroke={color}
        d={`M0 ${height}, ${width} ${height}`}
        variants={pathVariants}
      />
    </>
  );
};
