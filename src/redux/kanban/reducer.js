// import produce from 'immer';
import {
  ADD_TASK,
  DELETE_TASK,
  SET_KANBAN,
  UPDATE_ONE_COLUMN,
  UPDATE_TASK,
  UPDATE_TWO_COLUMNS,
} from './actions';

const initialKanban = {
  // board_id: 'default-owner/default-kanban-board/default-branch',

  'To do': {
    id: 'To do',
    tasks: [
      {
        timestamp: '1656430001000',
        creator: 'default',
        avatar_url: 'https://source.unsplash.com/random/200x200?sig=1',
        title: 'Update db schema',
        body: 'You can delete this task and create you own!',
      },
    ],
  },
  'In Progress': {
    id: 'In Progress',
    tasks: [
      {
        timestamp: '1656450031000',
        creator: 'default',
        avatar_url: 'https://source.unsplash.com/random/200x200?sig=1',
        title: 'Fix redux task reducer',
        body: 'You can delete this task and create you own!',
      },
    ],
  },
  Done: {
    id: 'Done',
    tasks: [
      {
        timestamp: '1656430531000',
        creator: 'default',
        avatar_url: 'https://source.unsplash.com/random/200x200?sig=1',
        title: 'Renew website domain',
        body: 'You can delete this task and create you own!',
      },
    ],
  },
};

export const kanbanReducer = (state = initialKanban, action) => {
  if (action.type === SET_KANBAN) {
    console.log('inside set kanban');
    console.log('Kanban action payload: ', action.payload);
    const newState = { ...action.payload };
    console.log('new state: ', newState);
    return newState;
  }
  if (action.type === ADD_TASK) {
    const columnId = action.payload.column.id;
    const taskToAdd = action.payload.task;
    const oldTasks = state[columnId].tasks;
    const newTasks = [taskToAdd, ...oldTasks];
    const newState = {
      ...state,
      [columnId]: { id: columnId, tasks: newTasks },
    };
    return newState;
  }
  if (action.type === DELETE_TASK) {
    const columnId = action.payload.column;
    console.log('state: ', state);
    const oldTasks = state[columnId].tasks;
    const newTasks = oldTasks.filter(
      (task, index) => index !== action.payload.index,
    );
    const newState = {
      ...state,
      [columnId]: { id: columnId, tasks: newTasks },
    };
    console.log('new state: ', newState);
    return newState;
  }
  if (action.type === UPDATE_ONE_COLUMN) {
    const columnId = action.payload.column.id;
    const newState = { ...state, [columnId]: action.payload.column };
    console.log('new state: ', newState);
    return newState;
  }
  if (action.type === UPDATE_TWO_COLUMNS) {
    const columnOneId = action.payload.columnOne.id;
    const columnTwoId = action.payload.columnTwo.id;
    const newState = {
      ...state,
      [columnOneId]: action.payload.columnOne,
      [columnTwoId]: action.payload.columnTwo,
    };
    console.log('new state: ', newState);
    return newState;
  }
  if (action.type === UPDATE_TASK) {
    const updatedTask = action.payload.task;
    const columnId = action.payload.column;
    const oldTasks = state[columnId].tasks;
    const taskIndex = action.payload.index;
    const newTasks = oldTasks.map((task, index) => {
      if (index === taskIndex) {
        return { ...updatedTask, timestamp: task.timestamp };
      }
      return task;
    });
    const newState = {
      ...state,
      [columnId]: {
        id: columnId,
        tasks: newTasks,
      },
    };
    console.log('new state: ', newState);
    return newState;
  }
  return state;
};

// export default reducer;
