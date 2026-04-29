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

const InstaFbWhitelist = ({
  backTo = "/admin-panel/tools",
  title = "Insta / Fb Whitelist",
  description = "Use this form when a page link and release ISRC need whitelist approval.",
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Insta/Fb Whitelist", values);
    message.success("Whitelist form submitted successfully.");
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
                <Input placeholder="Label information" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="pageLink"
                label="Insta / Fb Page Link"
                rules={[
                  { required: true, message: "Please enter page link" },
                ]}
              >
                <Input placeholder="https://instagram.com/..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="isrc"
                label="ISRC"
                rules={[{ required: true, message: "Please enter ISRC" }]}
              >
                <Input placeholder="ISRC" />
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

export default InstaFbWhitelist;
