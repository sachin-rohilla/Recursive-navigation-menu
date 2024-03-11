import React from "react";
import { createPortal } from "react-dom";
import { IoCloseCircle } from "react-icons/io5";

const Modal = ({ handleClose, children }) => {
  return createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center h-screen px-4 lg:px-0">
        <div className="w-[400px]  z-10 bg-white shadow-lg rounded-lg p-2 relative border">
          <IoCloseCircle
            className="text-2xl absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          />
          <div>{children}</div>
        </div>
        <div
          className="backdrop-blur fixed inset-0 h-screen w-screen"
          onClick={handleClose}
        />
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
