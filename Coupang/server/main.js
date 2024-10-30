import {
  Users,
  Products,
  Carts,
  Payments,
  Points,
} from "../imports/api/collections";

const removeCollections = () => {
  Users.remove({});
  Products.remove({});
  Carts.remove({});
  Payments.remove({});
  Points.remove({});
};

removeCollections();

if (!Users.findOne()) {
  Users.insert({
    type: "buyer",
    username: "user1",
    password: "password",
  });
  Users.insert({
    type: "seller",
    username: "user2",
    password: "password",
  });
}

if (!Products.findOne()) {
  Products.insert({
    name: "adidas supuer running shoes",
    price: 10000,
    amount: 100,
    desc: "comfortable",
    company: "adidas",
    options: ["230", "240", "250"],
  });

  Products.insert({
    name: "nike walking shoes",
    price: 20000,
    amount: 100,
    desc: "comfortable",
    company: "nike",
    options: ["230", "240", "250"],
  });
}

const insertCartAPI = (user_id, product_id) => {
  let product = Products.findOne({ _id: product_id });
  Carts.insert({
    user_id,
    product,
  });
};

// 장바구니 생성하고 데이터 넣기
if (!Carts.findOne()) {
  const user_id = Users.findOne({ username: "user1" })._id;
  let product_id = Products.findOne({ company: "adidas" })._id;
  insertCartAPI(user_id, product_id);
  product_id = Products.findOne({ company: "nike" })._id;
  insertCartAPI(user_id, product_id);
}

// 장바구니 목록 보기
const getAllCart = (user_id) => {
  return Carts.find({ user_id: user_id }).fetch();
};

// 포인트 지급
const insertPoints = (user_id, points) => {
  Points.insert({
    user_id,
    points,
  });
};

// 장바구니 결제
const makePayment = (user_id) => {
  const cart = getAllCart(user_id);
  let totalPrice = 0;
  cart.forEach((c) => {
    totalPrice += c.product.price;
  });

  return Payments.insert({
    totalPrice,
    user_id,
    products: cart,
  });
};

if (!Payments.findOne()) {
  const user_id = Users.findOne({ username: "user1" })._id;
  const payment_id = makePayment(user_id);
  const payment = Payments.findOne({ _id: payment_id });
  const points = payment.totalPrice * 0.01;
  const point = insertPoints(user_id, points);
  console.log(point);
}
