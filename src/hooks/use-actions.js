import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

export const useActions = actions => {
  const disaptch = useDispatch();
  return () => bindActionCreators(actions, disaptch);
};
