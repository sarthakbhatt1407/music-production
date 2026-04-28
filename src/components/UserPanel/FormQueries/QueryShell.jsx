import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Page = styled.div`
  min-height: 100%;
  overflow: auto;
  padding: 8px;
`;

const Hero = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 1rem 1.1rem;
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.05);

  h1 {
    margin: 0;
    font-size: 1.35rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #111827;
  }

  p {
    margin: 0.4rem 0 0;
    color: #667085;
    line-height: 1.45;
    max-width: 72ch;
  }
`;

const Body = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
`;

const FormQueryShell = ({ title, description, backTo, children }) => {
  return (
    <Page>
      <Hero>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link to={backTo || "/user-panel/form-query"}>
          <Button icon={<ArrowLeftOutlined />}>Back</Button>
        </Link>
      </Hero>

      <Body>{children}</Body>
    </Page>
  );
};

export default FormQueryShell;
