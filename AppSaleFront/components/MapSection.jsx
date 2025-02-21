import {Box, Checkbox, Input} from "@chakra-ui/react"

const MapSection = () => {
    return (
        <Box bg="white" p={6} rounded="md" shadow="md">
            <Input placeholder="Listing address e.g. New York, USA" mb={4}/>
            <Box w="full" h="300px" mb={4} bg="gray.200" rounded="md">
                {/* Placeholder for map */}
            </Box>
            <Checkbox mb={2}>Or Enter Coordinates (latitude and longitude) Manually</Checkbox>
            <Checkbox>Hide Map</Checkbox>
        </Box>
    )
}

export default MapSection
