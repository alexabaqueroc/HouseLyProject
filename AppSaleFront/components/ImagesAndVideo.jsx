import {Box, Button, Input, VStack} from "@chakra-ui/react"

const ImagesAndVideo = () => {
    return (
        <Box bg="white" p={6} rounded="md" shadow="md">
            <VStack spacing={4}>
                <Box w="full" h="150px" bg="gray.200" rounded="md" textAlign="center" p={4}>
                    <Button colorScheme="teal" size="sm">Select Files</Button>
                    <p>or drag and drop image here</p>
                    <p>Max file size: 20MB | Max files: 13</p>
                </Box>
                <Input placeholder="Video (Only YouTube & Vimeo URLs)"/>
            </VStack>
        </Box>
    )
}

export default ImagesAndVideo
