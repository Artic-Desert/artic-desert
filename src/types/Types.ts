export type Task = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
  avatar_url: string;
  new: boolean | undefined;
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
  message?: { message: string }; // This is not a repo property, it only exists with there is an error message from the fetch.
};

export type GithubUser = {
  id: number;
  avatar_url: string;
  name: string;
  login: string;
  follower: number;
  following: number;
  public_repos: number;
  bio: string;
  html_url: string;
};

export type RepoBranch = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};

export type OrganizationToCreate = {
  name: string;
  god: string;
};

export type Organization = {
  id: string;
  name: string;
  god: string;
  admins: string[];
  users: string[];
  repos: string[];
};

export type AdminToEdit = {
  admin: string;
  id: string;
};

export type RepoToEdit = {
  repo: string;
  id: string;
};

export type UserToEdit = {
  user: string;
  id: string;
};

export type NameToEdit = {
  name: string;
  id: string;
};

export type GodToEdit = {
  god: string;
  id: string;
};

export type MessageToCreate = {
  content: string;
  timestamp: number;
  edited_timestamp?: number;
  username: string;
  chatgroup_id: string;
};

export type Message = {
  id: string;
  content: string;
  edited_timestamp?: number;
  timestamp: number;
  username: string;
  chatgroup_id: string;
};

export type ChatGroupToCreate = {
  id: string;
  name: string;
  admin: string;
  repo_id: string;
};

export type ChatGroup = {
  id: string;
  name: string;
  members: string[];
  admin: string;
  messages: Message[];
  repo_id: string;
};

export type MemberToEdit = {
  repo_id: string;
  member: string;
};

export type UserToAddToPremium = {
  user_id: string;
};

export type PremiumUser = {
  time_added: string;
  user_id: string;
};
