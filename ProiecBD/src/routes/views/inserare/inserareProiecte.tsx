import React from 'react'

const inserareProiecte = () => {
    const [formData, setFormData] = React.useState({
        denumire: "",
        data_predare: "",
        termen_limita: "",
        nota: ""
    });
    const [message, setMessage] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]:e.target.value });
    };
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/api/inserare/proiecte", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(response.ok){
                setMessage("Proiect inserat cu succes");
                setFormData({denumire: "", data_predare: "", termen_limita: "", nota: ""});
            }else{
                setMessage((data.error || "Eroare la inserare"));
            }
        }catch(err){
            console.error(err);
            setMessage("Eroare de rețea");
        }
    };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="denumire" value={formData.denumire} onChange={handleChange} placeholder="Denumire" required />
        <input type="date" name="data_predare" value={formData.data_predare} onChange={handleChange} placeholder="Data predare" required />
        <input type="date" name="termen_limita" value={formData.termen_limita} onChange={handleChange} placeholder="Termen limita" required />
        <input type="number" name="nota" value={formData.nota} onChange={handleChange} placeholder="Nota" required />
        <button type="submit">Inserare Proiect</button>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}

export default inserareProiecte