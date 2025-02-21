import {Box, Checkbox, Textarea} from "@chakra-ui/react"

const PropertyOverview = () => {
    return (
        <Box bg="white" p={6} rounded="md" shadow="md">
            <Textarea placeholder="Write all the features here: ID, type, Room, Bedroom" mb={4}/>
            <Checkbox>I agree to the Privacy Policy and Terms of Service</Checkbox>
        </Box>
    )
}

export default PropertyOverview
