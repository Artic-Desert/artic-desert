import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { BsCircleFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import './RepoItem.css';
// import { useUser } from '../../hooks/use-user';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GithubRepo } from '../../types/Types';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../redux/repo/actions';
import { removeRepo } from '../../redux/repos/actions';
import { setBranch } from '../../redux/branch/actions';
import { ApiClientService } from '../../services/ApiClientService';
import { useRepos } from '../../hooks/use-repos';
import { useUser } from '../../hooks/use-user';
import { setRepoModal } from '../../redux/repoModal/actions';
import { RepoModal } from '../CustomModals/RepoModal.component';

export const RepoItem: React.FC<{
  repo: GithubRepo;
}> = ({ repo }) => {
  console.log('repo input from repo item: ', repo);
  const [numOfBranches, setNumOfBranches] = useState(0);
  // const { user } = useUser();
  const { repos } = useRepos();
  const { user } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [modalOpen, setModalOpen] = useState(false);

  // const close = () => setModalOpen(false);
  // const open = () => setModalOpen(true);
  //eslint-disable-next-line
  const handleDelete = async () => {
    const body =
      repos &&
      JSON.stringify({
        repo: repo.full_name.toLowerCase(),
        action: 'remove',
      });

    ApiClientService.updateDynamoUser(user.login, body).then(data => {
      if (!data.message) {
        repos && dispatch(removeRepo(repo));
      }
    });
  };

  const fetchNumOfBranches = async () => {
    try {
      ApiClientService.getRepoBranches(repo.full_name).then(data =>
        setNumOfBranches(data.length),
      );
    } catch (error) {
      console.log(
        'Error fetching repo branches from github inside repo item component: ',
        error,
      );
    }
  };

  const handleNavigation = (repo: GithubRepo) => {
    dispatch(setRepo(repo));
    dispatch(setBranch('repo-board')); // this should be dynamic or checked for the first branch of the repo
    navigate('/workspace', { state: { repo } });
  };

  const langDict: { [key: string]: string } = {
    JavaScript: 'lang-ball-yellow',
    TypeScript: 'lang-ball-blue',
    CSS: 'lang-ball-purple',
    HTML: 'lang-ball-red',
  };

  useEffect(() => {
    fetchNumOfBranches();
  }, []);

  return repo.message ? null : (
    <>
      <div className="repo-item-container">
        <div className="top-line">
          <div className="repo-header-container">
            <h3
              className="repo-name"
              title={`${repo.name} Workspace`}
              onClick={() => handleNavigation(repo)}>
              {repo.name}
            </h3>
            <button onClick={handleDelete} className="repo-delete">
              <FiTrash2 />
            </button>
          </div>
          <div className="owner-cont">
            <img src={repo.owner.avatar_url} alt="" />
            <p className="repo-owner">{repo.owner.login}</p>
          </div>
          <span className="privacy">{repo.private ? 'Private' : 'Public'}</span>
        </div>
        <div className="bot-line">
          <div className="lang-cont">
            <BsCircleFill
              className={`${langDict[repo.language || 'lang-ball-default']}`}
            />
            <span className="language">{repo.language}</span>
          </div>
          {numOfBranches && (
            <div className="branches">
              <GoGitBranch />
              <span className="num-branch">{numOfBranches}</span>
            </div>
          )}
          <div className="repo-button-time-container">
            <span className="updated">{moment(repo.pushed_at).fromNow()}</span>
            <button
              className="preview-button"
              onClick={() => {
                dispatch(setRepo(repo));
                dispatch(setBranch('repo-board'));
                // modalOpen ? close() : open();
                dispatch(setRepoModal(true));
              }}>
              Repo Preview
            </button>
          </div>
        </div>
      </div>
      {/* <RepoModal></RepoModal> */}
      {/* <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}>
        {modalOpen && <Modal repoPreview={repo} handleClose={close} />}
      </AnimatePresence> */}
    </>
  );
};
