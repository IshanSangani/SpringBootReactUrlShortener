import React from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import ShortenUrlForm from "./components/ShortenUrlForm";
import axios from "axios";

const RedirectPage = () => {
  let { shortId } = useParams();

  React.useEffect(() => {
    axios.get(`http://localhost:8080/api/url/${shortId}`)
      .then(response => {
        window.location.href = response.data.longUrl;
      })
      .catch(() => {
        alert("URL not found!");
      });
  }, [shortId]);

  return <p>Redirecting...</p>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenUrlForm />} />
        <Route path="/:shortId" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;