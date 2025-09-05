import { useState, useEffect } from "react";
import type { TodoItem, FilterType } from "@/types/todo";
import { getTodosFromLocalStorage } from "@/utils/getTodosFromLocalStorage";
import { setTodosToLocalStorage } from "@/utils/setTodosToLocalStorage";
import TodoSelect from "./TodoSelect";
import TodoList from "./TodoList";
import EditTodoModal from "./EditTodoModal";
import AddTodo from "./AddTodo";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const todosFromStorage = getTodosFromLocalStorage();
    setTodos(todosFromStorage);
  }, []);

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    setTodosToLocalStorage(updatedTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    setTodosToLocalStorage(updatedTodos);
  };

  const handleStartEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = () => {
    if (!editingTodo) return;
    setTodos(
      todos.map((t) =>
        t.id === editingTodo.id ? { ...t, title: editTitle } : t
      )
    );
    setEditingTodo(null);
    setEditTitle("");
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.isCompleted;
    if (filter === "incomplete") return !t.isCompleted;
    return true;
  });

  return (
    <div className="todo-app p-6 max-w-lg mx-auto bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodo todos={todos} setTodos={setTodos} />
      <TodoSelect filter={filter} setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        toggleTodo={handleToggleTodo}
        deleteTodo={handleDeleteTodo}
        startEdit={handleStartEditTodo}
      />
      <EditTodoModal
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        saveEdit={handleSaveEdit}
      />
    </div>
  );
};

export default TodoApp;
