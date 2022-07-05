export const SET_COMMIT_MODAL = 'SET_COMMIT_MODAL';
export const SET_CURRENT_COMMIT_SHA = 'SET_CURRENT_COMMIT_SHA';

export const setCommitModal = commitModal => ({
  type: SET_COMMIT_MODAL,
  payload: commitModal,
});

export const setCurrentCommitSha = sha => ({
  type: SET_CURRENT_COMMIT_SHA,
  payload: sha,
});
