import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import MusicLoader from "../Loader/MusicLoader";
import { useNavigate } from "react-router";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { TimePicker } from "antd";
import { notification } from "antd";
import { useSelector } from "react-redux";

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

const Form = () => {
  const userId = useSelector((state) => state.userId);

  const [api, contextHolderNot] = notification.useNotification({
    duration: 1.5,
  });
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Fill all require fields.",
    });
  };
  const format = "mm:ss";
  const deafaultFields = {
    labelName: "",
    title: "",
    dateOfRelease: "",
    albumType: "album",
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
  };
  const [inpFields, setInpFields] = useState(deafaultFields);
  const [subLabels, setSubLabels] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const [showSingerModal, setShowSingerModal] = useState(false);
  const [showComposerModal, setShowComposerModal] = useState(false);
  const [showLyricistModal, setShowLyricistModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
  useEffect(() => {
    return () => {};
  }, []);

  const readrr = async (file) => {
    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function (e) {
      var image = new Image();

      image.src = e.target.result;
      let width, height;
      image.onload = async function () {
        height = this.height;
        width = this.width;
      };

      if (width != 1600 && height != 1600) {
        message.error(`Only 1600x1600 images are allowed`);
        return false;
      }
      return true;
    };
  };

  const imgProps = {
    beforeUpload: async (file) => {
      let isValid;
      console.log(file);
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
      console.log(file.type);
      const isValid =
        file.type === "audio/wav" ||
        file.type === "audio/mp3" ||
        file.type === "audio/mpeg";
      // file.type === "audio/mpeg" ||
      // file.type === "audio/aac" ||
      // file.type === "audio/flac" ||
      // file.type === "audio/alac" ||
      // file.type === "audio/wma" ||
      // file.type === "audio/aiff" ||
      // file.type === "video/mp4" ||
      // file.type === "video/x-msvideo" ||
      // file.type === "video/x-ms-wmv" ||
      // file.type === "video/x-flv" ||
      // file.type === "video/quicktime";

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
    console.log(dateString);
  };

  const onChangeHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);

    ele.style.border = "1px solid #d7d7d7";
    setInpFields({ ...inpFields, [id]: val });
  };

  const onSubmitHandler = async () => {
    setIsloading(true);
    if (
      inpFields.labelName.length === 0 ||
      inpFields.title.length === 0 ||
      inpFields.dateOfRelease.length === 0 ||
      inpFields.language.length === 0 ||
      inpFields.description.length === 0 ||
      inpFields.mood.length === 0 ||
      inpFields.singer.length === 0 ||
      inpFields.composer.length === 0 ||
      inpFields.director.length === 0 ||
      inpFields.producer.length === 0 ||
      inpFields.starCast.length === 0 ||
      inpFields.thumbnail === null ||
      inpFields.file === null
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
      if (inpFields.description.length === 0) {
        const description = document.querySelector("#description");
        description.style.border = "1px solid red";
      }
      if (inpFields.mood.length === 0) {
        const mood = document.querySelector("#mood");
        mood.style.border = "1px solid red";
      }
      if (inpFields.singer.length === 0) {
        const singer = document.querySelector("#singer");
        singer.style.border = "1px solid red";
      }
      if (inpFields.composer.length === 0) {
        const composer = document.querySelector("#composer");
        composer.style.border = "1px solid red";
      }
      if (inpFields.director.length === 0) {
        const director = document.querySelector("#director");
        director.style.border = "1px solid red";
      }
      if (inpFields.producer.length === 0) {
        const producer = document.querySelector("#producer");
        producer.style.border = "1px solid red";
      }
      if (inpFields.starCast.length === 0) {
        const starCast = document.querySelector("#starCast");
        starCast.style.border = "1px solid red";
      }
      if (inpFields.thumbnail === null) {
        const thumbnail = document.querySelector("#thumbnail");
        thumbnail.style.color = "red";
      }
      if (inpFields.file === null) {
        const file = document.querySelector("#file");
        file.style.color = "red";
      }
      setIsloading(false);
      openNotificationWithIcon("error");
      return;
    }
    if (inpFields.lyricist.length === 0) {
      const lyricist = document.querySelector("#lyricist");
      lyricist.style.border = "1px solid red";

      setIsloading(false);
      openNotificationWithIcon("error");
      return;
    }

    const formData = new FormData();

    formData.append("labelName", inpFields.labelName);
    formData.append("title", inpFields.title);

    formData.append("dateOfRelease", inpFields.dateOfRelease);
    formData.append("albumType", inpFields.albumType);
    formData.append("language", inpFields.language);
    formData.append("mood", inpFields.mood);
    formData.append("description", inpFields.description);
    formData.append("singer", inpFields.singer);
    formData.append("composer", inpFields.composer);
    formData.append("director", inpFields.director);
    formData.append("producer", inpFields.producer);
    formData.append("starCast", inpFields.starCast);
    formData.append("lyrics", inpFields.lyrics);
    formData.append("upc", inpFields.upc);
    formData.append("isrc", inpFields.isrc);
    formData.append("lyricist", inpFields.lyricist);
    formData.append("crbt", inpFields.crbt);
    formData.append("subLabel1", inpFields.subLabel1);
    formData.append("subLabel2", inpFields.subLabel2);
    formData.append("subLabel3", inpFields.subLabel3);
    formData.append("genre", inpFields.genre);

    formData.append("singerAppleId", inpFields.singerAppleId);
    formData.append("singerSpotifyId", inpFields.singerSpotifyId);
    formData.append("singerFacebookUrl", inpFields.singerFacebookUrl);
    formData.append("singerInstagramUrl", inpFields.singerInstagramUrl);

    formData.append("composerAppleId", inpFields.composerAppleId);
    formData.append("composerSpotifyId", inpFields.composerSpotifyId);
    formData.append("composerFacebookUrl", inpFields.composerFacebookUrl);
    formData.append("composerInstagramUrl", inpFields.composerInstagramUrl);

    formData.append("lyricistAppleId", inpFields.lyricistAppleId);
    formData.append("lyricistSpotifyId", inpFields.lyricistSpotifyId);
    formData.append("lyricistFacebookUrl", inpFields.lyricistFacebookUrl);
    formData.append("lyricistInstagramUrl", inpFields.lyricistInstagramUrl);

    formData.append("file", inpFields.file);
    formData.append("userId", userId);

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/order/new-order`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      const orderId = data.createdOrder._id;
      const imgFormData = new FormData();
      imgFormData.append("image", inpFields.thumbnail);
      imgFormData.append("orderId", orderId);
      const imgRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/order/add-order-image`,
        {
          method: "POST",
          body: imgFormData,
        }
      );

      const imgData = await imgRes.json();
      console.log(imgData);
      if (imgRes.ok) {
        success("Order created");
        setTimeout(() => {
          navigate("/user-panel/history");
        }, 1000);
      }
      if (!imgRes.ok) {
        error(imgData.message);
      }
    }

    setIsloading(false);
  };
  return (
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
            {" "}
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
            {" "}
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
            title: "Upload Content",
          },
        ]}
      />
      <h1>Upload Content</h1>{" "}
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
              <Select name="category" id="category" onChange={getSelectedValue}>
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
              <Label htmlFor="genre">
                genre<span style={{ margin: 0 }}>*</span>
              </Label>
              <Select
                name="genre"
                id="genre"
                onChange={(e) => {
                  const ele = document.querySelector(`#${e.target.id}`);
                  const value = ele.options[ele.selectedIndex].value;
                  console.log(value);
                  setInpFields({ ...inpFields, genre: value });
                }}
              >
                <Option value={"Classical"}>Classical</Option>
                <Option value={"Hip-Hop/Rap"}>Hip-Hop/Rap</Option>
                <Option value={"Devotional"}>Devotional</Option>
                <Option value={"Carnatic Classical"}>Carnatic Classical</Option>
                <Option value={"Ambient / Instrumental"}>
                  Ambient / Instrumental
                </Option>
                <Option value={"Film"}>Film</Option>
                <Option value={"Pop"}>Pop</Option>
                <Option value={"Indie"}>Indie</Option>
                <Option value={"Folk"}>Folk</Option>
              </Select>
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
                Date of release <span style={{ margin: 0 }}>*</span>
              </Label>
              <DatePicker onChange={onDateChanger} id="dateOfRelease" />
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
                <Option value={"album"}>Album</Option>
                <Option value={"film"}>film</Option>
              </Select>
            </LabelInpBox>

            <LabelInpBox>
              <Label htmlFor="upc">isrc</Label>
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
              <Label htmlFor="language">
                Album Language <span style={{ margin: 0 }}>*</span>
              </Label>
              <Select
                name="language"
                id="language"
                onChange={(e) => {
                  const ele = document.querySelector(`#${e.target.id}`);
                  const value = ele.options[ele.selectedIndex].value;
                  console.log(value);
                  setInpFields({ ...inpFields, language: value });
                }}
              >
                <Option value={"Hindi "}>Hindi </Option>
                <Option value={"Punjabi"}>Punjabi</Option>
                <Option value={"Garhwali"}>Garhwali</Option>
                <Option value={"English"}>English</Option>
                <Option value={"Nepali"}>Nepali</Option>
                <Option value={"Kumauni"}>Kumauni</Option>
                <Option value={"Jaunsari"}>Jaunsari</Option>
                <Option value={"Himanchali"}>Himanchali</Option>
                <Option value={"Haryanvi"}>Haryanvi</Option>
                <Option value={"Urdu"}>Urdu</Option>
              </Select>
            </LabelInpBox>

            <LabelInpBox>
              <Label htmlFor="description">
                Album description <span style={{ margin: 0 }}>*</span>
              </Label>
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
              <Label htmlFor="mood">
                Album mood <span style={{ margin: 0 }}>*</span>
              </Label>
              <Select
                name="mood"
                id="mood"
                onChange={(e) => {
                  const ele = document.querySelector(`#${e.target.id}`);
                  const value = ele.options[ele.selectedIndex].value;
                  console.log(value);
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
              <Label htmlFor="thumbnail" id="thumbnail">
                Thumbnail <span style={{ margin: 0 }}>*</span>
              </Label>
              <Upload
                method="get"
                listType="picture"
                {...imgProps}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload image</Button>
              </Upload>
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
              <Label htmlFor="title">Time</Label>

              <TimePicker
                name="crbt"
                id="crbt"
                format={format}
                onChange={(time) => {
                  if (!time) {
                    return;
                  }
                  let res;
                  res = time["$m"] + ":" + time["$s"];

                  // console.log(res);
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
              <Input
                type="text"
                name="singer"
                id="singer"
                placeholder="singer name"
                onChange={onChangeHandler}
                value={inpFields.singer}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="singer">Add Singer Profile</Label>
              <Input
                style={{ width: "30%" }}
                onClick={() => {
                  setShowSingerModal(true);
                }}
                type="button"
                value={`+`}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="lyricist">
                lyricist <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="lyricist"
                id="lyricist"
                placeholder=""
                onChange={onChangeHandler}
                value={inpFields.lyricist}
              />
            </LabelInpBox>{" "}
            <LabelInpBox>
              <Label htmlFor="singer">Add Lyricist Profile</Label>
              <Input
                style={{ width: "30%" }}
                onClick={() => {
                  setShowLyricistModal(true);
                }}
                type="button"
                value={`+`}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="composer">
                composer <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="composer"
                id="composer"
                placeholder="composer name"
                onChange={onChangeHandler}
                value={inpFields.composer}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="singer">Add Composer Profile</Label>
              <Input
                style={{ width: "30%" }}
                onClick={() => {
                  setShowComposerModal(true);
                }}
                type="button"
                value={`+`}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="director">
                director <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="director"
                id="director"
                placeholder="director name"
                onChange={onChangeHandler}
                value={inpFields.director}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="producer">
                producer <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="producer"
                id="producer"
                placeholder="producer name"
                onChange={onChangeHandler}
                value={inpFields.producer}
              />
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="starCast">
                starCast <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="starCast"
                id="starCast"
                placeholder=""
                onChange={onChangeHandler}
                value={inpFields.starCast}
              />
            </LabelInpBox>
          </AllInpBox>
          <BtnDiv>
            <button onClick={onSubmitHandler}>Submit</button>
          </BtnDiv>
        </FormSeperator>
      </FormBox>
    </MainDiv>
  );
};

export default Form;

// const orderSchema = mongoose.Schema({
//     labelName: { type: String, required: true },
//     subLabel1:"",
//     subLabel2:"",
//     subLabel3:"",
//     title: { type: String, required: true },
//     dateOfRelease: { type: String, required: true },
//     albumType: { type: String, required: true },
//     language: { type: String, required: true },
//     thumbnail: { type: String, required: true },
//     orderDateAndTime: { type: String, required: true },
//     file: { type: String, required: true },
//     mood: { type: String, required: true },
//     userId: { type: String, required: true },
//     description: { type: String, required: true },
//     singer: { type: String, required: true },
//     composer: { type: String, required: true },
//     director: { type: String, required: true },
//     producer: { type: String, required: true },
//     starCast: { type: String, required: true },
//     lyrics:"",
//     status:"",
//     remark:"",
//     deleted: { type: Boolean },
//   });
