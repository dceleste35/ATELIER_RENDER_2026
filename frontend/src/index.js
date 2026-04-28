import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const API_URL = process.env.REACT_APP_API_URL || "";

function App() {
  const [info, setInfo] = useState(null);
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!API_URL) {
      setError("REACT_APP_API_URL non défini");
      return;
    }
    fetch(`${API_URL}/info`).then((r) => r.json()).then(setInfo).catch((e) => setError(String(e)));
    fetch(`${API_URL}/db`).then((r) => r.json()).then(setDb).catch((e) => setError(String(e)));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 760, margin: "0 auto" }}>
      <h1>Atelier Render — Frontend React</h1>
      <p>API : <code>{API_URL || "(non défini)"}</code></p>

      {error && <p style={{ color: "crimson" }}>Erreur : {error}</p>}

      <h2>/info</h2>
      <pre>{info ? JSON.stringify(info, null, 2) : "Chargement..."}</pre>

      <h2>/db</h2>
      <pre>{db ? JSON.stringify(db, null, 2) : "Chargement..."}</pre>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
