// contacts라는 컬렉션 만들기
// Mongo 객체는 Meteor에서 전역 객체이다 그래서 import 할 필요가 없다
export const Contacts = new Mongo.Collection('contacts'); 
