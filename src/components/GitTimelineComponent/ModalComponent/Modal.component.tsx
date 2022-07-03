import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../BackdropComponent/Backdrop.component';
import './Modal.css';
import { GithubCommit, GithubRepo } from '../../../types/Types';
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

<<<<<<< HEAD
  const [commitInfo, setCommitInfo] = useState<GithubCommit>();

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

  return repoPreview ? (
=======
  const [repoLang, setRepoLang] = useState<any>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${repo?.owner.login}/${repo?.name}/languages`,
      {
        method: 'GET',
        headers: {
          Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}`,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setRepoLang(data);
      });
  }, []);

  return repo ? (
>>>>>>> andres
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
<<<<<<< HEAD
            <h1>{repoPreview.name}</h1>
            <p>{repoPreview.default_branch}</p>
            <p>{repoPreview.owner.login}</p>
            {/* <img src={repoPreview.owner.avatar_url} alt="" /> */}
            <p>{repoPreview.watchers}</p>
            <p>{repoPreview.updated_at}</p>
            <p>{repoPreview.clone_url}</p>
=======
            <div className="name-visibility">
              <h1 className="modal-repo-name">{repo.name}</h1>
              <p className="modal-repo-visibility">{repo.visibility}</p>
            </div>
            <p className="modal-repo-owner">Owner: {repo.owner.login}</p>
            <p className="modal-repo-default">
              Default Branch: {repo.default_branch}
            </p>
            {/* <img src={repo.owner.avatar_url} alt="" /> */}
            <p>{repo.watchers}</p>
            <p>{repo.updated_at}</p>
            <p>{repo.clone_url}</p>
            <p>{repo.size}</p>
            <p>{repo.stargazers_count}</p>
            {/* {repoLang
              ? repoLang.map((lang: any) => {
                  return <h1 key={lang.CSS}></h1>;
                })
              : null} */}
            <div>{repoLang?.CSS}</div>
            <div>{repoLang?.HTML}</div>
            <div>{repoLang?.JavaScript}</div>
            <div>{repoLang?.TypeScript}</div>
>>>>>>> andres
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
