import { Mongo } from "meteor/mongo";

export const Chats = new Mongo.Collection("chats");
export const Users = new Mongo.Collection("users");
