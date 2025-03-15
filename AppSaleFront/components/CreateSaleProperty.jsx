"use client"

import {Box, Button, Flex, Icon, VStack} from "@chakra-ui/react"
import {motion} from "framer-motion"
import {useEffect, useState} from "react"
import {FiCheckCircle} from "react-icons/fi"
import GeneralSection from "@/components/GeneralSections";
import ContactInformation from "@/components/ContactInformation";
import MapSection from "@/components/MapSection";
import ImagesAndVideo from "@/components/ImagesAndVideo";
import PropertyOverview from "@/components/PropertyOverview";
import FinishSection from "@/components/FinishComponent";

const tabs = [
    {label: "General Section", id: "general"},
    {label: "Contact Information", id: "contact"},
    {label: "Map", id: "map"},
    {label: "Images & Video", id: "media"},
    {label: "Property Overview", id: "overview"},
    {label: "Finish", id: "finish"},
]

const sections = {
    general: <GeneralSection/>,
    contact: <ContactInformation/>,
    map: <MapSection/>,
    media: <ImagesAndVideo/>,
    overview: <PropertyOverview/>,
    finish: <FinishSection/>,
}
const VerticalTabs = () => {
    const [activeTab, setActiveTab] = useState("general")

    const tabVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0},
    }
    useEffect(() => {
        // Change the body background color
        document.body.style.backgroundColor = "#1b1f29"

        // Cleanup function to reset the background color when navigating away
        return () => {
            document.body.style.backgroundColor = ""
        }
    }, [])

    return (
        <Flex className="h-screen bg-gray-800 p-4">
            {/* Sidebar */}
            <VStack
                className="w-1/4 bg-white shadow-lg h-full p-4"
                align="start"
                spacing={4}
            >
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant="ghost"
                        isFullWidth
                        onClick={() => setActiveTab(tab.id)}
                        leftIcon={<Icon as={FiCheckCircle}/>}
                        className={`py-4 font-semibold ${
                            activeTab === tab.id ? "text-green-500 border-l-4 border-green-500" : "text-gray-700"
                        }`}
                    >
                        {tab.label}
                    </Button>
                ))}
            </VStack>

            {/* Content Section */}
            <Box className="flex-1 bg-gray-50 p-8">
                <motion.div
                    key={activeTab}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={tabVariants}
                    transition={{duration: 0.5}}
                    className="p-4 bg-white shadow-md rounded-lg"
                >
                    {sections[activeTab]}
                </motion.div>
            </Box>
        </Flex>
    )
}

export default VerticalTabs
