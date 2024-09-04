import { BookingType } from "../data&Types/type";
import { motion } from "framer-motion";

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

export default function CashbackHistory({bookings}:Props) {
  return (
    <motion.main
      className=" my-5"
      variants={animate}
      initial="hidden"
      animate="visible"
    >
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
          {bookings.map((booking) => (
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
    </motion.main>
  );
}
