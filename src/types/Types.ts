export type TaskType = {
  creator: string;
  title: string;
  body: string;
  timestamp: string;
  avatar_url: string;
};

export type ColumnProps = {
  col: {
    id: string;
    tasks: TaskType[];
  };
};
