import { useState } from "react";
import CloudinaryUploadWidget from "../context/CloudinaryContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function FileUpload({ setImageId }) {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dbpisovxi");
  const [uploadPreset] = useState("xgybho0n");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);
  console.log(myImage)

  const handleUploadSuccess = (publicId) => {
    setPublicId(publicId);
    setImageId(publicId); // Pass the publicId to the parent component
  };

  return (
    <div className="App">
      <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={handleUploadSuccess} />
      <div style={{ width: "800px" }}>
        <AdvancedImage
          style={{ maxWidth: "300px" }}
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
    </div>
  );
}
