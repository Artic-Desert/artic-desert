import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { addRepo, setRepos } from '../redux/repos/actions';

export const useRepos = () => {
  const repos =
    useSelector(state => state.repos) ||
    JSON.parse(sessionStorage.getItem('repos'));
  const actions = useActions({ addRepo, setRepos });
  return { repos, ...actions };
};
