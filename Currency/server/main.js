import { HTTP } from "meteor/http";

Meteor.methods({
  "exchangeRates.get"(baseCurrency){
    try {
      const result = HTTP.call(
        "GET",
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      return result.data;
    } catch (error) {
      throw new Meteor.Error("API 호출 실패", error.message);
    }
  }
})