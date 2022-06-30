export type Task = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
  avatar_url: string;
};

export type ColumnProps = {
  col: {
    id: string;
    tasks: Task[];
  };
};

export type DynamoUser = {
  username: string;
  repos: DynamoRepo[];
};

export type DynamoRepo = {
  repo_id: string; // format : owner:slash:repo
  users: string[];
  chatgroups: string[];
  organization: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  private: boolean;
  language: string;
  full_name: string;
  pushed_at: string;
  message?: {}; // This is not a repo property, it only exists with there is an error message from the fetch.
};
