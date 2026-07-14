import React from "react";
import styled from "styled-components";
import { Card, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  ShareAltOutlined,
  YoutubeOutlined,
  GlobalOutlined,
  FormOutlined,
  UploadOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const Page = styled.div`
  padding: 8px;
  overflow: scroll;

  height: 90svh;
  padding-bottom: 5rem;
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
  height: 300px;
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
    font-size: 0.85rem;
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
    description: "Submit channel info and three ISRC references.",
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

const managementCards = [
  {
    title: "Legal Documents",
    description: "View and manage legal documents.",
    icon: <FileTextOutlined />,
    fullPath: "/user-panel/reports",
    tag: "Legal",
  },
  {
    title: "Artists",
    description: "Manage artists.",
    icon: <UsergroupAddOutlined />,
    fullPath: "/user-panel/artist-management",
    tag: "Artists",
  },
];

const FormQueryHub = ({ basePath = "/user-panel/tools" }) => {
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
            description="Upload multiple songs via Excel sheet with matching thumbnails and audio files."
          />
          <Actions>
            <Link to={`${basePath}/bulk-upload`}>
              <Button type="primary" icon={<UploadOutlined />}>
                Open Bulk Upload
              </Button>
            </Link>
          </Actions>
        </ToolCard>
      </CardGrid>

      <SectionTitle>Management</SectionTitle>
      <SecondaryGrid bordered={false}>
        <QuickGrid>
          {managementCards.map((card) => (
            <CardLink
              key={card.fullPath}
              to={card.fullPath}
            >
              <ToolCard
                title={card.title}
                extra={<Tag color="blue">{card.tag}</Tag>}
                bordered={false}
              >
                <IconBadge>{card.icon}</IconBadge>
                <Card.Meta title={card.title} description={card.description} />
                <Actions>
                  <Button type="primary">Open</Button>
                </Actions>
              </ToolCard>
            </CardLink>
          ))}
        </QuickGrid>
      </SecondaryGrid>

      <SectionTitle>Form Queries</SectionTitle>
      <SecondaryGrid bordered={false}>
        <QuickGrid>
          {cards.map((card) => (
            <CardLink
              key={card.slug || card.fullPath}
              to={card.fullPath ? card.fullPath : `${basePath}/${card.slug}`}
            >
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

export default FormQueryHub;
