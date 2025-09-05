import { Modal, Input } from "antd";
import type { TodoItem } from "@/types/todo";

interface EditTodoModalProps {
  editingTodo: TodoItem | null;
  setEditingTodo: React.Dispatch<React.SetStateAction<TodoItem | null>>;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  saveEdit: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  editingTodo,
  setEditingTodo,
  editTitle,
  setEditTitle,
  saveEdit,
}) => {
  return (
    <Modal
      title="編輯待辦事項"
      open={!!editingTodo}
      onOk={saveEdit}
      onCancel={() => setEditingTodo(null)}
    >
      <Input
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        onPressEnter={saveEdit}
      />
    </Modal>
  );
};

export default EditTodoModal;
