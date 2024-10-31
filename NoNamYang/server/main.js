import { Data } from "../imports/api/collections";

Meteor.methods({
  scan(barcode) {
    let rslt = "남양이 아닙니다.";
    const numCode = barcode.substring(0, 3);
    Data.find().forEach((item) => {
      if (item.prod_num.startsWith(numCode)) {
        rslt = "남양입니다.";
      }
    });
    return rslt;
  },
});

Data.remove({});

if (!Data.findOne()) {
  Data.insert({
    prod_name: "맛있는 우유",
    prod_num: "123123123",
  });
  Data.insert({
    prod_name: "프렌치 카페",
    prod_num: "234234234",
  });
  Data.insert({
    prod_name: "불가리스",
    prod_num: "345345345",
  });
}
