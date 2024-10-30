import { Mongo } from "meteor/mongo";

export const Products = new Mongo.Collection("products");
export const Bags = new Mongo.Collection("bags");
export const logs = new Mongo.Collection("logs");
