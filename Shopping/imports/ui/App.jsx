import React, { useState, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Products, Bags, Logs } from "../api/collections";

export const App = () => {
  const refProductName = useRef(null);
  const refProductPrice = useRef(null);

  useTracker(() => {
    return Products.find().fetch();
  });

  const handleProductInsert = () => {
    const product = {
      name: refProductName.current.value,
      price: parseInt(refProductPrice.current.value),
    };
    Meteor.call("insertProduct", product, (err, rslt) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rslt);
      }
    });
  };

  const handleProductRemove = (id) => {
    Meteor.call("removeProduct", id, (err) => {
      console.log(err);
    });
  };

  const handleProductBuy = (prod_id) => {
    Meteor.call("insertBag", prod_id, (err, rslt) => {
      if (err) {
        console.log(err);
      }
    });
  };

  return (
    <div>
      <input type="text" ref={refProductName} />
      <input type="text" ref={refProductPrice} />
      <button onClick={handleProductInsert}>Add</button>
      <hr />
      {Products.find()
        .fetch()
        .map((prod) => {
          return (
            <div key={prod._id}>
              {prod.name} / {prod.price}
              <button onClick={() => handleProductRemove(prod._id)}>
                delete
              </button>
              <button onClick={() => handleProductBuy(prod._id)}>buy</button>
            </div>
          );
        })}
      <hr />
      <h3>장바구니</h3>
      {Bags.find()
        .fetch()
        .map((bag) => {
          const prods = Products.find({ _id: bag._id }).fetch();
          return prods.map((p) => {
            return (
              <div>
                {p.name} / {p.price}
              </div>
            );
          });
        })}
      <div>금액: </div>
      <button>결제</button>
    </div>
  );
};
