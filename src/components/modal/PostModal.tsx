import React from "react";
import CloseIcon from "@/components/icons/CloseIcon";
type Prop = {
  onClose: () => void;
  children: React.ReactNode;
};
export default function PostModal({ onClose, children }: Prop) {
  return (
    <section
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-neutral-900/70 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-10 right-10 text-white text-3xl"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-4/5">{children}</div>
    </section>
  );
}
