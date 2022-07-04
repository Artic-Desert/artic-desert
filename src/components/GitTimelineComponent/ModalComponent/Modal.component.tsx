import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoGitBranch, GoRepoForked } from 'react-icons/go';
import { AiFillCopy, AiOutlineStar } from 'react-icons/ai';
import { BsFillEyeFill, BsArrowBarRight } from 'react-icons/bs';
import { MdOutlineMemory, MdArrowForwardIos } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Backdrop from '../BackdropComponent/Backdrop.component';
import { GithubCommit, GithubRepo } from '../../../types/Types';
import { useRepo } from '../../../hooks/use-repo';
import { setRepo } from '../../../redux/repo/actions';
import { setBranch } from '../../../redux/branch/actions';
import moment from 'moment';
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
  commit?: string | number;
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (repo: GithubRepo) => {
    dispatch(setRepo(repo));
    dispatch(setBranch('repo-board')); // this should be dynamic or checked for the first branch of the repo
    navigate('/workspace', { state: { repo } });
  };

  console.log('THIS', commitInfo);

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
                    Repo created at •{' '}
                    <span>
                      {moment(new Date(repoPreview.created_at)).format(
                        'DD/MMM/YYYY HH:MM',
                      )}
                    </span>
                  </p>
                  <p className="preview-created">
                    {' '}
                    Last updated •{' '}
                    <span>
                      {moment(new Date(repoPreview.updated_at)).fromNow()}
                    </span>
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
                <p className="preview-cloneurl">Clone URL</p>
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
                <p className="repo-stats-title">Repo Stats</p>
                <div className="repo-stats-container">
                  <p>
                    Watchers •{' '}
                    <span>
                      {' '}
                      <BsFillEyeFill /> {repoPreview.watchers}{' '}
                    </span>
                  </p>
                  <p>
                    Size •{' '}
                    <span>
                      {' '}
                      <MdOutlineMemory /> {repoPreview.size}{' '}
                    </span>
                  </p>
                  <p>
                    Stars •{' '}
                    <span>
                      {' '}
                      <AiOutlineStar />{' '}
                    </span>
                    {repoPreview.stargazers_count}
                  </p>
                  <p>
                    Forked •{' '}
                    <span>
                      {' '}
                      <GoRepoForked /> {repoPreview.forks} times{' '}
                    </span>
                  </p>
                </div>
                <button
                  className="go-to-workspace"
                  onClick={() => {
                    console.log('HERE IS THE REPO:::::::>', repo);
                    handleNavigation(repo);
                  }}>
                  <span>Go to workspace </span>
                  <MdArrowForwardIos />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Backdrop>
    </>
  ) : (
    <Backdrop onClick={handleClose}>
      {commitInfo?.commit && (
        <motion.div
          variants={dropIn}
          className="modal background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <div className="commit-info-container">
            <div className="commit-author-name">
              <img src={commitInfo.author.avatar_url} alt="" />
              <p>{commitInfo.author.login}</p>
              <p>{commitInfo.commit.author.email}</p>
            </div>
            <div className="commit-details">
              <p>Author: {commitInfo.commit.author.name}</p>
              <p>Date: {commitInfo.commit.author.date}</p>
              <p>Message: {commitInfo.commit.message}</p>
              <p>Files Changed: {commitInfo.files.length}</p>
            </div>
            <div className="commit-stats">
              <p>Additions:{commitInfo.stats.additions}</p>
              <p>Deletions:{commitInfo.stats.deletions}</p>
            </div>
          </div>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
