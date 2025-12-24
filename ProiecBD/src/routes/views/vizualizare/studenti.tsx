import React, { useEffect, useState } from 'react';

const Studenti = () => {
  interface Student {
    idstudent: number;
    nume: string;
    prenume: string;
    CNP: number;
    an: number;
    serie: string;
  }

  const [studenti, setStudenti] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<Partial<Student>>({
    nume: "",
    prenume: "",
    CNP: undefined,
    an: undefined,
    serie: "",
  });

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudenti = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/studenti");
        if (!response.ok) throw new Error("Eroare la preluarea datelor de la server");
        const data: Student[] = await response.json();
        setStudenti(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudenti();
  }, []);

  const startEdit = (student: Student) => {
    setEditingId(student.idstudent);
    setEditingData({ ...student });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await fetch(`http://localhost:3000/api/update/studenti/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingData),
      });
    } catch (err) {
      console.error("Eroarea este:", err);
    }
    setStudenti(studenti.map(s =>
      s.idstudent === editingId ? { ...s, ...editingData } as Student : s
    ));
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
        fetch(`http://localhost:3000/api/delete/studenti/${id}`, { method: "DELETE" })
      ));
      setStudenti(studenti.filter(s => !selectedIds.includes(s.idstudent)));
      setSelectedIds([]);
    } catch (err) {
      console.error("Eroarea este:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Lista Studenților
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

      {studenti.length === 0 ? (
        <p>Nu există studenți în baza de date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Select</th>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Nume</th>
                <th className="px-4 py-2 border-b">Prenume</th>
                <th className="px-4 py-2 border-b">CNP</th>
                <th className="px-4 py-2 border-b">An</th>
                <th className="px-4 py-2 border-b">Serie</th>
                <th className="px-4 py-2 border-b">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {studenti.map(student => (
                <tr key={student.idstudent} className="hover:bg-gray-50">
                  <td className="text-center px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student.idstudent)}
                      onChange={() => toggleSelect(student.idstudent)}
                      className="h-4 w-4 text-blue-600"
                    />
                  </td>

                  <td className="text-center px-4 py-2">{student.idstudent}</td>

                  <td className="text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <input
                        name="nume"
                        value={editingData.nume || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : student.nume}
                  </td>

                  <td className="text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <input
                        name="prenume"
                        value={editingData.prenume || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : student.prenume}
                  </td>

                  <td className="text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <input
                        name="CNP"
                        value={editingData.CNP ?? ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : student.CNP}
                  </td>

                  <td className=" text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <input
                        name="an"
                        value={editingData.an ?? ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : student.an}
                  </td>

                  <td className=" text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <input
                        name="serie"
                        value={editingData.serie || ''}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                      />
                    ) : student.serie}
                  </td>

                  <td className=" text-center px-4 py-2">
                    {editingId === student.idstudent ? (
                      <button
                        onClick={saveEdit}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Salvează
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(student)}
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

export default Studenti;
