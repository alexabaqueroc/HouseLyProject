"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import Head from "next/head";
import {AddIcon} from "@chakra-ui/icons";
import {useRouter} from "next/navigation";
import styles from "./page.module.css";

export default function PropertiesSalePage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get the userId from localStorage (defaults to "user123" if not found)
        const storedUserId = localStorage.getItem("userId") || "user123";
        // Fetch the properties for the given userId
        axios
            .get(`http://127.0.0.1:8004/propertiesSale/${storedUserId}`)
            .then((res) => {
                setProperties(res.data);
            })
            .catch((err) => {
                console.error("Error fetching properties:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Placeholder function for the CTA button.
    // Replace with navigation or modal opening logic for creating a new property.
    const handleAddProperty = () => {
        console.log("CTA button clicked");
        // For example, navigate to a creation page:
        // router.push("/property/create");
    };

    return (
        <>
            <Head>
                <title>HouseLy App - Your Properties</title>
                <meta
                    name="description"
                    content="Explore your properties with a smooth, animated experience."
                />
            </Head>
            <main className={styles.main}>
                <motion.h1
                    className={styles.title}
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    Your Property Portfolio
                </motion.h1>
                {loading ? (
                    <motion.div
                        className={styles.loading}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                    >
                        Loading your properties...
                    </motion.div>
                ) : (
                    <motion.div
                        className={styles.propertiesContainer}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5, duration: 1}}
                    >
                        {properties.length === 0 ? (
                            <p className={styles.noProperties}>No properties found</p>
                        ) : (
                            properties.map((property) => (
                                <motion.div
                                    key={property._id}
                                    className={styles.propertyCard}
                                    whileHover={{
                                        scale: 1.03,
                                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
                                    }}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                >
                                    <img
                                        src={property.image[0]}
                                        alt={property.name}
                                        className={styles.propertyImage}
                                    />
                                    <div className={styles.propertyInfo}>
                                        <h2 className={styles.propertyName}>{property.name}</h2>
                                        <p className={styles.propertyDesc}>
                                            {property.description}
                                        </p>
                                        <p className={styles.propertyDetails}>
                      <span>
                        Rooms: <strong>{property.room}</strong>
                      </span>{" "}
                                            |{" "}
                                            <span>
                        Bathrooms: <strong>{property.bath}</strong>
                      </span>{" "}
                                            |{" "}
                                            <span>
                        Area: <strong>{property.BuildArea} m²</strong>
                      </span>
                                        </p>
                                        {property.priceSale &&
                                            property.priceSale.length > 0 &&
                                            property.priceSale[0].priceList &&
                                            property.priceSale[0].priceList.length > 0 && (
                                                <p className={styles.propertyPrice}>
                                                    Price: $
                                                    <strong>
                                                        {property.priceSale[0].priceList[0].priceMin}
                                                    </strong>{" "}
                                                    - $
                                                    <strong>
                                                        {property.priceSale[0].priceList[0].priceMax}
                                                    </strong>
                                                </p>
                                            )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
                {/* CTA Button */}
                <motion.button
                    className={styles.ctaButton}
                    onClick={handleAddProperty}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <AddIcon boxSize={6} style={{marginRight: "0.5rem"}}/>
                    Add Property
                </motion.button>
            </main>
        </>
    );
}
