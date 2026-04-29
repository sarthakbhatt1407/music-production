import React from "react";
import styled from "styled-components";
import { Card, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  UploadOutlined,
  ShareAltOutlined,
  YoutubeOutlined,
  GlobalOutlined,
  FormOutlined,
} from "@ant-design/icons";

const Page = styled.div`
  padding: 8px;
  overflow: scroll;

  height: 90svh;
  padding-bottom: 2rem;
`;

const Hero = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.05);

  h1 {
    margin: 0;
    font-size: 1.35rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #111827;
  }

  p {
    margin: 0.35rem 0 0;
    color: #667085;
    line-height: 1.45;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 320px));
  gap: 1rem;
`;

const ToolCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #e6ebf3;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  overflow: hidden;

  .ant-card-body {
    padding: 1.1rem;
  }

  .ant-card-meta-title {
    font-size: 1rem;
    color: #111827;
  }

  .ant-card-meta-description {
    color: #667085;
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
  margin-top: 1rem;
`;

const CardLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const SectionTitle = styled.h2`
  margin: 1.5rem 0 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #111827;
`;

const SecondaryGrid = styled(Card)`
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  margin-top: 1rem;

  .ant-card-body {
    padding: 1rem;
  }
`;

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
`;

const queryCards = [
  {
    title: "Social Media Linking",
    description: "Collect artist name, ISRC, and social links.",
    icon: <ShareAltOutlined />,
    to: "/admin-panel/tools/social-media-linking",
    tag: "Linking",
  },
  {
    title: "YouTube OAC Request",
    description: "Submit channel info and three ISRC references.",
    icon: <YoutubeOutlined />,
    to: "/admin-panel/tools/youtube-oac-request",
    tag: "YouTube",
  },
  {
    title: "Insta / Fb Whitelist",
    description: "Send label info, page link, and ISRC details.",
    icon: <GlobalOutlined />,
    to: "/admin-panel/tools/insta-fb-whitelist",
    tag: "Whitelist",
  },
  {
    title: "Insta Reel Credit",
    description: "Credit request form for reel or audio page links.",
    icon: <FormOutlined />,
    to: "/admin-panel/tools/insta-reel-credit",
    tag: "Credit",
  },
];

const AdminTools = () => {
  return (
    <Page>
      <CardGrid>
        <ToolCard
          title="Bulk Upload"
          extra={<Tag color="blue">Primary</Tag>}
          bordered={false}
        >
          <IconBadge>
            <UploadOutlined />
          </IconBadge>
          <Card.Meta
            title="Bulk Upload"
            description="Upload an Excel sheet with matching thumbnails and audio files."
          />
          <Actions>
            <Link to="/admin-panel/bulk-upload">
              <Button type="primary" icon={<UploadOutlined />}>
                Open Bulk Upload
              </Button>
            </Link>
          </Actions>
        </ToolCard>
      </CardGrid>

      <SectionTitle>Form Queries</SectionTitle>
      <SecondaryGrid bordered={false}>
        <QuickGrid>
          {queryCards.map((card) => (
            <CardLink key={card.to} to={card.to}>
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
        </QuickGrid>
      </SecondaryGrid>
    </Page>
  );
};

export default AdminTools;
