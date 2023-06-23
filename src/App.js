import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Update local storage whenever TODOs change
  useEffect(() => {
    if (todos.length){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      addTodo();
    }
  };

  const addTodo = () => {
    const newTodo = {
      id: new Date().getTime(),
      text: inputValue,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const resetTodos = () => {
    localStorage.setItem('todos',JSON.stringify([]))
    setTodos([]);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.id - a.id;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO App</h1>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Add a todo"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="todo-list">
          {sortedTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-card ${todo.completed ? 'completed' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </div>
          ))}
        </div>
        <button className="reset-button" onClick={resetTodos}>
          Reset
        </button>
      </header>
    </div>
  );
}

export default App;
