import {Box, Button, Checkbox, Input, VStack} from "@chakra-ui/react"

const ContactInformation = () => {
    return (
        <Box bg="white" p={6} rounded="md" shadow="md">
            <Checkbox mb={4}>Hide contact owner form for single listing page</Checkbox>
            <VStack spacing={4}>
                <Input placeholder="Zip/Post Code"/>
                <Input placeholder="Phone"/>
                <Input placeholder="Phone 2"/>
                <Input placeholder="Fax"/>
                <Input placeholder="Email"/>
                <Input placeholder="Website"/>
                <Box w="full">
                    <label>Social Info:</label>
                    <Button mt={2} w="full" colorScheme="teal">
                        + Add Social
                    </Button>
                </Box>
            </VStack>
        </Box>
    )
}

export default ContactInformation
