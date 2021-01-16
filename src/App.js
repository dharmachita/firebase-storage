import React, { useState, useEffect } from "react";
import "./styles.css";
import { getFirestore } from "./db";
import Imagen from "./Imagen";

export default function App() {
  const [data, setData] = useState([]);
  const collection = getFirestore().collection("fotos");

  useEffect(() => {
    collection
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setData(documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Firebase/Storage</h1>
      <h2>Consumo de imágenes sin URL</h2>
      {data.length > 0 &&
        data.map((item) => (
          <div key={item.id}>
            <p>Nombre: {item.nombre}</p>
            <p>Descripción: {item.descripcion}</p>
            <Imagen src={item.img} alt={item.nombre} />
          </div>
        ))}
    </div>
  );
}
