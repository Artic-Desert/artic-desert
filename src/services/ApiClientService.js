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
    ).then(res => res.json());
  },

  updateKanbanBoard: async (board_id, columns) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
      {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ board: columns }),
      },
    ).then(res => res.json());
  },

  getTimelineData: async body => {
    console.log('ApiClientService getTimelineData inital body: ', body);
    return fetch('https://arctic-desert.herokuapp.com/timeline', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: body,
    }).then(res => res.json());
  },

  getGithubRepo: async (owner, repo, ghpToken) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN || ghpToken}`,
      },
    }).then(res => res.json());
  },

  updateDynamoUser: async (username, body) => {
    return fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${username}}`,
      {
        method: 'PATCH',
        body,
      },
    ).then(res => res.json());
  },
};
