import React, { useEffect, useState } from "react";

interface VizualizareTotala {
  idinscriere: number;
  nume: string;
  prenume: string;
  denumire: string;
  data_predare: string;
  termen_limita: string;
  data_inscriere: string;
  nota: number;
  status: string;
}

const vizualizareTotala = () => {
  const [data, setData] = useState<VizualizareTotala[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/vizualizare/totala"
        );
        if (!response.ok) {
          throw new Error("Eroare la preluarea datelor");
        }
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Studenti - Inscrieri - Proiecte
      </h1>

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data.length === 0 ? (
        <p>Nu există date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">ID Înscriere</th>
                <th className="px-4 py-2 border-b">Nume</th>
                <th className="px-4 py-2 border-b">Prenume</th>
                <th className="px-4 py-2 border-b">Proiect</th>
                <th className="px-4 py-2 border-b">Data Predare</th>
                <th className="px-4 py-2 border-b">Termen Limită</th>
                <th className="px-4 py-2 border-b">Data Înscriere</th>
                <th className="px-4 py-2 border-b">Notă</th>
                <th className="px-4 py-2 border-b">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => (
                <tr
                  key={row.idinscriere}
                  className="hover:bg-gray-50"
                >
                  <td className="text-center px-4 py-2">{row.idinscriere}</td>
                  <td className="text-center px-4 py-2">{row.nume}</td>
                  <td className="text-center px-4 py-2">{row.prenume}</td>
                  <td className="text-center px-4 py-2">{row.denumire}</td>
                  <td className="text-center px-4 py-2">
                    {row.data_predare?.split("T")[0]}
                  </td>
                  <td className="text-center px-4 py-2">
                    {row.termen_limita?.split("T")[0]}
                  </td>
                  <td className="text-center px-4 py-2">
                    {row.data_inscriere?.split("T")[0]}
                  </td>
                  <td className="text-center px-4 py-2">{row.nota}</td>
                  <td className="text-center px-4 py-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default vizualizareTotala;
