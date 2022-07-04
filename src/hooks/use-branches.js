import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setBranches } from '../redux/branches/actions';
export const useBranches = () => {
  const branches =
    useSelector(state => state.branches) ||
    JSON.parse(sessionStorage.getItem('branches'));
  const actions = useActions({ setBranches });
  return { branches, ...actions };
};
