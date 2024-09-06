import { useRef, useState } from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";
import { CiBank, CiDiscount1 } from "react-icons/ci";

type Props = {
  currentBalance: number | undefined;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const animate = {
  hidden: { x: "50vw", opacity: 0, transition: { duration: 0.5 } },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0, duration: 0.5 },
  },
};

export default function Cashout({ currentBalance, setCurrentBalance }: Props) {
  const [showInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('')
    const [error, setError] = useState(false);


  const inputRef = useRef<HTMLInputElement>(null);

  const handleWithdrawal = () => {
    const value = inputRef.current?.value 
    if (value && currentBalance) {
      const newBalance = currentBalance - parseInt(value);

      if (newBalance > 0 && parseInt(value) > 0) {
        setCurrentBalance(newBalance);
        setShowModal(true)
        setError(false)
        setModalContent(
          `you have successfully withdrawn ₦${value} cashback into your bank account`
        );
        inputRef.current.value = "";
      } 

      if(parseInt(value) < 0 ){
        setShowModal(true);
        setError(true);
         setModalContent("Invalid value");
      }
      if(newBalance<0){
         setShowModal(true);
         setError(true);
        setModalContent("Insufficient Cashback");
      }     
    }
  };

  const handlePromoConversion = () => {
    if (currentBalance && currentBalance > 0) {
      setCurrentBalance(0);
      setShowModal(true)
      setError(false);
        setModalContent(
          `Conratulations! You have successfully converted your ${currentBalance} cashbacks into Promo code for your future bookings`
        );
    } else {
       setShowModal(true);
       setError(true);
      setModalContent("Insufficient Cashback");
    }
  };

  return (
    <div className="   p-2 pb-5">
      <h3 className=" text-blue  font-sans mb-5 text-xl font-bold">
        Withdraw Cashbacks
      </h3>
      <AnimatePresence>
        {showInput && (
          <motion.div
            className=" my-5 md:flex "
            variants={animate}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <input
              type="number"
              inputMode="numeric"
              placeholder="Type amount here"
              className=" p-3 md:p-2 w-full md:w-auto px-5 outline-none  "
              ref={inputRef}
            />
            <button
              className=" w-full rounded p-2 md:w-auto bg-blue text-white"
              onClick={handleWithdrawal}
            >
              Withdraw
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="  flex gap-3  mt-8 w-full">
        <button
          className="flex justify-center gap-2 items-center w-[40%] md:w-1/3 min-w-fit border-2 rounded p-2 border-blue"
          onClick={() => setShowInput((prev) => !prev)}
        >
          <CiBank className="text-xl text-blue" /> Direct
        </button>
        <button
          className=" w-[40%] flex justify-center gap-2 items-center md:w-1/3 min-w-fit  border-2 p-2 rounded border-blue"
          onClick={handlePromoConversion}
        >
          <CiDiscount1 className="text-xl text-blue" />
          To promo code
        </button>
      </div>

      <Modal
        showModal={showModal}
        content={modalContent}
        setShowModal={setShowModal}
        error={error}
      />
    </div>
  );
}
