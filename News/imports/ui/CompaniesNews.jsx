import React, { useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { News, Companies } from "/imports/api/collections";
import { useParams } from "react-router-dom";

export default () => {
  const { company_id } = useParams("company_id");
  const comp = useTracker(() => {
    return Companies.findOne({ _id: company_id });
  });

  const companyNews = useTracker(() => {
    return News.find({ company_id }).fetch();
  });

  return (
    <div>
      <h3>{comp.name}</h3>
      {companyNews.map((news) => (
        <div key={news.id}>
          <a href={`/detail/${news._id}`}>{news.title}</a>
        </div>
      ))}
    </div>
  );
};
