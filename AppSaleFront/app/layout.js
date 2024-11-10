import {Inter} from "next/font/google";
import "./globals.css";
import {ChakraProvider} from "@chakra-ui/react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "HouseLy App",
    description: "Browse houses and properties available for sale or rent.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" title="houseLy App">
        <body className={inter.className}>
        <ChakraProvider>
            <Header/>
            {children}
            <Footer/>
        </ChakraProvider>
        </body>
        </html>
    );
}
