import React, { useEffect, useState } from 'react';
import Pane from 'react-split-pane';
import { GitTimeline } from '../../components/GitTimelineComponent/GitTimeline.component';
import { Header } from '../../components/KanbanBoardComponent/HeaderComponent/Header.component';
import { KanbanBoard } from '../../components/KanbanBoardComponent/KanbanBoard.component';
import { ShowChatButton } from '../../components/ShowChatButtonComponent/ShowChatButton.component';
import { CurrentRepoInfo } from '../../components/CurrentRepoInfoComponent/CurrentRepoInfo.component';
import { BsArrowUpSquare, BsArrowDownSquare } from 'react-icons/bs';
import tutorialArrow from '../../assets/tutorial-arrow3.svg';
import scrollArrow from '../../assets/tutorial-scroll2.svg';
import clickArrow from '../../assets/tutorial-click2.svg';
import './Workspace.css';
import { useBranches } from '../../hooks/use-branches';
import { CommitModal } from '../../components/CustomModalsComponents/CommitModal.component';
import { useDispatch } from 'react-redux';

const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

export const Workspace: React.FC = () => {
  const [kanbanSize, setKanbanSize] = useState(vh * 0.875);
  const [flipArrow, setFlipArrow] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [buttonDissapear, setButtonDissapear] = useState(false);
  const { branches } = useBranches();

  const toggleTutorial = () => setShowTutorial(!showTutorial);
  const dragStartToggle = () => {
    setShowTutorial(false);
    setButtonDissapear(true);
  };
  const colors = [
    '#ffab91',
    '#00ffff',
    '#e91e63',
    '#ab47bc',
    '#f48fb1',
    '#ff8400',
    '#6592b7',
    '#57a6ff',
    '#ffab91',
    '#00ffff',
    '#e91e63',
    '#ab47bc',
    '#f48fb1',
    '#ff8400',
    '#6592b7',
    '#57a6ff',
  ];

  const onClick = () => {
    if (kanbanSize <= 115) {
      setKanbanSize(vh * 0.9);
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
            <div className="tutorial-box">
              <div className="click-tutorial" data-showTutorial={showTutorial}>
                <span>The first node represents the latest commit</span>
                <div className="clickarrow-cont">
                  <img src={clickArrow} alt="" />
                  <img src={clickArrow} alt="" />
                </div>
              </div>
              <div className="click-tutorial" data-showTutorial={showTutorial}>
                <span>These nodes represent merges</span>
                <div className="tutorial-svg">
                  <svg height="50" width="50">
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      stroke="#3aa945"
                      strokeWidth="2"
                      fill="#0e1117"
                    />
                  </svg>
                </div>
              </div>
              <div className="scroll-tutorial" data-showTutorial={showTutorial}>
                <span>Scroll right to view earlier commit history</span>
                <div className="scroll-arrow-cont">
                  <img src={scrollArrow} alt="" />
                  <img src={scrollArrow} alt="" />
                  <img src={scrollArrow} alt="" />
                  <img src={scrollArrow} alt="" />
                  <img src={scrollArrow} alt="" />
                </div>
              </div>
              <div
                className="tutorial-button"
                data-buttonDissapear={buttonDissapear}>
                <button onClick={toggleTutorial}>
                  {!showTutorial ? `Show me how it works ` : `Ok got it!`}
                </button>
              </div>
              {/* <div className="branch-tutorial">
                <span>
                  This sidebar displays all the branches in the repository
                </span>
                <img src={tutorialArrow} alt="" />
              </div> */}
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
                        {branch}
                      </h3>
                    );
                  })}
                </div>
              )}
              <div
                className="timeline-svg-container"
                onScroll={dragStartToggle}>
                <GitTimeline setGitTimelineLoaded={setGitTimeline} />
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
