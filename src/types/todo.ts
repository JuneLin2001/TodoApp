export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

export type FilterType = "all" | "completed" | "incomplete";
