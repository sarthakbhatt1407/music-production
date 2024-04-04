import { DatePicker } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const MainDiv = styled.div`
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    margin: 0;
    text-align: center;
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

const Form = () => {
  const deafaultFields = {
    labelName: "",
    title: "",
    dateOfRelease: "",
    albumType: "song",
    language: "",
    mood: "",
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
  };
  const [inpFields, setInpFields] = useState(deafaultFields);
  const [subLabels, setSubLabels] = useState([]);
  const [img, setImg] = useState(null);
  const [file, setFile] = useState(null);

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
        file.type === "audio/mpeg" ||
        file.type === "audio/aac" ||
        file.type === "audio/flac" ||
        file.type === "audio/alac" ||
        file.type === "audio/wma" ||
        file.type === "audio/aiff" ||
        file.type === "video/mp4" ||
        file.type === "video/x-msvideo" ||
        file.type === "video/x-ms-wmv" ||
        file.type === "video/x-flv" ||
        file.type === "video/quicktime";

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
    // const rs = await fetch(
    //   "http://localhost:5000/order/get-order/?id=660d2fc74717204120f49343"
    // );
    // const d = await rs.json();
    // console.log(d);
    // return;

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
      return;
    }
    console.log("start");
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
    formData.append("subLabel1", inpFields.subLabel1);
    formData.append("subLabel2", inpFields.subLabel2);
    formData.append("subLabel3", inpFields.subLabel3);
    formData.append("thumbnail", inpFields.thumbnail);
    formData.append("file", inpFields.file);
    formData.append("userId", "660a8cdf63ea7b6efb114acb");

    const res = await fetch(`http://localhost:5000/order/new-order`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
    console.log("end", inpFields);
  };
  return (
    <MainDiv>
      <h1>Upload</h1>
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
                <Option value={"song"}>Song</Option>
                <Option value={"film"}>film</Option>
              </Select>
            </LabelInpBox>
            <LabelInpBox>
              <Label htmlFor="language">
                Album Language <span style={{ margin: 0 }}>*</span>
              </Label>
              <Input
                type="text"
                name="language"
                id="language"
                onChange={onChangeHandler}
                value={inpFields.language}
                placeholder="language"
              />
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
              <Input
                type="text"
                name="mood"
                id="mood"
                placeholder="mood"
                onChange={onChangeHandler}
                value={inpFields.mood}
              />
            </LabelInpBox>
            {/* <LabelInpBox>
              <input
                type="file"
                name=""
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setInpFields({ ...inpFields, thumbnail: e.target.files[0] });
                }}
                id=""
              />
              <input
                type="file"
                name=""
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setInpFields({ ...inpFields, file: e.target.files[0] });
                }}
                id=""
              />
            </LabelInpBox> */}
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
            </LabelInpBox>{" "}
          </AllInpBox>{" "}
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
//     subLabel1: { type: String },
//     subLabel2: { type: String },
//     subLabel3: { type: String },
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
//     lyrics: { type: String },
//     status: { type: String },
//     remark: { type: String },
//     deleted: { type: Boolean },
//   });
