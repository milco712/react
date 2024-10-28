import { Posts } from "../imports/api/collections";

Meteor.methods({
  "post.detail"(id) {
    return Posts.findOne({ _id: id });
  },
});

const initialData = [
  {
    authorId: "user01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "Oasis",
    secTitle: "노엘 갤러거",
    secContent: "오아시스의 리더, 메인 송라이터이자 서브보컬, 기타리스트",
    tags: ["밴드", "영국", "해체", "갤러거", "노엘", "리암"],
    likesCount: 0,
    isArchive: false,
    isPrivate: false,
  },
  {
    authorId: "user01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "몬스터",
    secTitle: "줄거리",
    secContent:
      "텐마라는 미래가 유망한 의사가 어떤 생명을 구하는 수술을 하는 과정에서 두명의 환자 중 한사람을 선택해야 하는 상황에 처하게 되는데 그 상황에서 병원 측이 추천하는 수술을 하지 않고 한 아이를 살려낸다. 텐마는 그 수술을 시점으로 창창했던 인생이 몰락하게 되고.. 텐마는 회복 중인 그 아이에게 하소연을 한다. 후에 수술을 한 아이는 사라지고 후에 압력을 주었던 병원측 관계자들이 텐마가 수술해준 아이에 의하여 모두 사망한다. 그리고 시간은 흘러 텐마 앞에 수술을 해주었던 소년은 몬스터 라는 소시오패스가 되어 나타나고 텐마가 직접 살린 그 소년을 자신의 손으로 직접 죽이러 찾아가는데...",
    tags: ["만화", "우라사와나오키", "텐마켄조", "요한", "니나"],
    likesCount: 0,
    isArchive: false,
    isPrivate: false,
  },
  {
    authorId: "user01",
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "정경화",
    secTitle: "fasdfd",
    secContent:
      "한국의 바이올리니스트. 여성 바이올리니스트로서, 동양인 클래식 연주자로서 전례가 없는 국제적 인지도와 활동 영역을 일군 선구자적 인물이며 세계적인 바이올린의 여제 및 대거장",
    tags: ["바이올리니스트", "클래식", "연주자"],
    likesCount: 0,
    isArchive: false,
    isPrivate: true,
  },
];

// Posts.remove({});

if (Posts.find().count() === 0) {
  initialData.forEach((data) => {
    Posts.insert({
      authorId: data.authorId,
      createdAt: data.createdAt,
      modifiedAt: data.modifiedAt,
      title: data.title,
      secTitle: data.secTitle,
      secContent: data.secContent,
      tags: data.tags,
      likesCount: data.likesCount,
      isArchive: data.isArchive,
      isPublic: data.isPublic,
    });
  });
}
