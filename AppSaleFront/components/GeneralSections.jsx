import {Box, Divider, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, Textarea} from "@chakra-ui/react"

const GeneralSection = () => {
    return (
        <Box className="space-y-8">
            {/* Title Input */}
            <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input placeholder="Enter the property title"/>
            </FormControl>

            {/* Description Textarea */}
            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="Write a description for the property"/>
            </FormControl>

            <Divider/>

            {/* Pricing Options */}
            <FormControl as="fieldset">
                <FormLabel as="legend">Pricing</FormLabel>
                <RadioGroup defaultValue="price">
                    <Stack spacing={4} direction="row">
                        <Radio value="price">Price [USD]</Radio>
                        <Radio value="range">Price Range</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            {/* Price Input */}
            <FormControl>
                <FormLabel>Price of this listing (e.g., 100)</FormLabel>
                <Input placeholder="Enter the price"/>
            </FormControl>

            <Divider/>

            {/* Location Input */}
            <FormControl>
                <FormLabel>Location</FormLabel>
                <Input placeholder="Enter the location"/>
            </FormControl>
        </Box>
    )
}

export default GeneralSection
