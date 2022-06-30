export const GithubApiService = {
  getUser: async username => {
    return fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: 'token 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',
      },
    }).then(res => res.json());
  },
};
