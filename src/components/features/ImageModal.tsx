// ImageModal.tsx
import React from "react";

interface ImageModalProps {
  imageUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-red-500 font-semibold text-lg"
          >
            &times; Close
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <img
            src={imageUrl || ""}
            alt="Selected"
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
