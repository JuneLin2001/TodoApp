import { List, Checkbox } from "antd";
import type { TodoItem } from "@/types/todo";
import { setTodosToLocalStorage } from "@/utils/localStorage/setTodosToLocalStorage";

interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  filteredTodos: TodoItem[];
  startEdit: (todo: TodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  filteredTodos,
  startEdit,
}) => {
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    setTodosToLocalStorage(updatedTodos);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    setTodosToLocalStorage(updatedTodos);
  };

  return (
    <List
      bordered
      dataSource={filteredTodos}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a onClick={() => startEdit(item)}>編輯</a>,
            <a onClick={() => handleDeleteTodo(item.id)}>刪除</a>,
          ]}
        >
          <Checkbox
            checked={item.isCompleted}
            onChange={() => handleToggleTodo(item.id)}
          >
            <span
              className={item.isCompleted ? "line-through text-gray-400" : ""}
            >
              {item.title}
            </span>
          </Checkbox>
        </List.Item>
      )}
    />
  );
};

export default TodoList;
