
import {useState} from 'react'
import { forwardRef, useImperativeHandle } from "react";
import {uploadImage} from "../backend/ImageHandling"
const ImageUploadForm = forwardRef(({ folder = "avatars", onUpload }, ref) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");


  const handleUpload = async (e) => {
    if (!file) return alert("Please select a file first.");

    const result = await uploadImage(file, folder);
    if (result.success) {
      setImageUrl(result.url);
      console.log("Uploaded Image URL:", result.url);
      if (onUpload) onUpload(result.url, result.fileName); // Call parent callback
    } else {
      console.error("Upload failed:", result.error.message);
    }
  }
   // Expose handleUpload to parent using ref
  useImperativeHandle(ref, () => ({
    handleUpload,
  }));

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mb-2"
        />

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Uploaded" className="max-w-full" />
          <p className="text-sm break-all">{imageUrl}</p>
        </div>
      )}
    </div>
  );
});

export default ImageUploadForm