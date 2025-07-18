import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {uploadImage, getImageUrl} from "../components/backend/ImageHandling"
export default function ImageUploadForm() {


    const url = getImageUrl("", "ghar.jpg")
    console.log("URL: " ,url)
    
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");


const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
    alert("Please select a file first.");
    return;
  }

  const result = await uploadImage(file, "avatars");
  if (result.success) {
    console.log("Public URL:", result.url);
  } else {
    console.error("Upload failed:", result.error.message);
  }
};



  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-full" />
          <p className="text-sm break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
