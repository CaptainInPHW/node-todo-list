export interface DatabaseStructure {
  tags: Tag[];
  tasks: Task[];
  groups: Group[];
}

export type DatabaseKeys = keyof DatabaseStructure;

export interface Answers {
  name: string;
  tag?: number;
  group?: number;
  level?: number;
  tagEnable: boolean;
  tagName?: string;
  groupEnable: boolean;
  groupName?: string;
  levelEnable: boolean;
  levelName?: string;
  description: string;
}

export interface IncompleteTask {
  name: string;
  tag?: number;
  group?: number;
  level?: string;
  description: string;
}

export interface Task {
  id: number;
  name: string;
  group?: number;
  groupName?: string;
  tag?: number;
  tagName?: string;
  status: Status;
  statusName?: string;
  createAt: string;
  updateAt?: string;
  completeAt?: string;
  remindTime?: string;
  level?: string;
  description: string | undefined;
}

export enum Status {
  Todo = 2,
  Done = 1,
  Removed = 0
}

export type StatusName = Record<'Todo' | 'Done' | 'Removed', string>;

export interface Group {
  id: number;
  name: string;
  active: boolean;
}

export interface Tag {
  id: number;
  name: string;
  active: boolean;
}
