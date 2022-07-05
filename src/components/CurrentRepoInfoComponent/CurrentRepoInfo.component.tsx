import React, { useState } from 'react';
import { useRepo } from '../../hooks/use-repo';
import { GoGitBranch, GoRepoForked } from 'react-icons/go';
import { AiFillCopy, AiOutlineStar } from 'react-icons/ai';
import { BsFillEyeFill } from 'react-icons/bs';
import { MdOutlineMemory } from 'react-icons/md';
import { GiSplitCross } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import moment from 'moment';

import './CurrentRepoInfo.css';

export const CurrentRepoInfo: React.FC = () => {
  const { repo } = useRepo();
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copy = async () => {
    setCopiedToClipboard(true);
    repo && (await navigator.clipboard.writeText(repo.clone_url));
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  console.log('repooooooooooo', repo);

  return (
    <div className="current-repo-info-container">
      <div className="current-repo-info-heading">
        <p>
          <span>
            {moment(new Date(repo.created_at)).format('DD/MMM/YYYY HH:MM')}
          </span>
          <br />
          •
          <br />
          Created
        </p>
        <p className="current-repo-info-default-branch">
          <span>{repo.default_branch}</span>
          <br />
          •
          <br />
          Default branch
        </p>
        <p>
          <span>{moment(new Date(repo.updated_at)).fromNow()}</span>
          <br />
          •
          <br />
          Last updated
        </p>
        <p>
          <span>
            {repo.allow_forking ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
          <br />
          •
          <br />
          Allow forking
        </p>
        <p>
          <span>
            {repo.delete_branch_on_merge ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
          <br />
          •
          <br />
          Delete branch on merge
        </p>
        <p>
          <span>
            {repo.allow_auto_merge ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
          <br />
          •
          <br />
          Allow auto merge
        </p>
        <p>
          <span>
            <BsFillEyeFill className="current-repo-info-icons" />{' '}
            {repo.watchers}{' '}
          </span>
          <br />
          •
          <br />
          Watchers
        </p>
        <p>
          <span>
            <MdOutlineMemory className="current-repo-info-icons" /> {repo.size}
            {' KB'}
          </span>
          <br />
          •
          <br />
          Size
        </p>
        <p>
          <span>
            <AiOutlineStar className="current-repo-info-icons" />{' '}
            {repo.stargazers_count}
          </span>
          <br />
          •
          <br />
          Stars
        </p>
        {repo.allow_forking ? (
          <p>
            <span>
              <GoRepoForked className="current-repo-info-icons" /> {repo.forks}{' '}
              times{' '}
            </span>
            <br />
            •
            <br />
            Forked
          </p>
        ) : null}
      </div>
      <div className="copy-clip-workspace">
        <AiFillCopy
          title="Copy Repo URL"
          className="copy-icon-workspace"
          onClick={copy}
          size={35}
        />
      </div>
      {copiedToClipboard && (
        <div className="copied-to-clipboard-alert">Copied to clipboard</div>
      )}
    </div>
  );
};
