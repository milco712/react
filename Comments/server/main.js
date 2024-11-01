import { Data, Posts, Comments } from "../imports/api/collections";

Meteor.methods({
  insertPost: (post) => {
    post.createdAt = new Date();
    return Posts.insert(poset);
  },
});
