"use client";

import {useRouter} from "next/navigation";
import {motion} from "framer-motion";
import Head from "next/head";

export default function DashboardPage() {
    const router = useRouter();

    // Framer Motion variants for staggering animations
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    };

    // Click handler for "My Properties"
    const handleMyPropertiesClick = () => {
        router.push("/ownersProperties");
    };

    return (
        <>
            <Head>
                <title>Dashboard - HouseLy App</title>
                <meta name="description" content="Manage your properties and more."/>
            </Head>
            <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
                <motion.h1
                    className="text-4xl font-bold text-center mb-12"
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                >
                    Dashboard
                </motion.h1>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* My Properties Card */}
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{scale: 1.05}}
                        onClick={handleMyPropertiesClick}
                    >
                        <h2 className="text-2xl font-semibold mb-4">My Properties</h2>
                        <p className="text-gray-400">
                            View and manage your own properties with ease.
                        </p>
                    </motion.div>

                    {/* Other dashboard options */}
                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{scale: 1.05}}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Option 2</h2>
                        <p className="text-gray-400">Description for option 2.</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                        variants={itemVariants}
                        whileHover={{scale: 1.05}}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Option 3</h2>
                        <p className="text-gray-400">Description for option 3.</p>
                    </motion.div>

                    {/* You can add more options as needed */}
                </motion.div>
            </main>
        </>
    );
}
