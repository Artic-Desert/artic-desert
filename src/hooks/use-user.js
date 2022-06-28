import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setUser } from '../redux/user/actions';

export const useUser = () => {
  const user = useSelector(state => state.users.user);
  const actions = useActions({ setUser });
  return { user, ...actions };
};
