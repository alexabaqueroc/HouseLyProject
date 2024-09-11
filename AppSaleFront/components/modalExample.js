import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function MinimalPopup() {
    const [selectedId, setSelectedId] = useState(null);

    const properties = [
        {id: 1, name: "Property 1", description: "Beautiful house"},
        {id: 2, name: "Property 2", description: "Cozy apartment"},
        {id: 3, name: "Property 3", description: "Modern villa"}
    ];

    const handleCardClick = (id) => setSelectedId(id);

    return (
        <div style={{padding: "2rem", display: "flex", gap: "1rem"}}>
            {properties.map((property) => (
                <motion.div
                    key={property.id}
                    layoutId={property.id}
                    onClick={() => handleCardClick(property.id)}
                    style={{
                        width: "200px",
                        height: "150px",
                        backgroundColor: "#ccc",
                        borderRadius: "1rem",
                        cursor: "pointer",
                        padding: "1rem"
                    }}
                    whileHover={{scale: 1.05}}
                >
                    <h5>{property.name}</h5>
                    <p>{property.description}</p>
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedId && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                zIndex: 1
                            }}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={selectedId}
                            style={{
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "300px",
                                padding: "2rem",
                                backgroundColor: "white",
                                borderRadius: "1.5rem",
                                zIndex: 2,
                                transition: 'border-radius .7s ease',
                                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)"
                            }}
                            initial={{opacity: 0, scale: 0}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0}}
                        >
                            <motion.h5>Additional Info</motion.h5>
                            <motion.h2>
                                {properties.find((item) => item.id === selectedId).name}
                            </motion.h2>

                            {/* Close Button */}
                            <motion.button
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "none",
                                    border: "none",
                                    fontSize: "24px",
                                    cursor: "pointer"
                                }}
                                onClick={() => setSelectedId(null)}
                                whileHover={{scale: 1.2}}
                            >
                                &times;
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
