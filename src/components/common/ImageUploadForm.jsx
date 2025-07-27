// components/common/ImageUploadForm.jsx

const ImageUploadForm = ({ onFileSelect }) => {
  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
        className="mb-2"
      />
    </div>
  );
};

export default ImageUploadForm;
