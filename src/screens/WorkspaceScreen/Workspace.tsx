import React, { useEffect, useState } from 'react';
import Pane from 'react-split-pane';
import { GitTimeline } from '../../components/GitTimelineComponent/GitTimeline.component';
import { Header } from '../../components/KanbanBoardComponent/HeaderComponent/Header.component';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import { ShowChatButton } from '../../components/ShowChatButtonComponent/ShowChatButton.component';
import { TbArrowBarUp, TbArrowBarDown } from 'react-icons/tb';

import './Workspace.css';

const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

export const Workspace: React.FC = () => {
  const [kanbanSize, setKanbanSize] = useState(vh * 0.95);
  const [flipArrow, setFlipArrow] = useState(false);

  const onClick = () => {
    if (kanbanSize <= 85) {
      setKanbanSize(vh * 0.95);
    } else {
      setKanbanSize(85);
    }
  };

  useEffect(() => {
    if (kanbanSize > 85) {
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
        maxSize={vh * 0.95}
        size={kanbanSize}
        onDragFinished={e => {
          setKanbanSize(e);
        }}>
        <div className="kanban">
          <Header />
          <KanbanBoard />
        </div>
        <div className="timeline">
          <div
            className="expand-icon-div"
            draggable={true}
            onDrag={e => {
              setKanbanSize(e.clientY);
            }}
            onDragEnd={e => {
              setKanbanSize(e.clientY);
            }}>
            {flipArrow ? (
              <TbArrowBarUp
                title="Shrink Kanban"
                className="shrink-icon"
                size={30}
                color="lightgrey"
                onClick={onClick}
              />
            ) : (
              <TbArrowBarDown
                title="Expand Kanban"
                className="expand-icon"
                size={30}
                color="lightgrey"
                onClick={onClick}
              />
            )}
          </div>
          <div className="label-timeline-container">
            <div className="label-container">
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
              <h3 className="branch-label">branch name goes here</h3>
            </div>
            <div className="timeline-svg-container">
              <GitTimeline />
            </div>
          </div>
          <ShowChatButton />
        </div>
      </Pane>
    </div>
  );
};
