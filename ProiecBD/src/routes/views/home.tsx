// src/routes/views/Home.jsx
import React from "react";
import { AiFillContainer } from "react-icons/ai";
import { Users, FolderPlus, Settings } from "lucide-react";
import StudentiTable from "./../views/vizualizare/studenti"
import ProiecteTable from "./../views/vizualizare/proiecte"
import InscrieriTable from "./../views/vizualizare/inscrieri";

import InserareStudeti from "./../views/inserare/inserareStudenti"
import InserareProiecte from "./../views/inserare/inserareProiecte"
import InserareInscriere from "./../views/inserare/inserareInscrieri"
import Vizual from "./../views/vizualizareTotal";


const Home = () => {
  const [active, setActive] = React.useState("vizualizareTotala");
  return (
    <>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          <p className="color">Inscrieri Proiecte</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
         
          <div className="mt-4 text-gray-500  uppercase text-xs font-bold">
            Vizualizare
          </div>
           <button
            onClick={() => { setActive("vizualizareTotala"); }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100"
          > 
            <AiFillContainer size={18} /> VizualizareTotal
          </button>
          <button
            onClick={() => { setActive("studentiv"); }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100"
          > 
            <Users size={18} /> Studenți
          </button>
          <button
            onClick={() => { setActive("proiectev"); }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100"
          >
            <FolderPlus size={18} /> Proiecte
          </button>
          <button
            onClick={() => { setActive("inscrieriv"); }}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100"
          >
            <Users size={18} /> Înscrieri
          </button> 

          <div className="mt-4 text-gray-500 uppercase text-xs font-bold">
            Inserare
          </div>
          <button
            onClick={()=>{setActive("studentii")}}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-100"
          >
            <Users size={18} /> Student
          </button>
          <button
            onClick={()=>{setActive("proiectei")}}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-100"
          >
            <FolderPlus size={18} /> Proiect
          </button>
          <button
            onClick={()=>{setActive("inscrierii")}}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-100"
          >
            <Users size={18} /> Înscriere
          </button>

    
        </nav>
      </aside>

      <main className="flex-1 p-8">
  {active === "studentiv" && <StudentiTable />}
  {active === "proiectev" && <ProiecteTable />}
  {active === "inscrieriv" && <InscrieriTable />}
  {active === "studentii" && <InserareStudeti />}
  {active === "proiectei" && <InserareProiecte />}
  {active === "inscrierii" && <InserareInscriere />}
  {active === "vizualizareTotala" && <Vizual />}
</main>
</div>
    </>
  );
};

export default Home;
