import style from './Modal.module.css'
import CloseButton from "../../assets/icon/CloseButton.svg";
import justClose from "../../assets/icon/justClose.svg"

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={style.CloseButton}>
          <img
            onClick={onClose}
            src={justClose}
            style={{ cursor: "pointer" }}
          ></img>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
