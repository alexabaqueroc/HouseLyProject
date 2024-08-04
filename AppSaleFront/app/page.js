"use client"
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

async function fetchProperties(){
  const response = await axios.get('http://127.0.0.1:8085/properties')
  console.log(response)
  return response.data
}

export default function Home() {
  // use state maneja el estado para controlar rerenders
  const [properties, setProperties] = useState('')

  const [count, setCount] = useState(0)

 

  // cuando se monto el componente una vez
  useEffect(() => {
    fetchProperties().then(propertiesList => {
      //El then espera a que termine el proceso asincrono
      console.log("Que datos tengo properties list", propertiesList)
      setProperties(propertiesList)      
    }).catch(e => {
      console.log('error ',e.message)
    })
  },[])

  

  return (
    <main className={styles.main}>
      <h1>HouseLy App</h1>
      <h4>Contador == {count}</h4>
      <button onClick={() => setCount(c => c+1)}>Aumente Contador</button>
      <section className="properties">        
        <div>{properties && properties.map(property => (
          <div className={styles.card}>
            <h5>{property.name}</h5>
            <img className={styles['card-image']} src={property.image} alt="Casa Girardot" />
            <p>{property.description}</p>
            <div className="price">
              <p>max price : <b>{property.maxPrice}</b></p>
              <p>min price : <b>{property.minPrice}</b></p>
            </div>
            <p>{property.offer ? '😊' : '🤦‍♂️'}</p>
            <p>city {property.city}</p>
            <p>address {property.address}</p>
          </div>
        ))}</div>
      </section>
    </main>
  );
}
