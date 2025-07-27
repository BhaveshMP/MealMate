// components/common/ImageUploadForm.jsx
import { useState } from "react";
import {uploadImage} from "@/components/backend/ImageHandling"


/**
 * Update image logic:
 * - Deletes old image if it exists
 * - Uploads new image
 * - Returns updated form data with new image info
 */
export const handleImageUpadate = async (selectedFile, formData) => {
  let { imageUrl, imageName } = formData;

  // If no new file selected, skip
  if (!selectedFile) return formData;

  // Delete old image if it exists
  if (imageName) {
    const fullPath = `avatars/${imageName}`;
    await deleteImage(fullPath);
  }

  // Upload new image
  const result = await uploadImage(selectedFile, "avatars");
  if (!result.success) {
    throw new Error("Image upload failed");
  }

  return {
    ...formData,
    imageUrl: result.url,
    imageName: result.fileName,
  };
};
export const handleImageUpload = async (selectedFile, formData) => {
  let { imageUrl, imageName } = formData;

  if (selectedFile) {
    const result = await uploadImage(selectedFile, "avatars");

    if (!result.success) {
      throw new Error("Image upload failed");
    }

    imageUrl = result.url;
    imageName = result.fileName;
  }

  return {
    ...formData,
    imageUrl,
    imageName,
  };
};


const ImageUploadForm = ({ value, onFileSelect }) => {
  return (

    <>
    <div>
    <div className="w-full">
          <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file); // use prop to notify parent
      }}
    />
    </div>
        
{value && 
<div className="relative group inline-block">
  <img className="h-20 w-20 object-cover" src={value} alt="" />

  <div className="absolute z-50 w-80 hidden group-hover:block left-full bottom-1 ml-4">
    <img
      src={value}
      alt=""
      className="object-cover border border-gray-600 shadow-xl bg-red-400 rounded"
    />
  </div>
</div>


}


    </div>
    
        </>
  );
};

export default ImageUploadForm;