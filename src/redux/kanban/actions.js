export const SET_KANBAN = 'SET_KANBAN';
export const DELETE_TASK = 'DELETE_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_ONE_COLUMN = 'UPDATE_ONE_COLUMN';
export const UPDATE_TWO_COLUMNS = 'UPDATE_TWO_COLUMNS';
export const UPDATE_TASK = 'UPDATE_TASK';

export const setKanban = kanban => ({
  type: SET_KANBAN,
  payload: kanban,
});

export const addTask = (task, column) => ({
  type: ADD_TASK,
  payload: { task, column },
});

export const deleteTask = (column, index) => ({
  type: DELETE_TASK,
  payload: { index, column },
});

export const updateOneColumn = column => ({
  type: UPDATE_ONE_COLUMN,
  payload: { column },
});

export const updateTwoColumns = (columnOne, columnTwo) => ({
  type: UPDATE_TWO_COLUMNS,
  payload: { columnOne, columnTwo },
});

export const updateTask = (task, column, index) => ({
  type: UPDATE_TASK,
  payload: { task, column, index },
});
