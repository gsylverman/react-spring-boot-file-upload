import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone() {
  const api = process.env.REACT_APP_UPLOAD_API;
  const onDrop = useCallback(
    (files) => {
      console.log(files);
      const formData = new FormData();
      formData.append("file", files[0]);
      axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          console.log("uploaded succesfully");
        })
        .catch((err) => console.log(err));
    },
    [api]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ textAlign: "center" }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

function FilesUpload() {
  const api = process.env.REACT_APP_UPLOAD_API;
  const handleChange = (e) => {
    const formData = new FormData();
    const files = e.target.files;
    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });
    axios.post(`${api}/multiple`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="App">
      <form>
        <input onChange={handleChange} multiple type="file" name="files" />
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <MyDropzone />
      <hr />
      <FilesUpload />
    </div>
  );
}

export default App;
