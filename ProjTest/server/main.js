// Meteor.users.remove({});

if (!Meteor.users.findOne()) {
  Accounts.createUser({
    username: "user1",
    password: "password",
    email: "user1@email.com"
  });
}