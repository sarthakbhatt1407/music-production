import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDateMMDDYYYY = (dateString) => {
  if (!dateString) return "";
  // Handles standard date parsing
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString; // return original if not parseable
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

export const handleExportAdvanceExcel = (ordersList) => {
  if (!ordersList || ordersList.length === 0) {
    alert("No orders available to export.");
    return;
  }

  const headers = [
    "Song Name",
    "Film /Album Name",
    "Language",
    "Album Type",
    "Version",
    "Genre",
    "Sub-Genre",
    "Mood",
    "Description",
    "UPC ID",
    "ISRC",
    "Label Name",
    "Is Label IPRS Member (Yes/No)",
    "IPI Number (Label)",
    "Publisher Name",
    "C-Line",
    "Album Level Main Artist/singer",
    "Track Level Main Artist/singer",
    "Track Level Featuring Artist/Singer",
    "Track Level Remixer Name",
    "Composer Name",
    "Is Composer IPRS member  (Yes/No)",
    "IPI Number (Composer)",
    "Lyricist Name",
    "Is Lyricist IPRS member  (Yes/No)",
    "IPI Number (Lyricist)",
    "Music Director",
    "Film Director",
    "Film Producer",
    "Film Star Cast / Actors",
    "Dolby ISRC",
    "Track No.",
    "Original Release Date <dd-mm-yyyy>",
    "Go Live Date <dd-mm-yyyy>",
    "Time of Music Release (pls give time in UTC)",
    "Parental Advisory (Explicit etc)",
    "IS INSTRUMENTAL",
    "Spotify Artist Profile / ID for the track Main Artist",
    "Spotify Artist Profile / ID for the track Featured Artist",
    "Apple Artist ID for Track Main Artist",
    "Apple Artist ID for Remixer",
    "Apple Artist ID for Composer",
    "Apple Artist ID for Lyricist",
    "Apple Artist ID for Film Producer",
    "Apple Artist ID for Film Director",
    "Apple Artist ID for Starcast",
    "Facebook page link for Track Main Artist",
    "Instagram Artist handle for Track Main Artist",
    "CRBT CUT NAME",
    "Time for CRBT Cut"
  ];

  const wsData = [headers];

  ordersList.forEach((order) => {
    wsData.push([
      order.title ? order.title.trim() : "",
      order.title ? order.title.trim() : "",
      order.language || "",
      capitalizeFirst(order.albumType) || "",
      "Album",
      order.genre || "",
      order.subgenre || "",
      order.mood || "",
      order.description || "",
      order.upc || "",
      order.isrc || "",
      order.labelName ? order.labelName.trim() : "",
      "", // Is Label IPRS Member
      "", // IPI Number (Label)
      order.labelName ? order.labelName.trim() : "", // Publisher Name
      order.labelName ? order.labelName.trim() : "", // C-Line
      order.singer || "",
      order.singer || "",
      "", // Featured Artist
      "", // Remixer Name
      order.composer || "",
      "", // Is Composer IPRS member
      "", // IPI Number (Composer)
      order.lyricist || "",
      "", // Is Lyricist IPRS member
      "", // IPI Number (Lyricist)
      order.musicDirector || "",
      order.director || "",
      order.producer || "",
      order.starCast || "",
      "", // Dolby ISRC
      "", // Track No.
      formatDateMMDDYYYY(order.releaseDate || order.dateOfRelease) || "",
      formatDateMMDDYYYY(order.dateLive || order.dateOfRelease) || "",
      "", // Time of Music Release
      "Not Explicit", // Parental Advisory
      "No", // IS INSTRUMENTAL
      order.singerSpotifyId || "",
      "", // Featured Artist Spotify
      order.singerAppleId || "",
      "", // Remixer Apple
      order.composerAppleId || "",
      order.lyricistAppleId || "",
      order.producerAppleId || "",
      "", // Film Director Apple
      "", // Starcast Apple
      order.singerFacebookUrl || "",
      order.singerInstagramUrl || "",
      order.title ? order.title.trim() : "",
      order.crbt || ""
    ]);
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  const columnWidths = headers.map(header => ({ wch: Math.max(header.length, 20) }));
  ws["!cols"] = columnWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Orders");
  
  // Format the date for the filename as dd.mm.yyyy
  const today = new Date();
  const dDay = String(today.getDate()).padStart(2, '0');
  const dMonth = String(today.getMonth() + 1).padStart(2, '0');
  const dYear = today.getFullYear();
  const formattedDate = `${dDay}.${dMonth}.${dYear}`;

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, `Advance Metadata Ingestion Format - ${formattedDate}.xlsx`);
};

export const handleDownloadTemplate = () => {
  const headers = [
    "Song Name",
    "Film /Album Name",
    "Language",
    "Album Type",
    "Version",
    "Genre",
    "Sub-Genre",
    "Mood",
    "Description",
    "UPC ID",
    "ISRC",
    "Label Name",
    "Is Label IPRS Member (Yes/No)",
    "IPI Number (Label)",
    "Publisher Name",
    "C-Line",
    "Album Level Main Artist/singer",
    "Track Level Main Artist/singer",
    "Track Level Featuring Artist/Singer",
    "Track Level Remixer Name",
    "Composer Name",
    "Is Composer IPRS member  (Yes/No)",
    "IPI Number (Composer)",
    "Lyricist Name",
    "Is Lyricist IPRS member  (Yes/No)",
    "IPI Number (Lyricist)",
    "Music Director",
    "Film Director",
    "Film Producer",
    "Film Star Cast / Actors",
    "Dolby ISRC",
    "Track No.",
    "Original Release Date <dd-mm-yyyy>",
    "Go Live Date <dd-mm-yyyy>",
    "Time of Music Release (pls give time in UTC)",
    "Parental Advisory (Explicit etc)",
    "IS INSTRUMENTAL",
    "Spotify Artist Profile / ID for the track Main Artist",
    "Spotify Artist Profile / ID for the track Featured Artist",
    "Apple Artist ID for Track Main Artist",
    "Apple Artist ID for Remixer",
    "Apple Artist ID for Composer",
    "Apple Artist ID for Lyricist",
    "Apple Artist ID for Film Producer",
    "Apple Artist ID for Film Director",
    "Apple Artist ID for Starcast",
    "Facebook page link for Track Main Artist",
    "Instagram Artist handle for Track Main Artist",
    "CRBT CUT NAME",
    "Time for CRBT Cut"
  ];

  const wsData = [headers];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  const columnWidths = headers.map(header => ({ wch: Math.max(header.length, 20) }));
  ws["!cols"] = columnWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Template");
  
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, `Template Metadata Ingestion Format.xlsx`);
};
