import { motion, useMotionValue } from 'framer-motion';
import React, { useState } from 'react';
import { Chat } from '../ChatComponent/Chat.component';
import { MdOutlineDragIndicator } from 'react-icons/md';

import './ResizableChat.css';

export const ResizableChat: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );

  const mHeight = useMotionValue(vh * 0.35);
  const mWidth = useMotionValue(0);

  const handleDrag = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
      mWidth.set(mWidth.get() - info.delta.x);
      mHeight.set(mHeight.get() + info.delta.y);
      // }
    },
    [],
  );

  return (
    <div>
      <motion.div
        className="resizable-div"
        animate={{
          width: [0, vw * 0.5, vw * 0.5 * 0.9],
          position: 'relative',
          transitionEnd: {
            display: 'flex',
          },
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 5,
        }}
        style={{
          height: mHeight,
          width: mWidth,
          cursor: isDragging ? 'row-resize' : '',
        }}
        onDoubleClick={() => {
          console.log('Dbl click');
          mWidth.set(500);
          mHeight.set(500);
        }}>
        <Chat />
        <motion.div
          className="dragger"
          drag="x"
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={() => {
            setIsDragging(false);
          }}
          onDragStart={() => {
            setIsDragging(true);
          }}>
          <MdOutlineDragIndicator
            className="chat-dragger"
            size={40}
            color="#00111c"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
