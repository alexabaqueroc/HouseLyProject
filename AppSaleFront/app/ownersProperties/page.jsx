"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import Head from "next/head";
import {AddIcon} from "@chakra-ui/icons";
import {useRouter} from "next/navigation";

export default function PropertiesSalePage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Get the userId from localStorage (defaults to provided value if not found)
        const storedUserId =
            localStorage.getItem("userId");
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
    const handleAddProperty = () => {
        console.log("CTA button clicked");
        // Example: router.push("/property/create");
    };

    // Framer Motion variants for staggering
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
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
            <main className="min-h-screen bg-gray-900 p-4 text-gray-100">
                <motion.h1
                    className="text-3xl font-bold text-center my-8"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    Your Property Portfolio
                </motion.h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <svg
                            className="animate-spin h-12 w-12 text-blue-500"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            ></path>
                        </svg>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {properties.length === 0 ? (
                            <p className="col-span-full text-center text-gray-400">
                                No properties found
                            </p>
                        ) : (
                            properties.map((property) => (
                                <motion.div
                                    key={property._id}
                                    onClick={() => router.push(`/saleProperty/${property._id}`)}
                                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    variants={itemVariants}
                                    whileHover={{scale: 1.03}}
                                >
                                    <img
                                        src={property.image[0]}
                                        alt={property.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold">{property.name}</h2>
                                        <p className="text-gray-300 mt-2 text-sm">
                                            {property.description}
                                        </p>
                                        <p className="text-gray-400 mt-3 text-sm">
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
                                                <p className="text-blue-400 font-medium mt-3 text-sm">
                                                    Price: $
                                                    {property.priceSale[0].priceList[0].priceMin} - $
                                                    {property.priceSale[0].priceList[0].priceMax}
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
                    className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full px-6 py-3 flex items-center space-x-2 shadow-lg hover:bg-blue-700 focus:outline-none"
                    onClick={handleAddProperty}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <AddIcon boxSize={6}/>
                    <span>Add Property</span>
                </motion.button>
            </main>
        </>
    );
}
