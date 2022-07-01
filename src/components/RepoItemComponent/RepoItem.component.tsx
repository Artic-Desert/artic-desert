import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { BsCircleFill } from 'react-icons/bs';
import './RepoItem.css';
import { useUser } from '../../hooks/use-user';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { GithubRepo } from '../../types/Types';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../redux/repo/actions';

export const RepoItem: React.FC<{
  repo: GithubRepo;
  setRepos: React.Dispatch<React.SetStateAction<GithubRepo[]>>;
}> = ({ repo, setRepos }) => {
  console.log('repo input from repo item: ', repo);
  const [numOfBranches, setNumOfBranches] = useState(0);
  const { user } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log(repo.full_name.toLowerCase());
    const body = JSON.stringify({
      repo: repo.full_name.toLowerCase(),
      action: 'remove',
    });
    const response = await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${user.login}}`,
      {
        method: 'PATCH',
        body,
      },
    );
    const data = await response.json();

    if (!data.message) {
      setRepos((prevState: any) => {
        const newState = prevState.filter((el: any) => el.id !== repo.id);
        return newState;
      });
    }

    return data;
  };

  const fetchNumOfBranches = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo.full_name}/branches`,
      );
      const branches = await response.json();
      setNumOfBranches(branches.length);
    } catch (error) {
      console.log(
        'Error fetching repo branches from github inside repo item component: ',
        error,
      );
    }
  };

  const handleNavigation = (repo: GithubRepo) => {
    dispatch(setRepo(repo));
    navigate('/workspace', { state: { repo } });
  };

  const obj: any = {
    JavaScript: 'lang-ball-yellow',
    TypeScript: 'lang-ball-blue',
    CSS: 'lang-ball-purple',
    HTML: 'lang-ball-red',
  };
  useEffect(() => {
    fetchNumOfBranches();
  }, []);

  return repo.message ? // <div style={{ color: 'white' }}>There was an error in repo fetching</div>
  null : (
    <div className="repo-item-container">
      <div className="top-line">
        <h3 className="repo-name" onClick={() => handleNavigation(repo)}>
          {repo.name}
        </h3>
        <div className="owner-cont">
          <img src={repo.owner.avatar_url} alt="" />
          <p className="repo-owner">{repo.owner.login}</p>
        </div>
        <span className="privacy">{repo.private ? 'Private' : 'Public'}</span>
      </div>
      <div className="bot-line">
        <div className="lang-cont">
          <BsCircleFill
            className={`${obj[repo.language || 'lang-ball-default']}`}
          />
          {/* {repo.language === 'JavaScript' && (
            <BsCircleFill className="lang-ball-yellow" />
          )}
          {repo.language === 'TypeScript' && (
            <BsCircleFill className="lang-ball-blue" />
          )}
          {repo.language === 'CSS' && (
            <BsCircleFill className="lang-ball-purple" />
          )}
          {repo.language === 'HTML' && (
            <BsCircleFill className="lang-ball-red" />
          )}
          {repo.language !== 'HTML' ||
            'CSS' ||
            'TypeScript' ||
            ('JavaScript' && <BsCircleFill className="lang-ball-default" />)} */}
          {/* {!obj[repo.language] && <BsCircleFill className="lang-ball" />} */}

          <span className="language">{repo.language}</span>
        </div>
        {numOfBranches && (
          <div className="branches">
            <GoGitBranch />
            <span className="num-branch">{numOfBranches}</span>
          </div>
        )}
        <span className="updated">{moment(repo.pushed_at).fromNow()}</span>
      </div>
    </div>
  );
};
