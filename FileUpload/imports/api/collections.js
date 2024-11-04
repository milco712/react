import { Mongo } from "meteor/mongo";
import { FilesCollection } from "meteor/ostrio:files";

export const Users = new Mongo.Collection("users");
export const Files = new FilesCollection({
  collectionName: "files",
});
