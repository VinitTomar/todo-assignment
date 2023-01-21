export enum TodoPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export interface Todo {
  title: string;
  description: string;
  dueDate: Date;
  priority: TodoPriority;
  id?: number;
  createdAt?: Date;
}