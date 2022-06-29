import axios from 'axios';

export const ApiClientService = {
  getKanbanBoard: async board_id => {
    const board = await axios.get(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
    );
    return board;
  },

  updateKanbanBoard: async (board_id, columns) => {
    return await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
      {
        method: 'PUT',
        body: JSON.stringify(columns),
      },
    );
  },
};
