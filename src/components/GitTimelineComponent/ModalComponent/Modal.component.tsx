import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Backdrop from '../BackdropComponent/Backdrop.component';
import './Modal.css';
import { GithubRepo } from '../../../types/Types';

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

const Modal: React.FC<{
  handleClose: () => void;
  text?: string;
  repo?: GithubRepo;
  modalOpen: boolean;
  //eslint-disable-next-line
}> = ({ handleClose, text, modalOpen, repo }) => {
  console.log('MODAL FOR REPO!!!!!!! ', repo);

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
        onClick={e => e.stopPropagation()}></motion.div>
    </Backdrop>
  );
};

export default Modal;
