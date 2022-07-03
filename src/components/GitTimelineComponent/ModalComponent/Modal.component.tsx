import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../BackdropComponent/Backdrop.component';
import './Modal.css';
import { GithubRepo } from '../../../types/Types';
import { useRepo } from '../../../hooks/use-repo';

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

  const [commitInfo, setCommitInfo] = useState('');

  const fetchCommitUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits/${commit}`;

  useEffect(() => {
    // console.log(fetchCommitUrl);
    !repoPreview &&
      fetch(fetchCommitUrl, {
        headers: { Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}` },
      })
        .then(res => res.json())
        .then(data => setCommitInfo(data));
  }, []);

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
            <h1>{repoPreview.name}</h1>
            <p>{repoPreview.default_branch}</p>
            <p>{repoPreview.owner.login}</p>
            {/* <img src={repoPreview.owner.avatar_url} alt="" /> */}
            <p>{repoPreview.watchers}</p>
            <p>{repoPreview.updated_at}</p>
            <p>{repoPreview.clone_url}</p>
          </div>
        </motion.div>
      </Backdrop>
    </>
  ) : (
    <Backdrop onClick={handleClose}>
      <motion.div
        variants={dropIn}
        className="modal background"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}>
        <p style={{ color: 'white' }}>commit: {JSON.stringify(commitInfo)}</p>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
