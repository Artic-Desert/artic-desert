export const ApiClientService = {
  getKanbanBoard: async board_id => {
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
};
