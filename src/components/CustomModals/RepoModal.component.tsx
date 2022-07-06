import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoGitBranch, GoRepoForked } from 'react-icons/go';
import { AiFillCopy, AiOutlineStar } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdOutlineMemory, MdArrowForwardIos } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Backdrop from '../BackdropComponent/Backdrop.component';
import { GithubRepo } from '../../types/Types';
import { useRepo } from '../../hooks/use-repo';
import { setRepo } from '../../redux/repo/actions';
import { setBranch } from '../../redux/branch/actions';
import moment from 'moment';
import './RepoModal.css';
import { useRepoModal } from '../../hooks/use-repo-modal';
import { setRepoModal } from '../../redux/repoModal/actions';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '-7vh',
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

export const RepoModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const { repo } = useRepo();
  const { repoModal } = useRepoModal();

  const copy = async () => {
    setCopiedToClipboard(true);
    repo && (await navigator.clipboard.writeText(repo.clone_url));
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  const handleClose = () => {
    dispatch(setRepoModal(''));
  };

  const handleNavigation = (repo: GithubRepo) => {
    dispatch(setRepo(repo));
    dispatch(setBranch('workspace')); // this should be dynamic or checked for the first branch of the repo
    navigate('/workspace', { state: { repo } });
  };

  return (
    repoModal && (
      <Backdrop onClick={handleClose}>
        <motion.div
          variants={dropIn}
          className="repo-modal background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <div className="repo-modal">
            <div className="name-visibility">
              <h1
                className="repo-modal-repo-name"
                onClick={() => {
                  dispatch(setRepoModal(''));
                  handleNavigation(repo);
                }}>
                {repo.name}
              </h1>

              <p className="modal-repo-visibility">{repo.visibility}</p>
            </div>
            <div className="column-containers">
              <div className="preview-left-col">
                <div className="preview-owner-container">
                  <img src={repo.owner.avatar_url} alt="" />
                  <p className="preview-owner">{repo.owner.login}</p>
                </div>
                <div className="preview-created-container">
                  <p className="preview-created">
                    Repo created at •{' '}
                    <span>
                      {moment(new Date(repo.created_at)).format(
                        'DD/MMM/YYYY HH:MM',
                      )}
                    </span>
                  </p>
                  <p className="preview-created">
                    {' '}
                    Last updated •{' '}
                    <span>{moment(new Date(repo.updated_at)).fromNow()}</span>
                  </p>
                  <p className="default-branch">
                    {' '}
                    Default branch •{' '}
                    <GoGitBranch
                      className="all-modal-icons"
                      size={20}
                      color="#c8d1d9"
                    />{' '}
                    <span>{repo.default_branch}</span>
                  </p>
                </div>
                <p className="preview-cloneurl">Clone URL</p>
                <div className="copy-clip">
                  <input
                    type="text"
                    value={repo.clone_url}
                    contentEditable={false}
                    readOnly={true}
                  />

                  <AiFillCopy className="copy-icon" onClick={copy} size={35} />
                </div>
                {copiedToClipboard && (
                  <div className="copied-to-clipboard-alert">
                    Copied to clipboard
                  </div>
                )}
              </div>
              <div className="preview-right-col">
                <p className="repo-stats-title">Repo Stats</p>
                <div className="repo-stats-container">
                  <p>
                    Watchers •{' '}
                    <span>
                      {' '}
                      <BsFillEyeFill className="all-modal-icons" />{' '}
                      {repo.watchers}{' '}
                    </span>
                  </p>
                  <p>
                    Size •{' '}
                    <span>
                      {' '}
                      <MdOutlineMemory className="all-modal-icons" />{' '}
                      {repo.size}
                      {' KB'}
                    </span>
                  </p>
                  <p>
                    Stars •{' '}
                    <span>
                      {' '}
                      <AiOutlineStar className="all-modal-icons" />{' '}
                    </span>
                    {repo.stargazers_count}
                  </p>
                  <p>
                    Forked •{' '}
                    <span>
                      {' '}
                      <GoRepoForked className="all-modal-icons" /> {repo.forks}{' '}
                      times{' '}
                    </span>
                  </p>
                </div>
                <button
                  className="go-to-workspace"
                  onClick={() => {
                    dispatch(setRepoModal(''));
                    handleNavigation(repo);
                  }}>
                  <span>Go to workspace </span>
                  <MdArrowForwardIos />
                </button>
              </div>
            </div>
            <RiCloseFill
              onClick={handleClose}
              className="close-repo-modal-icon"
            />
          </div>
        </motion.div>
      </Backdrop>
    )
  );
};
