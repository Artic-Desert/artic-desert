import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setRepo } from '../redux/repo/actions';

export const useRepo = () => {
  const repo =
    // (Object.keys(useSelector(state => state.repo)).length &&
    //   useSelector(state => state.repo)) ||
    // The line above was breaking the app because it is a conditional hook. If there is a subsequent break, we should figure out a way
    // to check state with without conditionally using useSelector
    JSON.parse(sessionStorage.getItem('repo'));
  const actions = useActions({ setRepo });
  return { repo, ...actions };
};
