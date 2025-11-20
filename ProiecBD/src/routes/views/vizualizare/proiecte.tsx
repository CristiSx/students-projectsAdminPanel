import React, { use } from 'react'
import { useEffect, useState } from 'react';


const proiecte = () => {
     interface Proiect{  
        idproiect: number;
        denumire: string;
        data_predare: string;
        termen_limita: string;
        nota: number;
    }
  const [proiecte, setProiecte] = useState<Proiect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // 3. Logica de afișare îmbunătățită
  if (loading) {
    return <p>Se încarcă...</p>;
  }

  if (error) {
    return <p>Eroare: {error}</p>;
  }

  return (
    <>
      <h1>Lista Proiectelor</h1>
      {proiecte.length === 0 ? (
        <p>Nu există proiecte în baza de date.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Denumire</th>
              <th>Data Predării</th>
              <th>Termen Limită</th>
              <th>Notă</th>
            </tr>
          </thead>
          <tbody>
            {proiecte.map((proiect) => (
              <tr key={proiect.idproiect}>
                <td>{proiect.idproiect}</td>
                <td>{proiect.denumire}</td>
                <td>{proiect.data_predare ? proiect.data_predare.split('T')[0] : 'N/A'}</td>
                <td>{proiect.termen_limita ? proiect.termen_limita.split('T')[0] : 'N/A'}</td>
                <td>{proiect.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );

};
export default proiecte