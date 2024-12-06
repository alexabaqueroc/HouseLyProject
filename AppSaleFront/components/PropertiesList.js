// components/PropertiesList.js
"use client"

import {AnimatePresence, motion} from "framer-motion";
import {useRouter} from "next/navigation";
import styles from "../app/page.module.css";
import {Button, Divider, Icon, Tag} from "@chakra-ui/react";
import {BsCartFill, BsCurrencyDollar, BsHeart, BsTagFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import {containerVariants} from "@/components/variants";
import MinimalPopup from "@/components/modalExample";


export default function PropertiesList({properties}) {
    const [selectedId, setSelectedId] = useState(null)

    // Add this useEffect
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setSelectedId(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [setSelectedId]);

    const router = useRouter();

    const handleCardClick = (id) => {
        setSelectedId(id)
    };

    const goToPage = (id) => router.push(`/property/${id}`);
    const propertySelected = properties?.find(e => e?._id === selectedId)

    if (false) return <MinimalPopup/>

    return (
        <>
            <motion.section
                className={styles.properties}
                variants={containerVariants}
                whileInView="show" // Trigger animation when in view
                viewport={{once: true, amount: 0.2}} // Trigger when 20% of the section is in view
                initial="hidden"
                animate="show"
            >

                {properties.map(property => (
                    <motion.div
                        key={property._id}
                        className={styles.card}
                        style={{backgroundImage: `url(${property.image})`}}
                        layoutId={property._id}
                    >
                        <div className={styles.information}>
                            <h5>{property.name}</h5>
                            <p>{property.description}</p>
                            <div className={styles.price}>
                                <div>
                                    <p className={styles["price-label"]}>Min Price:</p>
                                    <p className={`${styles["price-value"]} ${styles["min-price"]}`}>
                                        ${property.minPrice}
                                    </p>
                                </div>
                                <div>
                                    <p className={styles["price-label"]}>Max Price:</p>
                                    <p className={`${styles["price-value"]} ${styles["max-price"]}`}>
                                        ${property.maxPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.section>
            <AnimatePresence mode="popLayout" initial={true}>
                {selectedId && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className={styles.backdrop}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={selectedId}
                            className={styles.expandedCard}
                            style={{
                                backgroundImage: `linear-gradient(170deg, #000000b0 64%, #000), url(${propertySelected?.image})`
                            }}
                            initial={{opacity: 0, scale: 0, borderRadius: '1rem', rotate: 60}}
                            animate={{opacity: 1, scale: 1, borderRadius: '3rem', rotate: 0}}
                            exit={{opacity: 0, scale: 0, borderRadius: '1rem', rotate: 60}}
                            transition={{type: "spring", damping: 20, stiffness: 200, duration: '.3s'}}
                        >
                            {/* Property Info */}
                            <div className={styles.propertyInfo}>
                                <motion.h1>{propertySelected?.name}</motion.h1>
                                <motion.p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
                                    consequatur distinctio dolore enim ex molestiae vel. Consectetur consequuntur et
                                    eum hic ipsa ipsam, magni maxime minus quae, reiciendis totam unde.
                                </motion.p>
                            </div>
                            <div>
                                <br/>
                                <Divider/>
                                <br/>
                                <br/>
                                <div className={styles.locationMain} style={{color: 'white'}}>
                                    <div className={styles.location}>
                                        <p>{propertySelected.city}</p>
                                        <p className={styles.address}
                                           style={{width: 200}}>{propertySelected.address}</p>
                                    </div>
                                </div>

                                <div className={styles.price}>
                                    <div>
                                        <p className={styles["price-label"]}>Min Price:</p>
                                        <Tag variant='solid' colorScheme='green'><p
                                            className={`${styles["price-value"]} ${styles["min-price"]}`}>
                                            <Icon as={BsCurrencyDollar}/>
                                            {propertySelected.minPrice} </p></Tag>
                                    </div>
                                    <div>
                                        <p className={styles["price-label"]}>Max Price:</p>
                                        <Tag variant='solid' colorScheme='cyan'>
                                            <p className={`${styles["price-value"]} ${styles["max-price"]}`}>
                                                <Icon as={BsCurrencyDollar}/>
                                                {propertySelected.maxPrice}</p></Tag>
                                    </div>
                                </div>

                                {/* Icons for Add to Favorites, Cart */}
                                <div className={styles.actions}>
                                    <motion.div whileHover={{scale: 1.2}} className={styles.actionIcon}>
                                        <Icon as={BsHeart} color="red.400" w={8} h={8}/>
                                    </motion.div>
                                    <motion.div whileHover={{scale: 1.2}} className={styles.actionIcon}>
                                        <Icon as={BsCartFill} color="yellow.400" w={8} h={8}/>
                                    </motion.div>
                                    <div className={styles.actionIcon}>
                                        <p>{propertySelected.offer ?
                                            <Icon color="white" w={8} h={8} as={BsTagFill}/>
                                            : null}</p>
                                    </div>
                                </div>

                                {/* View More Information Button */}
                                <motion.div className={styles.viewMoreBtn}>
                                    <Button size="lg" onClick={() => goToPage(propertySelected?._id)}>
                                        Ver Mas </Button>
                                </motion.div>

                                {/* Close Button */}
                                <motion.button
                                    className={styles.closeBtn}
                                    onClick={() => setSelectedId(null)}
                                    whileHover={{scale: 1.1}}
                                >
                                    &times;
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
