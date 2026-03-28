import { useState } from "react";
import "./App.css";
import EventManagementModal from "./components/ui/modals/EventManagementModal/EventManagementModal";
import EventContainer from "./components/EventContainer/EventContainer";
import UserSelector from "./components/reusable/UserSelector/UserSelector";
import { useProfileStore } from "./store/profileStore";

export default function App() {
  const [open, setOpen] = useState(false);
  const { setSelectedProfile } = useProfileStore();
  return (
    <div className="home">
      <div className="main-container">
        <div className="heading">
          <div>
            <h1 id="heading-text">Event Managements</h1>
            <p>Create and Manage Events Across Multiple Timezone</p>
          </div>
          <UserSelector
            mode="user-selection"
            onHandleProfiles={setSelectedProfile}
          />
          <button className="open-btn" onClick={() => setOpen(true)}>
            Create Event
          </button>
        </div>
        <div className="event-user-container">
          <EventContainer />
        </div>
      </div>

      <EventManagementModal
        isOpen={open}
        onClose={() => setOpen(false)}
        mode="create-event"
      />
    </div>
  );
}
