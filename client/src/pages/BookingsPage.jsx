import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import {differenceInCalendarDays, format} from "date-fns";
import {Link} from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings,setBookings] = useState([]);
  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-100 m-4 p-5 rounded-2xl overflow-hidden">
            <div className="py-3 w-60">
              <PlaceImg place={booking.place} className='rounded-lg '/>
            </div>
            <div className=" pr-3 grow">
              <h2 className="text-xl mx-4">{booking.place.title}</h2>
              <div className="text-lg mx-4">
                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
                <div className="flex gap-2 relative">
                  <div className="bg-primary text-white text-xl mt-4 border rounded-xl p-2 absolute top-10 right-0">
                    Total price: ${booking.price}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}