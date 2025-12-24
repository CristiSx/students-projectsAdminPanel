import React, { useEffect } from 'react';
import { clearCache, loadCache, saveCache } from "../../../cache";


const InserareStudenti = () => {
  const CACHE_KEY = "form_studenti";
  const [formData, setFormData] = React.useState({
    nume: "",
    prenume: "",
    CNP: "",
    an: "",
    serie: "",
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
      formData.nume ||
      formData.prenume ||
      formData.CNP ||
      formData.an ||
      formData.serie;
  
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
      const response = await fetch("http://localhost:3000/api/inserare/studenti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Student inserat cu succes!");
        setFormData({ nume: "", prenume: "", CNP: "", an: "", serie: "" });
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inserare Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-gray-600 font-medium">Nume:</div>
        <input
          type="text"
          name="nume"
          value={formData.nume}
          onChange={handleChange}
          placeholder="Nume"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">Prenume:</div>
        <input
          type="text"
          name="prenume"
          value={formData.prenume}
          onChange={handleChange}
          placeholder="Prenume"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">CNP:</div>
        <input
          type="text"
          name="CNP"
          value={formData.CNP}
          onChange={handleChange}
          placeholder="CNP"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">An:</div>
        <input
          type="number"
          name="an"
          value={formData.an}
          onChange={handleChange}
          placeholder="An"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-gray-600 font-medium">Serie:</div>
        <input
          type="text"
          name="serie"
          value={formData.serie}
          onChange={handleChange}
          placeholder="Serie"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Inserare Student
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default InserareStudenti;
