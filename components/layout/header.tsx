import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BiLogOut, BiUser } from "react-icons/bi";

const navItems = [
  { label: "Asosiy", href: "/" },
  { label: "Talabalar", href: "/edu-years" },
//   { label: "O‘quv yillari", href: "/yillar" },
];

export default function Header() {
  const pathname = usePathname();

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
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#4C5CA8] font-bold">◎</span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex gap-6">
          {navItems.map((item, idx) => {
            const isActive = pathname === "/" ? pathname === item?.href : pathname.startsWith(item?.href) && item?.href !== "/";
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      isActive
                        ? "bg-[#5B72B5] font-medium"
                        : "hover:bg-[#5B72B5]/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </nav>

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
