import { Mongo } from "meteor/mongo";

export const Posts = new Mongo.Collection("posts");
export const Sections = new Mongo.Collection("sections");
