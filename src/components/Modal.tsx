import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

type Props = {
  showModal: boolean;
  content: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
};
const Modal = ({ showModal, content, setShowModal, error }: Props) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="bg-white max-w-[400px] mx-auto p-10 rounded-lg text-center" variants={modal}>
            <p className={`${error ? "text-[#FF0000]" : "text-black"}`}>
              {content}
            </p>
            <button
              className={`${
                error ? "bg-[#FF0000]" : "bg-blue"
              } px-10 text-white py-3 mt-3 rounded-lg`}
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
