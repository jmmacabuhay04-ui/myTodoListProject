import React from "react";


function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className={`todo-item ${todo.priority}`}>
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />


      {/* Task text and details */}
      <div className="todo-details">
        <span className={todo.completed ? "completed" : ""}>
          {todo.text}
        </span>


        {/* Priority */}
        <span className={`priority-label ${todo.priority}`}>
          {todo.priority}
        </span>


        {/* Category */}
        {todo.category && (
          <span className="category-label">[{todo.category}]</span>
        )}


        {/* Tags */}
        {todo.tags && todo.tags.length > 0 && (
          <span className="tags-label">
            {todo.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </span>
        )}


        {/* Due Date */}
        {todo.dueDate && (
          <span className="due-date-label">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>


      {/* Action buttons */}
      <div className="todo-actions">
        <button onClick={() => onEdit(todo.id)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
}


export default TodoItem;
