import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MainBox = styled.div`
  background-color: white;
  padding: 1.7rem 1rem;
  margin: 1rem 0;
  border-radius: 0.4rem;
  box-shadow: 0.2rem 0.2rem 0.4rem #ececec;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    padding: 1rem 0;
  }
`;
const OrderBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`;
const TextBox = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1.9rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    flex-direction: column;
    span {
      font-size: 1.3rem;
    }
  }
`;

const OrderStatusBox = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 22%;
  padding: 1.5rem 1rem;
  padding-top: 0.5rem;
  border-radius: 0.4rem;
  justify-content: start;
  align-items: start;
  text-align: center;
  p {
    font-size: 1.3rem;
  }
  span {
    font-size: 1rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 80%;
    margin: auto;
  }
`;

const UserOrdersStatus = () => {
  const labelName = useSelector((state) => state.labelName);
  const userId = useSelector((state) => state.userId);

  const [pendingOrd, setPendingOrd] = useState(null);
  const [processingOrd, setProcessingOrd] = useState(null);
  const [compOrd, setCompOrd] = useState(null);
  const [totalOrd, setTotalOrd] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/user-all-orders/?user=${userId}`
    );
    const data = await res.json();

    if (res.ok) {
      const arr = data.orders;
      const com = arr.filter((ord) => {
        return (
          ord.status === "pending" ||
          ord.status === "completed" ||
          ord.status === "processing"
        );
      });

      const pending = arr.filter((ord) => {
        return ord.status === "pending" && ord.deleted != true;
      });
      const comp = arr.filter((ord) => {
        return ord.status === "completed" && ord.deleted != true;
      });
      const proc = arr.filter((ord) => {
        return ord.status === "processing" && ord.deleted != true;
      });
      setTotalOrd(com);
      setProcessingOrd(proc);
      setCompOrd(comp);
      setPendingOrd(pending);
    } else {
    }
    setIsloading(false);
  };

  useEffect(() => {
    fetcher();
    return () => {};
  }, []);
  return (
    <MainBox>
      <TextBox>
        <span>Hi</span>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            letterSpacing: ".07rem",
            textTransform: "capitalize",
          }}
        >
          {labelName},
        </span>
        <span>Welcome to the Rivaaz Films.</span>
      </TextBox>
      <OrderBox>
        <OrderStatusBox
          style={{
            backgroundColor: "#3224DB",
          }}
        >
          <p>Total Albums</p>
          <span> Albums - {totalOrd && totalOrd.length}</span>
        </OrderStatusBox>
        <OrderStatusBox
          style={{
            backgroundColor: "#3399FF",
          }}
        >
          <p>Pending for Aprroval</p>
          <span>Albums - {pendingOrd && pendingOrd.length}</span>
        </OrderStatusBox>
        <OrderStatusBox
          style={{
            backgroundColor: "#E55353",
          }}
        >
          <p>Processing</p>
          <span>Albums - {processingOrd && processingOrd.length}</span>
        </OrderStatusBox>
        <OrderStatusBox
          style={{
            backgroundColor: "#3BDF95",
          }}
        >
          <p>Completed</p>
          <span>Albums - {compOrd && compOrd.length}</span>
        </OrderStatusBox>
      </OrderBox>
    </MainBox>
  );
};

export default UserOrdersStatus;
