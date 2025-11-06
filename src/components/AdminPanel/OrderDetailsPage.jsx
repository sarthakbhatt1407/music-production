import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled, { keyframes, css } from "styled-components";
import MusicLoader from "../Loader/MusicLoader";
import {
  Image,
  Popconfirm,
  Typography,
  Breadcrumb,
  Button,
  Divider,
  message,
  Tooltip,
  Tag,
  Space,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// React Icons & Material UI Icons
import {
  FaEdit,
  FaTrash,
  FaDownload,
  FaArrowLeft,
  FaPlayCircle,
  FaFileAlt,
  FaCalendarAlt,
  FaInfoCircle,
  FaTag,
  FaCloudDownloadAlt,
  FaLink,
  FaUsers,
  FaUser,
  FaShieldAlt,
  FaApple,
  FaFacebook,
  FaInstagram,
  FaGlobe,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaTimesCircle,
  FaMusic,
  FaCopy,
  FaFileExcel,
  FaSpotify,
} from "react-icons/fa";

import {
  MdCheckCircleOutline,
  MdAccessTime,
  MdSync,
  MdCancel,
  MdErrorOutline,
  MdInfo,
  MdContentCopy,
  MdMusicNote,
  MdClose,
  MdDone,
} from "react-icons/md";

const { Title, Text, Paragraph } = Typography;

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Page container
const PageContainer = styled.div`
  width: 100%;
  height: 99%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.5s ease;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 10px;

    &:hover {
      background: #bfbfbf;
    }
  }

  h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: 8px;
`;

const NavigationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

// Main content card
const ContentCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  animation: ${slideUp} 0.6s ease;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  min-height: 600px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

// Album section (left side)
const AlbumSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f9f9fa 0%, #f1f2f6 100%);
  border-right: 1px solid #f0f0f0;
  padding: 40px 30px;
  gap: 24px;

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
    padding: 30px 20px;
  }
`;

const AlbumCover = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  img {
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    }
  }
`;

const AlbumTitle = styled(Title)`
  text-align: center !important;
  margin-top: 8px !important;
  margin-bottom: 8px !important;
  background: linear-gradient(90deg, #222, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AlbumDescription = styled(Paragraph)`
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  max-width: 320px;
  line-height: 1.6;
  font-size: 15px;
`;

const StyledAudioPlayer = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  max-width: 320px;

  .rhap_container {
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    padding: 12px;
  }

  .rhap_main-controls-button {
    color: #1677ff;
  }

  .rhap_progress-indicator {
    background: #1677ff;
  }

  .rhap_progress-filled {
    background: #1677ff;
  }

  .rhap_download-progress {
    background: #e6f4ff;
  }

  .rhap_time {
    color: rgba(0, 0, 0, 0.65);
  }

  .rhap_play-pause-button {
    font-size: 40px;
    width: 40px;
    height: 40px;
  }
`;

// Details section (right side)
const DetailsSection = styled.div`
  padding: 40px 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    padding: 30px 20px;
  }

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;

    &:hover {
      background: #bfbfbf;
    }
  }
`;

const SectionTitle = styled(Title)`
  margin-bottom: 24px !important;
  position: relative;
  padding-bottom: 8px;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #1677ff, #69c0ff);
    border-radius: 3px;
  }
`;

const DetailsGroup = styled.div`
  margin-bottom: 28px;
`;

const GroupTitle = styled(Title)`
  font-size: 16px !important;
  margin-bottom: 12px !important;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    border-color: #e6f7ff;
  }

  ${(props) =>
    props.highlighted &&
    css`
      background-color: #f0f7ff;
      border-color: #bae0ff;

      &:hover {
        box-shadow: 0 2px 12px rgba(24, 144, 255, 0.1);
      }
    `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailLabel = styled.div`
  padding: 12px 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  background-color: #fafafa;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
  }

  @media (max-width: 768px) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const DetailValue = styled.div`
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: space-between;
  word-break: break-word;

  a {
    color: #1677ff;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;

    &:hover {
      color: #4096ff;
      text-decoration: underline;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ActionButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 180px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
    color: #111;
  }
`;

const ApproveButton = styled(ActionButton)`
  background-color: #a1da6c;
  color: white;

  &:hover {
    background-color: #8bc34a;
    color: white;
  }
`;

const RejectButton = styled(ActionButton)`
  background-color: #e86464;
  color: white;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;

const TakedownButton = styled(ActionButton)`
  background-color: #e86464;
  color: white;

  &:hover {
    background-color: #d32f2f;
    color: white;
  }
