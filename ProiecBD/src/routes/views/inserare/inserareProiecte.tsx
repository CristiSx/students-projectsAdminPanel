import React, { useEffect } from 'react'
import { clearCache, loadCache, saveCache } from "../../../cache";

const InserareProiecte = () => {
      const CACHE_KEY = "form_proiecte";
    const [formData, setFormData] = React.useState({
        denumire: "",
        data_predare: "",
        termen_limita: "",
        nota: ""
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
          formData.denumire ||
          formData.data_predare ||
          formData.termen_limita ||
          formData.nota;
      
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
            const response = await fetch("http://localhost:3000/api/inserare/proiecte", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Proiect inserat cu succes");
                setFormData({ denumire: "", data_predare: "", termen_limita: "", nota: "" });
            } else {
                setMessage((data.error || "Eroare la inserare"));
            }
        } catch (err) {
            console.error(err);
            setMessage("Eroare de rețea");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Inserare Proiect</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className='text-gray-600 font-medium'  >
                    Denumire:
                </div>
                <input
                    type="text"
                    name="denumire"
                    value={formData.denumire}
                    onChange={handleChange}
                    placeholder="Denumire"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <div className='text-gray-600 font-medium'  >
                    Data Predare:
                </div>
                <input
                    type="date"
                    name="data_predare"
                    value={formData.data_predare}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <div className='text-gray-600 font-medium'  >
                    Termen Limită:
                </div>
                <input
                    type="date"
                    name="termen_limita"
                    value={formData.termen_limita}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                 <div className='text-gray-600 font-medium'  >
                    Nota:
                </div>
                <input
                    type="number"
                    name="nota"
                    value={formData.nota}
                    onChange={handleChange}
                    placeholder="Nota"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Inserare Proiect
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center text-gray-700 font-medium">{message}</p>
            )}
        </div>
    )
}

export default InserareProiecte;
