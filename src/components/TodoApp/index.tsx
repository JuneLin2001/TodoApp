import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import type { TodoItem, FilterType } from "@/types/todo";
import { setTodosToLocalStorage } from "@/utils/setTodosToLocalStorage";
import TodoSelect from "./TodoSelect";
import TodoList from "./TodoList";
import EditTodoModal from "./EditTodoModal";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const todo: TodoItem = {
      id: Date.now(),
      title: newTodo,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos([todo, ...todos]);
    setNewTodo("");
    setTodosToLocalStorage(todo, todos);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleStartEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
  };

  const saveEdit = () => {
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
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="輸入新的待辦事項..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onPressEnter={addTodo}
        />
        <Button type="primary" onClick={addTodo}>
          新增
        </Button>
      </div>
      <TodoSelect filter={filter} setFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        startEdit={handleStartEditTodo}
      />
      <EditTodoModal
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        saveEdit={saveEdit}
      />
    </div>
  );
};

export default TodoApp;
