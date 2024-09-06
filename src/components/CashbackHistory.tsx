import { BookingType } from "../data&Types/type";
import { motion } from "framer-motion";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";


type Props = {
  bookings: BookingType[];
  // displayedBookings: BookingType[];
};

const animate = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1 },
  },
};

export default function CashbackHistory({ bookings }: Props) {
  
  const[startView, setStartView] = useState(0)
   const [endview, setEndview] = useState(10);
    const [displayedBookings, setDisplayedBookings] = useState <BookingType[]>();
    const [pageView, setPageView] = useState(1)

    const tableRef = useRef<HTMLDivElement | null>(null)

   const handleNextPage = ()=>{
    if(bookings.length >endview){
      setStartView((prev) => prev + 10);
      setEndview((prev) => prev + 10);
      setPageView(prev=>prev+1)
      tableRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
    
   }

     const handlePrevPage = () => {
      if(startView>0){
        setStartView((prev) => prev - 10);
        setEndview((prev) => prev - 10);
         setPageView((prev) => prev - 1);
        tableRef?.current?.scrollIntoView({behavior:'smooth'})
      }
       
     };

     useEffect(()=>{
      setDisplayedBookings(bookings.slice(startView, endview))
     }, [startView, endview])

  return (
    <motion.main
      className=" my-5 "
      variants={animate}
      initial="hidden"
      animate="visible"
    >
      <section className="overflow-x-auto" ref={tableRef}>
        <table className="mt-3 bg-white w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Booking ID</th>
              <th>Services</th>
              <th>Booking Amount</th>
              <th>Cashback Earned</th>
            </tr>
          </thead>
          <tbody>
            {displayedBookings?.map((booking) => (
              <tr key={booking.bookingId}>
                <td>{booking.Date}</td>
                <td>{booking.bookingId}</td>
                <td>{booking.serviceName}</td>
                <td>₦{booking.bookingAmount.toLocaleString()}</td>
                <td>₦{booking.bookingAmount * 0.05}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className=" flex gap-5 p-3 w-[15%] mx-auto bg-white my-5 items-start justify-center rounded">
        <div>{pageView} of {bookings.length/10}</div>
        <button className="bg-secondary p-2 text-blue" onClick={handlePrevPage}>
          <FaCaretLeft />
        </button>
      
        <button className="bg-secondary p-2 text-blue" onClick={handleNextPage}>
          <FaCaretRight />
        </button>
      </div>
    </motion.main>
  );
}