`;

const RestoreButton = styled(ActionButton)`
  background-color: #52c41a;
  color: white;

  &:hover {
    background-color: #389e0d;
    color: white;
  }
`;

const StatusTag = styled(Tag)`
  margin-left: 12px;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 4px;
  text-transform: capitalize;
`;

// Artist tag styling - similar to Form.jsx
const ArtistTag = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #e6f4ff, #f2faff);
  color: black;
  border: 1px solid #c2e4ff;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  margin: 0.25rem 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
    border-color: #95d2ff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-left: 0.75rem;
`;

const SocialIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0958d9;
  opacity: ${(props) => (props.active ? 1 : 0.4)};
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  transition: all 0.2s;

  &:hover {
    transform: ${(props) => (props.active ? "scale(1.1)" : "none")};
    color: ${(props) => (props.active ? "#0958d9" : "#1677ff")};
  }
`;

// Modal
const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalBox = styled.div`
  background-color: white;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: ${slideUp} 0.4s ease;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

// Icons for different field types
const getFieldIcon = (field) => {
  const fieldLower = field.toLowerCase();

  if (fieldLower.includes("title")) return <FaFileAlt />;
  if (fieldLower.includes("date") || fieldLower.includes("time"))
    return <FaCalendarAlt />;
  if (fieldLower.includes("type")) return <FaTag />;
  if (fieldLower.includes("status")) return <FaInfoCircle />;
  if (fieldLower.includes("label")) return <FaUsers />;
  if (fieldLower.includes("singer")) return <FaUser />;
  if (fieldLower.includes("composer")) return <FaMusic />;
  if (fieldLower.includes("lyricist")) return <FaFileAlt />;
  if (fieldLower.includes("director")) return <FaUsers />;
  if (fieldLower.includes("apple")) return <FaApple />;
  if (fieldLower.includes("facebook")) return <FaFacebook />;
  if (fieldLower.includes("instagram")) return <FaInstagram />;
  if (fieldLower.includes("spotify")) return <FaSpotify />;
  if (fieldLower.includes("file") || fieldLower.includes("thumbnail"))
    return <FaCloudDownloadAlt />;
  if (fieldLower.includes("youtube")) return <FaLink />;

  return <FaInfoCircle />;
};

// Get status info (icon, color, text)
const getStatusInfo = (status) => {
  switch (status) {
    case "completed":
      return {
        icon: <MdCheckCircleOutline size={16} />,
        color: "success",
        text: "Live",
      };
    case "waiting":
      return {
        icon: <MdAccessTime size={16} />,
        color: "warning",
        text: "Awaiting Approval",
      };
    case "processing":
      return {
        icon: <MdSync size={16} />,
        color: "processing",
        text: "Processing",
      };
    case "rejected":
      return {
        icon: <MdCancel size={16} />,
        color: "error",
        text: "Rejected",
      };
    case "takedown":
      return {
        icon: <MdErrorOutline size={16} />,
        color: "error",
        text: "Taken Down",
      };
    default:
      return {
        icon: <MdInfo size={16} />,
        color: "default",
        text: status,
      };
  }
};

// Social platform icons
const getSocialIcon = (platform) => {
  const platformLower = platform.toLowerCase();

  if (platformLower.includes("apple")) return <FaApple />;
  if (platformLower.includes("facebook")) return <FaFacebook />;
  if (platformLower.includes("instagram")) return <FaInstagram />;
  if (platformLower.includes("spotify")) return <FaSpotify />;

  return <FaGlobe />;
};

// Group fields into categories
const groupFields = (fields) => {
  // Initialize groups
  const groups = {
    main: [],
    labels: [],
    dates: [],
    singers: [],
    composers: [],
    lyricists: [],
    other: [],
  };

  fields.forEach((field) => {
    const fieldName = field.field.toLowerCase();

    // Group by category
    if (["title", "description", "status", "albumtype"].includes(fieldName)) {
      groups.main.push(field);
    } else if (fieldName.includes("label")) {
      groups.labels.push(field);
    } else if (fieldName.includes("date") || fieldName.includes("time")) {
      groups.dates.push(field);
    } else if (fieldName.includes("singer")) {
      groups.singers.push(field);
    } else if (fieldName.includes("composer")) {
      groups.composers.push(field);
    } else if (fieldName.includes("lyricist")) {
      groups.lyricists.push(field);
    } else {
      groups.other.push(field);
    }
  });

  return groups;
};

