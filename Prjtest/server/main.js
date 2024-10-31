import { Posts, Sections } from "../imports/api/collections";

// Posts.remove({});
Sections.remove({});

const insertPosts = () => {
  if (!Posts.findOne()) {
    const initPost = [
      {
        user_id: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "Oasis",
        tags: ["오아시스", "노엘", "리암", "영국"],
        likesCount: 0,
        isArchive: false,
        isPulic: true,
      },
      {
        user_id: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "몬스터",
        tags: ["만화", "독일", "인간내면", "우라사와나오키"],
        likesCount: 0,
        isArchive: false,
        isPulic: true,
      },
      {
        user_id: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "정경화",
        tags: ["바이올린", "바이올리니스트", "바흐"],
        likesCount: 0,
        isArchive: false,
        isPulic: false,
      },
    ];

    initPost.forEach((post) => {
      Posts.insert({
        user_id: post.user_id,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        title: post.title,
        tags: post.tags,
        likesCount: post.likesCount,
        isArchive: post.isArchive,
        isPulic: post.isPulic,
      });
    });
  }
};

const insertSections = () => {
  if (!Sections.findOne()) {
    const initSections = [
      {
        post_id: Posts.findOne({ title: "Oasis" })._id,
        sections: [
          {
            title: "노엘 갤러거",
            constent:
              "영국 맨체스터 출신의 락 뮤지션. 영국의 로큰롤 밴드 오아시스의 리더, 메인 송라이터이자 서브보컬, 기타리스트",
          },
          {
            title: "리암 갤러거",
            constent:
              "영국의 싱어송라이터. 록밴드 오아시스의 보컬이자 프론트맨이며 비디 아이의 전 보컬이자 프론트맨",
          },
          {
            title: "해체",
            constent:
              "2009년 V 페스티벌 공연 취소사태 이후, 8월 파리 공연 바로 전에 있었던, 언론이 놀라운 싸움(Wonderbrawl)이라 조롱하며 이름붙인 싸움이 꼽히는데, 확신할 수 없는 영국 찌라시의 보도를 포함해 여러 매체에서 나온 이야기를 종합해보면 리암이 노엘에게 자두를 던졌고 리암이 자기 기타를 노엘에게 휘둘렀다. 노엘이 리암의 기타를 발로 밟아 부수자 리암이 기타 진열대로 달려가 노엘의 기타들을 역시 부쉈고 노엘은 차를 타고 떠났다고 한다.",
          },
        ],
      },
      {
        post_id: Posts.findOne({ title: "몬스터" })._id,
        sections: [
          {
            title: "줄거리",
            constent:
              "독일을 중심으로 한 체코 등 일부 중부 유럽. 출세와 의사로서의 양심 사이에서 갈등하다가 의사로서의 양심을 택하면서 살려낸 소년 요한이 알고보니 아무렇지 않게 살인을 하는 몬스터였다는 사실을 알고서 좌절함과 동시에 그를 죽이기 위해 여행을 떠나는 일본인 의사 텐마의 여정",
          },
          {
            title: "요한은 왜 악마가 되었나?",
            constent:
              "첫번째 이유는 어머니가 둘중 둘중 한명을 넘겨주었기 때문이다.가장 소중한 존재인 어머니로부터 선택과 버림 즉 가치판단을 당하게 되버린 요한은 진짜 괴물은 어머니라고 생각해버린다.",
          },
          {
            title: "안나는 평범한 인간이 되었을까?",
            constent:
              "엄마에게 버려진 안나가 요한처럼 괴물이 되지않은 가장 큰 이유는 프란츠의 진실된 한마디였다.",
          },
        ],
      },
      {
        post_id: Posts.findOne({ title: "정경화" })._id,
        sections: [
          {
            title: "차이코프스키 협주곡",
            constent:
              "1970년엔 차이코프스키 협주곡 연주로 런던 데뷔를 하는데, 이 날의 연주가 대성공을 거두면서 순식간에 스타로 떠올랐다. 같은 해 유명 클래식 레이블인 데카에서 차이콥스키/시벨리우스 협주곡으로 첫 음반을 녹음했고, 그 데뷔반의 성공으로 데카의 전속 아티스트로 계약한다.",
          },
          {
            title: "바흐 샤콘느",
            constent:
              "2014년 말에는 런던 데뷔 무대였던 로열 페스티벌 홀에서 대대적인 컴백 리사이틀을 성공적으로 개최하는 등 국제적인 활동도 재개했다. 거의 십 년 동안 국제무대에서 자취를 감췄던 정경화의 컴백에 쏟아진 미디어의 관심은 굉장해서, 공연을 앞두고 뉴욕 타임즈와 중요 음악지 거의 모두에 인터뷰 기사가 실렸고 현악 전문지 The Strad엔 표지 모델로 등장했으며 BBC 라디오에만도 두 번이나 출연했다. ",
          },
        ],
      },
    ];

    initSections.forEach((section) => {
      Sections.insert({
        post_id: section.post_id,
      });
    });
  }
};

const initData = async () => {
  await insertPosts();
  await insertSections();
};

initData();
