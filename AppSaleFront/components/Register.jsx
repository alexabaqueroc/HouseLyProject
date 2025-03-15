"use client";
import {useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, VStack,RadioGroup,Radio,Select,} from "@chakra-ui/react";
import {motion} from "framer-motion";
import axios from "axios";
import {useRouter} from "next/navigation";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [propertyTransactionType, setPropertyType] = useState(""); // State for Sale/Rent selection
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8004/users", {
                userType,
                propertyType: propertyTransactionType,
                email,
                password,
            });
            setIsLoading(false);
            alert("Registered Successfully!");
            console.log("Registration response:", response.data);
            router.push("/login");
        } catch (error) {
            setIsLoading(false);
            console.error("Registration error:", error);
            alert("Registration Failed. Please try again.");
        }
    };

    return (
        <Flex
            minH="100vh"
            bgImage="url('https://source.unsplash.com/random/1600x900?nature')"
            bgSize="cover"
            bgPos="center"
            align="center"
            justify="center"
            position="relative"
        >
            {/* Overlay */}
            <Box position="absolute" top="0" left="0" w="100%" h="100%" bg="blackAlpha.600"/>

            <Box
                as={motion.div}
                position="relative"
                zIndex="1"
                bg="whiteAlpha.900"
                backdropFilter="blur(10px)"
                p={{base: 6, md: 10}}
                rounded="lg"
                shadow="2xl"
                maxW="md"
                w="full"
            >
                <Heading as="h2" size="lg" textAlign="center" mb={4} color="teal.600">
                    Create Account
                </Heading>
               
                <form onSubmit={handleRegister}>
                    <VStack spacing={4}>
                        <FormControl id="userType" isRequired>
                            <FormLabel>Are you owner?</FormLabel>
                            <RadioGroup
                                value={userType}
                                onChange={(value) => setUserType(value)}
                            >
                                <Radio value="seller">Yes</Radio>
                                <Radio value="buyer">No</Radio>
                            </RadioGroup>
                        </FormControl>
                        {/* Conditionally render the select list for Sale/Rent when Yes is selected */}
                        {userType === "seller" && (
                        <FormControl id="propertyTransactionType" isRequired>
                            <FormLabel>Property Type</FormLabel>
                            <Select
                            value={propertyTransactionType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            placeholder="Select Property Type"
                            >
                            <option value="Sale">Sale</option>
                            <option value="Rent">Rent</option>
                            </Select>
                        </FormControl>
                        )}
                        {/* Conditionally render the select list for Sale/Rent when Yes is selected */}
                        {userType === "buyer" && (
                        <FormControl id="propertyTransactionType" isRequired>
                            <FormLabel>Property Type</FormLabel>
                            <Select
                            value={propertyTransactionType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            placeholder="Select Property Type"
                            >
                            <option value="Buy">Buy</option>
                            <option value="Rent">Lessor</option>
                            </Select>
                        </FormControl>
                        )}
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" width="full" isLoading={isLoading}
                                spinner={<Spinner/>}>
                            Register
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default Register;
