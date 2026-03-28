import type { FC } from "react";
import EventForm from "../../../EventForm/EventForm";
import "./EventManagementModal.css";

interface IEventManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode:string
}
const EventManagementModal: FC<IEventManagementModalProps> = ({
  isOpen,
  onClose,
  mode
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <EventForm onClose={onClose} mode={mode} />
      </div>
    </div>
  );
};

export default EventManagementModal;
