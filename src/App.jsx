import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="container">
      <Header />
      <hr />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header() {
  return <h1 className="header"> My Todo App</h1>;
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    const newTodo = { id: Number(new Date()), content: inputValue, done: false };
    setTodoList([...todoList, newTodo]);
    setInputValue("");
  };

  return (
    <div className="input-wrapper">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="할 일을 입력하세요" />
      <button className="add-btn"
        onClick={
          handleAdd
        }
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(todo.content);

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
  };

  const handleUpdate = () => {
    if (editValue.trim() === "") return;
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: editValue } : el
      )
    );
    setIsEditMode(false);
  };

  const handleToggleDone = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, done: !el.done } : el
      )
    );
  };


  return (
    <li className={`todo-item ${todo.done ? "done" : ""}`}>
      
      {isEditMode ? (
        <>
          <input
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdate}>확인</button>
        </>
      ) : (
        <>
          <span>{todo.content}</span>
          <button className="edit-btn" onClick={() => {setEditValue(todo.content);setIsEditMode(true)}}>수정</button>
        </>
      )}
      <button className="delete-btn" onClick={handleDelete}>삭제</button>
      <button className="done-btn" onClick={handleToggleDone}>
        {todo.done ? "완료됨" : "완료"}
      </button>
    </li>
  );
}

export default App;
