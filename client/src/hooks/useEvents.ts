import { useCallback, useState } from "react";
import { EventService } from "../services/EventService";
import type { IEvent } from "../types/interfaces/IEvent";

export const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createEvent = useCallback(async (payload:IEvent) => {
    setIsLoading(true);
    try {
      const response = await EventService.createEvent(payload);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createEvent,
    isLoading,
  };
};