// import produce from 'immer';
import { DELETE_TASK, SET_KANBAN } from './actions';

const initialKanban = {
  todo: {
    id: 'todo',
    tasks: [
      {
        creator: 'arod80',
        title: 'This is an example task',
        body: 'You can delete this task and create you own!',
        timestamp: '1656430001000',
      },
    ],
  },
  doing: {
    id: 'doing',
    tasks: [
      {
        creator: 'arod80',
        title: 'This is an example task',
        body: 'You can delete this task and create you own!',
        timestamp: '1656430001002',
      },
    ],
  },
  done: {
    id: 'done',
    tasks: [
      {
        creator: 'arod80',
        title: 'This is an example task',
        body: 'You can delete this task and create you own!',
        timestamp: '1656430001001',
      },
    ],
  },
};

export const kanbanReducer = (state = initialKanban, action) => {
  if (action.type === SET_KANBAN) {
    const newState = { ...action.payload };
    console.log('new state: ', newState);
    return newState;
  }
  if (action.type === DELETE_TASK) {
    // console.log(action.payload);
    const columnId = action.payload.column;
    console.log('state: ', state);
    const oldTasks = state[columnId].tasks;
    const newTasks = oldTasks.filter(
      (task, index) => index !== action.payload.index,
    );
    if (columnId === 'todo') {
      return { ...state, todo: { id: 'todo', tasks: newTasks } };
    }
    if (columnId === 'doing') {
      return { ...state, doing: { id: 'doing', tasks: newTasks } };
    }
    if (columnId === 'done') {
      return { ...state, done: { id: 'done', tasks: newTasks } };
    }
  }
  return state;
};

// export default reducer;
