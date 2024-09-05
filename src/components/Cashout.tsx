import { useRef, useState } from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "framer-motion";

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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleWithdrawal = () => {
    const value = inputRef.current?.value 
    if (value && currentBalance) {
      const newBalance = currentBalance - parseInt(value);

      if (newBalance > 0 && parseInt(value) > 0) {
        setCurrentBalance(newBalance);
        setShowModal(true)
        setModalContent(
          `you have successfully withdrawn ₦${value} cashback into your bank account`
        );
        inputRef.current.value = "";
      } 

      if(parseInt(value) < 0){
         alert("Invalid value");
      }
      if(newBalance<0){
        alert("Insufficient Cashback");
      }     
    }
  };

  const handlePromoConversion = () => {
    if (currentBalance && currentBalance > 0) {
      setCurrentBalance(0);
      setShowModal(true)
        setModalContent(
          `Conratulations! You have successfully converted your ${currentBalance} cashbacks into Promo code for your future bookings`
        );
    } else {
      alert("Insufficient Cashback");
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
            className=" my-5"
            variants={animate}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <input
              type="number"
              placeholder="Type amount here"
              className=" p-2 px-5 outline-none"
              ref={inputRef}
            />
            <button
              className=" rounded p-2 bg-blue text-white"
              onClick={handleWithdrawal}
            >
              Withdraw
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className=" space-x-5  mt-8 w-full">
        <button
          className=" w-1/3 border-2 rounded p-2 border-blue"
          onClick={() => setShowInput((prev) => !prev)}
        >
          Direct
        </button>
        <button
          className=" w-1/3 border-2 p-2 rounded border-blue"
          onClick={handlePromoConversion}
        >
          To promo code
        </button>
      </div>

      <Modal
        showModal={showModal}
        content={modalContent}
        setShowModal={setShowModal}
      />
    </div>
  );
}
