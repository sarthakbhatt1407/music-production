import React from "react";
import styled from "styled-components";
import { Card, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const Page = styled.div`
  min-height: 100%;
  padding: 8px;
  overflow: auto;
  background:
    radial-gradient(circle at top left, rgba(22, 119, 255, 0.08), transparent 30%),
    linear-gradient(180deg, #f7f9fc 0%, #f3f6fb 100%);
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

const AdminTools = () => {
  return (
    <Page>
      <Hero>
        <h1>Tools</h1>
        <p>
          Open one of the admin tools below. The bulk upload card routes to the
          dedicated uploader page.
        </p>
      </Hero>

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
    </Page>
  );
};

export default AdminTools;
