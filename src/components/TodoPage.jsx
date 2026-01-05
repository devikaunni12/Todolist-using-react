import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TodoPage.css';

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('personal');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState('all');

  const inputRef = useRef(null); // 👈 ref for input

  const categories = ['personal', 'work', 'shopping', 'health'];

  // 👇 Focus input when page loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: input,
          completed: false,
          category,
          date
        }
      ]);
      setInput('');
      inputRef.current.focus(); // 👈 focus again after add
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const groupByCategory = (todoList) => {
    return todoList.reduce((groups, todo) => {
      if (!groups[todo.category]) {
        groups[todo.category] = [];
      }
      groups[todo.category].push(todo);
      return groups;
    }, {});
  };

  const pendingGrouped = groupByCategory(pendingTodos);
  const completedGrouped = groupByCategory(completedTodos);

  return (
    <div className="todo-page">
      <nav className="todo-navbar">
        <div className="nav-container">
          <h2 className="nav-title">Todo App</h2>

          <div className="nav-stats">
            <div
              className={`nav-stat ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              ⏳ Pending: {pendingTodos.length}
            </div>
            <div
              className={`nav-stat ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              ✅ Completed: {completedTodos.length}
            </div>
          </div>

          <Link to="/" className="nav-link">Home</Link>
        </div>
      </nav>

      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>

        <div className="todo-input-section">
          <label className="input-label">Add a new task:</label>
          <input
            type="text"
            ref={inputRef}               // 👈 ref attached
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task here..."
            className="todo-input"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />

          <label className="input-label">Choose date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />

          <label className="input-label">Choose category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <button onClick={addTodo} className="add-btn">
            Add Task
          </button>
        </div>

        <div className="todo-sections">
          {(filter === 'all' || filter === 'pending') && (
            <div className="todo-section">
              <h2 className="section-title">Pending Tasks</h2>
              {Object.keys(pendingGrouped).length === 0 ? (
                <p className="empty-message">No pending tasks!</p>
              ) : (
                Object.keys(pendingGrouped).map(cat => (
                  <div key={cat}>
                    <h3>{cat}</h3>
                    <ul className="todo-list">
                      {pendingGrouped[cat].map(todo => (
                        <li key={todo.id} className="todo-item">
                          <span className="todo-text">
                            {todo.text} - {new Date(todo.date).toLocaleDateString()}
                          </span>
                          <div className="todo-actions">
                            <button
                              onClick={() => toggleTodo(todo.id)}
                              className="toggle-btn"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="delete-btn"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}

          {(filter === 'all' || filter === 'completed') && (
            <div className="todo-section">
              <h2 className="section-title">Completed Tasks</h2>
              {Object.keys(completedGrouped).length === 0 ? (
                <p className="empty-message">No completed tasks yet!</p>
              ) : (
                Object.keys(completedGrouped).map(cat => (
                  <div key={cat}>
                    <h3>{cat}</h3>
                    <ul className="todo-list">
                      {completedGrouped[cat].map(todo => (
                        <li key={todo.id} className="todo-item completed">
                          <span className="todo-text">
                            {todo.text} - {new Date(todo.date).toLocaleDateString()}
                          </span>
                          <div className="todo-actions">
                            <button
                              onClick={() => toggleTodo(todo.id)}
                              className="toggle-btn"
                            >
                              Undo
                            </button>
                            <button
                              onClick={() => deleteTodo(todo.id)}
                              className="delete-btn"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
