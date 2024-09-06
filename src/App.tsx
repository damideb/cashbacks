import Earnings from "./components/Earnings"
import CashbackHistory from "./components/CashbackHistory"
import {bookingDetails} from './data&Types/data'
import { BookingType } from "./data&Types/type"
import { useState, useEffect } from "react"
import {  motion } from "framer-motion";



const heading = {
  hidden: { y: "-20vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0, duration:0.6},
  },
};
function App() {

  const [bookings]= useState<BookingType[]>(bookingDetails)
 
  const [totalCashbacks, setTotalCashbacks] = useState<number>();
  const[currentBalance, setCurrentBalance] = useState<number>()

  useEffect(()=>{
      const calculateTotalCashbacks = () => {
        let total = 0;
        bookings.forEach((booking) => {
          total += booking.bookingAmount * 0.05;
        });
        setTotalCashbacks(total);
        setCurrentBalance(total);
      };

      calculateTotalCashbacks()
  },[bookings])



  return (
    <main className=" bg-secondary w-[95%] mx-auto m-5 rounded-lg p-5 font-serif">
      <motion.div variants={heading} initial="hidden" animate='visible'>
        <h1 className="  text-3xl  text-center p-2 font-bold font-sans">
          REWARD SUMMARY
        </h1>
      </motion.div>

      <Earnings
        totalCashbacks={totalCashbacks}
        currentBalance={currentBalance}
        setCurrentBalance={setCurrentBalance}
      />
      <CashbackHistory bookings={bookings}  />
    </main>
  );
}

export default App
