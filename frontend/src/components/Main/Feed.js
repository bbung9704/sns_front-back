// 작성자(닉네임, 아이디), 작성자 아바타, 작성일시, 내용, 사진(여러장 가능), 댓글, 좋아요
import React from "react";

import Avatar from "@material-ui/core/Avatar";

// YYYY-MM-DD
export function timeFormat(date_value) {
  const date = new Date(date_value);
  const year = leadingZeros(date.getFullYear(), 4);
  const month = leadingZeros(date.getMonth(), 2);
  const day = leadingZeros(date.getDate(), 2);
  const hour = leadingZeros(date.getHours(), 2);
  const minute = leadingZeros(date.getMinutes(), 2);

  return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

function timeForToday(date_value) {
  const today = new Date();
  const timeValue = new Date(date_value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일전`;
  }

  return timeFormat(date_value).substring(5, 10);
}

const Feed = (data) => {
  return (
    <>
      <div
        style={{
          marginTop: "0.5rem",
          borderBottom: "1px solid var(--sub-color)",
        }}
      >
        <div className="user">
          <Avatar
            alt={data.data.username}
            src={data.data.userimage}
            style={{ width: "35px", height: "35px" }}
          />
          <span className="user-nick">{data.data.nickname}</span>
          <span className="user-time">{`@${data.data.username}・${timeForToday(
            data.data.created_at
          )}`}</span>
        </div>
        <p>{data.data.body}</p>
        <div className="image-container">
          <img src={data.data.image[0]} style={{ maxWidth: "100%" }}></img>
        </div>
      </div>
    </>
  );
};

export default Feed;
