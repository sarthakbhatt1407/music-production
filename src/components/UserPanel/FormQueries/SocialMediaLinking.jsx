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

const SocialMediaLinking = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Social Media Linking", values);
    message.success("Social media linking form submitted successfully.");
    form.resetFields();
  };

  return (
    <QueryShell
      title="Social Media Linking"
      description="Submit the artist identity and social links that need to be attached to the release."
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
                name="isrc"
                label="ISRC"
                rules={[{ required: true, message: "Please enter ISRC" }]}
              >
                <Input placeholder="ISRC" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="facebookLink"
                label="Facebook Link"
                rules={[{ required: true, message: "Please enter Facebook link" }]}
              >
                <Input placeholder="https://facebook.com/..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="instagramLink"
                label="Instagram Link"
                rules={[
                  { required: true, message: "Please enter Instagram link" },
                ]}
              >
                <Input placeholder="https://instagram.com/..." />
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

export default SocialMediaLinking;
