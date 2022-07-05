import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { setCommitModal } from '../redux/commitModal/actions';

export const useCommitModal = () => {
  const commitModal = useSelector(state => state.commitModal);
  const actions = useActions({ setCommitModal });
  return { commitModal, ...actions };
};
