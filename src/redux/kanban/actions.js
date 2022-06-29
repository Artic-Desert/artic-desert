export const SET_KANBAN = 'SET_KANBAN';
export const DELETE_TASK = 'DELETE_TASK';

export const setKanban = kanban => ({
  type: SET_KANBAN,
  payload: kanban,
});

export const deleteTask = (task, column, index) => ({
  type: DELETE_TASK,
  payload: { task, index, column },
});
