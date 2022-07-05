import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineMail } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { ImFilesEmpty } from 'react-icons/im';
import { BiMessageSquareDetail, BiPlus, BiMinus } from 'react-icons/bi';
import { BsFillPersonLinesFill, BsFillCalendar2DateFill } from 'react-icons/bs';
import Backdrop from '../BackdropComponent/Backdrop.component';
import { GithubCommit } from '../../types/Types';
import { useRepo } from '../../hooks/use-repo';
import moment from 'moment';
import './Modal.css';
import { ApiClientService } from '../../services/ApiClientService';
import { useGhpToken } from '../../hooks/use-ghpToken';
import { useCommitModal } from '../../hooks/use-commit-modal';
import { useDispatch } from 'react-redux';
import { setCommitModal } from '../../redux/commitModal/actions';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0vh',
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

export const CommitModal: React.FC = () => {
  const { repo } = useRepo();
  const { ghpToken } = useGhpToken();
  const [commitInfo, setCommitInfo] = useState<GithubCommit>();
  // const { commitModal } = useCommitModal();
  const { commitModal } = useCommitModal(); // has to be state that is triggewred by svg click
  const commit = commitModal;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('repo.owner.login:', repo.owner.login);
    console.log('repo.name:', repo.name);
    console.log('commit:', commit);
    repo &&
      ApiClientService.getCommitBySha(
        repo.owner.login,
        repo.name,
        ghpToken,
        commit,
      ).then(data => {
        console.log(data);
        setCommitInfo(data);
      });
  }, [commitModal]);

  console.log(commitModal);
  const handleClose = () => {
    dispatch(setCommitModal(''));
  }; // has to be a redux state

  console.log('HI THERE, IM INSIDE COMMIT MODAL');
  return (
    commitModal &&
    commitInfo &&
    commitInfo.commit && (
      <Backdrop onClick={handleClose}>
        <div className="modalCommit background">
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
                <h3>Commit Author</h3>
                <div className="commit-author-info-cont">
                  <p>
                    <span>
                      {' '}
                      {commitInfo.commit.author.name}{' '}
                      <BsFillPersonLinesFill className="commit-author-icon" />
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
                      <AiOutlineMail className="commit-autor-email-icon" />{' '}
                      {commitInfo.commit.author.email}
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
                    <BsFillCalendar2DateFill />{' '}
                    {moment(commitInfo.commit.author.date).format(
                      'DD/MMM/YY HH:MM:SS',
                    )}
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
                    <BiPlus className="commit-stats-plus-minus" color="green" />
                    <BiPlus className="commit-stats-plus-minus" color="green" />
                    {commitInfo.stats.additions}
                  </span>
                </p>
                <p>
                  Deletions •{' '}
                  <span>
                    {' '}
                    <BiMinus className="commit-stats-plus-minus" color="red" />
                    <BiMinus className="commit-stats-plus-minus" color="red" />
                    {commitInfo.stats.deletions}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Backdrop>
    )
  );
};
