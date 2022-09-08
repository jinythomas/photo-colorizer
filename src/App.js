import { useState } from "react";
import "./App.css";

function App() {
  const [originalImg, setOriginalImg] = useState(null);
  const [coloredImg, setColoredImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    setOriginalImg(URL.createObjectURL(e.target.files[0]));
    setColoredImg(null);
  };

  const convertImg = (e) => {
    e.preventDefault();
    setColoredImg(null);
    setLoading(true);
    // upload file
    const formData = new FormData();
    formData.append("File", originalImg);
    fetch("https://localhost:8000/colorize", { method: "POST", body: formData })
      .then((result) => {
        setColoredImg(originalImg);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <h1>Photo colorizer</h1>
      <div className="container">
        {/* Original image container */}
        <div className="original">
          {originalImg ? (
            <img src={originalImg} alt="Uncolored" />
          ) : (
            "No image found"
          )}
        </div>

        {/* Control buttons */}
        <div className="controls">
          <input type="file" accept="image/*" onChange={uploadImage} />
          {originalImg && (
            <button className="convertBtn" onClick={convertImg}>
              {loading ? "Converting.. " : "Convert"}
            </button>
          )}
        </div>

        {/* Colored image container */}
        <div className="colored">
          {coloredImg ? (
            <img src={coloredImg} alt="Colored" />
          ) : (
            "No image found"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
