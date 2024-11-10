"use client"
import styles from "./page.module.css";
import axios from "axios";
import {useEffect, useState} from "react";
import PropertiesList from "@/components/PropertiesList";
import {formatPricing} from "@/helpers/numbers";
import Head from "next/head";

async function fetchProperties() {
    const response = await axios.get('http://127.0.0.1:8004/properties')
    console.log(response)
    return response.data
}


export default function Home() {
    // use state maneja el estado para controlar rerenders
    const [properties, setProperties] = useState('')

    // cuando se monto el componente una vez
    useEffect(() => {
        fetchProperties().then(propertiesList => {
            //El then espera a que termine el proceso asincrono
            console.log("Que datos tengo properties list", propertiesList)
            setProperties(propertiesList.map(c => ({
                ...c,
                minPrice: formatPricing(c.minPrice),
                maxPrice: formatPricing(c.maxPrice)
            })))
        }).catch(e => {
            console.log('error ', e.message)
        })
    }, [])


    return (
        <>
            <Head>
                <title>HouseLy App - Home</title>
                <meta name="description" content="Browse houses and properties available for sale or rent."/>
            </Head>
            <main className={styles.main}>
                <h1>HouseLy App</h1>
                {properties && <PropertiesList properties={properties}/>}
            </main>
        </>
    );
}

