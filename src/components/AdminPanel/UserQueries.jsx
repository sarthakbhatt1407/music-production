import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Breadcrumb } from "antd";
import { Collapse, Divider } from "antd";
import { useSelector } from "react-redux";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { notification } from "antd";
import { message } from "antd";
import { Empty } from "antd";
import MusicLoader from "../Loader/MusicLoader";

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  position: relative;
`;
const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  align-items: center;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: start;
    padding: 0;
    align-items: start;
    margin-bottom: 1rem;
    input {
      width: 100%;
    }
  }
`;

const UserQueries = () => {
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: msg,
    });
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const [queries, setQueries] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const userId = useSelector((state) => state.userId);

  const queriesFetcher = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/query/all-queries/?id=${userId}`
    );
    const data = await res.json();
    // console.log(data);
    setQueries(data.queries);
    setIsloading(false);
  };

  useEffect(() => {
    queriesFetcher();
    return () => {};
  }, []);

  return (
    <MainBox>
      {" "}
      {contextHolderNot}
      {contextHolder}{" "}
      <Breadcrumb
        items={[
          {
            title: "Admin Panel",
          },
          {
            title: "User Queries",
          },
        ]}
      />
      <HeaderBox>
        <h1>Queries</h1>
      </HeaderBox>
      {isLoading && <MusicLoader />}
      {!isLoading &&
        queries.length > 0 &&
        queries.map((q, i) => {
          return (
            <div key={q.id}>
              {" "}
              <Collapse
                size="large"
                items={[
                  {
                    key: "1",
                    label: `${q.name}`,
                    children: (
                      <p
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: ".7rem",
                        }}
                      >
                        <span>
                          <strong>Email - </strong> {q.email}
                        </span>
                        <span>
                          <strong>Phone - </strong> {q.phone}
                        </span>
                        <span>
                          <strong>Message - </strong> {q.message}
                        </span>
                        <button
                          style={{
                            width: "10%",
                            border: "none",
                            padding: ".5rem 1rem",
                            borderRadius: ".6rem",
                            cursor: "pointer",
                          }}
                          onClick={async () => {
                            setIsloading(true);
                            const res = await fetch(
                              `${process.env.REACT_APP_BASE_URL}/query/delete-query`,
                              {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  id: q.id,
                                }),
                              }
                            );
                            const data = await res.json();

                            if (res.ok) {
                              success(data.message);
                              setTimeout(() => {
                                window.location.reload();
                              }, 700);
                            } else {
                              error(data.message);
                            }
                            setIsloading(false);
                          }}
                        >
                          <DeleteForeverOutlined />
                        </button>
                      </p>
                    ),
                  },
                ]}
              />
              {i < queries.length - 1 && <Divider orientation="left"></Divider>}
            </div>
          );
        })}
      {!isLoading && queries.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </MainBox>
  );
};

export default UserQueries;
