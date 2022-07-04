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
  repos: string[];
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
  default_branch: string;
  watchers: number;
  created_at: string;
  updated_at: string;
  clone_url: string;
  size: number;
  stargazers_count: number;
  languages_url: string;
  visibility: string;
  forks: number;
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
  avatar_url: string;
};

export type Message = {
  id: string;
  content: string;
  edited_timestamp?: number;
  timestamp: number;
  username: string;
  chatgroup_id: string;
  avatar_url?: string;
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

export type GithubCommit = {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    url: string;
  };
  url: string;
  html_url: string;
  author: GithubUser;
  commiter: GithubUser;
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
  stats: {
    total: number;
    additions: number;
    deletions: number;
  };
  files: {
    sha: string;
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    blob_url: string;
    raw_url: string;
    contents_url: string;
    patch: string;
  }[];
};

export type Data = {
  base: string;
  clouds: clouds;
  cod: 200;
  coord: coord;
  dt: number;
  id: number;
  main: main;
  name: string;
  sys: sys;
  timezone: number;
  visibilitu: number;
  weather: weather;
  wind: wind;
};
export type clouds = {
  all: number;
};
export type coord = {
  lon: number;
  lat: number;
};
export type main = {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_min: number;
  temp_max: number;
};
export type sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
export type weather = {
  0: weather_breakdown;
};
export type weather_breakdown = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
export type wind = {
  speed: number;
  deg: number;
};

export type randomQuoteData = {
  id: string;
  tags: [];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};
