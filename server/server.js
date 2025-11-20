const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();
const port = 3000; 

app.use(cors());
app.use(express.json());


const pool = mysql.createPool({
host: 'localhost', 
  user: 'proiectBD',
  password: 'crissss1234!',
  database: 'proiect'
});
//GET----------------------------------------------------------------------------------------------------------------------------------
app.get('/api/studenti', (req, res) => {
  pool.query('SELECT * FROM studenti', (error, results) => {
    if (error) {
      console.error("Eroare la interogarea bazei de date:", error);
      return res.status(500).json({ error: 'Eroare server la preluarea datelor' });
    }
    res.json(results);
  });
});

app.get('/api/proiecte', (req, res) => {
  const query = 'select * from proiecte';
  pool.query(query, (error, results) => {
    if(error){
      console.error(error);
      return res.status(500).error(error);
    }
    res.json(results);
  })
});

app.get('/api/inscrieri', (req, res) => {
  const query = 'select * from inscrieri';
  pool.query(query, (error, results) =>{
    if(error){
      console.error(error)
      return res.status(500).error(error);
    }
    res.json(results);
    })
});
//POST----------------------------------------------------------------------------------------------------------------------------------

app.post('/api/inserare/studenti', (req, res) => {
  const {  nume, prenume, CNP, an, serie } = req.body;

  const query = 'INSERT INTO studenti ( nume, prenume, CNP, an, serie) VALUES (?, ?, ?, ?, ?)';
  pool.query(query, [nume, prenume, CNP, an, serie], (error, results) => {
    if (error) {
      console.error("Eroare la inserarea în baza de date:", error);
      return res.status(500).json({ error: 'Eroare server la inserarea datelor' });
    }
    res.json({ message: 'Student inserat cu succes', insertId: results.insertId });
  });
});

app.post('/api/inserare/proiecte', (req, res) => {
  const { denumire, data_predare, termen_limita, nota } = req.body;
  const query = 'insert into proiecte( denumire, data_predare, termen_limita, nota ) VALUES (?, ?, ?, ?)';

  pool.query(query, [denumire, data_predare, termen_limita, nota], (error, results) => {
    if(error){
      console.error(error);
      return res.status(500).json({ error: 'Eroare server la inserarea datelor' });

    }
    res.json({ message: 'Proiect inserat cu succes', insertId: results.insertId });
  });

});
app.post('/api/inserare/inscrieri', (req, res) => {
  const { idstudent, idproiect, data_inscriere, status} = req.body;
  const query = 'INSERT INTO inscrieri (idstudent, idproiect, data_inscriere, status) VALUES (?, ?, ?, ?)';
  pool.query(query, [idstudent, idproiect, data_inscriere, status], (error, results) => {
    if (error) {
      console.error("Eroare la inserarea în baza de date:", error);
      return res.status(500).json({ error: 'Eroare server la inserarea datelor' });
    }
    res.json({ message: 'Inscriere realizata cu succes', insertId: results.insertId });
  });
});

//PUT----------------------------------------------------------------------------------------------------------------------------------
app.put('/api/update/studenti/:id', (req, res) => {
  const studentId = req.params.id;
  const { nume, prenume, CNP, an, serie } = req.body;

  const query = 'UPDATE studenti SET nume = ?, prenume = ?, CNP = ?, an = ?, serie = ? WHERE idstudent = ?';
  pool.query(query, [nume, prenume, CNP, an, serie, studentId], (error, results) => {
    if (error) {
      console.error("Eroare la actualizarea în baza de date:", error);
      return res.status(500).json({ error: 'Eroare server la actualizarea datelor' });
    }
    res.json({ message: 'Student actualizat cu succes' });
  });
});

// ---  Pornirea Serverului ---
app.listen(port, () => {
  console.log(`Serverul Express rulează pe http://localhost:${port}`);
});