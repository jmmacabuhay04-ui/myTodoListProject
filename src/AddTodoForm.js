import React, { useState } from "react";


function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();


    if (!text.trim()) return;


    onAddTodo({
      text: text.trim(),
      priority,
      category: category.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      dueDate,
    });


    // Reset form
    setText("");
    setPriority("medium");
    setCategory("");
    setTags("");
    setDueDate("");
  };


  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new TODO..."
        className="todo-input"
      />


      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>


      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category..."
        className="category-input"
      />


      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)..."
        className="tags-input"
      />


      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
      />


      <button type="submit" className="add-btn">
        Add TODO
      </button>
    </form>
  );
}


export default AddTodoForm;