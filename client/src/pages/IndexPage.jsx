import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get("/places").then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="mt-8 grid gap-x-7 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 &&
                places.map((place) => (
                    <Link to={'/place/'+place._id}>
                        <div className="bg-gray-300  mb-3 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img
                                    className="rounded-2xl object-cover aspect-square"
                                    src={
                                        "http://localhost:4000/uploads/" +
                                        place.photos?.[0]
                                    }
                                />
                            )}
                        </div>
                        <h2 className="text-sm truncate font-bold">{place.title}</h2>
                        <h3 className=" truncate text-gray-600">{place.address}</h3>
                        <div className="mt-2">
                           <span className="font-bold">${place.price}</span> 
                        </div>
                    </Link>
                ))}
        </div>
    );
}
