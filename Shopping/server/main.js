import { Products, Bags, Logs } from "../imports/api/collections";

Meteor.methods({
  insertProduct(product) {
    product.createdAt = new Date();
    return Products.insert(product);
  },

  removeProduct(id) {
    return Products.remove(id);
  },
  insertBag(prod_id) {
    const bag = Bags.findOne({ prod_id: prod_id });
    if (!bag) {
      return Bags.insert({
        prod_id,
      });
    } else {
      console.log("Already added");
    }
  },
  removeBag(id) {
    return Bags.remove(id);
  },
});
