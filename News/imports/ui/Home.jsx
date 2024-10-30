import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { News, Companies } from "/imports/api/collections";

export default () => {
  const news = useTracker(() => {
    return [News.find().fetch(), Companies.find().fetch()];
  });
  return (
    <div>
      {News.find()
        .fetch()
        .map((news) => {
          return (
            <div key={news._id}>
              <a href={`/detail/${news._id}`}>
                {news.title} / {news.createdAt.toLocaleDateString()} /
                {Companies.findOne(news.company_id).name}
              </a>
            </div>
          );
        })}
    </div>
  );
};
