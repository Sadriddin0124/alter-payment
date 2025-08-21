import React, { useEffect, useCallback, CSSProperties, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@mui/material";

const Modal = ({
  open,
  setOpen,
  children,
  styles,
  blur,
  dontClose,
  title,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: ReactNode;
  styles?: CSSProperties;
  blur?: boolean;
  dontClose?: boolean;
  title?: string;
}) => {
  // Close modal on Escape key press
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`${
              blur && "backdrop-blur-sm"
            } fixed -top-4 left-0 w-screen h-[120vh] bg-[#000000a7] bg-opacity-50  px-3`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              zIndex: 102,
            }}
          />
          {/* Modal Content */}
          <div
            className="fixed z-[103] top-0 left-0 !mt-0 w-full h-screen flex justify-center items-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={styles}
              className="absolute w-full p-6 bg-white rounded-xl shadow-lg z-[104]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {dontClose || (
                <div className=" flex w-full justify-between items-center text-gray-400 hover:text-gray-600">
                  <h2 className="title text_black">{title}</h2>
                  <IconButton
                    onClick={() => setOpen(false)}
                    sx={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    <IoClose className="w-5 h-5" />
                  </IconButton>
                </div>
              )}
              <div className="">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
