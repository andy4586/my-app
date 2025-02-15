import { useState, useEffect } from "react";
import Todo from "./Todo";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput("");
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = newText;
    setTodos(updatedTodos);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <h1>📝 To-Do List</h1>
      
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="input-container">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a task..."
        />
        <button onClick={addTodo}>➕</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Todo 
                        todo={todo} 
                        index={index} 
                        removeTodo={removeTodo} 
                        editTodo={editTodo} 
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
