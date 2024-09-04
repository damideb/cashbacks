import Cashout from "./Cashout";
import { motion } from "framer-motion";

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
      className=" flex justify-between  mt-10   mb-20 items-start"
      variants={animate}
      initial="hidden"
      animate="visible"
    >
      <section className=" flex gap-2 ">
        <div className=" bg-blue w-[250px] h-[200px]  text-white font-sans rounded shadow-lg drop-shadow-md grid place-content-center">
          <h3 className="  text-2xl font-bold py-4">Total Cashbacks:</h3>
          <p className=" text-xl text-center">
            ₦ {totalCashbacks?.toLocaleString()}
          </p>
        </div>
        <div className=" bg-blue w-[250px] h-[200px] text-white font-sans rounded shadow-lg drop-shadow-md grid place-content-center">
          <h3 className="  text-2xl font-bold py-4">Current Balance:</h3>
          <p className=" text-xl text-center">
            ₦ {currentBalance?.toLocaleString()}
          </p>
        </div>
      </section>

      <section className=" w-[40%]">
        <Cashout
          currentBalance={currentBalance}
          setCurrentBalance={setCurrentBalance}
        />
      </section>
    </motion.section>
  );
}
