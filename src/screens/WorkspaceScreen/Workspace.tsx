import React, { useEffect, useState } from 'react';
import Pane from 'react-split-pane';
import { GitTimeline } from '../../components/GitTimelineComponent/GitTimeline.component';
import { Header } from '../../components/KanbanBoardComponent/HeaderComponent/Header.component';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import { ShowChatButton } from '../../components/ShowChatButton/ShowChatButton.component';
import { BsArrowBarDown } from 'react-icons/bs';
import { BsArrowBarUp } from 'react-icons/bs';

import './Workspace.css';

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

export const Workspace: React.FC = () => {
  const [kanbanSize, setKanbanSize] = useState(85);
  const [flipArrow, setFlipArrow] = useState(false);

  const onClick = () => setKanbanSize(500);

  useEffect(() => {
    if (kanbanSize > 500) {
      setFlipArrow(true);
    } else {
      setFlipArrow(false);
    }
  }, [kanbanSize]);

  return (
    <div className="wrapper">
      {/* eslint-disable-next-line  */}
      {/* @ts-ignore */}
      <Pane
        split="horizontal"
        minSize={85}
        maxSize={vh * 0.75}
        size={kanbanSize}
        onDragFinished={e => {
          setKanbanSize(e);
        }}>
        <div className="kanban">
          <Header />
          <KanbanBoard />
          <ShowChatButton />
        </div>
        <div className="timeline">
          <div
            className="expand-icon-div"
            // draggable={true}
            // onDrag={e => {
            //   setKanbanSize(e.clientY);
            // }}
            // onDragEnd={e => {
            //   setKanbanSize(e.clientY);
            // }}
          >
            {flipArrow ? (
              <BsArrowBarUp
                title="Shrink Kanban"
                className="shrink-icon"
                size={30}
                color="lightgrey"
                onClick={onClick}
              />
            ) : (
              <BsArrowBarDown
                title="Expand Kanban"
                size={30}
                color="lightgrey"
                onClick={onClick}
              />
            )}
          </div>
          <GitTimeline />
        </div>
      </Pane>
    </div>
  );
};
