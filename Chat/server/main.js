import { Chats, Users } from "../imports/api/collections";

Meteor.methods({
  chatSend: (message, from) => {
    return Chats.insert({
      createdAt: new Date(),
      message,
      user_id: from,
    });
  },
});

// Users.remove({});

const initUser = [
  {
    uname: "user1",
    password: "password",
    email: "user1@email.com",
    profile: {
      name: "jane",
      address: "seoul",
    },
  },
  {
    uname: "user2",
    password: "password",
    email: "user2@email.com",
    profile: {
      name: "david",
      address: "seoul",
    },
  },
];

if (!Users.findOne()) {
  initUser.forEach((init) => {
    Users.insert({
      uname: init.uname,
      password: init.password,
      email: init.email,
      profile: {
        name: init.name,
        address: init.address,
      },
    });
  });
}
