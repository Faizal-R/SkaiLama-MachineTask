import { api } from "../config/api";
import { EventRoutes } from "../constants/routes/EventRoutes";
import type { IEvent } from "../types/interfaces/IEvent";
import { parseAxiosError } from "../utils/parseAxiosError";

export const EventService = {
  createEvent: async (payload: IEvent) => {
    try {
      const response = await api.post(EventRoutes.CREATE,payload);
      return response.data;
    } catch (error) {
      return parseAxiosError(
        error,
        "An error occurred during creating Event",
      );
    }
  },
};
