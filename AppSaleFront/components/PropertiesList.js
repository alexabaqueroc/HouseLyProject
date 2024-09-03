// components/PropertiesList.js
"use client"

import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import styles from "../app/page.module.css";
import {Icon, Tag} from "@chakra-ui/react";
import {BsCurrencyDollar, BsTagFill} from "react-icons/bs";

const variants = {
    show: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0,
            when: "beforeChildren",
            duration: 0.1,
            staggerChildren: 0.15, // Stagger children animations
            delayChildren: 0.35, // Delay before starting to stagger
        }
    },
    hidden: {
        x: 20,
        opacity: 0,
        transition: {
            type: "spring",
            bounce: 0,
            duration: 0.2
        }
    }
}

const itemVariants = {
    show: {
        opacity: 1,
        x: 0,
        transition: {type: "spring", duration: 0.3, stiffness: 500, damping: 18}
    },
    hidden: {opacity: 0, x: 120, transition: {duration: 0.2}}
};

export default function PropertiesList({properties}) {
    const router = useRouter();

    const handleCardClick = (id) => {
        router.push(`/property/${id}`);
    };

    return (
        <>
            <motion.section
                className={styles.properties}
                variants={variants}
                whileInView="show" // Trigger animation when in view
                viewport={{once: true, amount: 0.7}} // Trigger when 20% of the section is in view
                initial="hidden"
                animate="show"
            >

                {properties.map(property => (
                    <motion.div
                        onClick={() => handleCardClick(property._id)}
                        className={styles.card}
                        style={{backgroundImage: `url(${property.image})`}}
                        variants={itemVariants}
                    >
                        <div className={styles.information}>
                            <h5>{property.name}</h5>
                            <p>{property.description}</p>
                            <div className={styles.price}>
                                <div>
                                    <p className={styles["price-label"]}>Min Price:</p>
                                    <Tag variant='solid' colorScheme='green'><p
                                        className={`${styles["price-value"]} ${styles["min-price"]}`}>
                                        <Icon as={BsCurrencyDollar}/>
                                        {property.minPrice} </p></Tag>
                                </div>
                                <div>
                                    <p className={styles["price-label"]}>Max Price:</p>
                                    <Tag variant='solid' colorScheme='cyan'>
                                        <p className={`${styles["price-value"]} ${styles["max-price"]}`}>
                                            <Icon as={BsCurrencyDollar}/>
                                            {property.maxPrice}</p></Tag>
                                </div>
                            </div>

                            <div className={styles.locationMain}>
                                <div className={styles.location}>
                                    <p>{property.city}</p>
                                    <p className={styles.address}>{property.address}</p>
                                </div>
                                <p className={styles.offerIcon}>{property.offer ? <Icon as={BsTagFill}/> : null}</p>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </motion.section>
        </>
    );
}
