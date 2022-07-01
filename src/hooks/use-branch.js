import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setBranch } from '../redux/branch/actions';

export const useBranch = () => {
  const branch =
    useSelector(state => state.branch) || sessionStorage.getItem('branch');
  const actions = useActions({ setBranch });
  return { branch, ...actions };
};
