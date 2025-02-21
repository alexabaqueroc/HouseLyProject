import {Box, Button} from "@chakra-ui/react"
import {CheckIcon} from "@chakra-ui/icons"

const FinishSection = () => {
    return (
        <Box bg="white" p={6} rounded="md" shadow="md" textAlign="center">
            <CheckIcon w={10} h={10} color="green.500" mb={4}/>
            <p>You are about to publish!</p>
            <Button mt={4} colorScheme="teal">
                Save & Preview
            </Button>
        </Box>
    )
}

export default FinishSection
