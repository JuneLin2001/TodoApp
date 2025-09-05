import type { TodoItem } from "@/types/todo";

export const setTodosToLocalStorage = (todos: TodoItem[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
