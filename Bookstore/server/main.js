import { Books } from "../imports/api/collection";

Meteor.methods({
  "books.fetch"(){
    return Books.find({},{sort:{createdAt: -1}}).fetch();
  },
  "books.add"(title, author, price){
    return Books.insert({
      title,
      author,
      price,
      createdAt: new Date()
    })
  },
  "books.remove"(bookId){
    return Books.remove(bookId)
  }
})


const initialBooks = [
  {
    title: "Javascript",
    author: "Kevin",
    price: 13900,
    createdAt: new Date()
  },
  {
    title: "MongoDB",
    author: "Jane",
    price: 15300,
    createdAt: new Date()
  },
  {
    title: "React",
    author: "Amy",
    price: 20000,
    createdAt: new Date()
  },
]


if( Books.find().count() === 0 ){
  initialBooks.forEach((book) => {
    Books.insert({
      title: book.title,
      author: book.author,
      price: book.price,
      createdAt: new Date()
    })
  })
}