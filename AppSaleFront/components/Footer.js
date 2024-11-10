"use client"
import {Box, Flex, Icon, Link, Text} from '@chakra-ui/react'
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

export function Footer() {
    return (
        <Box as="footer" className="w-full" bg="gray.800" color="white" py={6} px={8} mt={10}>
            <Flex justify="space-between" align="center" wrap="wrap">
                <Text fontSize="sm">© 2024 MyBrand. All rights reserved.</Text>
                <Flex gap={4}>
                    <Link href="/privacy-policy" _hover={{color: 'gray.400'}}>
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" _hover={{color: 'gray.400'}}>
                        Terms of Service
                    </Link>
                </Flex>
                <Flex gap={4}>
                    <Link href="https://facebook.com" isExternal>
                        <Icon as={FaFacebook} boxSize={5}/>
                    </Link>
                    <Link href="https://twitter.com" isExternal>
                        <Icon as={FaTwitter} boxSize={5}/>
                    </Link>
                    <Link href="https://instagram.com" isExternal>
                        <Icon as={FaInstagram} boxSize={5}/>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}
