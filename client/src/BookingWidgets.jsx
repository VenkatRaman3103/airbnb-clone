import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate, redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState("");
    const [name, setName] = useState("");
    const [phone, setMobile] = useState("");
    const [redirect, setRedirect] = useState("");
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfDays = 0;

    if (checkIn && checkOut) {
        numberOfDays = differenceInCalendarDays(
            new Date(checkOut),
            new Date(checkIn)
        );
    }

    async function bookThisPlace() {
        const response = await axios.post("/bookings", {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            place: place._id,
            price: numberOfDays * place.price,
        });

        const bookingId = response.data._id;

        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <>
            <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-xl text-center">
                    Price: ${place.price}/per day
                </div>
                <div className="border rounded-xl mt-4">
                    <div className="flex">
                        <div className="py-3 px-4 ">
                            <label>Check in: </label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(event) =>
                                    setCheckIn(event.target.value)
                                }
                            />
                        </div>
                        <div className="py-3 px-4 border-l">
                            <label>Check Out</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(event) =>
                                    setCheckOut(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="py-3 px-4 border-t">
                        <label>Number of guests: </label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={(event) =>
                                setNumberOfGuests(event.target.value)
                            }
                        />
                    </div>

                    {numberOfDays > 0 && (
                        <div className="py-3 px-4 border-t">
                            <label>Name: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            <label>Phone number: </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(event) =>
                                    setMobile(event.target.value)
                                }
                            />
                        </div>
                    )}
                </div>
                <div className="bg-gray-200 text-center rounded-xl p-2 mt-4">
                    Book this place:{" "}
                    {numberOfDays > 0 && <span>{numberOfDays} days</span>}
                </div>
                <button className="primary mt-4" onClick={bookThisPlace}>
                    Book this place:{" "}
                    {numberOfDays > 0 && (
                        <span>{numberOfDays * Number(place.price)} days</span>
                    )}
                </button>
            </div>
        </>
    );
}
