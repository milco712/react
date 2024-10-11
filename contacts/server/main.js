import { Contacts } from "../imports/api/collections";

Meteor.methods({
  "contacts.fetch"(){
    return Contacts.find({}, {sort:{createdAt: -1}}).fetch(); // 최신순
  },
  
  "contacts.insert"(name, phone){
    return Contacts.insert({
      name,
      phone,
      createdAt: new Date(),
    });
  },

  "contacts.remove"(contactId){
    return Contacts.remove({
      contactId
    });
  },
});