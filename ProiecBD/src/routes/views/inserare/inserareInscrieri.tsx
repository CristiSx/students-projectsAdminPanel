import React, { useEffect } from 'react';
import { clearCache, loadCache, saveCache } from "../../../cache";


const InserareInscrieri = () => {
  const CACHE_KEY = "form_inscrieri";


  const [formData, setFormData] = React.useState({
    idstudent: "",
    idproiect: "",
    data_inscriere: "",
    status: ""
  });
  const [message, setMessage] = React.useState("");
  useEffect(() => {
  const cached = loadCache<typeof formData>(CACHE_KEY);
  if (cached) {
    setFormData(cached);
  }
}, []);

useEffect(() => {
  const hasData =
    formData.idstudent ||
    formData.idproiect ||
    formData.data_inscriere ||
    formData.status;

  if (hasData) {
    saveCache(CACHE_KEY, formData);
  }
}, [formData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/inserare/inscrieri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Înscriere adăugată cu succes!");
        setFormData({ idstudent: "", idproiect: "", data_inscriere: "", status: "" });
        clearCache(CACHE_KEY);
        
      } else {
        setMessage(data.error || "Eroare la inserare");
      }
    } catch (err) {
      console.error(err);
      setMessage("Eroare de rețea");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inserare Înscriere</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-gray-600 font-medium">ID Student:</div>
        <input
          type="number"
          name="idstudent"
          value={formData.idstudent}
          onChange={handleChange}
          placeholder="ID Student"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">ID Proiect:</div>
        <input
          type="number"
          name="idproiect"
          value={formData.idproiect}
          onChange={handleChange}
          placeholder="ID Proiect"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">Data Înscriere:</div>
        <input
          type="date"
          name="data_inscriere"
          value={formData.data_inscriere}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">Status:</div>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Inserare Înscriere
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default InserareInscrieri;
