export interface DatabaseStructure {
  tags: Tag[];
  tasks: Task[];
  groups: Group[];
  levels: Level[];
}

export interface Task {
  id: number;
  name: string;
  tags: number[];
  status: Status;
  groupId: number;
  createdAt: string;
  level: number | undefined;
  description: string | undefined;
}

export enum Status {
  Todo,
  Done,
  Removed
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
