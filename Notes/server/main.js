import { Notes } from "../imports/api/collections";

Meteor.methods({
  "notes.insert"(message){
    return Notes.insert({
      message,
      createdAt: new Date()
    })
  },

  "notes.remove"(noteId){
    return Notes.remove(noteId);
  },

  "notes.fetch"(){
    return Notes.find({},{ sort: {createdAt: -1}}).fetch();
  },
});

if (Notes.find().count() === 0){
  const initialNotes = ["note 1","note 2","note3"];

  initialNotes.forEach((note)=> {
    Notes.insert({
      createdAt: new Date(),
      message: note,
    });
  });
}

Notes.find().forEach((n)=> {
  console.log(n)
});