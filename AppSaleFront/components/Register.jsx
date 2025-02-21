"use client";
import {useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, VStack} from "@chakra-ui/react";
import {motion} from "framer-motion";
import axios from "axios";
import {useRouter} from "next/navigation";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8004/users", {
                username,
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
                <Text textAlign="center" mb={6} color="gray.600">
                    Join our community
                </Text>
                <form onSubmit={handleRegister}>
                    <VStack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>
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
