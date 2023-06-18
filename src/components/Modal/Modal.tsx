import cls from "./Modal.module.css";

interface IModalProps {
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isActive, onClose, children }: IModalProps) {
  return (
    <div
      className={`${cls["modal"]} ${isActive ? cls["active"] : null}`}
      onClick={() => onClose()}
      role="dialog"
    >
      <div
        className={`${cls["modal-content"]} ${isActive ? cls["active"] : null}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
