import React from "react";
import styled from "styled-components";
import { Card, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  ShareAltOutlined,
  YoutubeOutlined,
  GlobalOutlined,
  FormOutlined,
} from "@ant-design/icons";
import QueryShell from "./QueryShell";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
`;

const ToolCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #e6ebf3;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  height: 230px;
  display: flex;
  flex-direction: column;

  .ant-card-body {
    padding: 1.1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-card-meta-title {
    font-size: 1rem;
    color: #111827;
  }

  .ant-card-meta-description {
    color: #667085;
    font-size: 0.55rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const IconBadge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eaf2ff;
  color: #1677ff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-top: 1rem;
`;

const CardLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const cards = [
  {
    title: "Social Media Linking",
    description: "Collect artist name, ISRC, and social links.",
    icon: <ShareAltOutlined />,
    slug: "social-media-linking",
    tag: "Linking",
  },
  {
    title: "YouTube OAC Request",
    // description: "Submit channel info and three ISRC references.",
    icon: <YoutubeOutlined />,
    slug: "youtube-oac-request",
    tag: "YouTube",
  },
  {
    title: "Insta / Fb Whitelist",
    description: "Send label info, page link, and ISRC details.",
    icon: <GlobalOutlined />,
    slug: "insta-fb-whitelist",
    tag: "Whitelist",
  },
  {
    title: "Insta Reel Credit",
    description: "Credit request form for reel or audio page links.",
    icon: <FormOutlined />,
    slug: "insta-reel-credit",
    tag: "Credit",
  },
];

const FormQueryHub = ({ basePath = "/admin-panel/tools" }) => {
  return (
    <QueryShell
      title="Form Query"
      description="Choose the request type below. Each card opens a dedicated form with the fields needed for that workflow."
    >
      <CardGrid>
        {cards.map((card) => (
          <CardLink key={card.slug} to={`${basePath}/${card.slug}`}>
            <ToolCard
              title={card.title}
              extra={<Tag color="blue">{card.tag}</Tag>}
              bordered={false}
            >
              <IconBadge>{card.icon}</IconBadge>
              <Card.Meta title={card.title} description={card.description} />
              <Actions>
                <Button type="primary">Open Form</Button>
              </Actions>
            </ToolCard>
          </CardLink>
        ))}
      </CardGrid>
    </QueryShell>
  );
};

export default FormQueryHub;