// Function to parse comma-separated artists and their profiles
const parseArtists = (name, appleId, spotifyId, facebookUrl, instagramUrl) => {
  if (!name) return [];

  const names = name.split(",").map((n) => n.trim());
  const appleIds = appleId ? appleId.split(",").map((id) => id.trim()) : [];
  const spotifyIds = spotifyId
    ? spotifyId.split(",").map((id) => id.trim())
    : [];
  const facebookUrls = facebookUrl
    ? facebookUrl.split(",").map((url) => url.trim())
    : [];
  const instagramUrls = instagramUrl
    ? instagramUrl.split(",").map((url) => url.trim())
    : [];

  return names.map((name, index) => ({
    name,
    appleId: appleIds[index] || "",
    spotifyId: spotifyIds[index] || "",
    facebookUrl: facebookUrls[index] || "",
    instagramUrl: instagramUrls[index] || "",
  }));
};

const OrderDetailsPage = () => {
  const userId = useSelector((state) => state.userId);
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderLoop, setOrderLoop] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [audioReady, setAudioReady] = useState(false);

  // States for parsed artists
  const [parsedSingers, setParsedSingers] = useState([]);
  const [parsedComposers, setParsedComposers] = useState([]);
  const [parsedLyricists, setParsedLyricists] = useState([]);

  // Notification API
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });

  const openNotificationWithIcon = (type, msg) => {
    api[type]({
      message: msg,
    });
  };

  // Message API
  const [messageApi, contextHolder] = message.useMessage();

  // Fetch order data
  const fetcher = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/get-order/?id=${id}`
      );
      const data = await res.json();

      if (!data.order) {
        messageApi.error("Order not found");
        navigate("/admin-panel/pending-work");
        return;
      }

      setOrder(data.order);

      // Parse artists data
      setParsedSingers(
        parseArtists(
          data.order.singer,
          data.order.singerAppleId,
          data.order.singerSpotifyId,
          data.order.singerFacebookUrl,
          data.order.singerInstagramUrl
        )
      );

      setParsedComposers(
        parseArtists(
          data.order.composer,
          data.order.composerAppleId,
          data.order.composerSpotifyId,
          data.order.composerFacebookUrl,
          data.order.composerInstagramUrl
        )
      );

      setParsedLyricists(
        parseArtists(
          data.order.lyricist,
          data.order.lyricistAppleId,
          data.order.lyricistSpotifyId,
          data.order.lyricistFacebookUrl,
          data.order.lyricistInstagramUrl
        )
      );

      // Process order fields
      let arr = [];
      for (const key in data.order) {
        if (
          key === "_id" ||
          key === "id" ||
          key === "userId" ||
          key === "deleted" ||
          key === "__v"
        ) {
          continue;
        }
        if (data.order[key].length === 0) {
          continue;
        }

        const obj = {
          field: key,
          value: data.order[key],
          id: Math.random() * 99999999999,
        };
        arr.push(obj);
      }
      setOrderLoop(arr);
    } catch (error) {
      console.error("Error fetching order:", error);
      messageApi.error("Failed to load order details");
    } finally {
      setIsLoading(false);
    }
  };

  // Approve order confirmation
  const confirmApprove = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=statusAccepted&userId=${userId}`,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", data.message);
        setTimeout(() => {
          navigate("/admin-panel/pending-work");
        }, 500);
      }
    } catch (error) {
      console.error("Error approving order:", error);
      messageApi.error("Failed to approve order");
    }
  };

  // Reject order (with remark)
  const onSubmitRejection = async () => {
    const remarkInput = document.querySelector(`#remark`);
    const remark = remarkInput?.value?.trim();

    if (!remark) {
      remarkInput.style.border = "1px solid #ff4d4f";
      messageApi.error("Please provide a rejection reason");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=statusRejected&userId=${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remark: remark,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", data.message);
        setTimeout(() => {
          navigate("/admin-panel/orders");
        }, 600);
      } else {
        openNotificationWithIcon("error", data.message);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error rejecting order:", error);
      messageApi.error("Failed to reject order");
    }
  };

  // Takedown album
  const takedownAlbum = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=takedown&userId=${userId}`,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", data.message);
        setTimeout(() => {
          navigate("/admin-panel/history");
        }, 500);
      }
    } catch (error) {
      console.error("Error taking down album:", error);
      messageApi.error("Failed to take down album");
    }
  };

  // Restore album
  const restoreAlbum = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${order.id}&action=completed&userId=${userId}`,
        {
          method: "PATCH",
        }
      );
      const data = await res.json();

      if (res.ok) {
        openNotificationWithIcon("success", data.message);
        setTimeout(() => {
          navigate("/admin-panel/history");
        }, 500);
      }
    } catch (error) {
      console.error("Error restoring album:", error);
      messageApi.error("Failed to restore album");
    }
  };

  // Copy to clipboard functionality
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      messageApi.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
      messageApi.error("Failed to copy text");
    }
  };

  useEffect(() => {
    fetcher();
  }, [id]);

  // Format field name for display
  const formatFieldName = (field) => {
    // Handle special cases
    if (field === "youtubeContentId") return "YouTube Content ID";
    if (field === "youtubeMusic") return "YouTube Music";
    if (field === "labelName") return "Label Name";
    if (field === "subLabel1" || field === "subLabel2" || field === "subLabel3")
      return "Sub Label";
    if (field === "dateOfRelease") return "Scheduled Release Date";
    if (field === "releaseDate") return "Previous Release Date";
    if (field === "dateLive") return "Platform Live Date";
    if (field === "AlbumType" || field === "albumType") return "Album Type";
    if (field === "orderDateAndTime") return "Order Date";
    if (field === "musicDirector") return "Music Director";
    if (field === "starCast") return "Star Cast";

    // General formatting
    return field
      .replace(/([A-Z])/g, " $1") // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  // Render field value based on field type
  const renderFieldValue = (field, value) => {
    const fieldLower = field.toLowerCase();

    // Handle YouTube Content ID and YouTube Music fields specifically
    if (fieldLower === "youtube content id" || fieldLower === "youtube music") {
      return (
        <>
          <span>{value}</span>
          <Tooltip title="Copy to clipboard">
            <Button
              type="text"
              size="small"
              icon={<FaCopy size={14} />}
              onClick={() => copyToClipboard(value)}
            />
          </Tooltip>
        </>
      );
    }

    // URLs and external links
    if (
      (fieldLower.includes("url") || fieldLower.includes("id")) &&
      !fieldLower.includes("_id") &&
      !fieldLower.includes("userid") &&
      !fieldLower.includes("youtube")
    ) {
      return (
        <Link to={value} target="_blank">
          {getSocialIcon(field)} View on{" "}
          {fieldLower.includes("apple")
            ? "Apple Music"
            : fieldLower.includes("facebook")
            ? "Facebook"
            : fieldLower.includes("instagram")
            ? "Instagram"
            : fieldLower.includes("spotify")
            ? "Spotify"
            : "Platform"}
        </Link>
      );
    }

    // File downloads
    if (field === "thumbnail" || field === "file") {
      return (
        <Link
          to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${value}`}
          target="_blank"
        >
          <FaDownload /> Download{" "}
          {field === "thumbnail" ? "Cover Art" : "Audio File"}
        </Link>
      );
    }

    // Status field
    if (fieldLower === "status") {
      const statusInfo = getStatusInfo(value);
      return (
        <Tag icon={statusInfo.icon} color={statusInfo.color}>
          {statusInfo.text}
        </Tag>
      );
    }

    // Default text with copy option
    return (
      <>
        <span>{value === "completed" ? "Live" : value}</span>
        <Tooltip title="Copy to clipboard">
          <Button
            type="text"
            size="small"
            icon={<FaCopy size={14} />}
            onClick={() => copyToClipboard(value)}
          />
        </Tooltip>
      </>
    );
  };

  if (isLoading) {
    return (
      <PageContainer>
        {contextHolder}
        {contextHolderNot}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <MusicLoader />
        </div>
      </PageContainer>
    );
  }

  // Group fields for better organization
  const groupedFields = groupFields(orderLoop);

  // Get status information
  const statusInfo = order && order.status ? getStatusInfo(order.status) : null;

  return (
    <PageContainer>
      {contextHolder}
      {contextHolderNot}

      {/* Rejection modal */}
      {showModal && (
        <Modal>
          <ModalBox>
            <ModalHeader>
              <h3>Reject Album</h3>
            </ModalHeader>
            <ModalBody>
              <StyledLabel htmlFor="remark">Rejection Reason</StyledLabel>
              <StyledInput
                id="remark"
                placeholder="Please provide a reason for rejection"
                onChange={(e) => {
                  e.target.style.border = "1px solid #d9d9d9";
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="primary" onClick={onSubmitRejection}>
                Submit
              </Button>
            </ModalFooter>
          </ModalBox>
        </Modal>
      )}

      {/* Page header */}
      <PageHeader>
        <div>
          <BreadcrumbContainer>
            <Breadcrumb
              items={[
                { title: <Link to="/admin-panel">Dashboard</Link> },
                { title: <Link to="/admin-panel/orders">All Albums</Link> },
                { title: "Album Details" },
              ]}
            />
          </BreadcrumbContainer>

          <NavigationRow>
            <Space>
              <Title level={2} style={{ margin: 0 }}>
                Album Details
              </Title>
              {statusInfo && (
                <StatusTag icon={statusInfo.icon} color={statusInfo.color}>
                  {statusInfo.text}
                </StatusTag>
              )}
            </Space>

            <Space>
              <Button
                type="primary"
                icon={<FaFileExcel />}
                style={{
                  background: "#52c41a",
                  borderColor: "#52c41a",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  window.open(
                    `${process.env.REACT_APP_BASE_URL}/order/export/${order.id}`,
                    "_blank"
                  );
                }}
              >
                Export to Excel
              </Button>
              {/* <BackButton
                onClick={() => navigate("/admin-panel/orders")}
                icon={<FaArrowLeft />}
              >
                Back to Albums
              </BackButton> */}
            </Space>
          </NavigationRow>
        </div>
      </PageHeader>

      {/* Main content */}
      {order && (
        <ContentCard>
          {/* Album section (left side) */}
          <AlbumSection>
            <AlbumCover>
              <Image
                width={240}
                src={
                  order.thumbnail.includes("cloudinary")
                    ? order.thumbnail
                    : `${process.env.REACT_APP_BASE_URL}/${order.thumbnail}`
                }
                placeholder={
                  <Image
                    preview={false}
                    src={
                      order.thumbnail.includes("cloudinary")
                        ? order.thumbnail
                        : `${process.env.REACT_APP_BASE_URL}/${order.thumbnail}`
                    }
                    width={240}
                  />
                }
              />
            </AlbumCover>

            <AlbumTitle level={3}>{order.title}</AlbumTitle>
            <StyledAudioPlayer>
              {!audioReady ? (
                <Button
                  type="primary"
                  icon={<FaPlayCircle />}
                  size="large"
                  onClick={() => setAudioReady(true)}
                  style={{
                    width: "100%",
                    height: "48px",
                    marginBottom: "8px",
                    background: "linear-gradient(to right, #1677ff, #69c0ff)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Play Audio
                </Button>
              ) : (
                <AudioPlayer
                  key="audio-player"
                  src={`${process.env.REACT_APP_BASE_URL}/${order.file}`}
                  autoPlayAfterSrcChange={true}
                  showJumpControls={false}
                  customAdditionalControls={[]}
                  layout="stacked-reverse"
                />
              )}
            </StyledAudioPlayer>

            {order.description && (
              <AlbumDescription>{order.description}</AlbumDescription>
            )}
          </AlbumSection>

          {/* Details section (right side) */}
          <DetailsSection>
            <SectionTitle level={4}>Album Information</SectionTitle>

            {/* Main information group */}
            {groupedFields.main.length > 0 && (
              <DetailsGroup>
                <GroupTitle level={5}>
                  <FaInfoCircle /> Basic Information
                </GroupTitle>
                <DetailsList>
                  {groupedFields.labels.map(({ field, value, id }) => {
                    const formattedField = formatFieldName(field);

                    return (
                      <DetailRow key={id}>
                        <DetailLabel>
                          {getFieldIcon(formattedField)}
                          {formattedField}
                        </DetailLabel>
                        <DetailValue>
                          {renderFieldValue(formattedField, value)}
                        </DetailValue>
                      </DetailRow>
                    );
                  })}
                  {groupedFields.main.map(({ field, value, id }) => {
                    // Skip fields already displayed in the left panel
                    if (field === "title" || field === "description")
                      return null;

                    const formattedField = formatFieldName(field);

                    return (
                      <DetailRow
                        key={id}
                        highlighted={field.toLowerCase() === "status"}
                      >
                        <DetailLabel>
                          {getFieldIcon(formattedField)}
                          {formattedField}
                        </DetailLabel>
                        <DetailValue>
                          {renderFieldValue(formattedField, value)}
                        </DetailValue>
                      </DetailRow>
                    );
                  })}{" "}
                  {groupedFields.other.map(({ field, value, id }) => {
                    // Skip fields that are handled elsewhere
                    if (
                      field === "file" ||
                      field === "thumbnail" ||
                      field === "musicDirector" ||
                      field === "director" ||
                      field === "producer" ||
                      field === "starCast" ||
                      field === "youtubeContentId" ||
                      field === "youtubeMusic" ||
                      field.includes("singer") ||
                      field.includes("composer") ||
                      field.includes("lyricist")
                    )
                      return null;

                    const formattedField = formatFieldName(field);

                    return (
                      <DetailRow key={id}>
                        <DetailLabel>
                          {getFieldIcon(formattedField)}
                          {formattedField}
                        </DetailLabel>
                        <DetailValue>
                          {renderFieldValue(formattedField, value)}
                        </DetailValue>
                      </DetailRow>
                    );
                  })}
                  {orderLoop.map(({ field, value, id }) => {
                    if (
                      (field === "youtubeContentId" ||
                        field === "youtubeMusic") &&
                      value.trim().length > 0
                    ) {
                      const formattedField = formatFieldName(field);

                      return (
                        <DetailRow key={id}>
                          <DetailLabel>
                            {getFieldIcon(formattedField)}
                            {formattedField}
                          </DetailLabel>
                          <DetailValue>
                            {renderFieldValue(formattedField, value)}
                          </DetailValue>
                        </DetailRow>
                      );
                    }
                    return null;
                  })}
                </DetailsList>
              </DetailsGroup>
            )}

            {/* Dates group */}
            {groupedFields.dates.length > 0 && (
              <DetailsGroup>
                <GroupTitle level={5}>
                  <FaCalendarAlt /> Dates
                </GroupTitle>
                <DetailsList>
                  {groupedFields.dates.map(({ field, value, id }) => {
                    const formattedField = formatFieldName(field);
                    let displayValue = value;

                    // Handle orderDateAndTime formatting
                    if (field === "orderDateAndTime") {
                      displayValue = value.split("/")[0];
                    }

                    return (
                      <DetailRow key={id}>
                        <DetailLabel>
                          {getFieldIcon(formattedField)}
                          {formattedField}
                        </DetailLabel>
                        <DetailValue>
                          {renderFieldValue(formattedField, displayValue)}
                        </DetailValue>
                      </DetailRow>
                    );
                  })}
                </DetailsList>
              </DetailsGroup>
            )}

            {/* Artists section */}
            <DetailsGroup>
              <GroupTitle level={5}>
                <FaUser /> Artists
              </GroupTitle>

              {/* Singers */}
              {parsedSingers.length > 0 && (
                <>
                  <Text
                    type="secondary"
                    style={{ marginBottom: "8px", display: "block" }}
                  >
                    Singer
                  </Text>
                  <div style={{ marginBottom: "16px" }}>
                    {parsedSingers.map((singer, idx) => (
                      <ArtistTag key={idx}>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: ".8rem",
                            marginRight: "auto",
                            color: "black",
                            letterSpacing: ".06rem",
                          }}
                        >
                          {singer.name}
                        </span>
                        <SocialLinks>
                          <SocialIcon
                            active={singer.facebookUrl?.trim().length > 0}
                            onClick={() =>
                              singer.facebookUrl &&
                              window.open(singer.facebookUrl, "_blank")
                            }
                            title={
                              singer.facebookUrl
                                ? "Visit Facebook profile"
                                : "No Facebook profile"
                            }
                          >
                            <FaFacebook />
                          </SocialIcon>
                          <SocialIcon
                            active={singer.instagramUrl?.trim().length > 0}
                            onClick={() =>
                              singer.instagramUrl &&
                              window.open(singer.instagramUrl, "_blank")
                            }
                            title={
                              singer.instagramUrl
                                ? "Visit Instagram profile"
                                : "No Instagram profile"
                            }
                          >
                            <FaInstagram />
                          </SocialIcon>
                          <SocialIcon
                            active={singer.appleId?.trim().length > 0}
                            onClick={() =>
                              singer.appleId &&
                              window.open(singer.appleId, "_blank")
                            }
                            title={
                              singer.appleId
                                ? "Visit Apple Music profile"
                                : "No Apple Music profile"
                            }
                          >
                            <FaApple />
                          </SocialIcon>
                          <SocialIcon
                            active={singer.spotifyId?.trim().length > 0}
                            onClick={() =>
                              singer.spotifyId &&
                              window.open(singer.spotifyId, "_blank")
                            }
                            title={
                              singer.spotifyId
                                ? "Visit Spotify profile"
                                : "No Spotify profile"
                            }
                          >
                            <FaSpotify style={{ fontSize: "1.1rem" }} />
                          </SocialIcon>
                        </SocialLinks>
                      </ArtistTag>
                    ))}
                  </div>
                </>
              )}

              {/* Composers */}
              {parsedComposers.length > 0 && (
                <>
                  <Text
                    type="secondary"
                    style={{ margin: "16px 0 8px", display: "block" }}
                  >
                    Composer
                  </Text>
                  <div style={{ marginBottom: "16px" }}>
                    {parsedComposers.map((composer, idx) => (
                      <ArtistTag key={idx}>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: ".8rem",
                            marginRight: "auto",
                            color: "black",
                            letterSpacing: ".06rem",
                          }}
                        >
                          {composer.name}
                        </span>
                        <SocialLinks>
                          <SocialIcon
                            active={composer.facebookUrl?.trim().length > 0}
                            onClick={() =>
                              composer.facebookUrl &&
                              window.open(composer.facebookUrl, "_blank")
                            }
                            title={
                              composer.facebookUrl
                                ? "Visit Facebook profile"
                                : "No Facebook profile"
                            }
                          >
                            <FaFacebook />
                          </SocialIcon>
                          <SocialIcon
                            active={composer.instagramUrl?.trim().length > 0}
                            onClick={() =>
                              composer.instagramUrl &&
                              window.open(composer.instagramUrl, "_blank")
                            }
                            title={
                              composer.instagramUrl
                                ? "Visit Instagram profile"
                                : "No Instagram profile"
                            }
                          >
                            <FaInstagram />
                          </SocialIcon>
                          <SocialIcon
                            active={composer.appleId?.trim().length > 0}
                            onClick={() =>
                              composer.appleId &&
                              window.open(composer.appleId, "_blank")
                            }
                            title={
                              composer.appleId
                                ? "Visit Apple Music profile"
                                : "No Apple Music profile"
                            }
                          >
                            <FaApple />
                          </SocialIcon>
                          <SocialIcon
                            active={composer.spotifyId?.trim().length > 0}
                            onClick={() =>
                              composer.spotifyId &&
                              window.open(composer.spotifyId, "_blank")
                            }
                            title={
                              composer.spotifyId
                                ? "Visit Spotify profile"
                                : "No Spotify profile"
                            }
                          >
                            <FaSpotify style={{ fontSize: "1.1rem" }} />
                          </SocialIcon>
                        </SocialLinks>
                      </ArtistTag>
                    ))}
                  </div>
                </>
              )}

              {/* Lyricists */}
              {parsedLyricists.length > 0 && (
                <>
                  <Text
                    type="secondary"
                    style={{ margin: "16px 0 8px", display: "block" }}
                  >
                    Lyricist
                  </Text>
                  <div style={{ marginBottom: "16px" }}>
                    {parsedLyricists.map((lyricist, idx) => (
                      <ArtistTag key={idx}>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: ".8rem",
                            marginRight: "auto",
                            color: "black",
                            letterSpacing: ".06rem",
                          }}
                        >
                          {lyricist.name}
                        </span>
                        <SocialLinks>
                          <SocialIcon
                            active={lyricist.facebookUrl?.trim().length > 0}
                            onClick={() =>
                              lyricist.facebookUrl &&
                              window.open(lyricist.facebookUrl, "_blank")
                            }
                            title={
                              lyricist.facebookUrl
                                ? "Visit Facebook profile"
                                : "No Facebook profile"
                            }
                          >
                            <FaFacebook />
                          </SocialIcon>
                          <SocialIcon
                            active={lyricist.instagramUrl?.trim().length > 0}
                            onClick={() =>
                              lyricist.instagramUrl &&
                              window.open(lyricist.instagramUrl, "_blank")
                            }
                            title={
                              lyricist.instagramUrl
                                ? "Visit Instagram profile"
                                : "No Instagram profile"
                            }
                          >
                            <FaInstagram />
                          </SocialIcon>
                          <SocialIcon
                            active={lyricist.appleId?.trim().length > 0}
                            onClick={() =>
                              lyricist.appleId &&
                              window.open(lyricist.appleId, "_blank")
                            }
                            title={
                              lyricist.appleId
                                ? "Visit Apple Music profile"
                                : "No Apple Music profile"
                            }
                          >
                            <FaApple />
                          </SocialIcon>
                          <SocialIcon
                            active={lyricist.spotifyId?.trim().length > 0}
                            onClick={() =>
                              lyricist.spotifyId &&
                              window.open(lyricist.spotifyId, "_blank")
                            }
                            title={
                              lyricist.spotifyId
                                ? "Visit Spotify profile"
                                : "No Spotify profile"
                            }
                          >
                            <FaSpotify style={{ fontSize: "1.1rem" }} />
                          </SocialIcon>
                        </SocialLinks>
                      </ArtistTag>
                    ))}
                  </div>
                </>
              )}

              {/* Other artist fields in regular format */}
              {order.musicDirector && (
                <DetailRow>
                  <DetailLabel>
                    <FaMusic />
                    Music Director
                  </DetailLabel>
                  <DetailValue>
                    {order.musicDirector}
                    <Tooltip title="Copy to clipboard">
                      <Button
                        type="text"
                        size="small"
                        icon={<FaCopy size={14} />}
                        onClick={() => copyToClipboard(order.musicDirector)}
                      />
                    </Tooltip>
                  </DetailValue>
                </DetailRow>
              )}

              {order.director && (
                <DetailRow>
                  <DetailLabel>
                    <FaUsers />
                    Director
                  </DetailLabel>
                  <DetailValue>
                    {order.director}
                    <Tooltip title="Copy to clipboard">
                      <Button
                        type="text"
                        size="small"
                        icon={<FaCopy size={14} />}
                        onClick={() => copyToClipboard(order.director)}
                      />
                    </Tooltip>
                  </DetailValue>
                </DetailRow>
              )}

              {order.producer && (
                <DetailRow>
                  <DetailLabel>
                    <FaUsers />
                    Producer
                  </DetailLabel>
                  <DetailValue>
                    {order.producer}
                    <Tooltip title="Copy to clipboard">
                      <Button
                        type="text"
                        size="small"
                        icon={<FaCopy size={14} />}
                        onClick={() => copyToClipboard(order.producer)}
                      />
                    </Tooltip>
                  </DetailValue>
                </DetailRow>
              )}

              {order.starCast && (
                <DetailRow>
                  <DetailLabel>
                    <FaUsers />
                    Star Cast
                  </DetailLabel>
                  <DetailValue>
                    {order.starCast}
                    <Tooltip title="Copy to clipboard">
                      <Button
                        type="text"
                        size="small"
                        icon={<FaCopy size={14} />}
                        onClick={() => copyToClipboard(order.starCast)}
                      />
                    </Tooltip>
                  </DetailValue>
                </DetailRow>
              )}
            </DetailsGroup>

            {/* Downloads section */}
            <DetailsGroup>
              <GroupTitle level={5}>
                <FaCloudDownloadAlt /> Downloads
              </GroupTitle>
              <DetailsList>
                <DetailRow>
                  <DetailLabel>
                    <FaCloudDownloadAlt />
                    Cover Art
                  </DetailLabel>
                  <DetailValue>
                    <Link
                      to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${order.thumbnail}&title=${order.title}`}
                      target="_blank"
                    >
                      <FaDownload /> Download Image
                    </Link>
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>
                    <MdMusicNote size={16} style={{ marginRight: "8px" }} />
                    Audio File
                  </DetailLabel>
                  <DetailValue>
                    <Link
                      to={`${process.env.REACT_APP_BASE_URL}/file/download/?filePath=${order.file}&title=${order.title}`}
                      target="_blank"
                    >
                      <FaDownload /> Download Audio
                    </Link>
                  </DetailValue>
                </DetailRow>
              </DetailsList>
            </DetailsGroup>

            {/* Action buttons based on status */}
            <ActionButtons>
              {order.status === "waiting" && (
                <>
                  <Popconfirm
                    title="Approve Album"
                    description="Are you sure you want to approve this album?"
                    onConfirm={confirmApprove}
                    okText="Yes, Approve"
                    cancelText="Cancel"
                  >
                    <ApproveButton as="button">
                      <MdDone size={16} /> Approve
                    </ApproveButton>
                  </Popconfirm>

                  <RejectButton as="button" onClick={() => setShowModal(true)}>
                    <MdClose size={16} /> Reject
                  </RejectButton>
                </>
              )}

              {order.status === "completed" && (
                <>
                  <Popconfirm
                    title="Takedown Album"
                    description="Are you sure you want to take down this album?"
                    onConfirm={takedownAlbum}
                    okText="Yes, Takedown"
                    cancelText="Cancel"
                  >
                    <TakedownButton as="button">
                      <FaTimesCircle size={16} /> Takedown
                    </TakedownButton>
                  </Popconfirm>

                  <EditButton to={`/admin-panel/order/${order._id}/edit`}>
                    <FaEdit size={16} /> Edit
                  </EditButton>
                </>
              )}

              {order.status === "takedown" && (
                <>
                  <Popconfirm
                    title="Restore Album"
                    description="Are you sure you want to restore this album?"
                    onConfirm={restoreAlbum}
                    okText="Yes, Restore"
                    cancelText="Cancel"
                  >
                    <RestoreButton as="button">
                      <FaCheckCircle size={16} /> Restore
                    </RestoreButton>
                  </Popconfirm>

                  <EditButton to={`/admin-panel/order/${order._id}/edit`}>
                    <FaEdit size={16} /> Edit
                  </EditButton>
                </>
              )}
            </ActionButtons>
          </DetailsSection>
        </ContentCard>
      )}
    </PageContainer>
  );
};

export default OrderDetailsPage;
