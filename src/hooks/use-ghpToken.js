import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setToken } from '../redux/token/actions';

export const useGhpToken = () => {
  const ghpToken =
    useSelector(state => state.token) || sessionStorage.getItem('GHP_TOKEN');
  const actions = useActions({ setToken });
  return { ghpToken, ...actions };
};
