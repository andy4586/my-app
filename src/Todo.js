function Todo({ todo, index, removeTodo }) {
    return (
      <div className="todo">
        <span>{todo}</span>
        <button onClick={() => removeTodo(index)}>❌</button>
      </div>
    );
  }
  
  export default Todo;
  