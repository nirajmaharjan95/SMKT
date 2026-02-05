import { X } from "lucide-react";
import React from "react";
import Modal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  overlayClassName?: string;
  className?: string;
  closeTimeoutMS?: number;
  children?: React.ReactNode;
  title?: string;
}

const CustomModal = (props: ModalProps) => {
  const {
    isOpen,
    onRequestClose,
    overlayClassName,
    className,
    closeTimeoutMS,
    children,
    title,
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={
        overlayClassName ||
        "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      }
      className={
        className ||
        "bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 outline-none"
      }
      closeTimeoutMS={closeTimeoutMS || 200}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-400 hover:text-gray-700 transition cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default CustomModal;
