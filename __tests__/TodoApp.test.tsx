import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoApp from "@/components/TodoApp";

describe("TodoApp", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("可以新增待辦事項", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("輸入新的待辦事項...");
    const button = screen.getByText(
      (content) => content.replace(/\s/g, "") === "新增"
    );

    fireEvent.change(input, { target: { value: "學習 React" } });
    fireEvent.click(button);

    expect(screen.getByText("學習 React")).toBeInTheDocument();
  });

  it("可以切換完成狀態", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("輸入新的待辦事項...");
    const button = screen.getByText(
      (content) => content.replace(/\s/g, "") === "新增"
    );

    fireEvent.change(input, { target: { value: "寫 Jest 測試" } });
    fireEvent.click(button);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("可以刪除待辦事項", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("輸入新的待辦事項...");
    const button = screen.getByText(
      (content) => content.replace(/\s/g, "") === "新增"
    );

    fireEvent.change(input, { target: { value: "刪除我" } });
    fireEvent.click(button);

    expect(screen.getByText("刪除我")).toBeInTheDocument();

    const deleteBtn = screen.getByText("刪除");
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("刪除我")).not.toBeInTheDocument();
  });
});
