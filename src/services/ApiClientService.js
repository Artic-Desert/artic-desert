export const ApiClientService = {
  getKanbanBoard: async board_id => {
    console.log('BOARD ID API CLIENT: ', board_id);
    console.log('BOARD ID API CLIENT STRINGIFIED: ', JSON.stringify(board_id));
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

  updateKanbanBoard: async (board_id, columns) => {
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

  getTimelineData: async (repo, ghpToken) => {
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

  getGithubRepo: async (owner, repo, ghpToken) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getUser: async username => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${username}}`,
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  updateDynamoUser: async (username, body) => {
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

  getCollaboratorsOfRepo: async (repo, ghpToken) => {
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
  getBranches: async (branchUrl, ghpToken) => {
    return await fetch(branchUrl, {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },

  getRepoBranches: async repo_name => {
    return fetch(`https://api.github.com/repos/${repo_name}/branches`).then(
      res => res.json(),
    );
  },
};
