import axios from "axios";


// ✅ ENV values
const api = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_KEY;
const BUCKET = "meal-mate-images"; // Replace with your actual bucket name

const sanitizeFileName = (name) => {
  const timestamp = Date.now(); // To ensure uniqueness
  const extension = name.substring(name.lastIndexOf("."));
  const baseName = name
    .substring(0, name.lastIndexOf("."))
    .replace(/[^a-zA-Z0-9_-]/g, "_"); // keep only safe characters
  return `${baseName}_${timestamp}${extension}`;
};

// ✅ Upload image (Create)
export const uploadImage = async (file, path = "") => {
  const headers = {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": file.type,
    "x-upsert": "true", // overwrites if file exists
  };
  const sanitizedFileName = sanitizeFileName(file.name);
  const uploadUrl = `${api}/storage/v1/object/${BUCKET}/${path}/${sanitizedFileName}`;

  try {
    const res = await axios.put(uploadUrl, file, { headers });
    return {
      success: true,
      fileName: sanitizeFileName,
      url: getImageUrl(path, sanitizedFileName),
      data: res.data,
    };
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
  }
};

// ✅ Get public URL (Read)
export const getImageUrl = (path, fileName) => {
  return `${api}/storage/v1/object/public/${BUCKET}/${path}/${fileName}`;
};


// ✅ Delete image (Delete)
export const deleteImage = async (fullPath) => {
  const headers = {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const url = `${api}/storage/v1/object/${BUCKET}`;

  try {
    const res = await axios.delete(url, {
      headers,
      data: { prefixes: [fullPath] }, // e.g., "avatars/img.jpg"
    });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
  }
};

// ✅ List images in folder (Read)
export const listImages = async (folder = "") => {
  const headers = {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  };

  const url = `${api}/storage/v1/object/list/${BUCKET}?prefix=${folder}`;

  try {
    const res = await axios.get(url, { headers });
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data || err.message };
  }
  
};





//  import {
//     uploadImage,
//     getImageUrl,
//     deleteImage,
//     listImages,
//     } from "./supabaseImageService";
    
//     const handleUpload = async (event) => {
//         const file = event.target.files[0];
//         const result = await uploadImage(file, "avatars");
//         console.log("Upload result:", result);
//         };
        
//         const handleDelete = async () => {
//             const result = await deleteImage("avatars/sample.jpg");
//             console.log("Delete result:", result);
//             };
            
// const handleList = async () => {
//     const result = await listImages("avatars");
//     console.log("List result:", result);
//     };
    
