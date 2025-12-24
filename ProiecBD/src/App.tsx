import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";
import './App.css'
import Home from "./routes/views/home";
import StudentiTable from "./routes/views/vizualizare/studenti"
import ProiecteTable from "./routes/views/vizualizare/proiecte"
import InscrieriTable from "./routes/views/vizualizare/inscrieri";

import InserareStudeti from "./routes/views/inserare/inserareStudenti"
import InserareProiecte from "./routes/views/inserare/inserareProiecte"
import InserareInscriere from "./routes/views/inserare/inserareInscrieri"
function App() {
 
  return (
    <>
     
       <Router>
         <Routes>
            
            <Route path="/vizualizare/studenti" element={<StudentiTable />} />
            <Route path="/vizualizare/proiecte" element={<ProiecteTable />} />
            <Route path="/vizualizare/inscrieri" element={<InscrieriTable />} />

            <Route path="/inserare/studenti" element={<InserareStudeti />} />
            <Route path="/inserare/proiecte" element={<InserareProiecte />} />
            <Route path="/inserare/inscriere" element={<InserareInscriere />} />
           
            <Route path="/" element={<Home />} />
         </Routes>
       </Router>
     
    </>
  )
}

export default App
