import React, { useState, useEffect } from "react";


function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://192.168.0.10:4000/todos');
      const data = await response.json();
      console.log(response);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }

  }

  useEffect(() => {
    fetchTodos();
  }, []);


  const addTodo = async () => {
    if (newTodo.trim() === "") return;

    try {
      await fetch('http://192.168.0.10:4000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTodo }),
      });

      fetchTodos();
      setNewTodo("");
    } catch (error) {
      console.error('Error adding todo: ', error);
    }
  }

  const toggleCheckTodo = () => {

  }

  const deleteTodo = () => {

  }


  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      {todos.map(todo => {
        return (
          <div key={todo._id}>
            {todo.completed ? <del>todo.task</del> : todo.task}
            <button onClick={toggleCheckTodo(todo._id, todo.completed)}>
              {todo.completed ? "incomplete" : "complete"}
            </button>
            <button onClick={deleteTodo(todo._id)}>Delete</button>
          </div>
        )
      })}
    </>
  );
}

export default App;
