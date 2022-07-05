import { GithubUser } from '../types/Types';

export const GithubApiService = {
  getUser: async (username: string): Promise<GithubUser> => {
    return fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: 'token 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',
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
};
