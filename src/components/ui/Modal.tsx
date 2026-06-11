"use client";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ onClose, children, maxWidth = "max-w-lg" }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-surface rounded-2xl p-5 sm:p-8 w-full ${maxWidth} max-h-[90vh] sm:max-h-[85vh] overflow-y-auto shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
