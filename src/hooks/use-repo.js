import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setRepo } from '../redux/repo/actions';

export const useRepo = () => {
  const repo = useSelector(state => {
    return state.repo;
  });
  const actions = useActions({ setRepo });
  return { repo, ...actions };
};
