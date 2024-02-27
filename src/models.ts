export type Event = {
  created_at: string;
  id: number;
  updated_at: string;
  title: string;
  isSelected: boolean;
};

export type Task = {
  created_at: string;
  id: number;
  updated_at: string;
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
