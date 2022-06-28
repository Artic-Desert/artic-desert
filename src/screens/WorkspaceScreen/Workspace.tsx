import React from 'react';
import SplitPane from 'react-split-pane';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import './Workspace.css';

export const Workspace: React.FC = () => {
  return (
    <div className="wrapper">
      {/* eslint-disable-next-line  */}
      {/* @ts-ignore */}
      <SplitPane split="horizontal">
        <div className="kanban">
          <div className="kanban-header">
            <div className="left">
              <div className="branch-name">Master</div>
              <div className="collaborators">AVATAR</div>
            </div>
            <div className="right">
              <div className="user-info">Hello, Andres AVATAR</div>
            </div>
          </div>
          <div className="kanban-board">
            <KanbanBoard />
          </div>
        </div>
        <div className="timeline"></div>
      </SplitPane>
    </div>
  );
};
