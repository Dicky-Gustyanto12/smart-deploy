import React, { useEffect, useState } from "react";

const Endpoint = () => {
  const [poktan, setPoktan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/poktan/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPoktan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data Kelompok Tani</h1>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Poktan</th>
            <th>Alamat</th>
            <th>Desa</th>
            <th>Kecamatan</th>
            <th>Nama Ketua</th>
            <th>NIK</th>
            <th>Nomor HP</th>
          </tr>
        </thead>
        <tbody>
          {poktan.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama_poktan}</td>
              <td>{item.alamat}</td>
              <td>{item.desa}</td>
              <td>{item.kecamatan}</td>
              <td>{item.nama_ketua}</td>
              <td>{item.nik}</td>
              <td>{item.nomor_hp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Endpoint;
