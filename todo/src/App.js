import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // 서버에서 데이터 가져오기
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:4000/todos'); // fetch는 네트워크 요청을 수행하기 위한 api이다. 해당 url로 get요청을 보내 데이터를 받아온다. 특정 메서드를 명시하지 않으면 get
      const data = await response.json(); // 서버에서 받아온 json데이터를 자바스크립트 객체로 변환
      setTodos(data); // setTodos를 호출하면 새로운 값으로 업데이트하며, 해당하는 컴포너트를 다시 렌더링해 출력한다.
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);



  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault(); // form이 제출될때 새로고침되는 걸 방지

    if (newTodo.trim() === "") return; // trim은 문자 양 끝 공백을 제거한다. newTodo가 공백이면 함수 실행을 종료

    try {
      const response = await fetch('http://localhost:4000/todos', { // 해당 url로 요청을 보낼거임
        method: 'POST', // POST 메서드로 새로운 데이터 추가 요청임
        headers: { // 본문에 JSON 형식인걸 알리고
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newTodo }) // 본문 body에는 newTodo 값은 JSON 형식으 문자열 값으로 변환하여 담음
      });

      if (response.ok) { // POST 요청이 성공하면
        fetchTodos(); // 데이터를 다시 가져옴, 그럼 서버에서 전달중 새 todo는 왜 받는거지?
        setNewTodo(''); // 입력 필드 초기화
        console.log('successfully inserted!');
      } else {
        alert('Failed to insert new todo.');
      }
    } catch (error) {
      console.log('Error fetching todos:', error);
    }
  }


  // Delete todo
  const deleteTodo = async (id) => { // 매개변수 id를 받아
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}`, { // 해당 url로 요청 보냄
        method: 'DELETE' // DELETE 데이터 삭제 요청을
      });
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
  const toggleCheck = async (id, completed) => { // 매개변수로 id와 completed를 받아
    try {
      const response = await fetch(`http://localhost:4000/todos/${id}/check`, { // 해당 url로 요청보냄
        method: 'POST', // 데이터 변경 요청
        headers: {
          'Content-Type': 'application/json' // 본문 body가 json 형식
        },
        body: JSON.stringify({ completed: !completed }) // completed 값 변경
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


