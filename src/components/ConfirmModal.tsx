import type React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  closeModal: () => void;
  text: string;
  secondaryText?: string;
  primaryText?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  closeModal,
  text,
  secondaryText,
  primaryText,
  primaryAction,
  secondaryAction,
}) => (
  <div
    className={`${
      isOpen ? "flex justify-center items-center" : "hidden"
    } bg-black bg-opacity-70 backdrop-blur-sm fixed w-screen h-screen top-0 left-0 z-40`}
  >
    <div className="w-[80%] max-w-[450px] bg-white overflow-y-auto text-sky-600 p-5 max-w-[80%] max-h-[80%] sm:w-[450px] relative">
      <button
        onClick={closeModal}
        className="text-lg text-black font-bold absolute right-3 top-2"
      >
        X
      </button>
      <p className="pt-4 text-lg text-center font-semibold">{text}</p>
      <div className="pt-5 flex justify-center">
        {secondaryText && (
          <button
            className={`min-w-[100px] rounded py-1 px-3 bg-red-500 text-base font-semibold text-white ${
              primaryText ? "mr-10" : ""
            }`}
            onClick={secondaryAction}
          >
            {secondaryText}
          </button>
        )}
        {primaryText && (
          <button
            className="min-w-[100px] rounded py-1 px-3 bg-green-500 text-base font-semibold text-white"
            onClick={primaryAction}
          >
            {primaryText}
          </button>
        )}
      </div>
    </div>
  </div>
);

export default ConfirmModal;
