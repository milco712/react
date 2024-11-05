import { Files } from "../imports/api/collections";


if (!Meteor.users.findOne({ username: "admin"})) {
    Accounts.createUser({
        username: "admin",
        password: "password",
        profile: {
            name: "hani",
            age: 30,
            profile_image_id: null
        }
    })
}