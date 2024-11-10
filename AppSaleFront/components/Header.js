"use client"

import {Box, Button, Flex, Link} from '@chakra-ui/react'
import {useRouter} from 'next/navigation'

export function Header() {
    const router = useRouter()

    const handleRegisterClick = () => {
        router.push('/register')
    }

    const handleLoginClick = () => {
        router.push('/login')
    }

    return (
        <Box as="header" className="w-full" bg="gray.800" color="white" py={4} px={8} shadow="md">
            <Flex justify="space-between" align="center">
                <Link href="/" fontSize="lg" fontWeight="bold">
                    Housely
                </Link>
                <Flex gap={4}>
                    <Link href="/about" _hover={{color: 'gray.400'}}>
                        About
                    </Link>
                    <Link href="/services" _hover={{color: 'gray.400'}}>
                        Services
                    </Link>
                    <Button colorScheme="teal" size="sm" onClick={handleRegisterClick}>
                        Register
                    </Button>
                    <Button colorScheme="teal" size="sm" onClick={handleLoginClick}>
                        Login
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
}
