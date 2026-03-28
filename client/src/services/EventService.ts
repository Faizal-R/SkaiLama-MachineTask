import { api } from "../config/api";
import { EventRoutes } from "../constants/routes/EventRoutes";
import type { IEvent } from "../types/interfaces/IEvent";
import { parseAxiosError } from "../utils/parseAxiosError";

export const EventService = {
  createEvent: async (payload: IEvent) => {
    try {
      const response = await api.post(EventRoutes.CREATE, payload);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during creating Event");
    }
  },
  updateEventDetails: async (payload: IEvent) => {
    try {
      const response = await api.put(EventRoutes.UPDATE, payload);
      return response.data;
    } catch (error) {
      return parseAxiosError(error, "An error occurred during Updating Event");
    }
  },
  fetchEventsByProfile: async (profileId: string) => {
    try {
      const response = await api.get(
        EventRoutes.GET_EVENTS_BY_PROFILE(profileId??""),
      );
      return response.data
    } catch (error) {
      return parseAxiosError(error, "An error occurred during fetching Event");
    }
  },
  fetchEventDetails: async (eventId: string) => {
    try {
      const response = await api.get(
        EventRoutes.GET_EVENT_DETAILS(eventId),
      );
      return response.data
    } catch (error) {
      return parseAxiosError(error, "An error occurred during fetching Event Details");
    }
  },

  fetchAllLogsByEvent: async (eventId: string) => {
    try {
      const response = await api.get(
        EventRoutes.GET_LOGS_BY_EVENT(eventId),
      );
      return response.data
    } catch (error) {
      return parseAxiosError(error, "An error occurred during fetching Logs");
    }
  },
};
