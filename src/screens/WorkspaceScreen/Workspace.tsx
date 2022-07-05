import React, { useEffect, useState } from 'react';
import Pane from 'react-split-pane';
import { GitTimeline } from '../../components/GitTimelineComponent/GitTimeline.component';
import { Header } from '../../components/KanbanBoardComponent/HeaderComponent/Header.component';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import { ShowChatButton } from '../../components/ShowChatButtonComponent/ShowChatButton.component';
import { TbArrowBarUp, TbArrowBarDown } from 'react-icons/tb';

import './Workspace.css';
import { useBranches } from '../../hooks/use-branches';

const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

export const Workspace: React.FC = () => {
  const [kanbanSize, setKanbanSize] = useState(vh * 0.9);
  const [flipArrow, setFlipArrow] = useState(false);
  const { branches } = useBranches();

  const colors = [
    '#56FB08',
    '#00ffff',
    '#df1bfd',
    '#ff0000',
    '#ffff00',
    '#ff8400',
  ];

  const onClick = () => {
    if (kanbanSize <= 85) {
      setKanbanSize(vh * 0.9);
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
        maxSize={vh * 0.9}
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
            {branches && (
              <div className="label-container">
                {branches.map((branch: string, index: number) => {
                  return (
                    <h3
                      key={branch}
                      className="branch"
                      style={{ color: colors[branches.length - 1 - index] }}>
                      <em>{branch}</em>
                    </h3>
                  );
                })}
              </div>
            )}
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
