import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // 서버에서 데이터 가져오기
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:4000/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();

    if (newTodo.trim() === "") return;

    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTodo })
      });

      if (response.ok) {
        fetchTodos();
        setNewTodo('');
        console.log('successfully inserted!');
      } else {
        alert('Failed to insert new todo.');
      }
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: 'DELETE'
      });
      console.log(response);
      if (response.ok) {
        console.log('successfully deleted!');
        fetchTodos();
      } else {
        console.log('Failed to delete the todo.');
      }
    } catch (error) {
      console.log('Error removing the todo:', error);
    }
  }

  // Check todo
  const toggleCheck = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      });
      if (response.ok) {
        fetchTodos();
        console.log('successfully changed!');
      } else {
        alert('Failed to change the todo status.');
      }
    } catch (error) {
      console.log('Error changing the todo status:', error);
    }
  }



  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo} required />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => <li key={todo._id}>
          {todo.completed ? <del>{todo.task}</del> : todo.task}
          <button onClick={() => toggleCheck(todo._id, todo.completed)}>{todo.completed ? "incomplete" : "complete"}</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;


