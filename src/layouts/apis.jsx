import { useState } from "react";
import Beams from "../UI-components/back";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { style } from "@mui/system";

export default function GetData() {
  const [inp, setInp] = useState("");
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!inp) return; // prevent empty input
    setLoad(true);
    setError(null); // reset previous error
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${inp}`);
      if (!res.ok) throw new Error("Character not found"); // handle 404
      const items = await res.json();
      setData(items);
      console.log(items);
    } catch (err) {
      console.log(err);
      setError(err.message); // display error
      setData(null); // clear previous data
    } finally {
      setTimeout(() => setLoad(false), 500); // optional delay for spinner
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchData();
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Beams
        beamWidth={3}
        beamHeight={30}
        beamNumber={20}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "left",
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "10px",
          backdropFilter: "blur(10px) brightness(50%)",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            onChange={(e) => setInp(e.target.value)}
            onKeyPress={handleKeyPress}
            color="success"
            id="outlined-basic"
            label="Character ID"
            variant="outlined"
            fullWidth
            InputProps={{
                style:{color:"white"}
            }}
            InputLabelProps={{
                style:{color:"white"}
            }}
          />
          <IconButton aria-label="fingerprint" onClick={fetchData} size="large" color="success">
            <Fingerprint />
          </IconButton>
        </Stack>

        <div style={{ marginTop: "20px" }}>
          {load ? (
            <CircularProgress color="success" />
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : data ? (
            <>
              <h1>{data.name}</h1>
              <p>Gender: {data.gender}</p>
              <p>Status: {data.status}</p>
              <p>Species: {data.species}</p>
              <p>Origin: {data.origin.name}</p>
              <p>Location: {data.location.name}</p>
              <h3>Episodes:</h3>
              <ul>
                {data.episode.map((ep, i) => (
                  <li key={i}>{ep}</li>
                ))}
              </ul>
              <img
                src={data.image}
                alt={data.name}
                style={{ borderRadius: "10px", marginTop: "10px", width: "100%" }}
              />
            </>
          ) : (
            <p>Enter a valid character ID and click the button</p>
          )}
        </div>
      </div>
    </div>
  );
}
