import React, { useState, useEffect } from "react";

import "./alertfeed.css";

import {
  getAlertFeed,
  checkAlertFeed,
  deleteAlertFeed,
} from "../../api/feed.js";
import { timeForToday } from "../../api/time.js";

const AlertFeed = (token) => {
  const [alertfeeds, setAlertFeed] = useState([]);

  function cutStrings(string) {
    if (string.length >= 7) {
      return string.substr(0, 7) + "...";
    } else return string;
  }

  useEffect(() => {
    getAlertFeed(token.token, setAlertFeed);
  }, []);

  const checkAlert = async (id, checked) => {
    if (!checked) {
      await checkAlertFeed(token.token, id);
      await setTimeout(() => {
        getAlertFeed(token.token, setAlertFeed);
      }, 100);
    }
  };

  const deleteAlert = async (id) => {
    await deleteAlertFeed(token.token, id);
    await setTimeout(() => {
      getAlertFeed(token.token, setAlertFeed);
    }, 100);
  };

  return (
    <>
      <ul className="alert-container">
        <span id="alert-container-title">Alert</span>
        {alertfeeds.map((feed) => {
          switch (feed.content_type) {
            case "comment":
              return (
                <li
                  key={feed.id}
                  onClick={() => checkAlert(feed.id, feed.checked)}
                  style={
                    feed.checked
                      ? {
                          backgroundColor: "rgb(230, 230, 230)",
                        }
                      : {}
                  }
                >
                  <span id="alert-bold">{feed.nickname}</span>님이{" "}
                  <span id="alert-bold">{`'${cutStrings(feed.body)}'`}</span> 에
                  댓글을 남겼습니다.
                  <div id="alert-time">
                    {timeForToday(feed.created_at)}
                    <span
                      id="alert-delete"
                      onClick={() => deleteAlert(feed.id)}
                    >
                      삭제
                    </span>
                  </div>
                </li>
              );

            case "like":
              return (
                <li
                  key={feed.id}
                  onClick={() => checkAlert(feed.id, feed.checked)}
                  style={
                    feed.checked
                      ? { backgroundColor: "rgb(230, 230, 230)" }
                      : {}
                  }
                >
                  <span id="alert-bold">{feed.nickname}</span>님이{" "}
                  <span id="alert-bold">{`'${cutStrings(feed.body)}'`}</span> 를
                  좋아합니다.
                  <div id="alert-time">
                    {timeForToday(feed.created_at)}
                    <span
                      id="alert-delete"
                      onClick={() => deleteAlert(feed.id)}
                    >
                      삭제
                    </span>
                  </div>
                </li>
              );
            case "follow":
              return (
                <li
                  key={feed.id}
                  onClick={() => checkAlert(feed.id, feed.checked)}
                  style={
                    feed.checked
                      ? { backgroundColor: "rgb(230, 230, 230)" }
                      : {}
                  }
                >
                  <span id="alert-bold">{feed.nickname}</span>님이 회원님을
                  팔로우 합니다.
                  <div id="alert-time">
                    {timeForToday(feed.created_at)}
                    <span
                      id="alert-delete"
                      onClick={() => deleteAlert(feed.id)}
                    >
                      삭제
                    </span>
                  </div>
                </li>
              );
            default:
              return;
          }
        })}
      </ul>
    </>
  );
};

export default AlertFeed;
