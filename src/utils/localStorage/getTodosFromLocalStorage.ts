import type { TodoItem } from "@/types/todo";

export const getTodosFromLocalStorage = (): TodoItem[] => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};
