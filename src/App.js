import React,{useState ,useEffect} from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import "./App.css";



function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [editingId, setEditingId] = useState(null);


  const handleAddOrUpdateTodo = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;


    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                text: inputText.trim(),
                priority,
                category,
                tags: tags.split(",").map((t) => t.trim()),
                dueDate,
              }
            : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: inputText.trim(),
        completed: false,
        priority,
        category,
        tags: tags.split(",").map((t) => t.trim()),
        dueDate,
      };
      setTodos((prev) => [...prev, newTodo]);
    }


    setInputText("");
    setPriority("Medium");
    setCategory("General");
    setTags("");
    setDueDate("");
  };


  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const editTodo = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    if (!todoToEdit) return;


    setEditingId(id);
    setInputText(todoToEdit.text);
    setPriority(todoToEdit.priority);
    setCategory(todoToEdit.category);
    setTags(todoToEdit.tags.join(", "));
    setDueDate(todoToEdit.dueDate || "");
  };


  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };


  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );


    const matchesPriority =
      filterPriority === "All" || todo.priority === filterPriority;


    const matchesCategory =
      filterCategory === "All" || todo.category === filterCategory;


    return matchesSearch && matchesPriority && matchesCategory;
  });


  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
      </header>


      <div className="filter-section">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
        </select>
      </div>


      <form onSubmit={handleAddOrUpdateTodo} className="add-todo-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter a new TODO..."
          className="todo-input"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
        </select>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">
          {editingId ? "Update Task" : "Add Task"}
        </button>
      </form>


      <ul className="todo-list">
        {filteredTodos.length === 0 && (
          <p className="no-todos">No tasks match your filters.</p>
        )}
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.priority.toLowerCase()}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}{" "}
              <small>
                ({todo.priority}) - {todo.category}
                {todo.dueDate && ` | Due: ${todo.dueDate}`}
              </small>
              {todo.tags.length > 0 && (
                <div className="tags">
                  {todo.tags.map((tag, i) => (
                    <span key={i} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </span>
            <button onClick={() => editTodo(todo.id)} className="edit-btn">
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>


      {todos.length > 0 && (
        <div className="todo-stats">
          Total Tasks: {todos.length} | Completed:{" "}
          {todos.filter((todo) => todo.completed).length}
        </div>
      )}
    </div>
  );
}


export default App;


