export interface DatabaseStructure {
  tags: Tag[];
  tasks: Task[];
  groups: Group[];
  levels: Level[];
}

export type DatabaseKeys = keyof DatabaseStructure;

export interface IncompleteTask {
  name: string;
  group?: number;
  tags?: number[];
  level?: number;
  description: string | undefined;
}

export interface Task {
  id: number;
  name: string;
  group?: number;
  groupName?: string;
  tags?: number[];
  tagName?: string;
  status: Status;
  createAt: string;
  updateAt?: string;
  completeAt?: string;
  remindTime?: string;
  level?: number;
  levelName?: string;
  description: string | undefined;
}

export enum Status {
  Todo = 2,
  Done = 1,
  Removed = 0
}

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

export interface Level {
  id: number;
  name: string;
  active: boolean;
}
