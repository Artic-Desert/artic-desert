import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoGitBranch } from 'react-icons/go';
import { AiFillCopy } from 'react-icons/ai';

import Backdrop from '../BackdropComponent/Backdrop.component';
import { GithubCommit, GithubRepo } from '../../../types/Types';
import { useRepo } from '../../../hooks/use-repo';
import './Modal.css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
    transition: {
      duration: 1,
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
};

export const Modal: React.FC<{
  handleClose: () => void;
  text?: string;
  repoPreview?: GithubRepo;
  modalOpen: boolean;
  commit?: string;
  //eslint-disable-next-line
}> = ({ handleClose, text, modalOpen, repoPreview, commit }) => {
  const { repo } = useRepo();
  console.log('MODAL FOR REPO!!!!!!! ', repoPreview);

  const [commitInfo, setCommitInfo] = useState<GithubCommit>();
  const [copyText, setCopyText] = useState('');

  const inputHandler = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCopyText(e.target.value);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(copyText);
    alert('Link copied to clipboard!');
  };

  const fetchCommitUrl = !repoPreview
    ? `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits/${commit}`
    : undefined;

  useEffect(() => {
    // console.log(fetchCommitUrl);
    fetchCommitUrl &&
      fetch(fetchCommitUrl, {
        headers: { Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}` },
      })
        .then(res => res.json())
        .then(data => setCommitInfo(data));
  }, []);

  console.log('THIS', repoPreview);

  return repoPreview ? (
    <>
      <Backdrop onClick={handleClose}>
        <motion.div
          variants={dropIn}
          className="modal background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <div className="preview-modal-wrapper">
            <div className="name-visibility">
              <h1 className="modal-repo-name">{repoPreview.name}</h1>
              <p className="modal-repo-visibility">{repoPreview.visibility}</p>
            </div>
            <div className="column-containers">
              <div className="preview-left-col">
                <div className="preview-owner-container">
                  <img src={repoPreview.owner.avatar_url} alt="" />
                  <p className="preview-owner">{repoPreview.owner.login}</p>
                </div>
                <div className="preview-created-container">
                  <p className="preview-created">
                    Repo created at • <span>{repoPreview.created_at}</span>
                  </p>
                  <p className="preview-created">
                    {' '}
                    Last updated • <span>{repoPreview.updated_at}</span>
                  </p>
                  <p className="default-branch">
                    {' '}
                    Default branch • <GoGitBranch
                      size={20}
                      color="#c8d1d9"
                    />{' '}
                    <span>{repoPreview.default_branch}</span>
                  </p>
                </div>
                <div className="copy-clip">
                  <input
                    type="text"
                    value={repoPreview.clone_url}
                    onChange={inputHandler}
                  />
                  <AiFillCopy className="copy-icon" onClick={copy} size={35} />
                </div>
              </div>
              <div className="preview-right-col">
                <p>{repoPreview.watchers}</p>
                <p>{repoPreview.size}</p>
                <p>{repoPreview.stargazers_count}</p>
                <p>{repoPreview.size}</p>
                <p>{repoPreview.forks}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </>
  ) : (
    <Backdrop onClick={handleClose}>
      {commitInfo && (
        <motion.div
          variants={dropIn}
          className="modal background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <p style={{ color: 'white' }}>commit: {commitInfo.sha}</p>
          <p style={{ color: 'white' }}>Message: {commitInfo.commit.message}</p>
          <p style={{ color: 'white' }}>
            Author: {commitInfo.commit.author.name}
          </p>
          <p style={{ color: 'white' }}>
            Files Changed: {commitInfo.files.length}
          </p>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
