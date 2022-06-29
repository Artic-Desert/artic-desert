export const ApiClientService = {
  getKanbanBoard: async board_id => {
    const result = await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/kanban/${board_id}`,
    );
    return result;
  },
};
