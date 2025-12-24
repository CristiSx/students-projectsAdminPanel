import React, { useEffect, useState } from 'react';

const Inscrieri = () => {
  interface Inscriere {
    idinscriere: number;
    idstudent: number;
    idproiect: number;
    data_inscriere: string;
    status: string;
  }

  const [inscrieri, setInscrieri] = useState<Inscriere[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Inscriere>>({
    idstudent: undefined,
    idproiect: undefined,
    data_inscriere: "",
    status: "",
  });

  useEffect(() => {
    const fetchInscrieri = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/inscrieri");
        if (!response.ok) throw new Error("Eroare în preluarea datelor");
        const data: Inscriere[] = await response.json();
        setInscrieri(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInscrieri();
  }, []);

  const startEdit = (inscriere: Inscriere) => {
    setEditingId(inscriere.idinscriere);
    setEditingData({ ...inscriere, data_inscriere: inscriere.data_inscriere?.split("T")[0] });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await fetch(`http://localhost:3000/api/update/inscrieri/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });
    } catch (err) {
      console.error("Eroarea este:", err);
    }
    setInscrieri(inscrieri.map(i => i.idinscriere === editingId ? { ...i, ...editingData } : i));
    setEditingId(null);
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = async () => {
    try {
      await Promise.all(selectedIds.map(id =>
        fetch(`http://localhost:3000/api/delete/inscrieri/${id}`, { method: "DELETE" })
      ));
      setInscrieri(inscrieri.filter(i => !selectedIds.includes(i.idinscriere)));
      setSelectedIds([]);
    } catch (err) {
      console.error("Eroarea este:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Lista Înscrierilor</h1>

      {loading && <p>Se încarcă...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {selectedIds.length > 0 && (
        <button
          onClick={deleteSelected}
          className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Șterge selectatele
        </button>
      )}

      {inscrieri.length === 0 ? (
        <p>Nu există înscrieri în baza de date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Select</th>
                <th className="px-4 py-2 border-b">ID înscriere</th>
                <th className="px-4 py-2 border-b">ID student</th>
                <th className="px-4 py-2 border-b">ID proiect</th>
                <th className="px-4 py-2 border-b">Data înscriere</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {inscrieri.map(i => (
                <tr key={i.idinscriere} className="hover:bg-gray-50">
                  <td className="text-center px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(i.idinscriere)}
                      onChange={() => toggleSelect(i.idinscriere)}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="text-center px-4 py-2">{i.idinscriere}</td>
                  <td className="text-center px-4 py-2">{editingId === i.idinscriere ? (
                    <input
                      type="number"
                      name="idstudent"
                      value={editingData.idstudent || ''}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : i.idstudent}</td>
                  <td className="text-center px-4 py-2">{editingId === i.idinscriere ? (
                    <input
                      type="number"
                      name="idproiect"
                      value={editingData.idproiect || ''}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : i.idproiect}</td>
                  <td className="text-center px-4 py-2">{editingId === i.idinscriere ? (
                    <input
                      type="date"
                      name="data_inscriere"
                      value={editingData.data_inscriere || ''}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (i.data_inscriere ? i.data_inscriere.split('T')[0] : 'N/A')}</td>
                  <td className="text-center px-4 py-2">{editingId === i.idinscriere ? (
                    <input
                      type="text"
                      name="status"
                      value={editingData.status || ''}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : i.status}</td>
                  <td className="px-4 py-2">
                    {editingId === i.idinscriere ? (
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Salvează
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(i)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inscrieri;
