import React, { useState } from 'react';
import { useRepo } from '../../hooks/use-repo';
import { GoRepoForked } from 'react-icons/go';
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

  return (
    <div className="current-repo-info-container">
      <div className="current-repo-info-heading">
        <p>
          Created
          <span>
            <br />
            •
            <br />
            {moment(new Date(repo.created_at)).format('DD/MMM/YYYY HH:MM')}
          </span>
        </p>
        <p className="current-repo-info-default-branch">
          Default branch
          <br />
          <span>•</span>
          <br />
          <div className="curr-repo-center-cont">
            <p>{repo.default_branch}</p>
          </div>
        </p>
        <p>
          Last updated
          <span>
            <br />
            •
            <br />
            {moment(new Date(repo.updated_at)).fromNow()}
          </span>
        </p>
        <p>
          Allow forking
          <span>
            <br />
            •
            <br />
            {repo.allow_forking ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
        </p>
        <p>
          Delete branch on merge
          <br />
          •
          <br />
          <span>
            {repo.delete_branch_on_merge ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
        </p>
        <p>
          Allow auto merge
          <span>
            <br />
            •
            <br />
            {repo.allow_auto_merge ? (
              <TiTick className="current-repo-info-tick-icon" />
            ) : (
              <GiSplitCross className="current-repo-info-cross-icon" />
            )}
          </span>
        </p>
        <p>
          Watchers
          <span>
            <br />
            •
            <br />
            <BsFillEyeFill className="current-repo-info-icons" />{' '}
            {repo.watchers}{' '}
          </span>
        </p>
        <p>
          Size
          <span>
            <br />
            •
            <br />
            <MdOutlineMemory className="current-repo-info-icons" /> {repo.size}
            {' KB'}
          </span>
        </p>
        <p>
          Stars
          <span>
            <br />
            •
            <br />
            <AiOutlineStar className="current-repo-info-icons" />{' '}
            {repo.stargazers_count}
          </span>
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
    </div>
  );
};
