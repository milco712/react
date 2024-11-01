import { Users, Posts, Comments } from "../imports/api/collections";

Meteor.users.remove({});

if (!Meteor.users.findOne()) {
  Accounts.createUser({
    username: "user1",
    password: "password",
    email: "user1@email.com",
    profile: {
      name: "jane",
      nickname: "jjnn",
      age: 30,
    },
  });
}
