import re

with open("src/pages/AdminPanel.jsx", "r") as f:
    content = f.read()

# Add states
content = re.sub(
    r"const \[paymentForm\] = Form\.useForm\(\);",
    r"const [paymentForm] = Form.useForm();\n  const [linkingModalVisible, setLinkingModalVisible] = useState(false);\n  const [linkingForm] = Form.useForm();",
    content
)

# Add handlers
handlers = """  const handlePaymentModalCancel = () => {
    setPaymentModalVisible(false);
    paymentForm.resetFields();
  };

  const handleOpenLinkingModal = () => {
    setLinkingModalVisible(true);
    setOpen(false);
  };

  const handleLinkingModalCancel = () => {
    setLinkingModalVisible(false);
    linkingForm.resetFields();
  };

  const handleLinkingSubmit = (values) => {
    const payload = {
      parentuser: values.parentuser,
      childusers: values.childusers,
    };
    console.log("User Linking Payload:", payload);
    message.success("User linking data logged to console");
    setLinkingModalVisible(false);
    linkingForm.resetFields();
  };"""

content = re.sub(
    r"  const handlePaymentModalCancel = \(\) => \{\n    setPaymentModalVisible\(false\);\n    paymentForm\.resetFields\(\);\n  \};",
    handlers,
    content
)

# Add float button
float_button = """        <FloatButton
          onClick={handleOpenPaymentModal}
          tooltip={<div>Add Payment/Bonus</div>}
          icon={
            <BsCashCoin
              style={{
                color: "#389e0d",
              }}
            />
          }
        />
        <FloatButton
          onClick={handleOpenLinkingModal}
          tooltip={<div>User Linking</div>}
          icon={
            <LinkOutlined
              style={{
                color: "#1677ff",
              }}
            />
          }
        />
      </FloatButton.Group>"""

content = re.sub(
    r"        <FloatButton\n          onClick=\{handleOpenPaymentModal\}\n          tooltip=\{<div>Add Payment/Bonus</div>\}\n          icon=\{\n            <BsCashCoin\n              style=\{\{\n                color: \"#389e0d\",\n              \}\}\n            />\n          \}\n        />\n      </FloatButton.Group>",
    float_button,
    content
)

# Add modal
modal_code = """        </Form>
      </Modal>

      {/* User Linking Modal */}
      <Modal
        title="User Linking"
        open={linkingModalVisible}
        onCancel={handleLinkingModalCancel}
        footer={null}
        width={500}
      >
        <Form
          form={linkingForm}
          layout="vertical"
          onFinish={handleLinkingSubmit}
        >
          <Form.Item
            name="parentuser"
            label="Select Parent User"
            rules={[{ required: true, message: "Please select a parent user" }]}
          >
            <Select
              showSearch
              placeholder="Search and select parent user"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name} ({user.contactNum})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="childusers"
            label="Select Child Users"
            rules={[
              { required: true, message: "Please select at least one child user" },
            ]}
          >
            <Select
              mode="multiple"
              showSearch
              placeholder="Search and select child users"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name} ({user.contactNum})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <Button onClick={handleLinkingModalCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<LinkOutlined />}>
                Link Users
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>"""

content = re.sub(
    r"        </Form>\n      </Modal>",
    modal_code,
    content,
    count=1
)

with open("src/pages/AdminPanel.jsx", "w") as f:
    f.write(content)
