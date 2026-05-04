import React, { useMemo, useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import { Button, Empty, Progress, Table, Tag, Upload, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import MusicLoader from "../Loader/MusicLoader";

const { Dragger } = Upload;

const Page = styled.div`
  height: 80svh;
  overflow: auto;
  padding: 8px;
  background:
    radial-gradient(
      circle at top left,
      rgba(22, 119, 255, 0.08),
      transparent 32%
    ),
    radial-gradient(
      circle at top right,
      rgba(82, 196, 26, 0.08),
      transparent 28%
    ),
    linear-gradient(180deg, #f7f9fc 0%, #f3f6fb 100%);

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 1rem 1.1rem;
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 28px rgba(15, 23, 42, 0.05);

  h1 {
    margin: 0;
    font-size: 1.35rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #111827;
  }

  p {
    margin: 0.4rem 0 0;
    color: #667085;
    line-height: 1.45;
    max-width: 72ch;
  }
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  max-height: 400px;

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    max-height: none;
  }
`;

const UploadCard = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  min-height: 230px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h3 {
    margin: 0 0 0.75rem;
    font-size: 0.98rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #1f2937;
    flex-shrink: 0;
  }

  .ant-upload-wrapper {
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .ant-upload,
  .ant-btn {
    width: 100%;
  }

  .ant-upload-list {
    margin-top: 0.75rem;
    max-height: 150px;
    overflow-y: auto;
    flex-shrink: 0;
  }

  .ant-upload-drag {
    border-radius: 12px;
    border-color: #d8e1ee;
    background: #fbfcfe;
    flex: 1;
    overflow: hidden;
  }

  .ant-upload-drag:hover {
    border-color: #1677ff;
  }

  .ant-upload-drag-icon {
    color: #1677ff;
    margin-bottom: 10px;
  }

  .ant-upload-text {
    color: #1f2937;
    font-weight: 600;
  }

  .ant-upload-hint {
    color: #667085;
    margin-top: 8px;
    font-size: 0.85rem;
  }
`;

const Summary = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);

  p {
    margin: 0 0 0.75rem;
    color: #475467;
    line-height: 1.5;
    word-break: break-word;
  }

  .ant-progress {
    margin-bottom: 1rem;
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 0.85rem;

  @media only screen and (max-width: 768px) {
    justify-content: stretch;

    .ant-btn {
      width: 100%;
    }
  }
`;

const UploadHint = styled.div`
  margin-top: 0.75rem;
  color: #667085;
  font-size: 0.88rem;
  line-height: 1.45;
`;

const FilePills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.85rem;
`;

const ResultWrap = styled.div`
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e6ebf3;
  border-radius: 12px;
  padding: 0.5rem;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  max-height: 500px;
  overflow-y: auto;

  .ant-table {
    background: transparent;
  }

  .ant-table-thead > tr > th {
    background: #f8fafc;
    font-weight: 600;
    color: #334155;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .ant-table-wrapper {
    overflow: hidden;
  }

  .ant-table-body {
    overflow: visible !important;
  }
`;

const REQUIRED_FIELDS = [
  "labelName",
  "title",
  "songtitle",
  "dateOfRelease",
  "language",
  "mood",
  "singer",
  "lyricist",
  "contentType",
  "composer",
];

const FORM_FIELDS = [
  "musicDirector",
  "director",
  "producer",
  "labelName",
  "title",
  "songtitle",
  "dateOfRelease",
  "albumType",
  "language",
  "mood",
  "description",
  "singer",
  "composer",
  "lyricist",
  "youtubeMusic",
  "contentType",
  "youtubeContentId",
  "lyrics",
  "upc",
  "isrc",
  "crbt",
  "subLabel1",
  "subLabel2",
  "subLabel3",
  "genre",
  "starCast",
  "singerAppleId",
  "singerSpotifyId",
  "singerFacebookUrl",
  "singerInstagramUrl",
  "composerAppleId",
  "composerSpotifyId",
  "composerFacebookUrl",
  "composerInstagramUrl",
  "lyricistAppleId",
  "lyricistSpotifyId",
  "lyricistFacebookUrl",
  "lyricistInstagramUrl",
  "releaseDate",
  "subgenre",
];

const DEFAULT_VALUES = {
  labelName: "",
  title: "",
  songtitle: "",
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

const MODEL_FIELDS = new Set([
  "labelName",
  "subLabel1",
  "subLabel2",
  "subLabel3",
  "title",
  "songtitle",
  "dateOfRelease",
  "albumType",
  "language",
  "thumbnail",
  "orderDateAndTime",
  "file",
  "mood",
  "contentType",
  "userId",
  "description",
  "singer",
  "composer",
  "director",
  "producer",
  "starCast",
  "lyrics",
  "status",
  "remark",
  "deleted",
  "upc",
  "isrc",
  "lyricist",
  "crbt",
  "genre",
  "musicDirector",
  "singerAppleId",
  "singerSpotifyId",
  "singerFacebookUrl",
  "singerInstagramUrl",
  "composerAppleId",
  "composerSpotifyId",
  "composerFacebookUrl",
  "composerInstagramUrl",
  "lyricistAppleId",
  "lyricistSpotifyId",
  "lyricistFacebookUrl",
  "lyricistInstagramUrl",
  "dateLive",
  "releaseDate",
  "subgenre",
  "youtubeContentId",
  "youtubeMusic",
]);

const HEADER_ALIASES = {
  labelname: "labelName",
  label: "labelName",
  songname: "songtitle",
  songtitle: "songtitle",
  filmalbumname: "title",
  albumname: "title",
  releasedate: "dateOfRelease",
  originalreleasedate: "dateOfRelease",
  originalreleasedateddmmyyyy: "dateOfRelease",
  dateofrelease: "dateOfRelease",
  golivedate: "releaseDate",
  albumtype: "albumType",
  contenttype: "contentType",
  youtubemusic: "youtubeMusic",
  youtubecontentid: "youtubeContentId",
  sublabel1: "subLabel1",
  sublabel2: "subLabel2",
  sublabel3: "subLabel3",
  starcast: "starCast",
  singerappleid: "singerAppleId",
  singerspotifyid: "singerSpotifyId",
  singerfacebookurl: "singerFacebookUrl",
  singerinstagramurl: "singerInstagramUrl",
  composerappleid: "composerAppleId",
  composerspotifyid: "composerSpotifyId",
  composerfacebookurl: "composerFacebookUrl",
  composerinstagramurl: "composerInstagramUrl",
  lyricistappleid: "lyricistAppleId",
  lyricistspotifyid: "lyricistSpotifyId",
  lyricistfacebookurl: "lyricistFacebookUrl",
  lyricistinstagramurl: "lyricistInstagramUrl",
  musicdirector: "musicDirector",
  filmdirector: "director",
  filmproducer: "producer",
  filmstarcastactors: "starCast",
  albumlevelmainartistsinger: "singer",
  tracklevelmainartistsinger: "singer",
  composername: "composer",
  lyricistname: "lyricist",
  upcid: "upc",
  genre: "genre",
  subgenre: "subgenre",
  mood: "mood",
  description: "description",
  language: "language",
  trackno: "trackNo",
  crbtcutname: "crbtCutName",
  timeforcrbtcut: "crbt",
  thumbnailname: "thumbnail",
  imagename: "thumbnail",
  image: "thumbnail",
  artwork: "thumbnail",
  audio: "file",
  audioname: "file",
  filename: "file",
  audiofile: "file",
};

const normalizeKey = (key) =>
  String(key || "")
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

const normalizeFileName = (name) =>
  String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]/g, "");

const getRowValue = (row, field) => {
  if (row[field] !== undefined && row[field] !== null) {
    return row[field];
  }
  return "";
};

const formatCellValue = (value) => {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").trim();
};

const buildFileMap = (files) => {
  const map = new Map();
  files.forEach((file) => {
    map.set(file.name.trim().toLowerCase(), file);
    map.set(normalizeFileName(file.name), file);
  });
  return map;
};

const parseExcelRows = async (file) => {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return rows.map((row, index) => {
    const normalized = { rowNumber: index + 2 };
    Object.entries(row).forEach(([key, value]) => {
      const normalizedKey = normalizeKey(key);
      const mappedKey = HEADER_ALIASES[normalizedKey] || key.trim();
      const formattedValue = formatCellValue(value);
      if (formattedValue !== "" && MODEL_FIELDS.has(mappedKey)) {
        normalized[mappedKey] = formattedValue;
      }
    });
    return { ...DEFAULT_VALUES, ...normalized };
  });
};

const BulkUpload = () => {
  const userId = useSelector((state) => state.userId);
  const labelNameFromStore = useSelector((state) => state.labelName);
  const [excelFile, setExcelFile] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [parsedRows, setParsedRows] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [results, setResults] = useState([]);

  const thumbnailMap = useMemo(
    () => buildFileMap(thumbnailFiles),
    [thumbnailFiles],
  );
  const audioMap = useMemo(() => buildFileMap(audioFiles), [audioFiles]);

  const getRowAssetKey = (row) =>
    String(row.songtitle || row.title || "")
      .trim()
      .toLowerCase();

  const getRowDisplayTitle = (row) =>
    String(row.songtitle || row.title || "").trim();

  const handleExcelChange = async ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    setExcelFile(file || null);
    setResults([]);

    if (!file) {
      setParsedRows([]);
      return;
    }

    try {
      const rows = await parseExcelRows(file);
      setParsedRows(rows);
      message.success(`${rows.length} rows found in Excel file.`);
    } catch (err) {
      console.error(err);
      setParsedRows([]);
      message.error("Could not read this Excel file.");
    }
  };

  const handleThumbnailChange = ({ fileList }) => {
    setThumbnailFiles(
      fileList.map((item) => item.originFileObj).filter(Boolean),
    );
  };

  const handleAudioChange = ({ fileList }) => {
    setAudioFiles(fileList.map((item) => item.originFileObj).filter(Boolean));
  };

  const getMatchingFile = (map, name) => {
    const rawName = String(name || "").trim();
    if (!rawName) return null;
    return (
      map.get(rawName.toLowerCase()) || map.get(normalizeFileName(rawName))
    );
  };

  const validateRows = () => {
    if (!excelFile) return "Please select an Excel file.";
    if (!parsedRows.length) return "Excel file has no data rows.";
    if (!thumbnailFiles.length) return "Please select thumbnail images.";
    if (!audioFiles.length) return "Please select audio files.";
    if (audioFiles.length > 10) return "Audio files cannot be more than 10.";

    for (const row of parsedRows) {
      if (!String(getRowValue(row, "songtitle")).trim()) {
        return `Row ${row.rowNumber} is missing: songtitle.`;
      }

      const resolvedLabelName = String(
        getRowValue(row, "labelName") || labelNameFromStore || "",
      ).trim();
      if (!resolvedLabelName) {
        return `Row ${row.rowNumber} is missing: labelName.`;
      }

      const missingFields = REQUIRED_FIELDS.filter(
        (field) =>
          field !== "labelName" && !String(getRowValue(row, field)).trim(),
      );
      if (missingFields.length) {
        return `Row ${row.rowNumber} is missing: ${missingFields.join(", ")}.`;
      }
      if (row.isrc && String(row.isrc).trim().length < 12) {
        return `Row ${row.rowNumber} has an invalid ISRC.`;
      }
      const assetKey = getRowAssetKey(row);
      if (!assetKey) {
        return `Row ${row.rowNumber} is missing songtitle or title for file matching.`;
      }
      if (!getMatchingFile(thumbnailMap, assetKey)) {
        return `Row ${row.rowNumber} thumbnail file was not found for: ${assetKey}.`;
      }
      if (!getMatchingFile(audioMap, assetKey)) {
        return `Row ${row.rowNumber} audio file was not found for: ${assetKey}.`;
      }
    }

    return "";
  };

  const buildFormData = (row) => {
    const formData = new FormData();
    FORM_FIELDS.forEach((field) => {
      const value =
        field === "labelName" && !String(getRowValue(row, field)).trim()
          ? labelNameFromStore || ""
          : getRowValue(row, field);
      if (MODEL_FIELDS.has(field)) {
        formData.append(field, value);
      }
    });
    const assetKey = getRowAssetKey(row);
    formData.append("file", getMatchingFile(audioMap, assetKey));
    formData.append("thumbnail", getMatchingFile(thumbnailMap, assetKey));
    formData.append("userId", getRowValue(row, "userId") || userId);
    return formData;
  };

  const handleSubmit = async () => {
    console.log(parsedRows);

    const validationError = validateRows();
    if (validationError) {
      message.error(validationError);
      return;
    }

    setIsUploading(true);
    setResults([]);
    setProgress({ done: 0, total: parsedRows.length });

    const uploadResults = [];

    for (let index = 0; index < parsedRows.length; index += 1) {
      const row = parsedRows[index];

      try {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/order/new-order`,
          {
            method: "POST",
            body: buildFormData(row),
          },
        );
        const data = await res.json();

        if (res.ok) {
          uploadResults.push({
            key: row.rowNumber,
            row: row.rowNumber,
            title: getRowDisplayTitle(row),
            status: "Success",
            message: "Order created",
          });
        } else {
          uploadResults.push({
            key: row.rowNumber,
            row: row.rowNumber,
            title: getRowDisplayTitle(row),
            status: "Failed",
            message: data.message || "Something went wrong",
          });
        }
      } catch (err) {
        uploadResults.push({
          key: row.rowNumber,
          row: row.rowNumber,
          title: getRowDisplayTitle(row),
          status: "Failed",
          message: "Network error",
        });
      }

      setProgress({ done: index + 1, total: parsedRows.length });
      setResults([...uploadResults]);
    }

    setIsUploading(false);

    if (uploadResults.every((result) => result.status === "Success")) {
      message.success("All rows uploaded successfully.");
    } else {
      message.warning("Bulk upload finished with some failed rows.");
    }
  };

  const thumbnailCountLabel = thumbnailFiles.length
    ? `${thumbnailFiles.length} image${thumbnailFiles.length === 1 ? "" : "s"} selected`
    : "No thumbnails selected";
  const audioCountLabel = audioFiles.length
    ? `${audioFiles.length} audio file${audioFiles.length === 1 ? "" : "s"} selected`
    : "No audio files selected";

  const columns = [
    { title: "Row", dataIndex: "row", width: 80 },
    { title: "Title", dataIndex: "title" },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => (
        <Tag color={status === "Success" ? "green" : "red"}>{status}</Tag>
      ),
    },
    { title: "Message", dataIndex: "message" },
  ];

  return (
    <Page>
      {isUploading && <MusicLoader />}
      <Header>
        <div>
          <h1>Bulk Upload</h1>
          <p>
            Upload one Excel sheet, attach the matching thumbnails and audio
            files, and the page will submit each row as a separate order.
          </p>
        </div>
      </Header>

      <UploadGrid>
        <UploadCard>
          <h3>Excel File</h3>
          <Upload
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleExcelChange}
          >
            <Button icon={<UploadOutlined />}>Select Excel</Button>
          </Upload>
          <UploadHint>
            Put the song data in the first sheet using the same field names as
            the single-song form. Useful columns include <code>songtitle</code>,{" "}
            <code>title</code>, <code>labelName</code>,{" "}
            <code>dateOfRelease</code>, and <code>crbt</code>. Audio and
            thumbnail files are matched by track number or song name, so{" "}
            <code>1.mp3</code> pairs with <code>1.jpg</code>.
          </UploadHint>
          {excelFile && (
            <FilePills>
              <Tag color="blue">{excelFile.name}</Tag>
            </FilePills>
          )}
        </UploadCard>

        <UploadCard>
          <h3>Thumbnails</h3>
          <Dragger
            accept="image/*"
            multiple
            beforeUpload={() => false}
            onChange={handleThumbnailChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drop or select thumbnail files</p>
            <p className="ant-upload-hint">
              Match Excel values like <code>img1</code> or <code>img1.jpg</code>
              .
            </p>
          </Dragger>
          <UploadHint>{thumbnailCountLabel}</UploadHint>
        </UploadCard>

        <UploadCard>
          <h3>Audio Files</h3>
          <Dragger
            accept="audio/*"
            multiple
            maxCount={10}
            beforeUpload={(file, fileList) => {
              if (fileList.length > 10) {
                message.error("Only 10 audio files are allowed.");
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
            onChange={handleAudioChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drop or select audio files</p>
            <p className="ant-upload-hint">
              The sheet should point to one of these filenames for each row via
              the track number or song name.
            </p>
          </Dragger>
          <UploadHint>{audioCountLabel}</UploadHint>
        </UploadCard>
      </UploadGrid>

      <Summary>
        <p>
          Rows: <b>{parsedRows.length}</b> | Thumbnails:{" "}
          <b>{thumbnailFiles.length}</b> | Audio files:{" "}
          <b>{audioFiles.length}</b>
        </p>
        {progress.total > 0 && (
          <Progress
            percent={Math.round((progress.done / progress.total) * 100)}
            strokeColor="#1677ff"
            trailColor="#e5e7eb"
          />
        )}
        <ActionRow>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            loading={isUploading}
            onClick={handleSubmit}
            size="large"
          >
            Submit Bulk Upload
          </Button>
        </ActionRow>
      </Summary>

      {results.length > 0 && (
        <ResultWrap>
          <Table
            columns={columns}
            dataSource={results}
            pagination={false}
            size="small"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No upload results yet"
                />
              ),
            }}
          />
        </ResultWrap>
      )}
    </Page>
  );
};

export default BulkUpload;
