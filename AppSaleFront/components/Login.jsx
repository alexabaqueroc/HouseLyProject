"use client";
import {useState} from "react";
import {Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, VStack} from "@chakra-ui/react";
import {motion} from "framer-motion";
import axios from "axios";
import {useRouter} from "next/navigation";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8004/users/login", {
                email,
                password,
            });
            setIsLoading(false);
            const token = response.data.token;
            localStorage.setItem("jwtToken", token);
            alert("Login Successful!");
            console.log("Login response:", response.data);
            router.push("/dashboard");
        } catch (error) {
            setIsLoading(false);
            console.error("Login error:", error);
            alert("Login Failed. Please check your credentials.");
        }
    };

    return (
        <Flex
            minH="100vh"
            bgImage="url('https://source.unsplash.com/random/1600x900?city,night')"
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
                    Welcome Back!
                </Heading>
                <Text textAlign="center" mb={6} color="gray.600">
                    Login to your account
                </Text>
                <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
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
                            Login
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;
