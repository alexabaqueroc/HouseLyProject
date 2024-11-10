"use client"

import {useEffect, useState} from "react"
import axios from "axios"

async function GetProperty(id) {
    const response = await axios.get('http://127.0.0.1:8004/properties/' + id)
    return response.data
}

export default function Main({params}) {
    const id = params.id
    const [property, setProperty] = useState('')

    useEffect(() => {
        GetProperty(id)
            .then(propertyItem => setProperty(propertyItem))
            .catch(e => console.log('error', e.message))
    }, [])

    return (
        <div className="container mx-auto p-6 max-w-6xl bg-customColor text-white">
            {/* Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img className="w-full rounded-lg object-cover h-96" src={property.image} alt={property.name}/>
                <img className="w-full rounded-lg object-cover h-96"
                     src="https://d15jm47acbjce0.cloudfront.net/s838x629_1460288774205.jpg" alt="Additional view"/>
            </div>

            {/* Description and Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About This Property Section */}
                <div className="md:col-span-2">
                    <h4 className="text-2xl font-semibold mb-4 text-gray-800">About This Property</h4>
                    <p className="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores aspernatur aut beatae
                        dicta dolor doloremque dolorum earum impedit, in laborum molestiae molestias nobis odio pariatur
                        quasi sapiente sed tempore.
                    </p>
                    <p className="leading-relaxed mt-4">
                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
                        ut aliquid ex ea commodi consequatur?
                    </p>
                </div>

                {/* Contact Form Section */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact the Listing Owner</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Message..."
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
