import Cashout from "./Cashout";
import { motion } from "framer-motion";
import { GiMoneyStack } from "react-icons/gi";
import { MdAccountBalanceWallet } from "react-icons/md";

type Props = {
  currentBalance: number | undefined;
  totalCashbacks: number | undefined;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const animate = {
  hidden: { x: "-100vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.6, duration:0.9 },
  },
};
export default function Earnings({currentBalance, totalCashbacks, setCurrentBalance}: Props) {


  return (
    <motion.section
      className=" flex md:flex-row justify-center items-center flex-col gap-5 md:justify-between  mt-10   mb-20 md:items-start"
      variants={animate}
      initial="hidden"
      animate="visible"
    >
      <section className=" flex flex-col sm:flex-row gap-2 ">
        <div className=" bg-blue w-[250px] gap-2 h-[200px]  text-white font-sans rounded shadow-lg drop-shadow-md grid place-content-center">
          <h3 className="  text-xl  ">Total Cashbacks:</h3>
          <div className="  text-secondary grid place-content-center">
            <GiMoneyStack className=" text-2xl" />
          </div>
          <p className=" text-2xl font-bold text-center">
            ₦ {totalCashbacks?.toLocaleString()}
          </p>
        </div>
        <div className=" bg-blue w-[250px] gap-2 h-[200px] text-white font-sans rounded shadow-lg drop-shadow-md grid place-content-center">
          <h3 className="  text-xl">Current Balance:</h3>
          <div className="  text-secondary grid place-content-center">
            <MdAccountBalanceWallet className=" text-2xl" />
          </div>
          <p className=" text-2xl font-bold text-center">
            ₦ {currentBalance?.toLocaleString()}
          </p>
        </div>
      </section>

      <section className=" md:w-[40%]">
        <Cashout
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
        />
      </section>
    </motion.section>
  );
}
