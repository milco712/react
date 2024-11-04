import { Mongo } from "meteor/mongo";
import { FilesCollection } from "meteor/ostrio:files";

// export const LinksCollection = new Mongo.Collection('links');
export const Chats = new Mongo.Collection("chats");
export const Users = new Mongo.Collection("users2");
