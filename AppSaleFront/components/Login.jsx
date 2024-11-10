"use client"
import {useState} from 'react'
import {Box, Button, Spinner} from '@chakra-ui/react'
import {motion} from 'framer-motion'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            alert('Login Successful!')
        }, 2000)
    }

    return (
        <Box as={motion.div}
             initial={{opacity: 0, y: -20}}
             animate={{opacity: 1, y: 0}}
             transition={{duration: 0.5}}
             className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50"
        >
            <Box className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <Button
                        type="submit"
                        colorScheme="teal"
                        isFullWidth
                        className="mt-4"
                        isLoading={isLoading}
                        spinner={<Spinner/>}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    )
}

export default Login
