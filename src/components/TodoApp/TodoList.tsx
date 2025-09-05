import { List, Checkbox } from "antd";
import type { TodoItem } from "@/types/todo";

interface TodoListProps {
  filteredTodos: TodoItem[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  startEdit: (todo: TodoItem) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  filteredTodos,
  toggleTodo,
  deleteTodo,
  startEdit,
}) => {
  return (
    <List
      bordered
      dataSource={filteredTodos}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a onClick={() => startEdit(item)}>編輯</a>,
            <a onClick={() => deleteTodo(item.id)}>刪除</a>,
          ]}
        >
          <Checkbox
            checked={item.isCompleted}
            onChange={() => toggleTodo(item.id)}
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
