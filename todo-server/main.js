const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors'); // 특정 클라이언트와 연결하기 위함
const app = express(); // express 새 객체 생성
const PORT = process.env.PORT || 4000;

const uri = 'mongodb://localhost:27017'; // db 서버 주소
const client = new MongoClient(uri); // uri db 서버 정보 인스턴스 생성하여 client에 담음
const dbName = 'todoList';

app.use(cors()); // 외부 접근 요청에 대해 허용
app.use(express.json()); // 클라이언트가 서버로 POST 또는 PUT 요청을 보낼 때, JSON 데이터를 자동으로 파싱하여 req.body 객체에 담아줌


async function connectTodo() {
    await client.connect(); // db 서버 연결
    console.log('Connected to MongoDB');
    return client.db(dbName); // 연결된 데이터 베이스 객체 반환
}



app.get('/todos', async (req, res) => { // /todos애서 get 요청이 오면
    const db = await connectTodo(); // 연결된 데이터베이스 객체를 db에 담고
    const todos = await db.collection('todos').find().toArray(); // db를 참조해 todos 컬렉션에 접근하고, find쿼리로 데이터를 가져와 배열 형태로 변환
    // find로 조회하면 '도큐먼트'가 아닌 '커서 Cursor'를 사용해 결과를 반환한다.
    // 커서는 결과에 대한 포인터라고 할 수 있다.
    // 대량의 데이터를 메모리에 적재하지 않기 위해, 필요한 만큼 데이터를 한 번에 가져올 수 있도록 설계되었다.
    // 데이터를 모두 조회해 한 번에 처리하려면 toArray() 메서드를 사요해야 한다.
    res.json(todos); // 응답으로 todos 데이터 배열을 json 형식으로 반환
});


app.post('/todos', async(req, res) => { // /todos에서 post 요청이 오면
    const db = await connectTodo(); // 연결된 데이터베이스 객체를 db에 담고
    const newTodo = { // 전달받을 데이터로 newTodo 객체 생성
        task: req.body.task, // post 요청으로 전달된 데이터는 req.body 객체에 저장된다.
        completed: false
    };
    const result = await db.collection('todos').insertOne(newTodo); // 연결된 데이터베이스의 todos 컬렉션에 접근해 newTodo를 추가
    res.json({_id: result.insertedId, task: newTodo.task, completed: newTodo.completed}); // 클라이언트에게 추가된 데이터를 json으로 응답(res)함
});


app.delete('/todos/:id', async (req, res) => { // 특정 id 기반으로 delete 요청이 들어오면
  const db = await connectTodo(); // 연결된 데이터베이스 객체를 db에 담고
  const { id } = req.params; // req.params는 경로 파라미터를 포함하는 객체인데 구조분해할당 방식으로 id 속성만 추출해 id 변수에 할당
  await db.collection('todos').deleteOne({ _id: new ObjectId(id) }); // 전달된 id는 string이기ㅏ에 ObjectId타입인 _id와 일치하기 위해 ObjectId 인스턴스로 변환하여 사용
  res.json({ message: 'Todo deleted succesfully' }); // 성공하면 클라이언트에 메시지 전달
});


app.post('/todos/:id/check', async (req, res) => { // /todos/:id/check로 post 요청이 들어오면
  const db = await connectTodo(); // 연결된 데이터베이스 객체를 db에 담고
  const { id } = req.params; // req.params에서 id 값을 가져오고
  const { completed } = req.body; // req.boby에서 completed 값을 가져옴
  const result = await db.collection('todos').updateOne( 
    { _id: new ObjectId(id) }, // 해당 id 문서를 찾고
    { $set: { completed: completed } } // completed 값을 completed로 업데이트
  );
  res.json({ message: 'Todo status updated successfully', modifiedCount: result.modifiedCount }); // 성공하면 클라이언트에 메시지와 업데이트된 문서 수를 전달, 변경되지 않으면 0을 반환
});



app.listen(PORT, () => { // app.listen(PORT, callback)은 지정한 포트번호에서 서버를 실행시킴, 서버가 해당 포트에서 클라이언트 요청을 수신 대기하는 역할로 라우트, 미들웨어 설정이 완료된 상태여야 한다. 
  console.log(`Server running on port ${PORT}`); // 성공하면 콜백함수가 실행됨
});



async function addDummyDataIfEmpty() { // 더비 데이터 삽입 함수
  const db = await connectTodo(); // 연결된 데이터베이스 객체를 db에 담고
  const todoCollection = db.collection('todos'); // todos 컬렉션을 지정하고

  const todoCount = await todoCollection.countDocuments(); // 문서 수를 확인

  if (todoCount === 0) { // 문서 수가 0개이면
    const dummyTodos = [
      { task: 'Buy groceries', completed: false },
      { task: 'Walk the dog', completed: false },
      { task: 'Read a book', completed: false },
    ];

    await todoCollection.insertMany(dummyTodos); // 더미 데이터 삽입
    console.log('Dummy todos inserted'); // 완료되면 메시지 출력
  } else {
    console.log('Todo already exist, skipping dummy data insertion'); // 문서 수 0개가 아니면 메시지 출력
  }
}

addDummyDataIfEmpty();