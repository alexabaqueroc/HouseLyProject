"use client";

import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {motion} from "framer-motion";
import Head from "next/head";

// Optional: a small Spinner component for loading states
function Spinner() {
    return (
        <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
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
    );
}

export default function SinglePropertyPage() {
    const router = useRouter();
    const {id} = useParams(); // The [id] from the URL
    const [property, setProperty] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

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

    // 1. Fetch property data by ID
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8004/propertiesSale/id/${id}`)
            .then((res) => {
                // If your API returns a single object, store it directly
                // If your API returns an array, use res.data[0] or similar
                setProperty(res.data);
                setFormData(res.data);
            })
            .catch((err) => console.error("Error fetching property:", err))
            .finally(() => setLoading(false));
    }, [id]);

    // 2. Handler for toggling edit mode
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // 3. Handler for form input changes
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 4. Special handler for nested fields like priceMin, priceMax
    const handlePriceChange = (field, val) => {
        setFormData((prev) => {
            const updated = {...prev};
            if (!updated.priceSale) {
                // Ensure nested structure exists
                updated.priceSale = [
                    {
                        type: "string",
                        selected: true,
                        priceList: [{priceMin: 0, priceMax: 0, selected: true}],
                    },
                ];
            }
            updated.priceSale[0].priceList[0][field] = Number(val);
            return updated;
        });
    };

    // 5. Handler for sending the update request
    const handleUpdate = () => {
        // The request you provided uses POST to the same endpoint
        // with the entire property object in the body.
        axios
            .put(`http://127.0.0.1:8004/propertiesSale/${id}`, formData, {
                headers: {"Content-Type": "application/json"},
            })
            .then((res) => {
                console.log("Property updated:", res.data);
                // On success, exit edit mode and refresh local state
                setProperty(formData);
                setEditMode(false);
            })
            .catch((err) => console.error("Error updating property:", err));
    };

    if (loading) {
        return (
            <>
                <Head>
                    <title>HouseLy App - Loading...</title>
                </Head>
                <Spinner/>
            </>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
                <p>Property not found.</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>HouseLy App - Property {id}</title>
            </Head>
            <main className="min-h-screen bg-gray-900 p-6 text-gray-100">
                <motion.div
                    className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="flex justify-between items-center mb-6"
                        variants={itemVariants}
                    >
                        <h1 className="text-3xl font-bold">Property Details</h1>
                        <button
                            onClick={toggleEditMode}
                            className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                        >
                            {editMode ? "Cancel" : "Edit"}
                        </button>
                    </motion.div>

                    {/* NAME FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">Name:</label>
                        {editMode ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                        ) : (
                            <p>{property.name}</p>
                        )}
                    </motion.div>

                    {/* DESCRIPTION FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        {editMode ? (
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                        ) : (
                            <p>{property.description}</p>
                        )}
                    </motion.div>

                    {/* PRICE RANGE FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">Price Range:</label>
                        {editMode ? (
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    name="priceMin"
                                    value={
                                        formData.priceSale?.[0]?.priceList?.[0]?.priceMin ?? ""
                                    }
                                    onChange={(e) => handlePriceChange("priceMin", e.target.value)}
                                    className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-1/2"
                                />
                                <input
                                    type="number"
                                    name="priceMax"
                                    value={
                                        formData.priceSale?.[0]?.priceList?.[0]?.priceMax ?? ""
                                    }
                                    onChange={(e) => handlePriceChange("priceMax", e.target.value)}
                                    className="p-2 rounded bg-gray-700 text-white border border-gray-600 w-1/2"
                                />
                            </div>
                        ) : (
                            <p>
                                $
                                {property.priceSale?.[0]?.priceList?.[0]?.priceMin} - $
                                {property.priceSale?.[0]?.priceList?.[0]?.priceMax}
                            </p>
                        )}
                    </motion.div>

                    {/* ROOM FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">Room:</label>
                        {editMode ? (
                            <input
                                type="number"
                                name="room"
                                value={formData.room || 0}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                        ) : (
                            <p>{property.room}</p>
                        )}
                    </motion.div>

                    {/* BATH FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">Bath:</label>
                        {editMode ? (
                            <input
                                type="number"
                                name="bath"
                                value={formData.bath || 0}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                        ) : (
                            <p>{property.bath}</p>
                        )}
                    </motion.div>

                    {/* BUILD AREA FIELD */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <label className="block text-sm font-medium mb-1">
                            Build Area (m²):
                        </label>
                        {editMode ? (
                            <input
                                type="number"
                                name="BuildArea"
                                value={formData.BuildArea || 0}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                        ) : (
                            <p>{property.BuildArea}</p>
                        )}
                    </motion.div>

                    {/* Additional fields can follow the same pattern */}

                    {/* UPDATE BUTTON (only in edit mode) */}
                    {editMode && (
                        <motion.button
                            onClick={handleUpdate}
                            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            Update
                        </motion.button>
                    )}
                </motion.div>
            </main>
        </>
    );
}
