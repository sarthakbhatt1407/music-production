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

const YoutubeOacRequest = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Youtube OAC Request", values);
    message.success("YouTube OAC request submitted successfully.");
    form.resetFields();
  };

  return (
    <QueryShell
      title="YouTube OAC Request"
      description="Share the channel details and three matching ISRCs for the request."
      backTo="/user-panel/form-query"
    >
      <FieldWrap>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="artistName"
                label="Artist Name"
                rules={[{ required: true, message: "Please enter artist name" }]}
              >
                <Input placeholder="Artist name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="youtubeChannelLink"
                label="YouTube Channel Link"
                rules={[
                  {
                    required: true,
                    message: "Please enter YouTube channel link",
                  },
                ]}
              >
                <Input placeholder="https://youtube.com/..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="topicChannelLink"
                label="Topic Channel Link"
                rules={[
                  {
                    required: true,
                    message: "Please enter Topic channel link",
                  },
                ]}
              >
                <Input placeholder="https://youtube.com/channel/..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="isrc1"
                label="ISRC 1"
                rules={[{ required: true, message: "Please enter ISRC 1" }]}
              >
                <Input placeholder="ISRC 1" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="isrc2"
                label="ISRC 2"
                rules={[{ required: true, message: "Please enter ISRC 2" }]}
              >
                <Input placeholder="ISRC 2" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="isrc3"
                label="ISRC 3"
                rules={[{ required: true, message: "Please enter ISRC 3" }]}
              >
                <Input placeholder="ISRC 3" />
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

export default YoutubeOacRequest;
