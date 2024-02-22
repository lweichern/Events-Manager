export type Event = {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  title: string;
};

export type Task = {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  title: string;
  eventId: number;
  isDone: boolean;
  taskType: string;
};

export type Column = {
  backlog: Task[];
  todo: Task[];
  "in progress": Task[];
  done: Task[];
};
