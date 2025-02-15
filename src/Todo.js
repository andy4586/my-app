import { useState } from "react";

function Todo({ todo, index, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo);

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(index, newText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input 
          type="text" 
          value={newText} 
          onChange={(e) => setNewText(e.target.value)} 
          onBlur={handleSave} 
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo}</span>
      )}
      
      <div className="buttons">
        <button onClick={() => setIsEditing(true)}>✏️</button>
        <button onClick={() => removeTodo(index)}>❌</button>
      </div>
    </div>
  );
}

export default Todo;
