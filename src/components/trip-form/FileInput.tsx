import { useState } from 'react'
import { Input } from '../ui/input';

export default function FileInput() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  /*const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body
    });
  };*/

  return (
    <div>
      <img src={createObjectURL} />
      <h4>Select Image</h4>
      <Input type="file" accept="image/*" onChange={uploadToClient} />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        Send to server
      </button>
    </div>
  );
}