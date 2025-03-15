import React from "react";

const LocationMap = ({ address }) => {
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=${encodeURIComponent(address)}`;

    return (
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Location</h2>
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                    src={googleMapsUrl}
                ></iframe>
            </div>
        </div>
    );
};

export default LocationMap;
