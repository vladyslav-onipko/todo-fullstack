import ReactModal from 'react-modal';

interface IModalCloseButtonProps {
  onClose: () => void;
}

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const ModalCloseButton: React.FC<IModalCloseButtonProps> = ({ onClose }) => {
  return (
    <button
      className="flex justify-center items-center absolute right-[20px] top-[20px] transition hover:text-rose-700"
      onClick={onClose}
      data-tooltip-content="close"
      data-tooltip-id="event-tooltip"
    >
      <span className="inline-block size-10 pointer-events-none" aria-hidden="true">
        {/* need icon */}
      </span>
      <span className="sr-only">close modal</span>
    </button>
  );
};

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName="modal-overlay"
      className="modal-content"
      ariaHideApp={false}
      closeTimeoutMS={300}
      onRequestClose={onClose}
    >
      <ModalCloseButton onClose={onClose} />
      <header className="w-full p-[15px] mb-[25px] text-center border-b-[1px] border-b-sky-900">
        <h3 className="text-sky-900 font-bold text-[3rem]">{title || 'Modal default title'}</h3>
      </header>
      {children}
    </ReactModal>
  );
};

export default Modal;
