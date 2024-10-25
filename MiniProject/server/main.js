import { Books } from "../imports/api/collections";


Meteor.methods({
  "books.add"(title, author, price) {
    return Books.insert({
      title,
      author,
      price,
      createdAt: new Date(),
    })
  },

  "books.remove"(bookId){
    return Books.remove(bookId);
  },

  "books.fetch"(){
    return Books.find({},{sort: {createdAt: -1}}).fetch();
  },
});


if ( Books.find().count() === 0){
  const initialBooks = [
    {
      "title": "소년이 온다",
      "author": "한강",
      "price": "16400",
    },
    {
      "title": "작별하지 않는다",
      "author": "한강",
      "price": "17000",
    },
    {
      "title": "채식주의자",
      "author": "한강",
      "price": "17300",
    },
  ]

  initialBooks.forEach((book)=> {
    Books.insert({
      createdAt: new Date(),
      title: book.title,
      author: book.author,
      price: book.price
    });
  })
}

Books.find().forEach((n)=> {
  console.log(n)
});