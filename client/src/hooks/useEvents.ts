import { useCallback, useState } from "react";
import { EventService } from "../services/EventService";
import type { IEvent } from "../types/interfaces/IEvent";

export const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createEvent = useCallback(async (payload: IEvent) => {
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
export const useUpdateEventDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateEventDetails = useCallback(async (payload: IEvent) => {
    setIsLoading(true);
    try {
      const response = await EventService.updateEventDetails(payload);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    updateEventDetails,
    isLoading,
  };
};
export const useGetEventsByProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getEventsByProfile = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const response = await EventService.fetchEventsByProfile(profileId);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getEventsByProfile,
    isLoading,
  };
};
export const useGetEventDetails = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getEventDetails = useCallback(async (eventId: string) => {
    setIsLoading(true);
    try {
      const response = await EventService.fetchEventDetails(eventId);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getEventDetails,
    isLoading,
  };
};
export const useGetAllLogsByEvent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getAllLogsByEvent = useCallback(async (eventId: string) => {
    setIsLoading(true);
    try {
      const response = await EventService.fetchAllLogsByEvent(eventId);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    getAllLogsByEvent,
    isLoading,
  };
};
