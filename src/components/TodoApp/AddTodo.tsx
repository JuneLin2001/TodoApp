import { useState } from "react";
import { Input, Button } from "antd";
import type { TodoItem } from "@/types/todo";
import { setTodosToLocalStorage } from "@/utils/localStorage/setTodosToLocalStorage";

interface AddTodoProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const todo: TodoItem = {
      id: Date.now(),
      title: newTodo,
      isCompleted: false,
      createdAt: new Date(),
    };
    const updatedTodos = [todo, ...todos];
    setTodos(updatedTodos);
    setTodosToLocalStorage(updatedTodos);
    setNewTodo("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="輸入新的待辦事項..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onPressEnter={handleAddTodo}
      />
      <Button type="primary" onClick={handleAddTodo}>
        新增
      </Button>
    </div>
  );
};

export default AddTodo;
