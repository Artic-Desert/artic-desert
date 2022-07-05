import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GoGitBranch, GoRepoForked } from 'react-icons/go';
import { AiFillCopy, AiOutlineStar, AiOutlineMail } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { ImFilesEmpty } from 'react-icons/im';
import { BiMessageSquareDetail, BiPlus, BiMinus } from 'react-icons/bi';
import {
  BsFillEyeFill,
  BsFillPersonLinesFill,
  BsFillCalendar2DateFill,
} from 'react-icons/bs';
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
import { ApiClientService } from '../../../services/ApiClientService';
import { useGhpToken } from '../../../hooks/use-ghpToken';

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

export const Modal: React.FC<{
  handleClose: () => void;
  repoPreview?: GithubRepo;
  commit?: string | number;
}> = ({ handleClose, repoPreview, commit }) => {
  const { repo } = useRepo();
  const { ghpToken } = useGhpToken();
  const [commitInfo, setCommitInfo] = useState<GithubCommit>();
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    !repoPreview &&
      ApiClientService.getCommitBySha(
        repo.owner.login,
        repo.name,
        commit,
        ghpToken,
      ).then(data => setCommitInfo(data));
  }, []);

  const copy = async () => {
    setCopiedToClipboard(true);
    repoPreview && (await navigator.clipboard.writeText(repoPreview.clone_url));
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  const handleNavigation = (repo: GithubRepo) => {
    dispatch(setRepo(repo));
    dispatch(setBranch('repo-board')); // this should be dynamic or checked for the first branch of the repo
    navigate('/workspace', { state: { repo } });
  };

  console.log('<Modal/> commit info: ', commitInfo);

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
          className="modalCommit background"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}>
          <div className="commit-info-container">
            <div className="commit-author-name">
              <img
                src={
                  commitInfo.author
                    ? commitInfo.author.avatar_url
                    : 'https://camo.githubusercontent.com/cc6db406f60bc356022df89c92deda2a218d8e5e5efd9de54911d55e52eae4b1/68747470733a2f2f7261772e6769746875622e636f6d2f736568726775742f6e6f64652d7265747269636f6e2f6d61737465722f6578616d706c65732f696d616765732f30362e706e67'
                }
                alt=""
              />
              <div className="cont-plus-title">
                <h3>Commiter Info</h3>
                <div className="commit-author-info-cont">
                  <p>
                    Commit author •
                    <span>
                      {' '}
                      <BsFillPersonLinesFill /> {commitInfo.commit.author.name}
                    </span>
                  </p>
                  <p>
                    GitHub username •
                    <span>
                      {' '}
                      <FiGithub />{' '}
                      {commitInfo.author
                        ? commitInfo.author.login
                        : 'Not Found'}
                    </span>
                  </p>
                  <p>
                    E-mail •
                    <span>
                      {' '}
                      <AiOutlineMail /> {commitInfo.commit.author.email}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="commit-details-title">
              <h3>Commit Details</h3>
              <div className="commit-details">
                <p>
                  Date •{' '}
                  <span>
                    {' '}
                    <BsFillCalendar2DateFill /> {commitInfo.commit.author.date}
                  </span>
                </p>
                <p>
                  Files Changed •{' '}
                  <span>
                    {' '}
                    <ImFilesEmpty /> {commitInfo.files.length}
                  </span>
                </p>
                <p>
                  Commit message •{' '}
                  <span>
                    {' '}
                    <BiMessageSquareDetail /> <q>{commitInfo.commit.message}</q>
                  </span>
                </p>
              </div>
            </div>
            <div className="commit-stats-title">
              <h3>File changes</h3>
              <div className="commit-stats">
                <p>
                  Additions •{' '}
                  <span>
                    {' '}
                    <BiPlus color="green" />
                    <BiPlus color="green" />
                    {commitInfo.stats.additions}
                  </span>
                </p>
                <p>
                  Deletions •{' '}
                  <span>
                    {' '}
                    <BiMinus color="red" />
                    <BiMinus color="red" />
                    {commitInfo.stats.deletions}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
