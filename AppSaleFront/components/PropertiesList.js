"use client"

import {motion} from "framer-motion"
import {useRouter} from "next/navigation"
import styles from "../app/page.module.css"
import {useState} from "react"
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons"

export default function PropertiesList({properties}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState({})
    const router = useRouter()

    const goToPage = (id) => router.push(`/property/${id}`)

    const handlePrevImage = (id, images) => {
        setSelectedImageIndex((prev) => ({
            ...prev,
            [id]: prev[id] > 0 ? prev[id] - 1 : images.length - 1
        }))
    }

    const handleNextImage = (id, images) => {
        setSelectedImageIndex((prev) => ({
            ...prev,
            [id]: prev[id] < images.length - 1 ? prev[id] + 1 : 0
        }))
    }

    return (
        <section className={styles.properties}>
            {properties.map((property) => {
                const images = property.images || [property.image]
                const currentImageIndex = selectedImageIndex[property._id] || 0

                return (
                    <motion.div
                        key={property._id}
                        className={styles.card}
                        whileHover={{scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)"}}
                    >
                        <div className={styles.imageWrapper}>
                            <img
                                src={images[currentImageIndex]}
                                alt={property.name}
                                className={styles.propertyImage}
                            />
                            <button
                                className={styles.chevronLeft}
                                onClick={() => handlePrevImage(property._id, images)}
                            >
                                <ChevronLeftIcon boxSize={8}/>
                            </button>
                            <button
                                className={styles.chevronRight}
                                onClick={() => handleNextImage(property._id, images)}
                            >
                                <ChevronRightIcon boxSize={8}/>
                            </button>
                        </div>
                        <div className={styles.propertyDetails}>
                            <h5 className={styles.propertyName}>{property.name}</h5>
                            <p className={styles.propertyInfo}>
                                Price: ${property.minPrice} - ${property.maxPrice} <br/>
                                {property.rooms} rooms - {property.bathrooms} bathrooms - {property.size} m² <br/>
                                Location: {property.city}
                            </p>
                            <button
                                className={styles.detailButton}
                                onClick={() => goToPage(property._id)}
                            >
                                Details
                            </button>
                        </div>
                    </motion.div>
                )
            })}
        </section>
    )
}
