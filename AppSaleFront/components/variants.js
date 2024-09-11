export const containerVariants = {
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

export const itemVariants = {
    show: {
        opacity: 1,
        x: 0,
        transition: {type: "spring", duration: 0.3, stiffness: 500, damping: 18}
    },
    hidden: {opacity: 0, x: 120, transition: {duration: 0.2}}
};
