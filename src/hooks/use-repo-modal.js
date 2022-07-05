import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setRepoModal } from '../redux/repoModal/actions';

export const useRepoModal = () => {
  const repoModal = useSelector(state => state.repoModal);
  const actions = useActions({ setRepoModal });
  return { repoModal, ...actions };
};
