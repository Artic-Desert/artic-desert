import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setKanban } from '../redux/kanban/actions';

export const useKanban = () => {
  const kanban = useSelector(state => {
    return state.kanban;
  });
  const actions = useActions({ setKanban });
  return { kanban, ...actions };
};
