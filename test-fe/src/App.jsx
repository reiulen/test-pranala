import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    angka: "",
  });
  const [data, setData] = useState({});

  const handleGenerate = async (type) => {
    if (!form?.angka) {
      alert("Angka harus diisi");
      return;
    }
    try {
      form.type = type;
      const res = await axios.post("http://localhost:4000/generate", form);
      setData(res?.data);
    } catch (e) {
      alert(e?.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <input
          name="angka"
          type="number"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => handleChange("angka", e?.target?.value)}
        />
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button onClick={() => handleGenerate("triangle")}>
            {" "}
            Generate Segitiga
          </button>
          <button onClick={() => handleGenerate("oddNumber")}>
            {" "}
            Generate Bilangan Ganjil
          </button>
          <button onClick={() => handleGenerate("primeNumber")}>
            {" "}
            Generate Bilangan Prima
          </button>
        </div>
      </div>
      <div
        style={{
          textAlign: "start",
        }}
      >
        <h1>Result</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.data?.replace(/\n/g, "<br/>"),
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
