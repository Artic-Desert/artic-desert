export const SET_KANBAN = 'SET_KANBAN';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_ONE_COLUMN = 'UPDATE_ONE_COLUMN';
export const UPDATE_TWO_COLUMNS = 'UPDATE_TWO_COLUMNS';

export const setKanban = kanban => ({
  type: SET_KANBAN,
  payload: kanban,
});

export const deleteTask = (task, column, index) => ({
  type: DELETE_TASK,
  payload: { task, index, column },
});

export const updateOneColumn = column => ({
  type: UPDATE_ONE_COLUMN,
  payload: { column },
});

export const updateTwoColumns = (columnOne, columnTwo) => ({
  type: UPDATE_TWO_COLUMNS,
  payload: { columnOne, columnTwo },
});
