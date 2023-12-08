import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import PerksLabes from "../perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhoto, setAddedPhoto] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/places/" + id).then((response) => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhoto(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    function inputHeadr(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }

    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeadr(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(event) {
        event.preventDefault();

        const placeData = {
            title,
            address,
            addedPhoto,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        if (id) {
            await axios.put("/places", {
                id,
                ...placeData,
            });
            setRedirect(true);
        } else {
            await axios.post("/places", placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput("Titls", "Should be short")}
                <input
                    type="text"
                    placeholder="title: My appartment"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />
                {preInput("Address", "Address of your place")}
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => {
                        setAddress(event.target.value);
                    }}
                />
                {preInput("Photos", "Upload your photos here")}
                <PhotosUploader
                    addedPhoto={addedPhoto}
                    onChange={setAddedPhoto}
                />
                {/*  */}
                {preInput("Descripiton", " decription of your place")}
                <textarea
                    className=""
                    value={description}
                    onChange={(event) => {
                        setDescription(event.target.value);
                    }}
                />
                {preInput("Perks", "  Select the perks")}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
                    <PerksLabes selected={perks} onChange={setPerks} />
                </div>
                {preInput("Extra Info", "house rules")}
                <textarea
                    value={extraInfo}
                    onChange={(event) => {
                        setExtraInfo(event.target.value);
                    }}
                />
                {preInput(
                    "Check In and Check Out",
                    "Add checkIn and checkOut time"
                )}
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                    <div>
                        <h3
                            className="mt-2 -mg-1 "
                            value={checkIn}
                            onChange={(event) => {
                                setCheckIn(event.target.value);
                            }}
                        >
                            Check in time
                        </h3>
                        <input type="text"></input>
                    </div>
                    <div>
                        <h3
                            className="mt-2 -mg-1 "
                            value={checkOut}
                            onChange={(event) => {
                                setCheckOut(event.target.value);
                            }}
                        >
                            Check Out time
                        </h3>
                        <input type="text"></input>
                    </div>
                    <div>
                        <h3
                            className="mt-2 -mg-1 "
                            value={maxGuests}
                            onChange={(event) => {
                                setMaxGuests(event.target.value);
                            }}
                        >
                            Max guest
                        </h3>
                        <input type="number" placeholder="5"></input>
                    </div>
                    <div>
                        <h3
                            className="mt-2 -mg-1 "
                           
                        >
                            Price   
                        </h3>
                        <input
                            className='mt-2 -mg-1 '
                            type="number"
                            placeholder="$"
                            value={price}
                            onChange={(event) => {
                                setPrice(event.target.value);
                            }}
                        ></input>
                    </div>
                </div>

                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}
