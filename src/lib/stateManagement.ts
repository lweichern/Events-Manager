import { Column, Event } from "../models";
import { Task } from "../models";
import axios from "axios";
import { create } from "zustand";

type EventState = {
  events: Event[];
  eventName: string;
  selectedEventId: number;
  changeEventName: (name: string) => void;
  fetchEvents: () => void;
  changeSelectedEventId: (eventId: number) => void;
};

type TaskState = {
  tasks: Task[];
  taskName: string;
  changeTaskName: (name: string) => void;
  fetchTasks: (eventId: string | undefined, taskType: string) => void;
};

type ColumnState = {
  column: Column;
  setColumn: (eventId: number) => void;
  updateTaskType: (taskId: string, taskType: string) => void;
};

const useEventStore = create<EventState>((set, get) => ({
  events: [],
  eventName: "",
  selectedEventId: -1,
  changeEventName: (name) => set(() => ({ eventName: name })),
  fetchEvents: async () => {
    const eventData = (await axios.get("/api/events")).data;

    set(() => ({ events: eventData }));
  },
  changeSelectedEventId: (eventId) => {
    set(() => ({ selectedEventId: eventId }));
  },
}));

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  taskName: "",
  changeTaskName: (name) => set(() => ({ taskName: name })),
  fetchTasks: async (eventId, taskType) => {
    const taskData = (
      await axios.get(`/api/tasks?taskType=${taskType}&eventId=${eventId}`)
    ).data;
    set(() => ({ tasks: taskData }));
  },
}));

const useColumnStore = create<ColumnState>((set, get) => ({
  column: {
    backlog: [],
    todo: [],
    "in progress": [],
    done: [],
  },
  setColumn: async (eventId) => {
    const columnName = ["backlog", "todo", "in progress", "done"];
    columnName.forEach(async (col) => {
      const taskData = (
        await axios.get(`/api/tasks?taskType=${col}&eventId=${eventId}`)
      ).data;

      set((prevState) => ({
        column: {
          backlog: prevState.column.backlog,
          todo: prevState.column.todo,
          "in progress": prevState.column["in progress"],
          done: prevState.column.done,
          [col]: taskData,
        },
      }));
    });
  },
  updateTaskType: async (taskId, taskType) => {
    await axios.patch(`/api/tasks/${taskId}`, { task_type: taskType });

    get().setColumn(useEventStore.getState().selectedEventId);
  },
}));

export { useEventStore, useTaskStore, useColumnStore };
