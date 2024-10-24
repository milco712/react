import {Contacts} from "../imports/api/collections";

Meteor.methods({
  "contacts.fetch"(){
    return Contacts.find().fetch();
  },
  "contacts.add"(name, phone){
    return Contacts.insert({
      name,
      phone
    })
  },
  "contacts.delete"(id){
    return Contacts.remove(id)
  },
})

const initialData = [
  {
    name: "daniel",
    phone: "01092939480",
  },
  {
    name: "jenny",
    phone: "01038289291",
  },
  {
    name: "kevin",
    phone: "01027340002",
  }
]

// Contacts.remove({});
if (Contacts.find().count() === 0){
  initialData.forEach((init) => {
    Contacts.insert(
      {
        name: init.name,
        phone: init.phone,
        createdAt: new Date()
      }
    )
  })
}
