import React, { useEffect, useState } from 'react';

const Proiecte = () => {
  interface Proiect {  
    idproiect: number;
    denumire: string;
    data_predare: string;
    termen_limita: string;
    nota: number;
  }

  const [proiecte, setProiecte] = useState<Proiect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Proiect>>({
    denumire: "",
    data_predare: "",
    termen_limita: "",
    nota: undefined,
  }); 

  useEffect(() => {
    const fetchProiecte = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/proiecte");
        if (!response.ok) throw new Error("Eroare la preluarea datelor de la server");
        const data: Proiect[] = await response.json();
        setProiecte(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProiecte();
  }, []);

  const startEdit = (proiect: Proiect) => {
    setEditingId(proiect.idproiect);
    setEditingData({ 
      ...proiect,
      data_predare: proiect.data_predare?.split("T")[0],
      termen_limita: proiect.termen_limita?.split("T")[0],
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
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
        fetch(`http://localhost:3000/api/delete/proiecte/${id}`, { method: "DELETE" })
      ));
      setProiecte(proiecte.filter(p => !selectedIds.includes(p.idproiect)));
      setSelectedIds([]);
    } catch (err) {
      console.error("Eroarea este:", err);
    }
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await fetch(`http://localhost:3000/api/update/proiecte/${editingId}`, { 
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });
    } catch (err) {
      console.error("Eroarea este:", err);
    }
    setProiecte(
      proiecte.map(p =>
        p.idproiect === editingId ? { ...p, ...editingData } as Proiect : p
      )
    );
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Lista Proiectelor
      </h1>

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

      {proiecte.length === 0 ? (
        <p>Nu există proiecte în baza de date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Select</th>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Denumire</th>
                <th className="px-4 py-2 border-b">Data Predării</th>
                <th className="px-4 py-2 border-b">Termen Limită</th>
                <th className="px-4 py-2 border-b">Notă</th>
                <th className="px-4 py-2 border-b">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {proiecte.map(proiect => (
                <tr key={proiect.idproiect} className="hover:bg-gray-50">
                  <td className="text-center px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(proiect.idproiect)}
                      onChange={() => toggleSelect(proiect.idproiect)}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>

                  <td className="text-center px-4 py-2">{proiect.idproiect}</td>

                  <td className="text-center px-4 py-2">
                    {editingId === proiect.idproiect ? (
                      <input
                        name="denumire"
                        value={editingData.denumire || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : proiect.denumire}
                  </td>

                  <td className="text-center px-4 py-2">
                    {editingId === proiect.idproiect ? (
                      <input
                        type="date"
                        name="data_predare"
                        value={editingData.data_predare || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (proiect.data_predare ? proiect.data_predare.split('T')[0] : 'N/A')}
                  </td>

                  <td className="text-center px-4 py-2">
                    {editingId === proiect.idproiect ? (
                      <input
                        type="date"
                        name="termen_limita"
                        value={editingData.termen_limita || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : (proiect.termen_limita ? proiect.termen_limita.split('T')[0] : 'N/A')}
                  </td>

                  <td className="text-center px-4 py-2">
                    {editingId === proiect.idproiect ? (
                      <input
                        name="nota"
                        value={editingData.nota ?? ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : proiect.nota}
                  </td>

                  <td className="px-4 py-2">
                    {editingId === proiect.idproiect ? (
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Salvează
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(proiect)}
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

export default Proiecte;
