import React from 'react'
import { useEffect, useState } from 'react';
import proiecte from './proiecte';
const inscrieri = () => {
    interface Inscriere{
        idinscrere: number;
        idstudent: number;
        idproiect: number;
        data_inscriere: string;
        status: string;
    }
    const [inscrieri, setInscrieri] = useState<Inscriere[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null)
    useEffect(()=>{
        const fetchInscrieri = async () => {
            try{
            const response = await fetch("http://localhost:3000/api/inscrieri");
            if(!response.ok) throw new Error("eroare in preluarea datelor");
            const data: Inscriere[] = await response.json();
            setInscrieri(data);
            setLoading (false);
        }catch(err:any){
            setError(err.message);
        }finally{
            setLoading(false);
        }



        }
        fetchInscrieri();
    }, []); 

    return (
    <>
        <h1>Lista Inscrierilor</h1>
      {inscrieri.length === 0 ? (
        <p>Nu există înscrieri în baza de date.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID înscriere</th>
              <th>id student</th>
              <th>id proiect</th>
              <th>data_inscriere</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {inscrieri.map((inscriere) => (
              <tr key={inscriere.idinscrere}>
                <td>{inscriere.idinscrere}</td>
                <td>{inscriere.idstudent}</td>
                <td>{inscriere.idproiect}</td>
                 <td>{inscriere.data_inscriere ? inscriere.data_inscriere.split('T')[0] : 'N/A'}</td>
                <td>{inscriere.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </>
  )
}

export default inscrieri