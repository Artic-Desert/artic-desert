import { GithubCommit, GithubRepo } from '../types/Types';

export const ApiClientService = {
  getKanbanBoard: async (board_id: string) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  updateKanbanBoard: async (
    board_id: string,
    // eslint-disable-next-line
    columns: any,
  ) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ board: columns }),
      },
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getTimelineData: async (repo: GithubRepo, ghpToken: string) => {
    const body = JSON.stringify({
      repo_name: repo.name,
      repo_owner: repo.owner.login,
      // eslint-disable-next-line no-undef
      token: process.env.REACT_APP_GHP_TOKEN || ghpToken,
    });
    return fetch('https://arctic-desert.herokuapp.com/timeline', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: body,
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getGithubRepo: async (owner: string, repo: string, ghpToken: string) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getUser: async (username: string) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${username}}`,
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  updateDynamoUser: async (username: string, body: string) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${username}}`,
      {
        method: 'PATCH',
        body,
      },
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getCollaboratorsOfRepo: async (repo: GithubRepo, ghpToken: string) => {
    const body = {
      repo: repo.name,
      owner: repo.owner.login,
      // eslint-disable-next-line no-undef
      token: process.env.REACT_APP_GHP_TOKEN || ghpToken,
    };
    return fetch('https://arctic-desert.herokuapp.com/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  getBranches: async (branchUrl: string, ghpToken: string) => {
    console.log('BRANCHES URL:', branchUrl);
    return fetch(branchUrl, {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getRepoBranches: async (repo_name: string) => {
    return fetch(`https://api.github.com/repos/${repo_name}/branches`)
      .then(res => res.json())
      .catch(error => {
        console.log('get repo branch error', error);
      });
  },

  getCommitBySha: async (
    repo_owner: string,
    repo_name: string,
    ghpToken: string,
    sha?: string | number,
  ): Promise<GithubCommit> => {
    return fetch(
      `https://api.github.com/repos/${repo_owner}/${repo_name}/commits/${sha}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
        },
      },
    )
      .then(res => res.json())
      .catch(error =>
        console.log('Error at ApiClientService.getCommitBySha() : ', error),
      );
  },
};
