import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setRepo } from '../redux/repo/actions';

export const useRepo = () => {
  const repo =
    (Object.keys(useSelector(state => state.repo)).length &&
      useSelector(state => state.repo)) ||
    JSON.parse(sessionStorage.getItem('repo'));
  const actions = useActions({ setRepo });
  return { repo, ...actions };
};
