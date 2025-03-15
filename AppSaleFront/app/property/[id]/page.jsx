"use client"
/*
    importando dos funciones de React: useState se usa para manejar el estado dentro 
    del componente,  y useEffect se usa para realizar efectos secundarios,
    como realizar una solicitud de datos.
*/ 	
import {useEffect, useState} from "react"
import axios from "axios"
import LocationMap from "@/components/LocationMap";

/*
    Esta es una función que obtiene información de una propiedad a través de 
    una solicitud HTTP GET usando axios. La función es asincrónica,
    lo que significa que no bloquea el resto del código mientras espera la respuesta de la API.
    La URL es concatenada con el id que se pasa a la función para obtener 
    datos específicos de esa propiedad.
    Cuando se recibe la respuesta, se devuelve la propiedad (response.data).
*/
async function GetProperty(id) {
    const response = await axios.get('http://127.0.0.1:8004/properties/' + id)
    return response.data
}

/*
    Este es el componente principal. Recibe params como propiedad,
    que contiene parámetros de la URL (como el id de la propiedad).
    id = params.id: Extrae el id de los parámetros de la URL.
    useState(''): Inicializa un estado llamado property,
    que se usará para almacenar la información de la propiedad que se obtiene de la API.
*/
export default function Main({params}) {
    const id = params.id
    const [property, setProperty] = useState('')

    /*Aquí estamos utilizando useEffect para ejecutar una función cuando el componente se monta por primera vez (por eso el arreglo vacío [] como segundo argumento, lo que indica que solo se ejecutará una vez).
        Dentro de useEffect, se llama a GetProperty(id) para obtener la propiedad utilizando el id.
        Si la solicitud es exitosa, se actualiza el estado de property con los datos obtenidos (setProperty(propertyItem)).
        Si ocurre un error, se captura y se imprime en la consola. 
    */
    useEffect(() => {
        GetProperty(id)
            .then(propertyItem => setProperty(propertyItem))
            .catch(e => console.log('error', e.message))
    }, [])

    /*if (!property) {
        return <p className="text-white">Loading...</p>; // Evita el error de hidratación
    }*/

    if (!property) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="relative">
              {/* Spinner animado */}
              <div className="loader"></div>
              {/* Texto "Loading..." dentro del círculo */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                Loading...
              </div>
            </div>
            </div>
        );
    }
    
    return (
        /*
            Este es el contenedor principal que contiene toda la estructura visual del
            componente. Se usan clases de Tailwind CSS para aplicar estilos, como el contenedor con márgenes automáticos (mx-auto), padding (p-6), y un color de fondo personalizado (bg-customColor).
        */
        <div className="container mx-auto p-6 max-w-6xl bg-customColor text-white">

            {/* Nombre  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <p className="leading-relaxed">
                    <h4 className="text-2xl font-semibold mb-4 text-white"> {property.typeResidencial ? `${property.typeResidencial} - En Venta` : "Nombre no disponible"}</h4>
                </p>
            </div>
            <div>
                <p>
                    <h4 className="jsx-3405404036 body body-bold medium">Ubicacion Principal</h4>
                </p>
            </div>
            <div>
                <p>{property.city}</p>
            </div>
            {/* Image Section */}
            {/*Aquí se muestra una rejilla de dos columnas para las imágenes. La primera imagen se carga desde el estado property.image, 
               que contiene la URL de la imagen de la propiedad.*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img className="w-full rounded-lg object-cover h-96" src={property.image} alt={property.name}/>
                <img className="w-full rounded-lg object-cover h-96"
                     src="https://d15jm47acbjce0.cloudfront.net/s838x629_1460288774205.jpg" alt="Additional view"/>
            </div>
            
            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    {/* Rooms */}
                    <div className="flex items-center space-x-1">
                        <span>{property.room} Habs.</span>
                    </div>
                    {/* Baños */}
                    <div className="flex items-center space-x-1">
                        <span>{property.bath} Baños</span>
                    </div>
                    {/* Área Construida */}
                    <div className="flex items-center space-x-1">
                        <span>{property.BuildArea} m²</span>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <h4 className="text-2xl font-semibold mb-4 text-white">Precio de Venta</h4>
                    <p className="leading-relaxed text-lg text-gray-300">
                        {property.priceSale && property.priceSale.length > 0
                        ? `Desde $${Math.min(...property.priceSale.map(price => price.priceList?.[0]?.amount || 0)).toLocaleString()} 
                        hasta $${Math.max(...property.priceSale.map(price => price.priceList?.[0]?.amount || 0)).toLocaleString()}`
                        : "Precio no disponible"}
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
                <div className="md:col-span-2"> 
                    <br />
                </div> 
            </div>               
            {/* Description and Form Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About This Property Section */}
                <div className="md:col-span-2">
                    <h4 className="text-2xl font-semibold mb-4 text-white">About This Property</h4>
                    <p className="leading-relaxed">
                        {property.description || "No description available."}
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
                        <input
                            type="phone"
                            placeholder="Phone"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type=""
                            placeholder="Negotiable Sale Price"
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
            {/* Property Overview */}
             <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Property Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features?.map((feature, index) => (
                        <p key={index} className="flex items-center">✅ {feature}</p>
                    )) || "No features available."}
                </div>
            </div>
            {/* Features & Amenities */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities?.map((amenity, index) => (
                        <p key={index} className="flex items-center">✅ {amenity}</p>
                    )) || "No amenities available."}
                </div>
            </div>

            {/* Location */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4"></h2>
                <LocationMap address={property.address} />
            </div>
        </div>
    )
}
