import {
  AutoComplete,
  DatePicker,
  Modal,
  Space,
  Form as Form1,
  Select,
  Input as AntdInput,
} from "antd";
import AudioPlayer from "react-h5-audio-player";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import MusicLoader from "../Loader/MusicLoader";
import { useNavigate } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { Apple, FacebookOutlined, Instagram } from "@mui/icons-material";
import { FaSpotify } from "react-icons/fa";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
// ...existing code...

// Enhanced tag for displaying selected artists with social links
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

const RemoveButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.65rem;
  color: #ff4d4f;
  cursor: pointer;

  &:hover {
    color: #ff1f1f;
  }
`;
const MainDiv = styled.div`
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    margin: 0;
    text-transform: uppercase;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

const FormSeperator = styled.div`
  background-color: white;
  padding: 1rem 1rem 1.7rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-radius: 0.4rem;
  h2 {
    margin: 0;
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing: 0.09rem;
  }
`;

const AllInpBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
`;

const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 24%;
  span {
    color: #ff0000ab;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 100%;
  }
`;
const Label = styled.label`
  font-size: 0.9rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
  text-transform: capitalize;
`;
const TxtArea = styled.textarea`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-fields-wrapper {
    color: #d4cdcd;
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-fields-wrapper {
    color: #d4cdcd;
  }
`;
const Select1 = styled.select`
  padding: 0.4rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  letter-spacing: 0.04rem;
  border: 1px solid #777;
  border-style: dotted;
  text-transform: capitalize;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
  text-transform: capitalize;
`;
const BtnDiv = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    align-items: flex-start;
  }
`;

const SectionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SongDivider = styled.div`
  border-top: 1px solid #eef0f4;
  margin: 0.5rem 0;
`;
const Modal1 = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00000038;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalBox = styled.div`
  background-color: white;
  width: 35%;
  height: fit-content;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 20;

  @media only screen and (min-width: 0px) and (max-width: 1000px) {
    width: 90%;
  }
`;

const ModalFormBox = styled.div`
  background-color: white;
  width: 90%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
`;
const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
`;

const BtnBox = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  button {
    background-color: #1677ff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.09rem;
    &:last-child {
      background-color: #bbb9b9;
    }
  }
