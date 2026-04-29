import React from "react";
import styled from "styled-components";
import { Form, Input, Button, Row, Col, message } from "antd";
import QueryShell from "./QueryShell";

const FieldWrap = styled.div`
  .ant-form-item-label > label {
    color: #475467;
    font-weight: 500;
  }
`;

const InstaReelCredit = ({
  backTo = "/admin-panel/tools",
  title = "Insta Reel Credit",
  description = "Submit release details for reel credit or audio page attribution.",
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Insta Reel Credit", values);
    message.success("Insta reel credit form submitted successfully.");
    form.resetFields();
  };

  return (
    <QueryShell title={title} description={description} backTo={backTo}>
      <FieldWrap>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="labelInfo"
                label="Label Info"
                rules={[{ required: true, message: "Please enter label info" }]}
              >
                <Input placeholder="Label info" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="singerName"
                label="Singer Name"
                rules={[{ required: true, message: "Please enter singer name" }]}
              >
                <Input placeholder="Singer name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="songName"
                label="Song Name"
                rules={[{ required: true, message: "Please enter song name" }]}
              >
                <Input placeholder="Song name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="isrc"
                label="ISRC"
                rules={[{ required: true, message: "Please enter ISRC" }]}
              >
                <Input placeholder="ISRC" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="expectedTime"
                label="Expected Time of Song"
                rules={[
                  {
                    required: true,
                    message: "Please enter expected time of song",
                  },
                ]}
              >
                <Input placeholder="03:15" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="reelLink"
                label="Audio Page / Reel Link"
                rules={[
                  {
                    required: true,
                    message: "Please enter reel link",
                  },
                ]}
              >
                <Input placeholder="https://..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </FieldWrap>
    </QueryShell>
  );
};

export default InstaReelCredit;
