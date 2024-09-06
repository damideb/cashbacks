import { BookingType } from "../data&Types/type";
import { motion } from "framer-motion";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

type Props = {
  bookings: BookingType[];
};

const animate = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1 },
  },
};

export default function CashbackHistory({ bookings }: Props) {
  const [startView, setStartView] = useState(0);
  const [endview, setEndview] = useState(10);
  const [displayedBookings, setDisplayedBookings] = useState<BookingType[]>([]);
  const [pageView, setPageView] = useState(1);
  const [error, setError] = useState(false);

  const tableRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const handleNextPage = () => {
    if (bookings.length > endview) {
      setStartView((prev) => prev + 10);
      setEndview((prev) => prev + 10);
      setPageView((prev) => prev + 1);
      tableRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (startView > 0) {
      setStartView((prev) => prev - 10);
      setEndview((prev) => prev - 10);
      setPageView((prev) => prev - 1);
      tableRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    const value = searchRef.current?.value;
    const filteredResult = bookings.filter(
      (bookings) =>
        bookings.bookingId === value ||
        bookings.serviceName.toLowerCase() === value?.toLowerCase()
    );
    if (filteredResult.length) {
      setDisplayedBookings(filteredResult);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setDisplayedBookings(bookings.slice(startView, endview));
  }, [startView, endview]);

  return (
    <motion.main
      className=" my-5 "
      variants={animate}
      initial="hidden"
      animate="visible"
    >
      <div className=" flex flex-col gap-1 items-end">
        <div className="  flex justify-end w-full sm:mr-10">
          <input
            className=" md:w-[30%] w-[70%] sm:w-[50%] outline-none px-5 py-2 border-blue border bg-secondary"
            placeholder="search by id or service name"
            type="search"
            ref={searchRef}
          />
          <button
            className=" border p-2 border-blue bg-blue text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {error && (
          <p className=" text-sm text-red-500 sm:mr-24">
            Search details not available....
          </p>
        )}
      </div>

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

      {displayedBookings.length > 9 && (
        <div className=" flex gap-5 p-3 w-fit mx-auto bg-white my-5 items-start justify-center rounded">
          <div>
            {pageView} of {Math.ceil(bookings.length / 10)}
          </div>
          <button
            className="bg-secondary p-2 text-blue"
            onClick={handlePrevPage}
          >
            <FaCaretLeft />
          </button>

          <button
            className="bg-secondary p-2 text-blue"
            onClick={handleNextPage}
          >
            <FaCaretRight />
          </button>
        </div>
      )}
    </motion.main>
  );
}