`;
const PendingBox = styled.div`
  width: 100%;
  margin: 1rem 0 1.25rem;
  padding: 1.25rem 1.4rem;
  border-radius: 14px;
  border: 1px solid #d9e6ff;
  background: linear-gradient(135deg, #ffffff 0%, #f6f9ff 100%);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
  color: #334155;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  align-items: flex-start;
  font-size: 1rem;
  line-height: 1.55;
  letter-spacing: 0.01rem;
`;

const PendingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.02rem;
  font-weight: 700;
  color: #0f172a;
`;

const PendingPill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.7rem;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const PendingActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  /* justify-content:   center; */
  /* background-color: red; */
  width: 100%;
  .ant-btn {
    min-width: 132px;
    height: 40px;
    border-radius: 10px;
    font-weight: 600;
  }
`;

// Tag for displaying selected singers
const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background: #e6f4ff;
  color: #1677ff;
  border-radius: 2em;
  padding: 0.2em 0.8em 0.2em 0.8em;
  margin: 0.2em 0.3em 0.2em 0;
  font-size: 0.95em;
  font-weight: 500;
  cursor: default;
  svg {
    margin-left: 0.5em;
    cursor: pointer;
    font-size: 1.1em;
  }
`;

const Form = () => {
  const userId = useSelector((state) => state.userId);
  const labelNameFromStore = useSelector((state) => state.labelName);
  const [selectedStarCast, setSelectedStarCast] = useState([]);
  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openValidationNotification = (msg = "Fill all require fields.") => {
    api.error({
      message: msg,
    });
  };
  const format = "mm:ss";
  const deafaultFields = {
    labelName: labelNameFromStore,
    title: "",
    dateOfRelease: "",
    albumType: "album",
    language: "Garhwali",
    mood: "Romantic",
    description: "",
    singer: "",
    composer: "",
    director: "",
    producer: "",
    starCast: "",
    lyrics: "",
    subLabel1: "",
    subLabel2: "",
    subLabel3: "",
    thumbnail: null,
    file: null,
    upc: "",
    isrc: "",
    lyricist: "",
    crbt: "00:30",
    genre: "",
    singerAppleId: "",
    singerSpotifyId: "",
    singerFacebookUrl: "",
    singerInstagramUrl: "",
    composerAppleId: "",
    composerSpotifyId: "",
    composerFacebookUrl: "",
    composerInstagramUrl: "",
    lyricistAppleId: "",
    lyricistSpotifyId: "",
    lyricistFacebookUrl: "",
    lyricistInstagramUrl: "",
    musicDirector: "",
    subgenre: "",
    releaseDate: "",
    youtubeContentId: "Yes",
    youtubeMusic: "Yes",
    contentType: "single",
  };

  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArtist, setEditingArtist] = useState(null);
  const [selectedRole, setSelectedRole] = useState("singer"); // Default role
  const [form] = Form1.useForm();

  const [artists, setArtists] = useState([]);
  const showAddModal = () => {
    setEditingArtist(null);
    setSelectedRole("singer"); // Reset to default role
    form.resetFields();
    setIsModalVisible(true);
  };

  // Remove function for starCast
  const removeStarCast = (idx) => {
    setSelectedStarCast((prev) => prev.filter((_, i) => i !== idx));
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
          },
        );

        const data = await response.json();

        if (response.ok) {
          // Update the artist in the local state
          setArtists(
            artists.map((artist) =>
              artist._id === editingArtist._id ? data.artist : artist,
            ),
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
          },
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
  // Check if role needs social media fields
  const showSocialMediaFields = ["singer", "lyricist", "composer"].includes(
    selectedRole,
  );

  // Handle role change
  const handleRoleChange = (value) => {
    console.log(value);

    setSelectedRole(value);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // For multiple singers

  // State for options
  const [artistOptions, setArtistOptions] = useState({
    singer: [],
    lyricist: [],
    composer: [],
    musicDirector: [],
    director: [],
    producer: [],
    starCast: [],
  });
  const [inpFields, setInpFields] = useState(deafaultFields);
  const [subLabels, setSubLabels] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  // ...existing code...
  const [selectedSingers, setSelectedSingers] = useState([]);
  const [selectedComposers, setSelectedComposers] = useState([]);
  const [selectedLyricists, setSelectedLyricists] = useState([]);
  const [selectedMusicDirectors, setSelectedMusicDirectors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const createSongSection = () => ({
    id: `song-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    fields: {
      songTitle: "",
      file: null,
      isrc: "",
      crbt: "00:30",
      singer: "",
      lyricist: "",
      composer: "",
      musicDirector: "",
      director: "",
      producer: "",
      starCast: "",
    },
    selectedSingers: [],
    selectedComposers: [],
    selectedLyricists: [],
    selectedMusicDirectors: [],
    selectedDirectors: [],
    selectedProducers: [],
    selectedStarCast: [],
  });
  const [songSections, setSongSections] = useState(() => [createSongSection()]);
  // ...existing code...
  const navigate = useNavigate();
  const [showSingerModal, setShowSingerModal] = useState(false);
  const [showComposerModal, setShowComposerModal] = useState(false);
  const [showLyricistModal, setShowLyricistModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserdata] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const genreSubgenreMap = {
    Film: [
      "Devotional",
      "Dialogue",
      "Ghazal",
      "Hip-Hop/ Rap",
      "Instrumental",
      "Patriotic",
      "Remix",
      "Romantic",
      "Sad",
      "Unplugged",
    ],
    Pop: [
      "Acoustic Pop",
      "Band Songs",
      "Bedroom Pop",
      "Chill Pop",
      "Contemporary Pop",
      "Country Pop/ Regional Pop",
      "Dance Pop",
      "Electro Pop",
      "Lo-Fi Pop",
      "Love Songs",
      "Pop Rap",
      "Pop Singer-Songwriter",
      "Sad Songs",
      "Soft Pop",
    ],
    Indie: [
      "Indian Indie",
      "Indie Dance",
      "Indie Folk",
      "Indie Hip-Hop",
      "Indie Lo-Fi",
      "Indie Pop",
      "Indie Rock",
      "Indie Singer -Songwriter",
    ],
    "Hip-Hop/Rap": [
      "Alternative Hip-Hop",
      "Concious Hip-Hop",
      "Country Rap",
      "Emo Rap",
      "Hip-Hop",
      "Jazz Rap",
      "Pop Rap",
      "Trap",
      "Trap Beats",
    ],
    Folk: [
      "Ainchaliyan",
      "Alha",
      "Atulprasadi",
      "Baalgeet/ Children Song",
      "Banvarh",
      "Barhamasa",
      "Basant Geet",
      "Baul Geet",
      "Bhadu Gaan",
      "Bhagawati",
      "Bhand",
      "Bhangra",
      "Bhatiali",
      "Bhavageete",
      "Bhawaiya",
      "Bhuta song",
      "Bihugeet",
      "Birha",
      "Borgeet",
      "Burrakatha",
      "Chappeli",
      "Daff",
      "Dandiya Raas",
      "Dasakathia",
      "Deijendrageeti",
      "Deknni",
      "Dhamal",
      "Gadhwali",
      "Gagor",
      "Garba",
      "Ghasiyari Geet",
      "Ghoomar",
      "Gidda",
      "Gugga",
      "Hafiz Nagma",
      "Heliam",
      "Hereileu",
      "Hori",
      "Jaanapada Geethe",
      "Jaita",
      "Jhoori",
      "Jhora",
      "Jhumur",
      "Jugni",
      "Kajari",
      "Kajari/ Kajari /Kajri",
      "Karwa Chauth Songs",
      "Khor",
      "Koligeet",
      "Kumayuni",
      "Kummi Paatu",
      "Lagna Geet /Marriage Song",
      "Lalongeeti",
      "Lavani",
      "Lokgeet",
      "Loor",
      "Maand",
      "Madiga Dappu",
      "Mando",
      "Mapilla",
      "Naatupura Paadalgal",
      "Naqual",
      "Nati",
      "Nautanki",
      "Nazrulgeeti",
      "Neuleu",
      "Nyioga",
      "Oggu Katha",
      "Paani Hari",
      "Pai Song",
      "Pandavani",
      "Pankhida",
      "Patua Sangeet",
      "Phag Dance",
      "Powada",
      "Qawwali",
      "Rabindra Sangeet",
      "Rajanikantageeti",
      "Ramprasadi",
      "Rasiya",
      "Rasiya Geet",
      "Raslila",
      "Raut Nacha",
      "Saikuthi Zai",
      "Sana Lamok",
      "Shakunakhar-Mangalgeet",
      "Shyama Sangeet",
      "Sohar",
      "Sumangali",
      "Surma",
      "Suvvi paatalu",
      "Tappa",
      "Teej songs",
      "Tusu Gaan",
      "Villu Pattu",
    ],
    Devotional: [
      "Aarti",
      "Bhajan",
      "Carol",
      "Chalisa",
      "Chant",
      "Geet",
      "Gospel",
      "Gurbani",
      "Hymn",
      "Kirtan",
      "Mantra",
      "Paath",
      "Qawwals",
      "Shabd",
    ],
    "Hindustani Classical": ["Instrumental", "Vocal"],
    "Carnatic Classical": ["Instrumental", "Vocal"],
    "Ambient / Instrumental": [
      "Soft",
      "Easy Listening",
      "Electronic",
      "Fusion",
      "Lounge",
    ],
  };
  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  console.log(`${process.env.REACT_APP_BASE_URL}/user/payment-status-changer`);

  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/user/get-user/?id=${userId}`,
    );
    const data = await res.json();

    if (res.ok) {
      setUserdata(data.user);
    }
    setIsloading(false);
  };
  const handleActivateProfilePayment = async () => {
    if (!userId) {
      messageApi.error("User not found. Please log in again.");
      return;
    }

    setPaymentLoading(true);
    const razorpayLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!razorpayLoaded) {
      messageApi.error(
        "Razorpay SDK failed to load. Please check your internet connection.",
      );
      setPaymentLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 100,
            currency: "INR",
          }),
        },
      );

      const paymentData = await orderRes.json();

      if (!paymentData || !paymentData.order_id) {
        messageApi.error("Failed to create payment order. Please try again.");
        setPaymentLoading(false);
        return;
      }

      const options = {
        key: "rzp_test_RAQAuLXpIZAQYQ",
        amount: paymentData.amount,
        currency: paymentData.currency,
        order_id: paymentData.order_id,
        name: "Music Distribution - Profile Activation",
        description: "Activate profile by paying ₹100",
        handler: async function (response) {
          console.log(userId);

          try {
            const res = await fetch(
              `${process.env.REACT_APP_BASE_URL}/user/payment-status-changer`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: userId,
                }),
              },
            );
            const data = await res.json();
            console.log(data);
            if (res.ok) {
              messageApi.success(
                data.message || "Payment completed successfully.",
              );
              await fetcher();
            } else {
              messageApi.error(
                data.message ||
                  "Payment succeeded but profile status could not be updated.",
              );
            }
          } catch (error) {
            console.error("Error updating payment status:", error);
            messageApi.error(
              "Payment successful but failed to update profile status. Please contact support.",
            );
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          name: userData?.name || "User",
          email: userData?.email || "",
          contact: userData?.phone || "",
        },
        theme: {
          color: "#1677ff",
        },
        modal: {
          ondismiss: function () {
            messageApi.info("Payment cancelled.");
            setPaymentLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      messageApi.error("Failed to initiate payment. Please try again.");
      setPaymentLoading(false);
    }
  };
  useEffect(() => {
    fetcher();
    fetchArtists();
    setInpFields((prev) => ({ ...prev, labelName: labelNameFromStore }));
    // eslint-disable-next-line
  }, [labelNameFromStore]);

  const fetchArtists = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/get-all-artists`,
    );
    const data = await res.json();
    if (res.ok) {
      setArtists(data.artists);
    }
    setIsloading(false);
  };

  const handleArtistSearch = (role, value) => {
    if (!value) {
      setArtistOptions((prev) => ({ ...prev, [role]: [] }));
      return;
    }
    const filtered = artists
      .filter((a) => a.name.toLowerCase().includes(value.toLowerCase()))
      .map((a) => ({
        value: a.name,
        label: a.name,
        artist: a,
      }));
    setArtistOptions((prev) => ({ ...prev, [role]: filtered }));
  };
  // ...existing code...
  const handleArtistSelect = (role, value, option) => {
    const artist = option.artist;
    if (role === "singer") {
      if (
        selectedSingers.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, singer: "" }));
        return;
      }
      setSelectedSingers((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, singer: "" }));
    } else if (role === "composer") {
      if (
        selectedComposers.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, composer: "" }));
        return;
      }
      setSelectedComposers((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, composer: "" }));
    } else if (role === "lyricist") {
      if (
        selectedLyricists.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, lyricist: "" }));
        return;
      }
      setSelectedLyricists((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, lyricist: "" }));
    } else if (role === "musicDirector") {
      if (
        selectedMusicDirectors.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, musicDirector: "" }));
        return;
      }
      setSelectedMusicDirectors((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, musicDirector: "" }));
    } else if (role === "director") {
      if (
        selectedDirectors.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, director: "" }));
        return;
      }
      setSelectedDirectors((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, director: "" }));
    } else if (role === "producer") {
      if (
        selectedProducers.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, producer: "" }));
        return;
      }
      setSelectedProducers((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, producer: "" }));
    } else if (role === "starCast") {
      if (
        selectedStarCast.find(
          (s) =>
            s.name === artist.name &&
            s.appleId === (artist.appleId || "") &&
            s.spotifyId === (artist.spotifyId || "") &&
            s.facebookUrl === (artist.facebookUrl || "") &&
            s.instagramUrl === (artist.instagramUrl || ""),
        )
      ) {
        setInpFields((prev) => ({ ...prev, starCast: "" }));
        return;
      }
      setSelectedStarCast((prev) => [
        ...prev,
        {
          name: artist.name,
          appleId: artist.appleId || "",
          spotifyId: artist.spotifyId || "",
          facebookUrl: artist.facebookUrl || "",
          instagramUrl: artist.instagramUrl || "",
        },
      ]);
      setInpFields((prev) => ({ ...prev, starCast: "" }));
    } else {
      setInpFields((prev) => ({
        ...prev,
        [role]: artist.name,
        [`${role}AppleId`]: artist.appleId || "",
        [`${role}SpotifyId`]: artist.spotifyId || "",
        [`${role}FacebookUrl`]: artist.facebookUrl || "",
        [`${role}InstagramUrl`]: artist.instagramUrl || "",
      }));
    }
  };
  const removeSinger = (idx) => {
    setSelectedSingers((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeComposer = (idx) => {
    setSelectedComposers((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeLyricist = (idx) => {
    setSelectedLyricists((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeMusicDirector = (idx) => {
    setSelectedMusicDirectors((prev) => prev.filter((_, i) => i !== idx));
  };

  const removeDirector = (idx) => {
    setSelectedDirectors((prev) => prev.filter((_, i) => i !== idx));
  }; // ...inside your Form component...
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSubgenre, setSelectedSubgenre] = useState("");

  const removeProducer = (idx) => {
    setSelectedProducers((prev) => prev.filter((_, i) => i !== idx));
  };
  // ...existing code...

  const selectedKeyByRole = {
    singer: "selectedSingers",
    lyricist: "selectedLyricists",
    composer: "selectedComposers",
    musicDirector: "selectedMusicDirectors",
    director: "selectedDirectors",
    producer: "selectedProducers",
    starCast: "selectedStarCast",
  };

  const addSongSection = () => {
    setSongSections((prev) => [...prev, createSongSection()]);
  };

  const removeSongSection = (sectionId) => {
    setSongSections((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((section) => section.id !== sectionId),
    );
  };

  const updateSongField = (sectionId, field, value) => {
    setSongSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: {
                ...section.fields,
                [field]: value,
              },
            }
          : section,
      ),
    );
  };

  const handleSectionArtistSelect = (sectionId, role, value, option) => {
    const artist =
      option?.artist ||
      artists.find((a) => a.name.toLowerCase() === value.toLowerCase());
    if (!artist) return;
    const selectedKey = selectedKeyByRole[role];
    const selectedArtist = {
      name: artist.name,
      appleId: artist.appleId || "",
      spotifyId: artist.spotifyId || "",
      facebookUrl: artist.facebookUrl || "",
      instagramUrl: artist.instagramUrl || "",
    };

    setSongSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const alreadySelected = section[selectedKey].find(
          (s) =>
            s.name === selectedArtist.name &&
            s.appleId === selectedArtist.appleId &&
            s.spotifyId === selectedArtist.spotifyId &&
            s.facebookUrl === selectedArtist.facebookUrl &&
            s.instagramUrl === selectedArtist.instagramUrl,
        );
        if (alreadySelected) {
          return {
            ...section,
            fields: { ...section.fields, [role]: "" },
          };
        }
        return {
          ...section,
          fields: { ...section.fields, [role]: "" },
          [selectedKey]: [...section[selectedKey], selectedArtist],
        };
      }),
    );
  };

  const removeSectionArtist = (sectionId, role, artistIndex) => {
    const selectedKey = selectedKeyByRole[role];
    setSongSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              [selectedKey]: section[selectedKey].filter(
                (_, i) => i !== artistIndex,
              ),
            }
          : section,
      ),
    );
  };

  const getSectionFileProps = (sectionId) => ({
    beforeUpload: (file) => {
      const isValid =
        file.type === "audio/wav" ||
        file.type === "audio/mp3" ||
        file.type === "audio/mpeg";
      if (!isValid) {
        message.error(`Upload valid audio file!`);
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      const file = info.fileList[0]?.originFileObj || null;
      updateSongField(sectionId, "file", file);
    },
  });

  const joinNames = (items) => items.map((s) => s.name).join(", ");
  const joinAppleIds = (items) => items.map((s) => s.appleId).join(", ");
  const joinSpotifyIds = (items) => items.map((s) => s.spotifyId).join(", ");
  const joinFacebookUrls = (items) =>
    items.map((s) => s.facebookUrl).join(", ");
  const joinInstagramUrls = (items) =>
    items.map((s) => s.instagramUrl).join(", ");

  const getMissingSongMessage = (section, sectionIndex) => {
    const label = `Song ${sectionIndex + 1}`;
    if (section.fields.songTitle.trim().length === 0)
      return `${label}: Please enter song title.`;
    if (section.fields.file === null) return `${label}: Please upload audio.`;
    if (section.selectedSingers.length === 0)
      return `${label}: Please select singer from the list.`;
    if (section.selectedLyricists.length === 0)
      return `${label}: Please select lyricist from the list.`;
    if (section.selectedComposers.length === 0)
      return `${label}: Please select composer from the list.`;
    if (section.fields.isrc.length > 0 && section.fields.isrc.length < 12)
      return `${label}: ISRC must be at least 12 characters.`;
    return "";
  };

  const imgReader = (img) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      var imageData = event.target.result;
      var image = new Image();
      image.src = imageData;
      image.style.width = "5rem";
      document.querySelector("#imgbox").appendChild(image);
    };
    reader.readAsDataURL(img);
  };

  const readrr = async (e) => {
    const imgbox = document.getElementById("imgbox");
    imgbox.innerHTML = "";
    const file = e.target.files[0];
    if (!file) return;
    const fileMb = file.size / 1024 ** 2;
    if (fileMb > 10) {
      message.error(`Image size is greater than 10MB.`);
      imgbox.innerHTML = "";
      const thmb = document.getElementById("thmb");
      thmb.value = "";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    const isValid =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    if (!isValid) {
      message.error(`Only png, jpeg, jpg files are allowed.`);
      setIsloading(false);
      const thmb = document.getElementById("thmb");
      thmb.value = "";
      return;
    }
    reader.onload = function (e) {
      setIsloading(true);
      var image = new Image();
      image.src = e.target.result;
      image.style.width = "2rem";
      let width, height;
      image.onload = function (event) {
        height = this.height;
        width = this.width;
        const sixteen = width === 1600 && height === 1600;
        const three = width === 3000 && height === 3000;
        if (sixteen === false && three === false) {
          const thmb = document.getElementById("thmb");
          if (thmb) {
            thmb.value = "";
          }
          message.error(`Only 1600x1600 or 3000x3000 images are allowed`);
          setInpFields({ ...inpFields, thumbnail: null });
        } else {
          imgReader(file);
          setInpFields({ ...inpFields, thumbnail: file });
        }
        setIsloading(false);
      };
    };
  };

  const imgProps = {
    beforeUpload: async (file) => {
      let isValid;
      isValid =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isValid) {
        message.error(`Only .png .jpeg .jpg is allowed`);
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      const ele = document.querySelector(`#thumbnail`);
      ele.style.color = "#9e9e9e";
      let img;
      if (info.fileList[0]) {
        img = info.fileList[0].originFileObj;
        setInpFields({ ...inpFields, thumbnail: img });
      } else {
        setInpFields({ ...inpFields, thumbnail: null });
      }
    },
  };
  const fileProps = {
    beforeUpload: (file) => {
      const isValid =
        file.type === "audio/wav" ||
        file.type === "audio/mp3" ||
        file.type === "audio/mpeg";
      if (!isValid) {
        message.error(`Upload valid audio file!`);
      }
      return isValid || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      const ele = document.querySelector(`#file`);
      ele.style.color = "#9e9e9e";
      let file;
      if (info.fileList[0]) {
        file = info.fileList[0].originFileObj;
        setInpFields({ ...inpFields, file: file });
      } else {
        setInpFields({ ...inpFields, file: null });
      }
    },
  };

  const getSelectedValue = (e) => {
    const ele = document.querySelector(`#${e.target.id}`);
    const value = Number(ele.options[ele.selectedIndex].value);
    if (value === 0) {
      setSubLabels([]);
    }
    if (value === 1) {
      setSubLabels([
        {
          lbl: "Sub-label 1",
          key: "lbl1",
          id: "subLabel1",
        },
      ]);
    }
    if (value === 2) {
      setSubLabels([
        {
          lbl: "Sub-label 1",
          key: "lbl1",
          id: "subLabel1",
        },
        {
          lbl: "Sub-label 2",
          key: "lbl2",
          id: "subLabel2",
        },
      ]);
    }
    if (value === 3) {
      setSubLabels([
        {
          lbl: "Sub-label 1",
          key: "lbl1",
          id: "subLabel1",
        },
        {
          lbl: "Sub-label 2",
          key: "lbl2",
          id: "subLabel2",
        },
        {
          lbl: "Sub-label 3",
          key: "lbl3",
          id: "subLabel3",
        },
      ]);
    }
  };
  const onDateChanger = (date, dateString) => {
    const ele = document.querySelector("#dateOfRelease");
    ele.style.border = "none";
    setInpFields({ ...inpFields, dateOfRelease: dateString });
  };

  const onChangeHandler = (e) => {
    const id = e.target.id;
    console.log(id);

    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);
    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val });
  };

  const onSubmitHandler = async () => {
    setIsloading(true);

    const invalidSongIndex = songSections.findIndex(
      (section, sectionIndex) =>
        getMissingSongMessage(section, sectionIndex).length > 0,
    );
    const invalidSongMessage =
      invalidSongIndex !== -1
        ? getMissingSongMessage(
            songSections[invalidSongIndex],
            invalidSongIndex,
          )
        : "";

    if (
      inpFields.labelName.length === 0 ||
      inpFields.title.length === 0 ||
      inpFields.dateOfRelease.length === 0 ||
      inpFields.language.length === 0 ||
      inpFields.mood.length === 0 ||
      inpFields.contentType.length === 0 ||
      inpFields.thumbnail === null ||
      invalidSongIndex !== -1
    ) {
      if (inpFields.labelName.length === 0) {
        const labelName = document.querySelector("#labelName");
        labelName.style.border = "1px solid red";
      }
      if (inpFields.title.length === 0) {
        const title = document.querySelector("#title");
        title.style.border = "1px solid red";
      }
      if (inpFields.dateOfRelease.length === 0) {
        const dateOfRelease = document.querySelector("#dateOfRelease");
        dateOfRelease.style.border = "1px solid red";
      }
      if (inpFields.language.length === 0) {
        const language = document.querySelector("#language");
        language.style.border = "1px solid red";
      }
      if (inpFields.contentType.length === 0) {
        const contentType = document.querySelector("#contentType");
        contentType.style.border = "1px solid red";
      }
      if (inpFields.mood.length === 0) {
        const mood = document.querySelector("#mood");
        mood.style.border = "1px solid red";
      }
      if (inpFields.youtubeContentId.length === 0) {
        const youtubeContentId = document.querySelector("#youtubeContentId");
        youtubeContentId.style.border = "1px solid red";
      }
      if (inpFields.youtubeMusic.length === 0) {
        const youtubeMusic = document.querySelector("#youtubeMusic");
        youtubeMusic.style.border = "1px solid red";
      }
      if (inpFields.genre.length === 0) {
        const genre = document.querySelector("#genre");
        genre.style.border = "1px solid red";
      }
      if (inpFields.subgenre.length === 0) {
        const subgenre = document.querySelector("#subgenre");
        subgenre.style.border = "1px solid red";
      }
      if (invalidSongIndex !== -1) {
        const section = songSections[invalidSongIndex];
        if (section.fields.songTitle.trim().length === 0) {
          const songTitle = document.querySelector(`#songTitle-${section.id}`);
          if (songTitle) songTitle.style.border = "1px solid red";
        }
        if (section.selectedSingers.length === 0) {
          const singer = document.querySelector(`#singer-${section.id}`);
          if (singer) singer.style.border = "1px solid red";
        }
        if (section.selectedComposers.length === 0) {
          const composer = document.querySelector(`#composer-${section.id}`);
          if (composer) composer.style.border = "1px solid red";
        }
        if (section.selectedLyricists.length === 0) {
          const lyricist = document.querySelector(`#lyricist-${section.id}`);
          if (lyricist) lyricist.style.border = "1px solid red";
        }
        const file = document.querySelector(`#file-${section.id}`);
        if (file && section.fields.file === null) file.style.color = "red";
        if (section.fields.isrc.length > 0 && section.fields.isrc.length < 12) {
          const isrc = document.querySelector(`#isrc-${section.id}`);
          if (isrc) isrc.style.border = "1px solid red";
        }
      }

      if (inpFields.thumbnail === null) {
        const thumbnail = document.querySelector("#thumbnail");
        thumbnail.style.color = "red";
      }
      setIsloading(false);
      openValidationNotification(
        invalidSongMessage || "Fill all require fields.",
      );
      return;
    }

    try {
      for (const section of songSections) {
        const formData = new FormData();
        formData.append(
          "musicDirector",
          joinNames(section.selectedMusicDirectors),
        );
        formData.append("director", joinNames(section.selectedDirectors));
        formData.append("producer", joinNames(section.selectedProducers));
        formData.append("labelName", inpFields.labelName);
        formData.append("title", inpFields.title);
        formData.append("songtitle", section.fields.songTitle);
        formData.append("dateOfRelease", inpFields.dateOfRelease);
        formData.append("albumType", inpFields.albumType);
        formData.append("language", inpFields.language);
        formData.append("mood", inpFields.mood);
        formData.append("description", inpFields.description);

        formData.append("singer", joinNames(section.selectedSingers));
        formData.append("composer", joinNames(section.selectedComposers));
        formData.append("lyricist", joinNames(section.selectedLyricists));
        formData.append("youtubeMusic", inpFields.youtubeMusic);
        formData.append("contentType", inpFields.contentType);
        formData.append("youtubeContentId", inpFields.youtubeContentId);

        formData.append("lyrics", inpFields.lyrics);
        formData.append("upc", inpFields.upc);
        formData.append("isrc", section.fields.isrc);
        formData.append("crbt", section.fields.crbt);
        formData.append("subLabel1", inpFields.subLabel1);
        formData.append("subLabel2", inpFields.subLabel2);
        formData.append("subLabel3", inpFields.subLabel3);
        formData.append("genre", inpFields.genre);
        formData.append("starCast", joinNames(section.selectedStarCast));

        formData.append("singerAppleId", joinAppleIds(section.selectedSingers));
        formData.append(
          "singerSpotifyId",
          joinSpotifyIds(section.selectedSingers),
        );
        formData.append(
          "singerFacebookUrl",
          joinFacebookUrls(section.selectedSingers),
        );
        formData.append(
          "singerInstagramUrl",
          joinInstagramUrls(section.selectedSingers),
        );

        formData.append(
          "composerAppleId",
          joinAppleIds(section.selectedComposers),
        );
        formData.append(
          "composerSpotifyId",
          joinSpotifyIds(section.selectedComposers),
        );
        formData.append(
          "composerFacebookUrl",
          joinFacebookUrls(section.selectedComposers),
        );
        formData.append(
          "composerInstagramUrl",
          joinInstagramUrls(section.selectedComposers),
        );

        formData.append(
          "lyricistAppleId",
          joinAppleIds(section.selectedLyricists),
        );
        formData.append(
          "lyricistSpotifyId",
          joinSpotifyIds(section.selectedLyricists),
        );
        formData.append(
          "lyricistFacebookUrl",
          joinFacebookUrls(section.selectedLyricists),
        );
        formData.append(
          "lyricistInstagramUrl",
          joinInstagramUrls(section.selectedLyricists),
        );

        formData.append("file", section.fields.file);
        formData.append("thumbnail", inpFields.thumbnail);
        formData.append("userId", userId);
        formData.append("releaseDate", inpFields.releaseDate);
        formData.append("subgenre", inpFields.subgenre);

        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/new-order`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await res.json();
        if (!res.ok) {
          error(data.message || "Something went wrong");
          setIsloading(false);
          return;
        }
      }
      success(`${songSections.length} order created`);
      setTimeout(() => {
        navigate("/user-panel/history");
      }, 1000);
    } catch (err) {
      error("Network error");
    }
    setIsloading(false);
  };

  const renderArtistTags = (section, role) => {
    const selectedKey = selectedKeyByRole[role];
    const selectedArtists = section[selectedKey];
    const labelMap = {
      singer: "Singer",
      lyricist: "Lyricist",
      composer: "Composer",
      musicDirector: "Music Director",
      director: "Director",
      producer: "Producer",
      starCast: "Star Cast",
    };

    return (
      <div style={{ marginTop: "0.5rem" }}>
        {selectedArtists.length === 0 && (
          <div
            style={{
              color: "#bbb",
              fontSize: "0.8rem",
              fontStyle: "italic",
              padding: "0.2rem 0",
            }}
          >
            No {labelMap[role]} Selected
          </div>
        )}
        {selectedArtists.map((artist, idx) => (
          <ArtistTag key={`${section.id}-${role}-${idx}`}>
            <span
              style={{
                fontWeight: "500",
                fontSize: ".8rem",
                marginRight: "auto",
                color: "black",
                letterSpacing: ".06rem",
              }}
            >
              {artist.name}
            </span>
            <SocialLinks>
              <SocialIcon
                active={artist.facebookUrl?.trim().length > 0}
                onClick={() =>
                  artist.facebookUrl &&
                  window.open(artist.facebookUrl, "_blank")
                }
                title={
                  artist.facebookUrl
                    ? "Visit Facebook profile"
                    : "No Facebook profile"
                }
              >
                <FacebookOutlined />
              </SocialIcon>
              <SocialIcon
                active={artist.instagramUrl?.trim().length > 0}
                onClick={() =>
                  artist.instagramUrl &&
                  window.open(artist.instagramUrl, "_blank")
                }
                title={
                  artist.instagramUrl
                    ? "Visit Instagram profile"
                    : "No Instagram profile"
                }
              >
                <Instagram />
              </SocialIcon>
              <SocialIcon
                active={artist.appleId?.trim().length > 0}
                onClick={() =>
                  artist.appleId && window.open(artist.appleId, "_blank")
                }
                title={
                  artist.appleId
                    ? "Visit Apple Music profile"
                    : "No Apple Music profile"
                }
              >
                <Apple />
              </SocialIcon>
              <SocialIcon
                active={artist.spotifyId?.trim().length > 0}
                onClick={() =>
                  artist.spotifyId && window.open(artist.spotifyId, "_blank")
                }
                title={
                  artist.spotifyId
                    ? "Visit Spotify profile"
                    : "No Spotify profile"
                }
              >
                <FaSpotify style={{ fontSize: "1.1rem" }} />
              </SocialIcon>
            </SocialLinks>
            <RemoveButton
              onClick={() => removeSectionArtist(section.id, role, idx)}
              title={`Remove ${labelMap[role]}`}
            >
              <CloseOutlined />
            </RemoveButton>
          </ArtistTag>
        ))}
      </div>
    );
  };

  const renderArtistField = (section, role, label, required = false) => (
    <LabelInpBox>
      <Label htmlFor={`${role}-${section.id}`}>
        {label} {required && <span style={{ margin: 0 }}>*</span>}
      </Label>
      <AutoComplete
        id={`${role}-${section.id}`}
        value={section.fields[role]}
        options={artistOptions[role]}
        onSearch={(value) => handleArtistSearch(role, value)}
        onSelect={(value, option) =>
          handleSectionArtistSelect(section.id, role, value, option)
        }
        onChange={(value) => {
          const ele = document.querySelector(`#${role}-${section.id}`);
          if (ele) ele.style.border = "1px solid white";
          updateSongField(section.id, role, value);
        }}
        placeholder={`${label} name`}
        style={{ width: "100%" }}
        filterOption={false}
      />
      {renderArtistTags(section, role)}
    </LabelInpBox>
  );

  return (
    <MainDiv>
      <Breadcrumb
        items={[
          {
            title: "User Panel",
          },
          {
            title: "Upload Content",
          },
        ]}
      />
      {isLoading && <MusicLoader />}
      <h1>Upload Content</h1>{" "}
      {!isLoading && userData && userData.status === "pending" && (
        <>
          <PendingBox>
            <PendingTitle>
              <PendingPill>Under Review</PendingPill>
              Profile approval pending
            </PendingTitle>
            <div>
              Your profile is in review. Kindly wait for admin approval to
              upload content.
            </div>
          </PendingBox>
        </>
      )}
      {!isLoading && userData && userData.status === "paymentpending" && (
        <>
          <PendingBox>
            <PendingTitle>
              <PendingPill>Action Required</PendingPill>
              Activate your profile
            </PendingTitle>
            <div>
              Your profile is pending activation. Please pay Rs. 100 to activate
              your dashboard access.
            </div>
            <PendingActions>
              <Button
                type="primary"
                onClick={handleActivateProfilePayment}
                loading={paymentLoading}
              >
                Pay Now
              </Button>
            </PendingActions>
          </PendingBox>
        </>
      )}
      <Modal
        title={editingArtist ? "Edit Artist" : "Add Artist"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form1 form={form} layout="vertical" onFinish={handleSubmit}>
          <Form1.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter artist name" }]}
          >
            <AntdInput placeholder="Enter artist name" />
          </Form1.Item>

          <Form1.Item
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
              <Option value="starcast">Starcast</Option>
            </Select>
          </Form1.Item>

          {/* Only show social media fields for singer, lyricist, and composer */}

          <>
            <Form1.Item name="facebookUrl" label="Facebook URL">
              <AntdInput placeholder="https://facebook.com/profile" />
            </Form1.Item>

            <Form1.Item name="instagramUrl" label="Instagram URL">
              <AntdInput placeholder="https://instagram.com/profile" />
            </Form1.Item>

            <Form1.Item name="appleId" label="Apple Music URL">
              <AntdInput placeholder="https://music.apple.com/artist/id" />
            </Form1.Item>

            <Form1.Item name="spotifyId" label="Spotify URL">
              <AntdInput placeholder="https://open.spotify.com/artist/" />
            </Form1.Item>
          </>

          <Form1.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                {editingArtist ? "Update" : "Add"}
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form1.Item>
        </Form1>
      </Modal>
      {!isLoading &&
        userData &&
        userData.status !== "pending" &&
        userData.status !== "paymentpending" && (
          <>
            {showComposerModal && (
              <Modal1>
                <ModalBox>
                  <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                    <p style={{ color: "#353434" }}>
                      For Artist profile linking, only Facebook page link and
                      Instagram profile ID link will be accepted
                    </p>
                    <p>
                      Note: Name can't be edited. Please ensure you are adding
                      the correct name.
                    </p>
                  </div>
                  <ModalFormBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="composer">Name</Label>
                      <ModalInput
                        type="text"
                        id="composer"
                        onChange={onChangeHandler}
                        value={inpFields.composer}
                      />
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="composerAppleId">Apple ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="composerAppleId"
                          onChange={onChangeHandler}
                          value={inpFields.composerAppleId}
                        />
                        <Link to={inpFields.composerAppleId} target="_blank">
                          <Apple />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="composerSpotifyId">Spotify ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="composerSpotifyId"
                          onChange={onChangeHandler}
                          value={inpFields.composerSpotifyId}
                        />
                        <Link to={inpFields.composerSpotifyId} target="_blank">
                          <FaSpotify
                            style={{
                              transform: "scale(1.5)",
                            }}
                          />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="composerFacebookUrl">Facebook Url </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="composerFacebookUrl"
                          onChange={onChangeHandler}
                          value={inpFields.composerFacebookUrl}
                        />
                        <Link
                          to={inpFields.composerFacebookUrl}
                          target="_blank"
                        >
                          <FacebookOutlined />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="composerInstagramUrl">
                        Instagram Url{" "}
                      </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="composerInstagramUrl"
                          onChange={onChangeHandler}
                          value={inpFields.composerInstagramUrl}
                        />
                        <Link
                          to={inpFields.composerInstagramUrl}
                          target="_blank"
                        >
                          <Instagram />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <div></div>
                    <BtnBox>
                      <button
                        onClick={() => {
                          setShowComposerModal(false);
                        }}
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          setShowComposerModal(false);
                        }}
                      >
                        Cancel
                      </button>
                    </BtnBox>
                  </ModalFormBox>
                </ModalBox>
              </Modal1>
            )}
            {showLyricistModal && (
              <Modal1>
                <ModalBox>
                  {" "}
                  <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                    <p style={{ color: "#353434" }}>
                      For Artist profile linking, only Facebook page link and
                      Instagram profile ID link will be accepted
                    </p>
                    <p>
                      Note: Name can't be edited. Please ensure you are adding
                      the correct name.
                    </p>
                  </div>
                  <ModalFormBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="lyricist">Name</Label>
                      <ModalInput
                        type="text"
                        id="lyricist"
                        onChange={onChangeHandler}
                        value={inpFields.lyricist}
                      />
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="lyricistAppleId">Apple ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="lyricistAppleId"
                          onChange={onChangeHandler}
                          value={inpFields.lyricistAppleId}
                        />
                        <Link to={inpFields.lyricistAppleId} target="_blank">
                          <Apple />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="lyricistSpotifyId">Spotify ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="lyricistSpotifyId"
                          onChange={onChangeHandler}
                          value={inpFields.lyricistSpotifyId}
                        />
                        <Link to={inpFields.lyricistSpotifyId} target="_blank">
                          <FaSpotify
                            style={{
                              transform: "scale(1.5)",
                              marginLeft: "0.4rem",
                            }}
                          />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="lyricistFacebookUrl">Facebook Url </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="lyricistFacebookUrl"
                          onChange={onChangeHandler}
                          value={inpFields.lyricistFacebookUrl}
                        />
                        <Link
                          to={inpFields.lyricistFacebookUrl}
                          target="_blank"
                        >
                          <FacebookOutlined />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="lyricistInstagramUrl">
                        Instagram Url{" "}
                      </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="lyricistInstagramUrl"
                          onChange={onChangeHandler}
                          value={inpFields.lyricistInstagramUrl}
                        />
                        <Link
                          to={inpFields.lyricistInstagramUrl}
                          target="_blank"
                        >
                          <Instagram />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <div></div>

                    <BtnBox>
                      <button
                        onClick={() => {
                          setShowLyricistModal(false);
                        }}
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          setShowLyricistModal(false);
                        }}
                      >
                        Cancel
                      </button>
                    </BtnBox>
                  </ModalFormBox>
                </ModalBox>
              </Modal1>
            )}
            {showSingerModal && (
              <Modal1>
                <ModalBox>
                  {" "}
                  <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                    <p style={{ color: "#353434" }}>
                      For Artist profile linking, only Facebook page link and
                      Instagram profile ID link will be accepted
                    </p>
                    <p>
                      Note: Name can't be edited. Please ensure you are adding
                      the correct name.
                    </p>
                  </div>
                  <ModalFormBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="singer">Name</Label>
                      <ModalInput
                        type="text"
                        id="singer"
                        onChange={onChangeHandler}
                        value={inpFields.singer}
                      />
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="singerAppleId">Apple ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="singerAppleId"
                          onChange={onChangeHandler}
                          value={inpFields.singerAppleId}
                        />
                        <Link to={inpFields.singerAppleId} target="_blank">
                          <Apple />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="singerSpotifyId">Spotify ID</Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <ModalInput
                          type="text"
                          id="singerSpotifyId"
                          onChange={onChangeHandler}
                          value={inpFields.singerSpotifyId}
                        />
                        <Link to={inpFields.singerSpotifyId} target="_blank">
                          <FaSpotify
                            style={{
                              transform: "scale(1.5)",
                              marginLeft: "0.4rem",
                            }}
                          />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="singerFacebookUrl">Facebook Url </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <ModalInput
                          type="text"
                          id="singerFacebookUrl"
                          onChange={onChangeHandler}
                          value={inpFields.singerFacebookUrl}
                        />
                        <Link to={inpFields.singerFacebookUrl} target="_blank">
                          <FacebookOutlined />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <LabelInpBox style={{ width: "100%" }}>
                      <Label htmlFor="singerInstagramUrl">Instagram Url </Label>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          alignItems: "center",
                        }}
                      >
                        <ModalInput
                          type="text"
                          id="singerInstagramUrl"
                          onChange={onChangeHandler}
                          value={inpFields.singerInstagramUrl}
                        />
                        <Link to={inpFields.singerInstagramUrl} target="_blank">
                          <Instagram />
                        </Link>
                      </div>
                    </LabelInpBox>
                    <div></div>

                    <BtnBox>
                      <button
                        onClick={() => {
                          setShowSingerModal(false);
                        }}
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => {
                          setShowSingerModal(false);
                        }}
                      >
                        Cancel
                      </button>
                    </BtnBox>
                  </ModalFormBox>
                </ModalBox>
              </Modal1>
            )}
            {contextHolderNot}
            {contextHolder}

            <FormBox>
              <FormSeperator>
                <h2>Label</h2>
                <AllInpBox>
                  <LabelInpBox id="1">
                    <Label htmlFor="labelName">
                      label name <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="labelName"
                      id="labelName"
                      placeholder="Label"
                      disabled
                      onChange={onChangeHandler}
                      value={inpFields.labelName}
                    />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label>sub-label</Label>
                    <Select1
                      name="category"
                      id="category"
                      onChange={getSelectedValue}
                    >
                      <Option defaultValue value={0}>
                        NA
                      </Option>
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                      <Option value={3}>3</Option>
                    </Select1>
                  </LabelInpBox>
                  {subLabels.length > 0 &&
                    subLabels.map((sbl) => {
                      return (
                        <LabelInpBox key={sbl.key}>
                          <Label htmlFor={sbl.id}>{sbl.lbl}</Label>
                          <Input
                            type="text"
                            name={sbl.id}
                            id={sbl.id}
                            placeholder="sub-label name"
                            onChange={onChangeHandler}
                            value={inpFields[sbl.id]}
                          />
                        </LabelInpBox>
                      );
                    })}
                </AllInpBox>
              </FormSeperator>
              <FormSeperator>
                <h2>Album</h2>
                <AllInpBox>
                  <LabelInpBox>
                    <Label htmlFor="title">
                      Album title <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="title"
                      onChange={onChangeHandler}
                      value={inpFields.title}
                    />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="language">
                      Album Language <span style={{ margin: 0 }}>*</span>
                    </Label>

                    <Select1
                      name="language"
                      id="language"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;
                        setInpFields({ ...inpFields, language: value });
                      }}
                    >
                      {" "}
                      <Option value="Garhwali">Garhwali</Option>
                      <Option value="Ahirani">Ahirani</Option>
                      <Option value="Arabic">Arabic</Option>
                      <Option value="Assamese">Assamese</Option>
                      <Option value="Awadhi">Awadhi</Option>
                      <Option value="Banjara">Banjara</Option>
                      <Option value="Bengali">Bengali</Option>
                      <Option value="Bhojpuri">Bhojpuri</Option>
                      <Option value="Burmese">Burmese</Option>
                      <Option value="Chhattisgarhi">Chhattisgarhi</Option>
                      <Option value="Chinese">Chinese</Option>
                      <Option value="Dogri">Dogri</Option>
                      <Option value="English">English</Option>
                      <Option value="French">French</Option>
                      <Option value="Garo">Garo</Option>
                      <Option value="Gujarati">Gujarati</Option>
                      <Option value="Haryanvi">Haryanvi</Option>
                      <Option value="Himachali">Himachali</Option>
                      <Option value="Hindi">Hindi</Option>
                      <Option value="Iban">Iban</Option>
                      <Option value="Indonesian">Indonesian</Option>
                      <Option value="Instrumental">Instrumental</Option>
                      <Option value="Italian">Italian</Option>
                      <Option value="Japanese">Japanese</Option>
                      <Option value="Javanese">Javanese</Option>
                      <Option value="Kannada">Kannada</Option>
                      <Option value="Kashmiri">Kashmiri</Option>
                      <Option value="Khasi">Khasi</Option>
                      <Option value="Kokborok">Kokborok</Option>
                      <Option value="Konkani">Konkani</Option>
                      <Option value="Korean">Korean</Option>
                      {/* <Option value="Kumauni">Kumauni</Option> */}
                      <Option value="Latin">Latin</Option>
                      <Option value="Maithili">Maithili</Option>
                      <Option value="Malay">Malay</Option>
                      <Option value="Malayalam">Malayalam</Option>
                      <Option value="Mandarin">Mandarin</Option>
                      <Option value="Manipuri">Manipuri</Option>
                      <Option value="Marathi">Marathi</Option>
                      <Option value="Marwari">Marwari</Option>
                      <Option value="Naga">Naga</Option>
                      <Option value="Nagpuri">Nagpuri</Option>
                      <Option value="Nepali">Nepali</Option>
                      <Option value="Odia">Odia</Option>
                      <Option value="Pali">Pali</Option>
                      <Option value="Persian">Persian</Option>
                      <Option value="Punjabi">Punjabi</Option>
                      <Option value="Rajasthani">Rajasthani</Option>
                      <Option value="Sambalpuri">Sambalpuri</Option>
                      <Option value="Sanskrit">Sanskrit</Option>
                      <Option value="Santali">Santali</Option>
                      <Option value="Santhili">Santhili</Option>
                      <Option value="Sindhi">Sindhi</Option>
                      <Option value="Sinhala">Sinhala</Option>
                      <Option value="Spanish">Spanish</Option>
                      <Option value="Swahili">Swahili</Option>
                      <Option value="Tamil">Tamil</Option>
                      <Option value="Telugu">Telugu</Option>
                      <Option value="Thai">Thai</Option>
                      <Option value="Tibetan">Tibetan</Option>
                      <Option value="Tulu">Tulu</Option>
                      <Option value="Turkish">Turkish</Option>
                      <Option value="Ukrainian">Ukrainian</Option>
                      <Option value="Urdu">Urdu</Option>
                    </Select1>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="genre">
                      Genre <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="genre"
                      id="genre"
                      onChange={(e) => {
                        const id = e.target.id;

                        const ele = document.querySelector(`#${id}`);
                        ele.style.border = "1px solid #d7d7d7";
                        const value = e.target.value;
                        setSelectedGenre(value);
                        setInpFields({
                          ...inpFields,
                          genre: value,
                          subgenre: "",
                        });
                      }}
                      value={selectedGenre}
                    >
                      <Option value="">Select Genre</Option>
                      {Object.keys(genreSubgenreMap).map((genre) => (
                        <Option key={genre} value={genre}>
                          {genre}
                        </Option>
                      ))}
                    </Select1>
                  </LabelInpBox>

                  <LabelInpBox>
                    <Label htmlFor="subgenre">
                      Sub Genre <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="subgenre"
                      id="subgenre"
                      onChange={(e) => {
                        const id = e.target.id;

                        const ele = document.querySelector(`#${id}`);
                        ele.style.border = "1px solid #d7d7d7";
                        const value = e.target.value;
                        setSelectedSubgenre(value);
                        setInpFields({ ...inpFields, subgenre: value });
                      }}
                      value={selectedSubgenre}
                      disabled={!selectedGenre}
                    >
                      <Option value="">Select Sub Genre</Option>
                      {selectedGenre &&
                        genreSubgenreMap[selectedGenre].map((subgenre) => (
                          <Option key={subgenre} value={subgenre}>
                            {subgenre}
                          </Option>
                        ))}
                    </Select1>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="upc">upc</Label>
                    <Input
                      type="text"
                      name="upc"
                      id="upc"
                      onChange={onChangeHandler}
                      value={inpFields.upc}
                      placeholder="upc"
                    />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="dateOfRelease">
                      Date of Live <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <DatePicker onChange={onDateChanger} id="dateOfRelease" />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="releaseDate">
                      release date{" "}
                      <span
                        style={{
                          color: "#b3b2b2",
                          textTransform: "none",
                        }}
                      >
                        (If already released)
                      </span>
                    </Label>
                    <DatePicker
                      onChange={(date, dateString) => {
                        setInpFields({ ...inpFields, releaseDate: dateString });
                      }}
                      id="releaseDate"
                    />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label>
                      Album Category <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="albumType"
                      id="albumType"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;
                        setInpFields({ ...inpFields, albumType: value });
                      }}
                    >
                      {" "}
                      <Option value={"album"}>Album</Option>
                      <Option value={"movie/soundtrack"}>
                        Movie/Soundtrack
                      </Option>
                    </Select1>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label>
                      Content Type <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="contentType"
                      id="contentType"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;
                        setInpFields({ ...inpFields, contentType: value });
                      }}
                    >
                      <Option value={"single"}>Single</Option>
                      <Option value={"album"}>Album</Option>
                      <Option value={"compilation"}>Compilation</Option>
                      <Option value={"remix"}>Remix</Option>
                    </Select1>
                  </LabelInpBox>

                  <LabelInpBox>
                    <Label htmlFor="mood">
                      Album mood <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="mood"
                      id="mood"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;

                        setInpFields({ ...inpFields, mood: value });
                      }}
                    >
                      <Option value={"Romantic"}>Romantic</Option>
                      <Option value={"Happy"}>Happy</Option>
                      <Option value={"Sad"}>Sad</Option>
                      <Option value={"Dance"}>Dance</Option>
                      <Option value={"Bhangra"}>Bhangra</Option>
                      <Option value={"Partiotic"}>Partiotic</Option>
                      <Option value={"Nostalgic"}>Nostalgic</Option>
                      <Option value={"Inspirational"}>Inspirational</Option>
                      <Option value={"Enthusiastic"}>Enthusiastic</Option>
                      <Option value={"Optimistic"}>Optimistic</Option>
                      <Option value={"Passion"}>Passion</Option>
                      <Option value={"Pessimistic"}>Pessimistic</Option>
                      <Option value={"Spiritual"}>Spiritual</Option>
                      <Option value={"Peppy"}>Peppy</Option>
                      <Option value={"Philosophical"}>Philosophical</Option>
                      <Option value={"Mellow"}>Mellow</Option>
                      <Option value={"Calm"}>Calm</Option>
                    </Select1>
                  </LabelInpBox>

                  <LabelInpBox>
                    <Label htmlFor="youtubeContentId">
                      YouTube Content Id <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="youtubeContentId"
                      id="youtubeContentId"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;
                        setInpFields({ ...inpFields, youtubeContentId: value });
                      }}
                      value={inpFields.youtubeContentId}
                    >
                      <Option value="">Select</Option>
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select1>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="youtubeMusic">
                      YouTube Music <span style={{ margin: 0 }}>*</span>
                    </Label>
                    <Select1
                      name="youtubeMusic"
                      id="youtubeMusic"
                      onChange={(e) => {
                        const ele = document.querySelector(`#${e.target.id}`);
                        const value = ele.options[ele.selectedIndex].value;
                        setInpFields({ ...inpFields, youtubeMusic: value });
                      }}
                      value={inpFields.youtubeMusic}
                    >
                      <Option value="">Select</Option>
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select1>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="thumbnail" id="thumbnail">
                      Thumbnail (Max. size 10MB)
                      <span style={{ margin: 0 }}>*</span>
                    </Label>
                    {/* <Upload
                method="get"
                listType="picture"
                {...imgProps}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload image</Button>
              </Upload> */}
                    <Input
                      type="file"
                      name=""
                      accept="image/png, image/jpeg, image/jpg "
                      id="thmb"
                      onChange={readrr}
                    />
                    <div id="imgbox" style={{ width: "1rem" }}></div>
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="description">Album description</Label>
                    <TxtArea
                      rows="5"
                      name="description"
                      id="description"
                      onChange={onChangeHandler}
                      value={inpFields.description}
                      placeholder="description"
                    />
                  </LabelInpBox>
                  <LabelInpBox>
                    <Label htmlFor="lyrics">Album lyrics (optional)</Label>
                    <TxtArea
                      rows="5"
                      id="lyrics"
                      placeholder="lyrics"
                      onChange={onChangeHandler}
                      value={inpFields.lyrics}
                    ></TxtArea>
                  </LabelInpBox>
                </AllInpBox>
              </FormSeperator>

              <FormSeperator>
                <SectionHeader>
                  <h2>Song Sections</h2>
                  <SectionActions>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={addSongSection}
                    />
                  </SectionActions>
                </SectionHeader>
                {songSections.map((section, sectionIndex) => (
                  <div key={section.id}>
                    {sectionIndex > 0 && <SongDivider />}
                    <SectionHeader>
                      <h2 style={{ color: "red" }}>Song {sectionIndex + 1}</h2>
                      {songSections.length > 1 && (
                        <Button
                          danger
                          icon={<CloseOutlined />}
                          onClick={() => removeSongSection(section.id)}
                        />
                      )}
                    </SectionHeader>

                    <h2 style={{ margin: ".7rem 0 " }}>CRBT</h2>
                    <AllInpBox>
                      <LabelInpBox>
                        <Label
                          htmlFor={`file-${section.id}`}
                          id={`file-${section.id}`}
                        >
                          Audio{" "}
                          <span style={{ margin: 0, textTransform: "none" }}>
                            (.wav or .mp3)*
                          </span>
                        </Label>
                        <Upload
                          method="get"
                          listType="picture"
                          {...getSectionFileProps(section.id)}
                          maxCount={1}
                        >
                          <Button icon={<UploadOutlined />}>Audio file</Button>
                        </Upload>
                        {section.fields.file && (
                          <AudioPlayer
                            src={
                              typeof section.fields.file === "string"
                                ? section.fields.file
                                : URL.createObjectURL(section.fields.file)
                            }
                            autoPlayAfterSrcChange={false}
                            showJumpControls={false}
                            customAdditionalControls={[]}
                            layout="stacked-reverse"
                            style={{
                              marginTop: "1rem",
                            }}
                          />
                        )}
                      </LabelInpBox>
                      <LabelInpBox>
                        <Label htmlFor={`isrc-${section.id}`}>isrc</Label>
                        <Input
                          type="text"
                          name="isrc"
                          id={`isrc-${section.id}`}
                          onChange={(e) => {
                            e.target.style.border = "1px solid #d7d7d7";
                            updateSongField(section.id, "isrc", e.target.value);
                          }}
                          value={section.fields.isrc}
                          placeholder="isrc"
                        />
                      </LabelInpBox>
                      <LabelInpBox>
                        <Label htmlFor={`songTitle-${section.id}`}>
                          Song Title <span style={{ margin: 0 }}>*</span>
                        </Label>
                        <Input
                          type="text"
                          name="songTitle"
                          id={`songTitle-${section.id}`}
                          placeholder="song title"
                          onChange={(e) => {
                            e.target.style.border = "1px solid #d7d7d7";
                            updateSongField(
                              section.id,
                              "songTitle",
                              e.target.value,
                            );
                          }}
                          value={section.fields.songTitle}
                        />
                      </LabelInpBox>

                      <LabelInpBox>
                        <Label htmlFor={`crbt-${section.id}`}>
                          CRBT /Preview Start Time
                          <span
                            style={{
                              color: "#b3b2b2",
                              textTransform: "none",
                            }}
                          >
                            (mm:ss)
                          </span>
                        </Label>
                        <TimePicker
                          name="crbt"
                          id={`crbt-${section.id}`}
                          format={format}
                          defaultValue={moment(section.fields.crbt, format)}
                          onChange={(time) => {
                            if (!time) return;
                            updateSongField(
                              section.id,
                              "crbt",
                              time.format(format),
                            );
                          }}
                        />
                      </LabelInpBox>
                    </AllInpBox>

                    <SectionHeader style={{ marginTop: "1rem" }}>
                      <h2>Artists</h2>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                      >
                        Add Artist
                      </Button>
                    </SectionHeader>
                    <p
                      style={{
                        margin: ".7rem 0",
                        fontSize: ".78rem",
                        lineHeight: "1.2rem",
                        color: "#5f6368",
                        background: "#f5f7fa",
                        padding: ".55rem .75rem",
                        borderRadius: "6px",
                        border: "1px solid #e2e6eb",
                      }}
                    >
                      Select artists for this song section. The label and album
                      details above will be reused for every song submitted.
                    </p>
                    <AllInpBox>
                      {renderArtistField(section, "singer", "singer", true)}
                      {renderArtistField(section, "lyricist", "lyricist", true)}
                      {renderArtistField(section, "composer", "composer", true)}
                      {renderArtistField(
                        section,
                        "musicDirector",
                        "music Director",
                      )}
                      {renderArtistField(section, "director", "director")}
                      {renderArtistField(section, "producer", "Producer")}
                      {renderArtistField(section, "starCast", "starCast")}
                    </AllInpBox>
                  </div>
                ))}
                <BtnDiv>
                  <button onClick={onSubmitHandler}>Submit</button>
                </BtnDiv>
              </FormSeperator>

              {false && (
                <>
                  <FormSeperator>
                    <h2>CRBT</h2>
                    <AllInpBox>
                      <LabelInpBox>
                        <Label htmlFor="file" id="file">
                          Audio{" "}
                          <span style={{ margin: 0, textTransform: "none" }}>
                            (.wav or .mp3)*
                          </span>
                        </Label>
                        <Upload
                          method="get"
                          listType="picture"
                          {...fileProps}
                          maxCount={1}
                        >
                          <Button icon={<UploadOutlined />}>Audio file</Button>
                        </Upload>
                        {inpFields.file && (
                          <AudioPlayer
                            src={
                              inpFields.file
                                ? typeof inpFields.file === "string"
                                  ? inpFields.file
                                  : URL.createObjectURL(inpFields.file)
                                : ""
                            }
                            autoPlayAfterSrcChange={false}
                            showJumpControls={false}
                            customAdditionalControls={[]}
                            layout="stacked-reverse"
                            style={{
                              marginTop: "1rem",
                            }}
                          />
                        )}
                      </LabelInpBox>
                      <LabelInpBox>
                        <Label htmlFor="isrc">isrc</Label>
                        <Input
                          type="text"
                          name="isrc"
                          id="isrc"
                          onChange={onChangeHandler}
                          value={inpFields.isrc}
                          placeholder="isrc"
                        />
                      </LabelInpBox>
                      <LabelInpBox>
                        <Label htmlFor="title">Song name</Label>
                        <Input
                          type="text"
                          name="title"
                          id="title"
                          placeholder="title"
                          disabled
                          onChange={onChangeHandler}
                          value={inpFields.title}
                        />
                      </LabelInpBox>

                      <LabelInpBox>
                        <Label htmlFor="crbt">
                          CRBT /Preview Start Time
                          <span
                            style={{
                              color: "#b3b2b2",
                              textTransform: "none",
                            }}
                          >
                            (mm:ss)
                          </span>
                        </Label>
                        <TimePicker
                          name="crbt"
                          id="crbt"
                          format={format}
                          onChange={(time) => {
                            if (!time) return;
                            console.log("hi");
                            console.log(time.format(format));
                            setInpFields({
                              ...inpFields,
                              crbt: time.format(format),
                            });
                          }}
                        />
                      </LabelInpBox>
                    </AllInpBox>
                  </FormSeperator>
                  <FormSeperator>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        width: "99%",
                      }}
                    >
                      <h2>Artists</h2>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={showAddModal}
                      >
                        Add Artist
                      </Button>
                    </div>
                    <p
                      style={{
                        margin: "-0.4rem 0 0.6rem 0",
                        fontSize: ".78rem",
                        lineHeight: "1.2rem",
                        color: "#5f6368",
                        background: "#f5f7fa",
                        padding: ".55rem .75rem",
                        borderRadius: "6px",
                        border: "1px solid #e2e6eb",
                      }}
                    >
                      Note: Please select artists using the auto-complete fields
                      below. If an artist is not listed, add the artist first
                      using the Add Artist button, then select it. This ensures
                      consistent, professional metadata for your release.
                    </p>
                    <AllInpBox>
                      {/* SINGER */}
                      <LabelInpBox>
                        <Label htmlFor="singer">
                          singer <span style={{ margin: 0 }}>*</span>
                        </Label>
                        <AutoComplete
                          id="singer"
                          value={inpFields.singer}
                          options={artistOptions.singer}
                          onSearch={(value) =>
                            handleArtistSearch("singer", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("singer", value, option)
                          }
                          onChange={(value) => {
                            const ele = document.querySelector(`#singer`);

                            ele.style.border = "1px solid white";
                            setInpFields({ ...inpFields, singer: value });
                          }}
                          placeholder="Singer name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedSingers.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Singer Selected
                            </div>
                          )}
                          {selectedSingers.map((s, idx) => (
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
                                {s.name}
                              </span>
                              <SocialLinks>
                                <SocialIcon
                                  active={s.facebookUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.facebookUrl &&
                                    window.open(s.facebookUrl, "_blank")
                                  }
                                  title={
                                    s.facebookUrl
                                      ? "Visit Facebook profile"
                                      : "No Facebook profile"
                                  }
                                >
                                  <FacebookOutlined />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.instagramUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.instagramUrl &&
                                    window.open(s.instagramUrl, "_blank")
                                  }
                                  title={
                                    s.instagramUrl
                                      ? "Visit Instagram profile"
                                      : "No Instagram profile"
                                  }
                                >
                                  <Instagram />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.appleId?.trim().length > 0}
                                  onClick={() =>
                                    s.appleId &&
                                    window.open(s.appleId, "_blank")
                                  }
                                  title={
                                    s.appleId
                                      ? "Visit Apple Music profile"
                                      : "No Apple Music profile"
                                  }
                                >
                                  <Apple />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.spotifyId?.trim().length > 0}
                                  onClick={() =>
                                    s.spotifyId &&
                                    window.open(s.spotifyId, "_blank")
                                  }
                                  title={
                                    s.spotifyId
                                      ? "Visit Spotify profile"
                                      : "No Spotify profile"
                                  }
                                >
                                  <FaSpotify style={{ fontSize: "1.1rem" }} />
                                </SocialIcon>
                              </SocialLinks>
                              <RemoveButton
                                onClick={() => removeSinger(idx)}
                                title="Remove singer"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>
                      {/* <LabelInpBox>
                  <Label htmlFor="singer">Add Singer Profile</Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <FacebookOutlined
                      onClick={() => {
                        window.open("https://www.facebook.com/", "_blank");
                      }}
                    />
                    <Instagram
                      onClick={() => {
                        window.open("https://www.instagram.com/", "_blank");
                      }}
                    />
                    <Apple
                      onClick={() => {
                        window.open("https://music.apple.com/us/new", "_blank");
                      }}
                    />
                    <FaSpotify
                      style={{
                        transform: "scale(1.5)",
                        margin: "0 .3rem",
                      }}
                      onClick={() => {
                        window.open("https://open.spotify.com/", "_blank");
                      }}
                    />
                    <Input
                      style={{ width: "15%" }}
                      onClick={() => {
                        setShowSingerModal(true);
                      }}
                      type="button"
                      value={`+`}
                    />
                  </div>
                </LabelInpBox> */}
                      {/* LYRICIST */}
                      <LabelInpBox>
                        <Label htmlFor="lyricist">lyricist</Label>
                        <AutoComplete
                          id="lyricist"
                          value={inpFields.lyricist}
                          options={artistOptions.lyricist}
                          onSearch={(value) =>
                            handleArtistSearch("lyricist", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("lyricist", value, option)
                          }
                          onChange={(value) => {
                            const ele = document.querySelector(`#lyricist`);
                            ele.style.border = "1px solid white";
                            setInpFields({ ...inpFields, lyricist: value });
                          }}
                          placeholder="Lyricist name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        {/* Show selected lyricists as tags */}
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedLyricists.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Lyricist Selected
                            </div>
                          )}
                          {selectedLyricists.map((s, idx) => (
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
                                {s.name}
                              </span>
                              <SocialLinks>
                                <SocialIcon
                                  active={s.facebookUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.facebookUrl &&
                                    window.open(s.facebookUrl, "_blank")
                                  }
                                  title={
                                    s.facebookUrl
                                      ? "Visit Facebook profile"
                                      : "No Facebook profile"
                                  }
                                >
                                  <FacebookOutlined />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.instagramUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.instagramUrl &&
                                    window.open(s.instagramUrl, "_blank")
                                  }
                                  title={
                                    s.instagramUrl
                                      ? "Visit Instagram profile"
                                      : "No Instagram profile"
                                  }
                                >
                                  <Instagram />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.appleId?.trim().length > 0}
                                  onClick={() =>
                                    s.appleId &&
                                    window.open(s.appleId, "_blank")
                                  }
                                  title={
                                    s.appleId
                                      ? "Visit Apple Music profile"
                                      : "No Apple Music profile"
                                  }
                                >
                                  <Apple />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.spotifyId?.trim().length > 0}
                                  onClick={() =>
                                    s.spotifyId &&
                                    window.open(s.spotifyId, "_blank")
                                  }
                                  title={
                                    s.spotifyId
                                      ? "Visit Spotify profile"
                                      : "No Spotify profile"
                                  }
                                >
                                  <FaSpotify style={{ fontSize: "1.1rem" }} />
                                </SocialIcon>
                              </SocialLinks>
                              <RemoveButton
                                onClick={() => removeLyricist(idx)}
                                title="Remove lyricist"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>
                      {/* <LabelInpBox>
                  <Label htmlFor="lyricist">Add Lyricist Profile</Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <FacebookOutlined
                      onClick={() => {
                        window.open("https://www.facebook.com/", "_blank");
                      }}
                    />
                    <Instagram
                      onClick={() => {
                        window.open("https://www.instagram.com/", "_blank");
                      }}
                    />
                    <Apple
                      onClick={() => {
                        window.open("https://music.apple.com/us/new", "_blank");
                      }}
                    />
                    <FaSpotify
                      style={{
                        transform: "scale(1.5)",
                        margin: "0 .3rem",
                      }}
                      onClick={() => {
                        window.open("https://open.spotify.com/", "_blank");
                      }}
                    />
                    <Input
                      style={{ width: "15%" }}
                      onClick={() => {
                        setShowLyricistModal(true);
                      }}
                      type="button"
                      value={`+`}
                    />
                  </div>
                </LabelInpBox> */}
                      {/* COMPOSER */}
                      <LabelInpBox>
                        <Label htmlFor="composer">composer</Label>
                        <AutoComplete
                          id="composer"
                          value={inpFields.composer}
                          options={artistOptions.composer}
                          onSearch={(value) =>
                            handleArtistSearch("composer", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("composer", value, option)
                          }
                          onChange={(value) => {
                            const ele = document.querySelector(`#composer`);
                            ele.style.border = "1px solid white";
                            setInpFields({ ...inpFields, composer: value });
                          }}
                          placeholder="Composer name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        {/* Show selected composers as tags */}
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedComposers.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Composer Selected
                            </div>
                          )}
                          {selectedComposers.map((s, idx) => (
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
                                {s.name}
                              </span>
                              <SocialLinks>
                                <SocialIcon
                                  active={s.facebookUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.facebookUrl &&
                                    window.open(s.facebookUrl, "_blank")
                                  }
                                  title={
                                    s.facebookUrl
                                      ? "Visit Facebook profile"
                                      : "No Facebook profile"
                                  }
                                >
                                  <FacebookOutlined />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.instagramUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.instagramUrl &&
                                    window.open(s.instagramUrl, "_blank")
                                  }
                                  title={
                                    s.instagramUrl
                                      ? "Visit Instagram profile"
                                      : "No Instagram profile"
                                  }
                                >
                                  <Instagram />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.appleId?.trim().length > 0}
                                  onClick={() =>
                                    s.appleId &&
                                    window.open(s.appleId, "_blank")
                                  }
                                  title={
                                    s.appleId
                                      ? "Visit Apple Music profile"
                                      : "No Apple Music profile"
                                  }
                                >
                                  <Apple />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.spotifyId?.trim().length > 0}
                                  onClick={() =>
                                    s.spotifyId &&
                                    window.open(s.spotifyId, "_blank")
                                  }
                                  title={
                                    s.spotifyId
                                      ? "Visit Spotify profile"
                                      : "No Spotify profile"
                                  }
                                >
                                  <FaSpotify style={{ fontSize: "1.1rem" }} />
                                </SocialIcon>
                              </SocialLinks>
                              <RemoveButton
                                onClick={() => removeComposer(idx)}
                                title="Remove Composer"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>
                      {/* <LabelInpBox>
                  <Label htmlFor="composer">Add Composer Profile</Label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".5rem",
                    }}
                  >
                    <FacebookOutlined
                      onClick={() => {
                        window.open("https://www.facebook.com/", "_blank");
                      }}
                    />
                    <Instagram
                      onClick={() => {
                        window.open("https://www.instagram.com/", "_blank");
                      }}
                    />
                    <Apple
                      onClick={() => {
                        window.open("https://music.apple.com/us/new", "_blank");
                      }}
                    />
                    <FaSpotify
                      style={{
                        transform: "scale(1.5)",
                        margin: "0 .3rem",
                      }}
                      onClick={() => {
                        window.open("https://open.spotify.com/", "_blank");
                      }}
                    />
                    <Input
                      style={{ width: "15%" }}
                      onClick={() => {
                        setShowComposerModal(true);
                      }}
                      type="button"
                      value={`+`}
                    />
                  </div>
                </LabelInpBox> */}
                      {/* OTHERS */}
                      {/* MUSIC DIRECTOR */}
                      <LabelInpBox>
                        <Label htmlFor="musicDirector">music Director</Label>
                        <AutoComplete
                          id="musicDirector"
                          value={inpFields.musicDirector}
                          options={artistOptions.musicDirector}
                          onSearch={(value) =>
                            handleArtistSearch("musicDirector", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("musicDirector", value, option)
                          }
                          onChange={(value) =>
                            setInpFields({ ...inpFields, musicDirector: value })
                          }
                          placeholder="Music director name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedMusicDirectors.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Music Director Selected
                            </div>
                          )}
                          {selectedMusicDirectors.map((s, idx) => (
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
                                {s.name}
                              </span>

                              <RemoveButton
                                onClick={() => removeMusicDirector(idx)}
                                title="Remove Music Director"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>

                      {/* DIRECTOR */}
                      <LabelInpBox>
                        <Label htmlFor="director">director</Label>
                        <AutoComplete
                          id="director"
                          value={inpFields.director}
                          options={artistOptions.director}
                          onSearch={(value) =>
                            handleArtistSearch("director", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("director", value, option)
                          }
                          onChange={(value) =>
                            setInpFields({ ...inpFields, director: value })
                          }
                          placeholder="Director name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedDirectors.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Director Selected
                            </div>
                          )}
                          {selectedDirectors.map((s, idx) => (
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
                                {s.name}
                              </span>

                              <RemoveButton
                                onClick={() => removeDirector(idx)}
                                title="Remove Director"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>

                      {/* PRODUCER */}
                      <LabelInpBox>
                        <Label htmlFor="Producer">Producer</Label>
                        <AutoComplete
                          id="producer"
                          value={inpFields.producer}
                          options={artistOptions.producer}
                          onSearch={(value) =>
                            handleArtistSearch("producer", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("producer", value, option)
                          }
                          onChange={(value) =>
                            setInpFields({ ...inpFields, producer: value })
                          }
                          placeholder="Producer name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedProducers.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Producer Selected
                            </div>
                          )}
                          {selectedProducers.map((s, idx) => (
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
                                {s.name}
                              </span>

                              <RemoveButton
                                onClick={() => removeProducer(idx)}
                                title="Remove Producer"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>
                      <LabelInpBox>
                        <Label htmlFor="starCast">starCast</Label>
                        <AutoComplete
                          id="starCast"
                          value={inpFields.starCast}
                          options={artistOptions.starCast}
                          onSearch={(value) =>
                            handleArtistSearch("starCast", value)
                          }
                          onSelect={(value, option) =>
                            handleArtistSelect("starCast", value, option)
                          }
                          onChange={(value) =>
                            setInpFields({ ...inpFields, starCast: value })
                          }
                          placeholder="Star Cast name"
                          style={{ width: "100%" }}
                          filterOption={false}
                        />
                        {/* Show selected star cast as tags */}
                        <div style={{ marginTop: "0.5rem" }}>
                          {selectedStarCast.length === 0 && (
                            <div
                              style={{
                                color: "#bbb",
                                fontSize: "0.8rem",
                                fontStyle: "italic",
                                padding: "0.2rem 0",
                              }}
                            >
                              No Star Cast Selected
                            </div>
                          )}
                          {selectedStarCast.map((s, idx) => (
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
                                {s.name}
                              </span>
                              <SocialLinks>
                                <SocialIcon
                                  active={s.facebookUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.facebookUrl &&
                                    window.open(s.facebookUrl, "_blank")
                                  }
                                  title={
                                    s.facebookUrl
                                      ? "Visit Facebook profile"
                                      : "No Facebook profile"
                                  }
                                >
                                  <FacebookOutlined />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.instagramUrl?.trim().length > 0}
                                  onClick={() =>
                                    s.instagramUrl &&
                                    window.open(s.instagramUrl, "_blank")
                                  }
                                  title={
                                    s.instagramUrl
                                      ? "Visit Instagram profile"
                                      : "No Instagram profile"
                                  }
                                >
                                  <Instagram />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.appleId?.trim().length > 0}
                                  onClick={() =>
                                    s.appleId &&
                                    window.open(s.appleId, "_blank")
                                  }
                                  title={
                                    s.appleId
                                      ? "Visit Apple Music profile"
                                      : "No Apple Music profile"
                                  }
                                >
                                  <Apple />
                                </SocialIcon>
                                <SocialIcon
                                  active={s.spotifyId?.trim().length > 0}
                                  onClick={() =>
                                    s.spotifyId &&
                                    window.open(s.spotifyId, "_blank")
                                  }
                                  title={
                                    s.spotifyId
                                      ? "Visit Spotify profile"
                                      : "No Spotify profile"
                                  }
                                >
                                  <FaSpotify style={{ fontSize: "1.1rem" }} />
                                </SocialIcon>
                              </SocialLinks>
                              <RemoveButton
                                onClick={() => removeStarCast(idx)}
                                title="Remove Star Cast"
                              >
                                <CloseOutlined />
                              </RemoveButton>
                            </ArtistTag>
                          ))}
                        </div>
                      </LabelInpBox>
                    </AllInpBox>
                    <BtnDiv>
                      <button onClick={onSubmitHandler}>Submit</button>
                    </BtnDiv>
                  </FormSeperator>
                </>
              )}
            </FormBox>
          </>
        )}
    </MainDiv>
  );
};

export default Form;
