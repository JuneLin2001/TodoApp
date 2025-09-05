import type { TodoItem } from "@/types/todo";

export const setTodosToLocalStorage = (todo: TodoItem, todos: TodoItem[]) => {
  localStorage.setItem("todos", JSON.stringify([todo, ...todos]));
};
