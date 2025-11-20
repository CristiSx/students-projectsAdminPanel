import React from 'react'

const inserareInscrieri = () => {
    const [formData, setFormData] = React.useState({
        idstudent:"",
        idproiect:"",
        data_inscriere:"",
        status:""
    });
    const [message,setMessage] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    };
    const handleSubmit =  async(e:React.FormEvent) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/api/inserare/inscrieri", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
            }); 
            const data = await response.json();
             if(response.ok){
                setMessage("Proiect inserat cu succes");
                setFormData({idproiect:"", idstudent:"", data_inscriere:"",status:""});
            }else{
                setMessage((data.error || "Eroare la inserare"));
            }
        }catch(err){
            console.error(err);
            setMessage("Eroare de rețea");
        }
        }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" name="idstudent" value={formData.idstudent} onChange={handleChange} placeholder="idstudent" required />
        <input type="text" name="idproiect" value={formData.idproiect} onChange={handleChange} placeholder="idproiect" required />
        <input type="date" name="data_inscriere" value={formData.data_inscriere} onChange={handleChange} placeholder="data_inscriere" required />
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder="status" required />
        <button type="submit">Inserare inscriere</button>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}

export default inserareInscrieri