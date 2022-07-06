import React, { useEffect, useState } from 'react';
import Pane from 'react-split-pane';
import { GitTimeline } from '../../components/GitTimelineComponent/GitTimeline.component';
import { Header } from '../../components/KanbanBoardComponent/HeaderComponent/Header.component';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import { ShowChatButton } from '../../components/ShowChatButtonComponent/ShowChatButton.component';
import { CurrentRepoInfo } from '../../components/CurrentRepoInfoComponent/CurrentRepoInfo.component';
import { BsArrowUpSquare, BsArrowDownSquare } from 'react-icons/bs';
import { useBranches } from '../../hooks/use-branches';
import { CommitModal } from '../../components/CustomModalsComponents/CommitModal.component';
import { colors } from '../../shared/GitTimelineColors';
import './Workspace.css';

const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

export const Workspace: React.FC = () => {
  const [kanbanSize, setKanbanSize] = useState(vh * 0.875);
  const [flipArrow, setFlipArrow] = useState(false);
  const { branches } = useBranches();
  const [gitTimelineLoaded, setGitTimelineLoaded] = useState(false);

  const onClick = () => {
    if (kanbanSize <= 115) {
      setKanbanSize(vh * 0.875);
    } else {
      setKanbanSize(115);
    }
  };

  useEffect(() => {
    if (kanbanSize > 115) {
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
        minSize={115}
        maxSize={vh * 0.875}
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
              <BsArrowUpSquare
                title="Shrink Kanban"
                className="shrink-icon"
                size={25}
                color="rgba(215, 215, 215, 0.800)"
                onClick={onClick}
              />
            ) : (
              <BsArrowDownSquare
                title="Expand Kanban"
                className="expand-icon"
                size={25}
                color="rgba(215, 215, 215, 0.800)"
                onClick={onClick}
              />
            )}
          </div>
          <CurrentRepoInfo />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div style={{ width: '50%' }}>
              <h1 style={{ color: 'white', textAlign: 'center' }}>
                GIT TIMELINE
              </h1>
              <p
                style={{
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: 20,
                }}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using{' '}
              </p>
            </div>
            <div className="label-timeline-container">
              {branches && gitTimelineLoaded && (
                <div className="label-container">
                  {branches.map((branch: string, index: number) => {
                    return (
                      <h3
                        key={branch}
                        className="branch"
                        style={{ color: colors[branches.length - 1 - index] }}>
                        {branch}
                      </h3>
                    );
                  })}
                </div>
              )}
              <div className="timeline-svg-container">
                <GitTimeline setGitTimelineLoaded={setGitTimelineLoaded} />
              </div>
            </div>
          </div>

          <ShowChatButton />
          <CommitModal />
        </div>
      </Pane>
    </div>
  );
};
