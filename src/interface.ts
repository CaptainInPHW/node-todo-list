export interface DatabaseStructure {
  tags: Tag[];
  tasks: Task[];
}

export type DatabaseKeys = keyof DatabaseStructure;

export interface Answers {
  title: string;
  tagId?: number;
  level?: number;
  tagEnable: boolean;
  tagName?: string;
  levelEnable: boolean;
  levelName?: string;
  description: string;
}

export interface IncompleteTask {
  title: string;
  tagId?: number;
  level?: string;
  description: string;
}

export interface Task {
  id: number;
  title: string;
  tagId?: number;
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

export interface Tag {
  id: number;
  name: string;
  active: boolean;
}
