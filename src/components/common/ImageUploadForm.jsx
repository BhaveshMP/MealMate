
import {useEffect, useState} from 'react'
import {uploadImage} from "../backend/ImageHandling"
const ImageUploadForm = ({ folder = "avatars", onUpload, triggerUpload }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
};

export default ImageUploadForm