import { AutoComplete, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import MusicLoader from "../Loader/MusicLoader";
import { useNavigate, useParams } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { Apple, FacebookOutlined, Instagram } from "@mui/icons-material";
import { FaSpotify } from "react-icons/fa";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";

// Add styled components for artist tags and social icons
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

const OuterBox = styled.div`
  height: 99%;
  overflow-y: scroll;
`;

const MainDiv = styled.div`
  height: 99%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    margin: 0;
    text-transform: uppercase;
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
const Select = styled.select`
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
const Modal = styled.div`
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

const EditOrder = () => {
  const userId = useSelector((state) => state.userId);

  const deafaultFields = {
    labelName: "",
    title: "",
    dateOfRelease: "",
    albumType: "song",
    language: "Hindi",
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
    crbt: "",
    genre: "Classical",
    musicDirector: "",
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
    subgenre: "",
    releaseDate: "",
    youtubeContentId: "",
    youtubeMusic: "",
  };
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [inpFields, setInpFields] = useState(deafaultFields);
  const [subLabels, setSubLabels] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [showSingerModal, setShowSingerModal] = useState(false);
  const [showComposerModal, setShowComposerModal] = useState(false);
  const [showLyricistModal, setShowLyricistModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const fetcher = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/get-order/?id=${id}`
    );
    const data = await res.json();

    setInpFields({
      ...data.order,

      singer: "",
      composer: "",
      lyricist: "",
      producer: "",
      starCast: "",
    });

    setSelectedGenre(data.order.genre);
    setSelectedSubgenre(data.order.subgenre);
    setOrder({
      ...data.order,

      singer: "",
      composer: "",
      lyricist: "",
      producer: "",
      starCast: "",
    });
    console.log({
      ...data.order,

      singer: "",
      composer: "",
      lyricist: "",
      producer: "",
      starCast: "",
    });

    setIsloading(false);
  };

  // --- ARTIST AUTOCOMPLETE LOGIC (copied from Form) ---
  const [artists, setArtists] = useState([]);

  const fetchArtists = async () => {
    setIsloading(true);
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/get-all-artists`
    );
    const data = await res.json();
    if (res.ok) {
      setArtists(data.artists);
    }
    setIsloading(false);
  };
  useEffect(() => {
    fetcher();
    fetchArtists();
    return () => {};
    // eslint-disable-next-line
  }, [id]);

  // ------------------------------------------------------

  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Fill all require fields.",
    });
  };

  const navigate = useNavigate();
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
    const fileMb = file.size / 1024 ** 2;
    if (fileMb > 10) {
      message.error(`Image size is greater than 10MB.`);
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
      image.onload = function () {
        height = this.height;
        width = this.width;
        const sixteen = width === 1600 && height === 1600;
        const three = width === 3000 && height === 3000;
        if (sixteen === false && three === false) {
          const thmb = document.getElementById("thmb");
          thmb.value = "";
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
    beforeUpload: (file) => {
      const isValid =
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
        message.error(`Upload valid audio or video file!`);
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
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);
    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val });
  };
  const format = "HH:mm:ss";

  const [selectedSingers, setSelectedSingers] = useState([]);
  const [selectedComposers, setSelectedComposers] = useState([]);
  const [selectedLyricists, setSelectedLyricists] = useState([]);
  const [selectedMusicDirectors, setSelectedMusicDirectors] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedProducers, setSelectedProducers] = useState([]);
  const [selectedStarCast, setSelectedStarCast] = useState([]);

  // Add starCast to artistOptions
  const [artistOptions, setArtistOptions] = useState({
    singer: [],
    lyricist: [],
    composer: [],
    musicDirector: [],
    director: [],
    producer: [],
    starCast: [],
  });

  // Clear selected artists on order change
  useEffect(() => {
    if (order) {
      setSelectedSingers([]);
      setSelectedComposers([]);
      setSelectedLyricists([]);
      setSelectedMusicDirectors([]);
      setSelectedDirectors([]);
      setSelectedProducers([]);
      setSelectedStarCast([]);
      setInpFields({ ...order, thumbnail: null, file: null });
    }
  }, [order]);

  // Update handleArtistSearch for starCast
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

  // Multi-select handler for all artists
  const handleArtistSelect = (role, value, option) => {
    const artist = option.artist;
    const artistObj = {
      name: artist.name,
      appleId: artist.appleId || "",
      spotifyId: artist.spotifyId || "",
      facebookUrl: artist.facebookUrl || "",
      instagramUrl: artist.instagramUrl || "",
    };
    const alreadySelected = (arr) =>
      arr.find(
        (s) =>
          s.name === artistObj.name &&
          s.appleId === artistObj.appleId &&
          s.spotifyId === artistObj.spotifyId &&
          s.facebookUrl === artistObj.facebookUrl &&
          s.instagramUrl === artistObj.instagramUrl
      );
    if (role === "singer") {
      if (alreadySelected(selectedSingers))
        return setInpFields((prev) => ({ ...prev, singer: "" }));
      setSelectedSingers((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, singer: "" }));
    } else if (role === "composer") {
      if (alreadySelected(selectedComposers))
        return setInpFields((prev) => ({ ...prev, composer: "" }));
      setSelectedComposers((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, composer: "" }));
    } else if (role === "lyricist") {
      if (alreadySelected(selectedLyricists))
        return setInpFields((prev) => ({ ...prev, lyricist: "" }));
      setSelectedLyricists((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, lyricist: "" }));
    } else if (role === "musicDirector") {
      if (alreadySelected(selectedMusicDirectors))
        return setInpFields((prev) => ({ ...prev, musicDirector: "" }));
      setSelectedMusicDirectors((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, musicDirector: "" }));
    } else if (role === "director") {
      if (alreadySelected(selectedDirectors))
        return setInpFields((prev) => ({ ...prev, director: "" }));
      setSelectedDirectors((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, director: "" }));
    } else if (role === "producer") {
      if (alreadySelected(selectedProducers))
        return setInpFields((prev) => ({ ...prev, producer: "" }));
      setSelectedProducers((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, producer: "" }));
    } else if (role === "starCast") {
      if (alreadySelected(selectedStarCast))
        return setInpFields((prev) => ({ ...prev, starCast: "" }));
      setSelectedStarCast((prev) => [...prev, artistObj]);
      setInpFields((prev) => ({ ...prev, starCast: "" }));
    }
  };

  // Remove functions for each artist type
  const removeSinger = (idx) =>
    setSelectedSingers((prev) => prev.filter((_, i) => i !== idx));
  const removeComposer = (idx) =>
    setSelectedComposers((prev) => prev.filter((_, i) => i !== idx));
  const removeLyricist = (idx) =>
    setSelectedLyricists((prev) => prev.filter((_, i) => i !== idx));
  const removeMusicDirector = (idx) =>
    setSelectedMusicDirectors((prev) => prev.filter((_, i) => i !== idx));
  const removeDirector = (idx) =>
    setSelectedDirectors((prev) => prev.filter((_, i) => i !== idx));
  const removeProducer = (idx) =>
    setSelectedProducers((prev) => prev.filter((_, i) => i !== idx));
  const removeStarCast = (idx) =>
    setSelectedStarCast((prev) => prev.filter((_, i) => i !== idx));
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
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedSubgenre, setSelectedSubgenre] = useState("");
  const onSubmitHandler = async () => {
    if (selectedSingers.length === 0) {
      const singer = document.querySelector("#singer");
      singer.style.border = "1px solid red";
      openNotificationWithIcon("error");
      return;
    }

    if (inpFields.isrc.length > 0) {
      if (inpFields.isrc.length < 12) {
        const isrc = document.querySelector("#isrc");
        isrc.style.border = "1px solid red";
        setIsloading(false);
        openNotificationWithIcon("error");
        return;
      }
    }
    setIsloading(true);
    const singerNames = selectedSingers.map((s) => s.name).join(", ");
    const singerAppleIds = selectedSingers.map((s) => s.appleId).join(", ");
    const singerSpotifyIds = selectedSingers.map((s) => s.spotifyId).join(", ");
    const singerFacebookUrls = selectedSingers
      .map((s) => s.facebookUrl)
      .join(", ");
    const singerInstagramUrls = selectedSingers
      .map((s) => s.instagramUrl)
      .join(", ");

    const composerNames = selectedComposers.map((s) => s.name).join(", ");
    const composerAppleIds = selectedComposers.map((s) => s.appleId).join(", ");
    const composerSpotifyIds = selectedComposers
      .map((s) => s.spotifyId)
      .join(", ");
    const composerFacebookUrls = selectedComposers
      .map((s) => s.facebookUrl)
      .join(", ");
    const composerInstagramUrls = selectedComposers
      .map((s) => s.instagramUrl)
      .join(", ");

    const lyricistNames = selectedLyricists.map((s) => s.name).join(", ");
    const lyricistAppleIds = selectedLyricists.map((s) => s.appleId).join(", ");
    const lyricistSpotifyIds = selectedLyricists
      .map((s) => s.spotifyId)
      .join(", ");
    const lyricistFacebookUrls = selectedLyricists
      .map((s) => s.facebookUrl)
      .join(", ");
    const lyricistInstagramUrls = selectedLyricists
      .map((s) => s.instagramUrl)
      .join(", ");

    const musicDirectorNames = selectedMusicDirectors
      .map((s) => s.name)
      .join(", ");
    const directorNames = selectedDirectors.map((s) => s.name).join(", ");
    const producerNames = selectedProducers.map((s) => s.name).join(", ");
    const starCastNames = selectedStarCast.map((s) => s.name).join(", ");

    const formData = new FormData();

    // ...replace formData.append for artists...
    formData.append("singer", singerNames.length > 0 ? singerNames : "");
    formData.append("composer", composerNames.length > 0 ? composerNames : "");
    formData.append("lyricist", lyricistNames.length > 0 ? lyricistNames : "");
    formData.append(
      "musicDirector",
      musicDirectorNames.length > 0 ? musicDirectorNames : ""
    );
    formData.append("director", directorNames.length > 0 ? directorNames : "");
    formData.append("producer", producerNames.length > 0 ? producerNames : "");
    formData.append("starCast", starCastNames.length > 0 ? starCastNames : "");

    formData.append("singerAppleId", singerAppleIds);
    formData.append("singerSpotifyId", singerSpotifyIds);
    formData.append("singerFacebookUrl", singerFacebookUrls);
    formData.append("singerInstagramUrl", singerInstagramUrls);

    formData.append("composerAppleId", composerAppleIds);
    formData.append("composerSpotifyId", composerSpotifyIds);
    formData.append("composerFacebookUrl", composerFacebookUrls);
    formData.append("composerInstagramUrl", composerInstagramUrls);

    formData.append("lyricistAppleId", lyricistAppleIds);
    formData.append("lyricistSpotifyId", lyricistSpotifyIds);
    formData.append("lyricistFacebookUrl", lyricistFacebookUrls);
    formData.append("lyricistInstagramUrl", lyricistInstagramUrls);
    formData.append("youtubeMusic", inpFields.youtubeMusic);
    formData.append("youtubeContentId", inpFields.youtubeContentId);

    formData.append("labelName", inpFields.labelName);
    formData.append("title", inpFields.title);
    formData.append("dateOfRelease", inpFields.dateOfRelease);
    formData.append("albumType", inpFields.albumType);
    formData.append("language", inpFields.language);
    formData.append("mood", inpFields.mood);
    formData.append("description", inpFields.description);

    formData.append("thumbnail", inpFields.thumbnail);

    formData.append("lyrics", inpFields.lyrics);
    formData.append("upc", inpFields.upc);
    formData.append("isrc", inpFields.isrc);

    formData.append("crbt", inpFields.crbt);
    formData.append("subLabel1", inpFields.subLabel1);
    formData.append("subLabel2", inpFields.subLabel2);
    formData.append("subLabel3", inpFields.subLabel3);
    formData.append("genre", inpFields.genre);

    if (inpFields.file) {
      formData.append("file", inpFields.file);
    }
    formData.append("userId", userId);
    formData.append("releaseDate", inpFields.releaseDate);
    formData.append("subgenre", inpFields.subgenre);

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/update-order/?id=${id}&action=edit`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const data = await res.json();

    if (res.ok) {
      success(data.message);
      setTimeout(() => {
        navigate("/user-panel/history");
      }, 1000);
    }
    if (!res.ok) {
      error(data.message);
    }
    setIsloading(false);
  };

  return (
    <OuterBox>
      {order && (
        <MainDiv>
          {showComposerModal && (
            <Modal>
              <ModalBox>
                <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                  <p style={{ color: "#353434" }}>
                    For Artist profile linking, only Facebook page link and
                    Instagram profile ID link will be accepted
                  </p>
                  <p>
                    Note: Name can't be edited. Please ensure you are adding the
                    correct name.
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
                    <ModalInput
                      type="text"
                      id="composerAppleId"
                      onChange={onChangeHandler}
                      value={inpFields.composerAppleId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="composerSpotifyId">Spotify ID</Label>
                    <ModalInput
                      type="text"
                      id="composerSpotifyId"
                      onChange={onChangeHandler}
                      value={inpFields.composerSpotifyId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="composerFacebookUrl">Facebook Url </Label>
                    <ModalInput
                      type="text"
                      id="composerFacebookUrl"
                      onChange={onChangeHandler}
                      value={inpFields.composerFacebookUrl}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="composerInstagramUrl">Instagram Url </Label>
                    <ModalInput
                      type="text"
                      id="composerInstagramUrl"
                      onChange={onChangeHandler}
                      value={inpFields.composerInstagramUrl}
                    />
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
            </Modal>
          )}
          {showLyricistModal && (
            <Modal>
              <ModalBox>
                <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                  <p style={{ color: "#353434" }}>
                    For Artist profile linking, only Facebook page link and
                    Instagram profile ID link will be accepted
                  </p>
                  <p>
                    Note: Name can't be edited. Please ensure you are adding the
                    correct name.
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
                    <ModalInput
                      type="text"
                      id="lyricistAppleId"
                      onChange={onChangeHandler}
                      value={inpFields.lyricistAppleId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="lyricistSpotifyId">Spotify ID</Label>
                    <ModalInput
                      type="text"
                      id="lyricistSpotifyId"
                      onChange={onChangeHandler}
                      value={inpFields.lyricistSpotifyId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="lyricistFacebookUrl">Facebook Url </Label>
                    <ModalInput
                      type="text"
                      id="lyricistFacebookUrl"
                      onChange={onChangeHandler}
                      value={inpFields.lyricistFacebookUrl}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="lyricistInstagramUrl">Instagram Url </Label>
                    <ModalInput
                      type="text"
                      id="lyricistInstagramUrl"
                      onChange={onChangeHandler}
                      value={inpFields.lyricistInstagramUrl}
                    />
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
            </Modal>
          )}
          {showSingerModal && (
            <Modal>
              <ModalBox>
                <div style={{ padding: "0rem .6rem", color: "#9c9c9c" }}>
                  <p style={{ color: "#353434" }}>
                    For Artist profile linking, only Facebook page link and
                    Instagram profile ID link will be accepted
                  </p>
                  <p>
                    Note: Name can't be edited. Please ensure you are adding the
                    correct name.
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
                    <ModalInput
                      type="text"
                      id="singerAppleId"
                      onChange={onChangeHandler}
                      value={inpFields.singerAppleId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="singerSpotifyId">Spotify ID</Label>
                    <ModalInput
                      type="text"
                      id="singerSpotifyId"
                      onChange={onChangeHandler}
                      value={inpFields.singerSpotifyId}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="singerFacebookUrl">Facebook Url </Label>
                    <ModalInput
                      type="text"
                      id="singerFacebookUrl"
                      onChange={onChangeHandler}
                      value={inpFields.singerFacebookUrl}
                    />
                  </LabelInpBox>
                  <LabelInpBox style={{ width: "100%" }}>
                    <Label htmlFor="singerInstagramUrl">Instagram Url </Label>
                    <ModalInput
                      type="text"
                      id="singerInstagramUrl"
                      onChange={onChangeHandler}
                      value={inpFields.singerInstagramUrl}
                    />
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
            </Modal>
          )}
          {contextHolderNot}
          {contextHolder}
          <Breadcrumb
            items={[
              {
                title: "User Panel",
              },
              {
                title: "History",
              },
              {
                title: "Order Details",
              },
              {
                title: "Edit",
              },
            ]}
          />
          <h1>Edit Upload</h1>
          <FormBox>
            {isLoading && <MusicLoader />}
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
                    onChange={onChangeHandler}
                    value={inpFields.labelName}
                  />
                </LabelInpBox>
                <LabelInpBox>
                  <Label>sub-label</Label>
                  <Select
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
                  </Select>
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
                  <DatePicker
                    onChange={onDateChanger}
                    id="dateOfRelease"
                    value={
                      inpFields.dateOfRelease
                        ? dayjs(inpFields.dateOfRelease)
                        : null
                    }
                  />
                </LabelInpBox>
                <LabelInpBox>
                  <Label>
                    Album type <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
                    name="albumType"
                    id="albumType"
                    onChange={(e) => {
                      const ele = document.querySelector(`#${e.target.id}`);
                      const value = ele.options[ele.selectedIndex].value;
                      setInpFields({ ...inpFields, albumType: value });
                    }}
                  >
                    <Option value={"song"}>Song</Option>
                    <Option value={"film"}>film</Option>
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="genre">
                    Genre <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
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
                  </Select>
                </LabelInpBox>

                <LabelInpBox>
                  <Label htmlFor="subgenre">
                    Sub Genre <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
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
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="language">
                    Album Language <span style={{ margin: 0 }}>*</span>
                  </Label>

                  <Select
                    name="language"
                    id="language"
                    onChange={(e) => {
                      const ele = document.querySelector(`#${e.target.id}`);
                      const value = ele.options[ele.selectedIndex].value;
                      setInpFields({ ...inpFields, language: value });
                    }}
                  >
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
                    <Option value="Garhwali">Garhwali</Option>
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
                    <Option value="Kumauni">Kumauni</Option>
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
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="description">Album description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    onChange={onChangeHandler}
                    value={inpFields.description}
                    placeholder="description"
                  />
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
                    value={
                      inpFields.releaseDate
                        ? dayjs(inpFields.releaseDate)
                        : null
                    }
                  />
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="mood">
                    Album mood <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
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
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="youtubeContentId">
                    YouTube Content Id <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
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
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="youtubeMusic">
                    YouTube Music <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Select
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
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="thumbnail" id="thumbnail">
                    Thumbnail (Max. size 10MB){" "}
                    <span style={{ margin: 0 }}>*</span>
                  </Label>
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
              <h2>CRBT</h2>
              <AllInpBox>
                <LabelInpBox>
                  <Label htmlFor="file" id="file">
                    file <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <Upload
                    method="get"
                    listType="picture"
                    {...fileProps}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Upload file</Button>
                  </Upload>
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
                  <Label htmlFor="title">title</Label>
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
                    Time{" "}
                    <span
                      style={{
                        color: "#b3b2b2",
                        textTransform: "none",
                      }}
                    >
                      (hh:mm:ss)
                    </span>
                  </Label>

                  <TimePicker
                    name="crbt"
                    id="crbt"
                    format={format}
                    value={
                      inpFields.crbt ? dayjs(inpFields.crbt, format) : null
                    }
                    onChange={(time) => {
                      if (!time) {
                        setInpFields({ ...inpFields, crbt: "" });
                        return;
                      }
                      const res =
                        String(time.hour()).padStart(2, "0") +
                        ":" +
                        String(time.minute()).padStart(2, "0") +
                        ":" +
                        String(time.second()).padStart(2, "0");
                      setInpFields({ ...inpFields, crbt: res });
                    }}
                  />
                </LabelInpBox>
              </AllInpBox>
            </FormSeperator>
            <FormSeperator>
              <h2>Artists</h2>
              <AllInpBox>
                <LabelInpBox>
                  <Label htmlFor="singer">
                    singer <span style={{ margin: 0 }}>*</span>
                  </Label>
                  <AutoComplete
                    id="singer"
                    value={inpFields.singer}
                    options={artistOptions.singer}
                    onSearch={(value) => handleArtistSearch("singer", value)}
                    onSelect={(value, option) =>
                      handleArtistSelect("singer", value, option)
                    }
                    onChange={(value) =>
                      setInpFields({ ...inpFields, singer: value })
                    }
                    placeholder="singer name"
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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

                <LabelInpBox>
                  <Label htmlFor="composer">composer</Label>
                  <AutoComplete
                    id="composer"
                    value={inpFields.composer}
                    options={artistOptions.composer}
                    onSearch={(value) => handleArtistSearch("composer", value)}
                    onSelect={(value, option) =>
                      handleArtistSelect("composer", value, option)
                    }
                    onChange={(value) =>
                      setInpFields({ ...inpFields, composer: value })
                    }
                    placeholder="composer name"
                    style={{ width: "100%" }}
                    filterOption={false}
                  />
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
                          title="Remove composer"
                        >
                          <CloseOutlined />
                        </RemoveButton>
                      </ArtistTag>
                    ))}
                  </div>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="lyricist">lyricist</Label>
                  <AutoComplete
                    id="lyricist"
                    value={inpFields.lyricist}
                    options={artistOptions.lyricist}
                    onSearch={(value) => handleArtistSearch("lyricist", value)}
                    onSelect={(value, option) =>
                      handleArtistSelect("lyricist", value, option)
                    }
                    onChange={(value) =>
                      setInpFields({ ...inpFields, lyricist: value })
                    }
                    placeholder="lyricist name"
                    style={{ width: "100%" }}
                    filterOption={false}
                  />
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
                    placeholder="music director name"
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
                          onClick={() => removeMusicDirector(idx)}
                          title="Remove music director"
                        >
                          <CloseOutlined />
                        </RemoveButton>
                      </ArtistTag>
                    ))}
                  </div>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="director">director</Label>
                  <AutoComplete
                    id="director"
                    value={inpFields.director}
                    options={artistOptions.director}
                    onSearch={(value) => handleArtistSearch("director", value)}
                    onSelect={(value, option) =>
                      handleArtistSelect("director", value, option)
                    }
                    onChange={(value) =>
                      setInpFields({ ...inpFields, director: value })
                    }
                    placeholder="director name"
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
                          onClick={() => removeDirector(idx)}
                          title="Remove director"
                        >
                          <CloseOutlined />
                        </RemoveButton>
                      </ArtistTag>
                    ))}
                  </div>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="producer">producer</Label>
                  <AutoComplete
                    id="producer"
                    value={inpFields.producer}
                    options={artistOptions.producer}
                    onSearch={(value) => handleArtistSearch("producer", value)}
                    onSelect={(value, option) =>
                      handleArtistSelect("producer", value, option)
                    }
                    onChange={(value) =>
                      setInpFields({ ...inpFields, producer: value })
                    }
                    placeholder="producer name"
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
                          onClick={() => removeProducer(idx)}
                          title="Remove producer"
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
                    onSearch={(value) => handleArtistSearch("starCast", value)}
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
                              s.appleId && window.open(s.appleId, "_blank")
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
                              s.spotifyId && window.open(s.spotifyId, "_blank")
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
          </FormBox>
        </MainDiv>
      )}
    </OuterBox>
  );
};

export default EditOrder;
