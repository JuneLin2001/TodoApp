import { Select } from "antd";
import type { FilterType } from "@/types/todo";

const { Option } = Select;

interface TodoSelectProps {
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

const TodoSelect: React.FC<TodoSelectProps> = ({ filter, setFilter }) => {
  return (
    <div className="mb-4">
      <Select value={filter} onChange={(v) => setFilter(v)}>
        <Option value="all">全部</Option>
        <Option value="completed">已完成</Option>
        <Option value="incomplete">未完成</Option>
      </Select>
    </div>
  );
};

export default TodoSelect;
