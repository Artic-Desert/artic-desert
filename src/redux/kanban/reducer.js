// import produce from 'immer';
import { SET_KANBAN } from './actions';

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
  return state;
};

// export default reducer;
