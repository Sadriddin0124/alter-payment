  import { motion } from "framer-motion";
import { BiLogOut, BiUser } from "react-icons/bi";
import Logo from "@/public/images/logo.jpg"
import Image from "next/image";

export default function Header() {

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-[#4C5CA8] text-white shadow-md"
    >
      <div className="mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center"
        >
          <Image src={Logo} alt="logo" width={50} height={50} className="w-12 h-12 rounded-full" />
        </motion.div>


        {/* Profile + Logout */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3"
        >
          <motion.div className="w-10 h-10 rounded-full bg-white flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <BiUser className="text-[#4C5CA8]" size={24}/>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            className="hover:text-gray-200 transition cursor-pointer"
          >
            <BiLogOut size={20} />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
