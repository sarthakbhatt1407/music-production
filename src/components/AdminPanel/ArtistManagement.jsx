import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FacebookOutlined,
  InstagramOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FaSpotify } from "react-icons/fa";
import { Apple } from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MusicLoader from "../Loader/MusicLoader";

const { Option } = Select;
const { Search } = Input;

const PageContainer = styled.div`
  padding: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;

  .ant-input-search {
    width: 300px;
  }
`;

const StyledTable = styled(Table)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SocialIcon = styled.div`
  cursor: pointer;
  color: #1677ff;
  font-size: 1.2rem;
  transition: all 0.3s;
  margin: 0 5px;

  &:hover {
    transform: scale(1.2);
  }
`;

const ArtistManagement = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [selectedRole, setSelectedRole] = useState("singer"); // Default role
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch artists on component mount
  useEffect(() => {
    fetchArtists();
  }, []);

  // Filter artists when search text or artists change
  useEffect(() => {
    filterArtists();
  }, [searchText, artists]);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/get-all-artists`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setArtists(data.artists);
        setFilteredArtists(data.artists);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
      messageApi.error("Failed to load artists");
    } finally {
      setLoading(false);
    }
  };

  // Function to filter artists based on search text
  const filterArtists = () => {
    if (!searchText) {
      setFilteredArtists(artists);
    } else {
      const filtered = artists.filter((artist) =>
        artist.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredArtists(filtered);
    }
  };

  // Handle search input change
  const handleSearch = (value) => {
    setSearchText(value);
  };

  const showAddModal = () => {
    setEditingArtist(null);
    setSelectedRole("singer"); // Reset to default role
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (artist) => {
    setEditingArtist(artist);
    setSelectedRole(artist.role);
    form.setFieldsValue({
      name: artist.name,
      role: artist.role,
      appleId: artist.appleId || "",
      spotifyId: artist.spotifyId || "",
      facebookUrl: artist.facebookUrl || "",
      instagramUrl: artist.instagramUrl || "",
      omny: artist.omny || "",
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/artist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // If delete was successful, update the local state
        setArtists(artists.filter((artist) => artist._id !== id));
        messageApi.success("Artist deleted successfully");
      } else {
        const errorData = await response.json();
        messageApi.error(errorData.message || "Failed to delete artist");
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
      messageApi.error("Failed to delete artist");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // If role is not singer, lyricist, or composer, remove social media fields
      if (!["singer", "lyricist", "composer"].includes(values.role)) {
        values.facebookUrl = "";
        values.instagramUrl = "";
        values.appleId = "";
        values.spotifyId = "";
      }

      if (editingArtist) {
        // Update existing artist
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/artist/${editingArtist._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Update the artist in the local state
          setArtists(
            artists.map((artist) =>
              artist._id === editingArtist._id ? data.artist : artist
            )
          );
          messageApi.success("Artist updated successfully");
        } else {
          messageApi.error(data.message || "Failed to update artist");
        }
      } else {
        // Add new artist
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/artist`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Add the new artist to the local state
          setArtists([...artists, data.artist]);
          messageApi.success("Artist added successfully");
        } else {
          messageApi.error(data.message || "Failed to add artist");
        }
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error saving artist:", error);
      messageApi.error("Failed to save artist");
    } finally {
      setLoading(false);
    }
  };

  // Handle role change
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  // Check if role needs social media fields
  const showSocialMediaFields = ["singer", "lyricist", "composer"].includes(
    selectedRole
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        { text: "Singer", value: "singer" },
        { text: "Composer", value: "composer" },
        { text: "Lyricist", value: "lyricist" },
        { text: "Music Director", value: "musicDirector" },
        { text: "Director", value: "director" },
        { text: "Producer", value: "producer" },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
    },
    {
      title: "Social Media",
      key: "social",
      render: (_, record) => (
        <Space size="middle">
          {record.facebookUrl && (
            <Tooltip title="Facebook">
              <SocialIcon>
                <Link to={record.facebookUrl} target="_blank">
                  <FacebookOutlined />
                </Link>
              </SocialIcon>
            </Tooltip>
          )}

          {record.instagramUrl && (
            <Tooltip title="Instagram">
              <SocialIcon>
                <Link to={record.instagramUrl} target="_blank">
                  <InstagramOutlined />
                </Link>
              </SocialIcon>
            </Tooltip>
          )}

          {record.appleId && (
            <Tooltip title="Apple Music">
              <SocialIcon>
                <Link to={record.appleId} target="_blank">
                  <Apple />
                </Link>
              </SocialIcon>
            </Tooltip>
          )}

          {record.spotifyId && (
            <Tooltip title="Spotify">
              <SocialIcon>
                <Link to={record.spotifyId} target="_blank">
                  <FaSpotify />
                </Link>
              </SocialIcon>
            </Tooltip>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this artist?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      {loading && <MusicLoader />}
      {contextHolder}
      <HeaderContainer>
        <Title>Artist Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Artist
        </Button>
      </HeaderContainer>

      <SearchContainer>
        <Search
          placeholder="Search artist name"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </SearchContainer>

      <StyledTable
        columns={columns}
        dataSource={filteredArtists}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 6,
          position: ["bottomCenter"],
        }}
      />

      <Modal
        title={editingArtist ? "Edit Artist" : "Add Artist"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter artist name" }]}
          >
            <Input placeholder="Enter artist name" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role" onChange={handleRoleChange}>
              <Option value="singer">Singer</Option>
              <Option value="composer">Composer</Option>
              <Option value="lyricist">Lyricist</Option>
              <Option value="musicDirector">Music Director</Option>
              <Option value="director">Director</Option>
              <Option value="producer">Producer</Option>
            </Select>
          </Form.Item>

          {/* Only show social media fields for singer, lyricist, and composer */}
          {showSocialMediaFields && (
            <>
              <Form.Item name="facebookUrl" label="Facebook URL">
                <Input placeholder="https://facebook.com/profile" />
              </Form.Item>

              <Form.Item name="instagramUrl" label="Instagram URL">
                <Input placeholder="https://instagram.com/profile" />
              </Form.Item>

              <Form.Item name="appleId" label="Apple Music URL">
                <Input placeholder="https://music.apple.com/artist/id" />
              </Form.Item>

              <Form.Item name="spotifyId" label="Spotify URL">
                <Input placeholder="https://open.spotify.com/artist/" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingArtist ? "Update" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ArtistManagement;
