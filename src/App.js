import { useState } from "react";
import Todo from "./Todo";  // Import the Todo component

function App() {
  const [todos, setTodos] = useState([]);  // State for tasks
  const [input, setInput] = useState("");  // State for input field

  const addTodo = () => {
    if (!input.trim()) return; // Prevent empty tasks
    setTodos([...todos, input]); // Add new task
    setInput(""); // Clear input field
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>➕</button>
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} index={index} removeTodo={removeTodo} />
        ))}
      </div>
    </div>
  );
}

export default App;
