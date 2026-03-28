import { create } from "zustand";
import type { IEvent } from "../types/interfaces/IEvent";

interface IEventStore {
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
  updateEvent: (updatedEvent: IEvent) => void;
}

export const useEventStore = create<IEventStore>((set) => ({
  selectedEventId: null,
  events: [],
  setEvents: (events: IEvent[]) => {
    set({
      events,
    });
  },
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e,
      ),
    })),

  setSelectedEventId: (id) => set({ selectedEventId: id }),
}));
