import { Posts } from "../imports/api/collections";

Meteor.methods({
  "posts.fetch"(){
    return Posts.find({},{sort: {modifiedAt: -1}}).fetch();
  }
})


const initialData = [
  {
    authorId: "test01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "Oasis",
    tags: ["밴드", "영국", "해체", "갤러거", "노엘", "리암"],
    likesCount: 0,
    isArchive: false,
    isPublic: true
  },
  {
    authorId: "test01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "몬스터",
    tags: ["만화", "우라사와나오키", "텐마켄조", "요한", "니나"],
    likesCount: 0,
    isArchive: false,
    isPublic: true
  },
  {
    authorId: "test01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "10대 기타 리프",
    tags: ["기타", "락", "밴드", "ac/dc", "deeppurple"],
    likesCount: 0,
    isArchive: false,
    isPublic: true
  },
]

if ( Posts.find().count() === 0 ){
  initialData.forEach((data)=> {
    Posts.insert({
      authorId: data.authorId,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
      title: data.title,
      tags: data.tags,
      likesCount: data.likesCount,
      isArchive: data.isArchive,
      isPublic: data.isPublic,
    })
  })
}