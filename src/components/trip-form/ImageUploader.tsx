import React from 'react';
import { Input } from '../ui/input';

const ImageUploader = ({ onImageUploaded }) => {
  const handleFileSelect = async (e: React.FormEvent<HTMLFormElement>) => {
    const selectedFile = e.target.files[0];
    //const compressedImage = sharp(selectedFile).jpeg({ mozjpeg: true }).toBuffer();
    onImageUploaded(selectedFile);
  };

  return <Input type="file" accept="image/*" onChange={handleFileSelect} />;
};

export default ImageUploader;
