import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { News, Companies } from "/imports/api/collections";
import { useParams } from "react-router-dom";

export default () => {
  const { news_id } = useParams("news_id");
  const [news] = useTracker(() => {
    return [News.find({ _id: news_id }).fetch(), Companies.find().fetch()];
  });
  // return <div>{news[0].content}</div>;
  // return <div>{News.findOne(news_id)?.content}</div>;
  return (
    <div>
      {News.find(news_id)
        .fetch()
        .map((news) => {
          return <div key={news._id}>{news.content}</div>;
        })}
    </div>
  );
};
