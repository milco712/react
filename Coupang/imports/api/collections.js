import { Mongo } from "meteor/mongo";

export const Users = new Mongo.Collection("users");
export const Products = new Mongo.Collection("products");
export const Carts = new Mongo.Collection("carts");
export const Payments = new Mongo.Collection("payments");
export const Points = new Mongo.Collection("points");

const users = {
  type: "",
  username: "",
  password: "",
  profile: {},
};

const products = {
  name: "",
  price: 0,
  amount: 0,
  desc: "",
  company: "",
  options: [],
};

const carts = {
  user_id: "",
  products: [],
};

const payments = {
  user_id: "",
  products: [],
};

const points = {
  user_id: "",
  payments_id: "",
  point: 0,
};
